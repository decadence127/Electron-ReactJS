const { BrowserWindow } = require("electron");

function WindowNodeHandler(msg, window) {
  switch (msg) {
    case "minimize": {
      BrowserWindow.getFocusedWindow().minimize();
      window.webContents.send("fromMain", "minimized");
      break;
    }
    case "maximize": {
      BrowserWindow.getFocusedWindow().maximize();
      window.webContents.send("fromMain", "maximized");
      break;
    }
    case "unmaximize": {
      BrowserWindow.getFocusedWindow().unmaximize();
      window.webContents.send("fromMain", "unmaximized");
      break;
    }
    case "destroy": {
      BrowserWindow.getFocusedWindow().destroy();
      break;
    }
  }
}
module.exports = WindowNodeHandler;
