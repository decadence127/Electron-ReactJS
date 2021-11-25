<<<<<<< HEAD
const { app, BrowserWindow, remote, ipcMain } = require("electron");
=======
const { app, BrowserWindow, ipcMain } = require("electron");
>>>>>>> BackEnd/backend_1
const path = require("path");
const SocketHandler = require("./ElectronComponents/SocketHandler");
const WindowNodeHandler = require("./ElectronComponents/WindowNodeHandler");

<<<<<<< HEAD
ipcMain.handle("asyncAction", async (event, arg) => {
  const response = await SocketHandler(arg);
  console.log("Response main:", response);
  return response;
});
=======
>>>>>>> BackEnd/backend_1
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
<<<<<<< HEAD
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
=======
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
>>>>>>> BackEnd/backend_1
    },
  });

  mainWindow.loadURL(
    path.join(__dirname, "./ElectronComponents/MainLoadingPage/loading.html")
  );
<<<<<<< HEAD
  console.log(remote);
  setTimeout(() => {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }, 2500);
};

=======

  setTimeout(() => {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }, 2000);
};

// ipcMain.handle("asyncAction", async (event, arg) => {
//   const response = await SocketHandler(arg);
//   console.log("Response main:", response);
//   return response;
// });

>>>>>>> BackEnd/backend_1
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
