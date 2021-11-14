const { app, BrowserWindow, remote, ipcMain } = require("electron");
const path = require("path");
const WindowNodeHandler = require("./ElectronComponents/WindowNodeHandler");

ipcMain.handle("asyncAction", async (event, arg) => {
  console.log("called");
  console.log(arg);
  console.log(event);
  return "yes";
});
if (require("electron-squirrel-startup")) {
  app.quit();
}
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    path.join(__dirname, "./ElectronComponents/MainLoadingPage/loading.html")
  );
  console.log(remote);
  setTimeout(() => {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }, 2500);
};

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
  WindowNodeHandler(args, mainWindow);
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
