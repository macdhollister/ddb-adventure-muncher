const { logger } = require("../logger.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { Helpers } = require("./Helpers.js");

class NoteFactory {

  constructor(adventure) {
    this.adventure = adventure;
    this.noteRows = [];
  }

  static getNoteTitle(html) {
    const pDom = new JSDOM(html).window.document;
    const boldText = pDom.querySelector("b, strong");
    if (boldText) {
      return boldText.textContent;
    } else {
      return pDom.body.textContent;
    }
  
  }

  #parseNoteHint(row, hint, count) {
    let id = 2000 + row.data.id;
    logger.info("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    logger.info(`Generating Notes for ${hint.slug} ContentChunkId ${hint.contentChunkIdStart}`);
    this.adventure.config.returns.statusMessage(`Generating Notes for ${hint.slug}`);
    logger.info(`${hint.splitTag}[data-content-chunk-id='${hint.contentChunkIdStart}']`);
    
    let keyChunk = row.doc.querySelector(`${hint.splitTag}[data-content-chunk-id='${hint.contentChunkIdStart}']`);
    logger.info(`keyChunk: ${keyChunk}`);
    if (!keyChunk) {
      logger.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      logger.warn(`WARNING NO keyChunk found for ${hint.slug} ContentChunkId ${hint.contentChunkIdStart}`);
      logger.warn(hint);
      logger.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      return;
    }
    let html = "";
    let noteTitle = NoteFactory.getNoteTitle(keyChunk.innerHTML);
    let keyChunkId = hint.contentChunkIdStart;
    let idTagStop = hint.contentChunkIdStop === "IDSTOP";

    while (true) {
      const pTag = hint.splitTag.toUpperCase() === "P";
      // if this is the first p tag add the full p tag to the html
      if (pTag && hint.contentChunkIdStart === keyChunkId) {
        html += keyChunk.innerHTML;
        //logger.warn("html: ", html);
      }

      keyChunk = keyChunk.nextElementSibling;

      const chunkId = keyChunk ? keyChunk.getAttribute("data-content-chunk-id") : undefined;
      // when we match against a P, we never stop
      const tagMatch = keyChunk ? keyChunk.tagName.toUpperCase() === hint.splitTag.toUpperCase() : false;
      const idStop = (idTagStop && keyChunk.getAttribute("id") === hint.tagIdLast) || hint.contentChunkIdStart === hint.contentChunkIdStop;
      const stopChunk = keyChunk === null || chunkId === hint.contentChunkIdStop || idStop;

      // if we have reached the same tag type or last chunk generate a journal
      if ((tagMatch && !pTag) || stopChunk) {
        let noteRow = {
          doc: new JSDOM(html).window.document,
          data: JSON.parse(JSON.stringify(row.data)),
        };
        delete noteRow.data.html;

        const numMatch = noteTitle.match(/^(\d+)(.*)/);
        const letterNumMatch = noteTitle.match(/^([a-z,A-Z])(\d+)(.*)/);
        if (numMatch) {
          const prefix = Helpers.zeroPad(numMatch[1],2);
          noteRow.data.title = `${prefix}${numMatch[2]}`;
        } else if (letterNumMatch) {
          const prefix = Helpers.zeroPad(letterNumMatch[2],2);
          noteRow.data.title = `${letterNumMatch[1]}${prefix}${letterNumMatch[3]}`;
        } else {
          noteRow.data.title = noteTitle;
        }

        noteRow.data.contentChunkId = keyChunkId;
        noteRow.data.sceneName = hint.sceneName;
        noteRow.data.id  = id + count;
        noteRow.data.ddbId = row.data.id;
        this.noteRows.push(noteRow);

        html = "";
        noteTitle = "";
      }

      // if we have reached the end leave
      if (stopChunk) {
        break;
      } else if ((tagMatch && !pTag) || (noteTitle === "" && pTag)) {
        noteTitle = NoteFactory.getNoteTitle(keyChunk.innerHTML);
        keyChunkId = chunkId;
      } else {
        // we add the chunk contents to the html block
        html += keyChunk.outerHTML;
      }

    }

    logger.info("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  }


  // generate notes from a row, requires not hint data to be loaded.
  // this.adventure.enhancements.noteHints

  // noteHints needs:
  // id
  // cobaltId
  // parentId
  // tag to split at
  // contentChunkId to start at
  // contentChunkId to stop at

  // test hint, LMOP
  // noteHints = [{
  //   ddbId: 9,
  //   cobaltId: null,
  //   parentId: 394,
  //   splitTag: "h3",
  //   slug: "goblin-arrows#CragmawHideout",
  //   tagIdFirst: "1CaveMouth",
  //   contentChunkIdStart: "6090f5fa-5c2b-43d4-89c0-1b5e37a9b9c5",
  //   tagIdLast: "WhatsNext",
  //   contentChunkIdStop: "3672ecdc-d709-40b5-bb0f-c06c70c1aa15",
  //   sceneName: "Cragmaw Hideout",
  // }]
  #generateNoteRows(row) {
    this.adventure.enhancements.noteHints
      .filter((hint) => hint.ddbId == row.data.id)
      .forEach((hint, index) => {
        this.#parseNoteHint(row, hint, index + 1);
      });
  }

  generateJournals(row) {
    // ensure note hints exist for the row
    this.#generateNoteRows(row);
    this.noteRows
      .filter((noteRow) => noteRow.data.ddbId === row.data.id)
      .forEach((noteRow) => {
        this.adventure.journalFactory.createNoteJournal(noteRow);
      });
  }

}

exports.NoteFactory = NoteFactory;