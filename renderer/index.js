/* eslint-disable no-undef */
"use strict";

const loadConfig = document.getElementById("load-config");
const setOutputDir = document.getElementById("set-output-dir");
const patreonLink = document.getElementById("patreon-link");
const outputLocation = document.getElementById("output-location");
const bookList = document.getElementById("book-select");
const contentLoadMessage = document.getElementById("config-loader");
const generateButton = document.getElementById("munch-book");
const userField = document.getElementById("user");
const versionSupport = document.getElementById("version-support");

patreonLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.api.patreon();
});

loadConfig.addEventListener("click", (event) => {
  event.preventDefault();
  window.api.send("loadConfig");
});

setOutputDir.addEventListener("click", (event) => {
  event.preventDefault();
  window.api.send("outputDir");
});

generateButton.addEventListener("click", (event) => {
  event.preventDefault();
  generateButton.disabled = true;
  const bookCode = document.getElementById("book-select");
  const createHandouts = document.getElementById("create-handouts");
  const createPlayerHandouts = document.getElementById("create-player-handouts");
  const createPinJournals = document.getElementById("create-pin-journals");
  const observeAll = document.getElementById("observe-all");
  const messageDiv = document.getElementById("message-div");
  messageDiv.innerHTML = "";
  
  const options = {
    bookCode: bookCode.value,
    observeAll: observeAll.checked,
    createHandouts: createHandouts.checked,
    createPlayerHandouts: createPlayerHandouts.checked,
    createPinJournals: createPinJournals.checked,
  };

  if (Number.parseInt(bookCode.value) !== 0) {
    window.api.send("generate", options);
  }

});

window.api.receive("generate", (data) => {
  console.log(data);
  generateButton.disabled = false;
  const messageDiv = document.getElementById("message-div");
  const colour = data.success ? "green" : "red";
  messageDiv.innerHTML = `<p style="color:${colour};">${data.message}</p>`;
  if (!data.success) {
    messageDiv.innerHTML += "<p><b>Missing:</b> ";
    data.data.slice(0,9).forEach((item) => {
      messageDiv.innerHTML += `${item.actorName}, `;
    });
    if (data.data.length > 10) messageDiv.innerHTML += `and more to a total of ${data.data.length} monsters.`;
    messageDiv.innerHTML += "</p><br><br><br>";
  }
  if (data.success) {
    const currentVersion = data.ddbVersions.currentVersion;
    const supportedVersion = data.ddbVersions.supportedVersion;
    if (supportedVersion == 0) {
      messageDiv.innerHTML += "<p style=\"color:red\">ERROR: Adventure Muncher could not download any meta data for this book, scenes will not be processed correctly.</p>";
    } else if (currentVersion > supportedVersion) {
      messageDiv.innerHTML += `<p style="color:orange">WARNING: Current book version is ${currentVersion}, last known supported version is ${supportedVersion}. There is a chance that this adventure has not parsed properly.</p>`;
    } else if (data.ddbVersions.downloadNewVersion) {
      messageDiv.innerHTML += `<p style="color:green"><b>Used DDB book version (${currentVersion}).</b></p>`;
    }
  }
});

window.api.receive("stateMessage", (message) => {
  console.log(message);
  const messageDiv = document.getElementById("message-div");
  const colour = "blue";
  messageDiv.innerHTML = `<p style="color:${colour};">${message}</p>`;
});

window.api.receive("books", (data) => {
  data.forEach((book) => {
    console.log(`${book.bookCode} : ${book.book.description}`);
    console.log(book);
  });
  const bookHtml = data.reduce((html, book) => {
    html += `<option value="${book.bookCode}">${book.book.description}</option>`;
    return html;
  }, "<option value=\"0\">Select book:</option>");
  bookList.innerHTML = bookHtml;
});

window.api.receive("user", (data) => {
  if (data.error) {
    userField.innerHTML = "<b>Authentication Failure - please generate and load a new config file!</b>";
  }
  else if (data.userDisplayName) {
    userField.innerHTML = `<b>User name:</b> ${data.userDisplayName}`;
  }
});


window.api.receive("config", (config) => {
  console.log("Received config from main process");
  console.log(config);

  if (config.data.cobalt) {
    contentLoadMessage.innerHTML = "Config loaded!";
    setOutputDir.disabled = false;
    window.api.send("user", config);
    if (config.data.outputDirEnv) {
      generateButton.disabled = false;
      outputLocation.innerHTML = config.data.outputDirEnv;
      window.api.send("books", config);
    }
    const v4Schema = Number.parseFloat(config.data.schemaVersion) >= 4.0;
    if (v4Schema) {
      versionSupport.innerHTML = "<p><b>Version:</b> v10+ mode. To generate for v9, recreate your config file.</p>";
    } else {
      versionSupport.innerHTML = "<p><b>Version:</b> v9 mode. To generate for v10+, recreate your config file.</p>";
      document.getElementById("create-pin-journals").checked = false;
      document.getElementById("create-pin-journals").disabled = true;
    }
    document.getElementById("create-handouts").checked = config.data.createHandouts === true;
    document.getElementById("create-player-handouts").checked = config.data.createPlayerHandouts === true;
    document.getElementById("create-pin-journals").checked = config.data.createPinJournals === true;
  } else {
    console.warn("No config file!");
    contentLoadMessage.innerHTML = "Config not found";
  }
});

window.api.receive("directoryConfig", (config) => {
  console.log("Received config from main process");
  console.log(config);

  if (config.data.outputDirEnv) {
    generateButton.disabled = false;
    outputLocation.innerHTML = config.data.outputDirEnv;
    window.api.send("books", config);
  } else {
    console.warn("No output dir found in config!");
    contentLoadMessage.innerHTML = "Config unable to parse output dir.";
  }
});


