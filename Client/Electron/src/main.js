const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const WindowNodeHandler = require("./ElectronComponents/WindowNodeHandler");
const ReportCreator = require("./ElectronComponents/ReportCreator/ReportCreator");
if (require("electron-squirrel-startup")) {
  app.quit();
}
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 920,
    frame: false,
    icon: __dirname + "/assets/Customs.ico",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(
    path.join(__dirname, "./ElectronComponents/MainLoadingPage/loading.html")
  );

  setTimeout(() => {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }, 1000);
};

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
  WindowNodeHandler(args, mainWindow);
});

ipcMain.on("createReport", (event, args) => {
  console.log(args);
  ReportCreator(JSON.stringify(args, null, 2));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
