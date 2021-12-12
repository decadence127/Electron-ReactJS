const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  request: (channel, data) => {
    let validChannels = ["toMain", "toMainAsync", "createReport"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  response: (channel, func) => {
    let validChannels = ["fromMain", "fromMainAsync", "createReport"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
