const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  shell,
} = require("electron");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

app.commandLine.appendSwitch("trace-warnings");
app.commandLine.appendSwitch("unhandled-rejections", "strict");
app.commandLine.appendSwitch("js-flags", "--max-old-space-size=1024");

const isDevelopment = process.env.NODE_ENV === "DEV";

if (isDevelopment) {
  require("electron-reload")(__dirname);
}

const isMac = process.platform === "darwin";

const ddb = require("./munch/ddb.js");
const book = require("./munch/book.js");
const scenes = require("./munch/scene-load.js");
const utils = require("./munch/utils.js");
const configurator = require("./munch/config.js");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const pargs = yargs(hideBin(process.argv));

const { autoUpdater } = require("electron-updater");

let allBooks = true;

configurator.setConfigDir(app.getPath("userData"));

const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideothers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" },
        ],
      },
    ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "Reset config",
        click: async () => {
          const configFile = path.join(app.getPath("userData"), "config.json");
          console.log(configFile);
          if (fs.existsSync(configFile)) fs.unlinkSync(configFile);
        },
      },
      {
        label: "Reset generated ids",
        click: async () => {
          const lookupPath = path.join(app.getPath("userData"), "lookup.json");
          console.log(lookupPath);
          if (fs.existsSync(lookupPath)) fs.unlinkSync(lookupPath);
        },
      },
      {
        label: "Remove downloaded files",
        click: async () => {
          const downloadPath = path.join(app.getPath("userData"), "content");
          console.log(downloadPath);
          if (fs.existsSync(downloadPath)) {
            fs.rmdir(downloadPath, { recursive: true }, (err) => {
              if (err) {
                throw err;
              }
            });
          }
          const buildPath = path.join(app.getPath("userData"), "build");
          console.log(buildPath);
          if (fs.existsSync(buildPath)) {
            fs.rmdir(buildPath, { recursive: true }, (err) => {
              if (err) {
                throw err;
              }
            });
          }
          const metaPath = path.join(app.getPath("userData"), "meta");
          console.log(metaPath);
          if (fs.existsSync(metaPath)) {
            fs.rmdir(metaPath, { recursive: true }, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        },
      },
      isMac ? { role: "close" } : { role: "quit" },
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
          { type: "separator" },
          { role: "front" },
          { type: "separator" },
          { role: "window" },
        ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Config location",
        click: async () => {
          const configFolder = app.getPath("userData");
          const configFile = path.join(configFolder, "config.json");
          console.log(configFolder);
          if (fs.existsSync(configFile)) {
            shell.showItemInFolder(configFile);
          } else {
            shell.showItemInFolder(configFolder);
          }
        },
      },
      {
        label: "Icon attribution",
        click: async () => {
          await shell.openExternal(
            "https://iconarchive.com/show/role-playing-icons-by-chanut/Adventure-Map-icon.html"
          );
        },
      },
      {
        label: "Software license",
        click: async () => {
          await shell.openExternal("https://opensource.org/licenses/MIT");
        },
      },
      {
        label: "Source code",
        click: async () => {
          await shell.openExternal(
            "https://github.com/MrPrimate/ddb-adventure-muncher"
          );
        },
      },
      {
        label: `Version: ${app.getVersion()}`,
      },
    ],
  },
];

async function downloadBooks(config) {
  const availableBooks = await ddb.listBooks(config.cobalt);
  // console.log(bookIds)
  for (let i = 0; i < availableBooks.length; i++) {
    process.stdout.write(`Downloading ${availableBooks[i].book.description}`);
    const options = {
      bookCode: availableBooks[i].bookCode,
    };
    await configurator.getConfig(options);
    process.stdout.write(`Download for ${availableBooks[i].book.description} complete`);
  }
}

function generateAdventure(options) {
  options.version = app.getVersion();
  return new Promise((resolve) => {
    configurator.getConfig(options).then((config) => {
      if (!isDevelopment) {
        book.setTemplateDir(
          path.join(process.resourcesPath, "content", "templates")
        );
      }
      book.setConfig(config).then(() => {
        utils.directoryReset(config);
        book.fetchLookups(config);
        book.setMasterFolders();
        if (config.generateTokens){
          const missingActors = scenes.actorCheck(config);
          if (missingActors.length > 0) {
            resolve({
              success: false,
              message: "Missing required data about monsters for this adventure, please re-munch actors in Foundry and regenerate a new config file and reload with the button above.",
              data: missingActors,
            });
            return;
          }
        }
        book.getData();
        const targetAdventureZip = path.join(
          config.run.outputDirEnv,
          `${config.run.bookCode}.fvttadv`
        );
        const { promisify } = require("util");
        const sleep = promisify(setTimeout);

        const doSomething = async () => {
          while (!fs.existsSync(targetAdventureZip)) {
            console.log(`No adventure at ${targetAdventureZip}`);
            await sleep(1000);
          }
          resolve({
            success: true,
            message: `Successfully generated ${config.run.bookCode}.fvttadv`,
            data: [],
          });
        };
        doSomething();
      });
    });
  });
}

function checkAuth() {
  return new Promise((resolve) => {
    configurator.getConfig().then((config) => {
      ddb.getUserData(config.cobalt).then((userData) => {
        if (userData.error || !userData.userDisplayName) {
          process.stdout.write(
            "Authentication failure, please check your cobalt token\n"
          );
          process.exit(0);
        } else {
          resolve(true);
        }
      });
    });
  });
}

function commandLine() {
  const args = pargs
    .usage("./$0 <command> [options]")
    .option("show-owned-books", {
      alias: "o",
      describe: "Show only owned books, not shared.",
    })
    .command("version", "Version information")
    .alias("v", "version")
    .command("list", "List books")
    .alias("l", "list")
    .command(
      "download",
      "Download all the book files you have access to. This does not process the book, just downloads for later use."
    )
    .alias("d", "download")
    .command("generate", "Generate content for specified book.")
    .alias("g", "generate")
    .nargs("g", 1)
    .command("config", "Load a config file into the importer.")
    .alias("c", "config")
    .nargs("c", 1)
    .example(
      "$0 generate lmop",
      "Generate import file for Lost Mines of Phandelver"
    )
    .help("help")
    .locale("en").argv;

  return new Promise((resolve) => {
    if (args["show-owned-books"]) {
      process.stdout.write("Owned books mode activated\n");
      allBooks = false;
    }

    if (args.config) {
      const options = {
        externalConfigFile: args.config,
      };
      configurator.getConfig(options).then(() => {
        process.stdout.write(`Loaded ${args.config}\n`);
        process.exit(0);
      });
    } else if (args.list) {
      checkAuth().then(() => {
        configurator.getConfig().then((config) => {
          ddb.listBooks(config.cobalt).then((books) => {
            books.forEach((book) => {
              process.stdout.write(`${book.bookCode} : ${book.book.description}\n`);
            });
            process.exit(0);
          });
        });
      });
    } else if (args.download) {
      checkAuth().then(() => {
        configurator.getConfig().then((config) => {
          downloadBooks(config).then(() => {
            process.stdout.write("Downloads finished\n");
            process.exit(0);
          });
        });
      });
    } else if (args.generate) {
      checkAuth().then(() => {
        generateAdventure(args.generate).then(() => {
          process.exit(0);
        });
      });
    } else if (args.help) {
      // eslint-disable-next-line no-undef
      process.stdout.write(options.help());
      process.exit(0);
    } else if (args.version) {
      process.stdout.write(`${app.getVersion()}\n`);
      process.exit(0);
    } else {
      resolve(true);
    }
  });
}

const loadMainWindow = () => {
  commandLine();

  let iconLocation = isDevelopment
    ? path.join(__dirname, "build", "icon.png")
    : path.join(process.resourcesPath, "content", "icon.png");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    icon: iconLocation,
    webPreferences: {
      // nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }

  // eslint-disable-next-line no-unused-vars
  ipcMain.on("config", (event, args) => {
    // Send result back to renderer process
    // mainWindow.webContents.send("config", {"bears": "not a bear"});
    configurator.getConfig().then((config) => {
      mainWindow.webContents.send("config", config);
    });
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on("loadConfig", (event, args) => {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ["openFile", "createDirectory"],
        filters: [{ name: "JSON", extensions: ["json"] }],
      })
      .then((result) => {
        if (!result.canceled) {
          const options = {
            externalConfigFile: result.filePaths[0],
          };
          configurator.getConfig(options).then((config) => {
            mainWindow.webContents.send("config", config);
          });
        }
      });
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on("outputDir", (event, args) => {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ["openDirectory", "createDirectory"],
      })
      .then((result) => {
        if (!result.canceled) {
          // options.bookCode, options.externalConfigFile, options.outputDirPath
          const options = {
            outputDirPath: result.filePaths[0],
          };
          configurator
            .getConfig(options)
            .then((config) => {
              mainWindow.webContents.send("config", config);
            });
        }
      });
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on("books", (event, args) => {
    configurator.getConfig().then((config) => {
      ddb.listBooks(config.cobalt, allBooks).then((books) => {
        books = _.orderBy(books, ["book.description"], ["asc"]);
        mainWindow.webContents.send("books", books);
      });
    });
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on("user", (event, args) => {
    configurator.getConfig().then((config) => {
      ddb.getUserData(config.cobalt).then((userData) => {
        mainWindow.webContents.send("user", userData);
      });
    });
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on("generate", (event, data) => {
    generateAdventure(data).then((data) => {
      mainWindow.webContents.send("generate", data);
    });
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
};

function prepare() {
  commandLine().then(() => {
    autoUpdater.checkForUpdatesAndNotify();
    loadMainWindow();
  });
}

app.on("ready", prepare);

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loadMainWindow();
  }
});
