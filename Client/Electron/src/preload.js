const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  request: (channel, data) => {
<<<<<<< HEAD
    let validChannels = ["toMain"];
=======
    let validChannels = ["toMain", "toMainAsync"];
>>>>>>> BackEnd/backend_1
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  response: (channel, func) => {
<<<<<<< HEAD
    let validChannels = ["fromMain"];
=======
    let validChannels = ["fromMain", "fromMainAsync"];
>>>>>>> BackEnd/backend_1
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
<<<<<<< HEAD
  asyncAction: async (args) => {
    return await ipcRenderer.invoke("asyncAction", args);
  },
=======
>>>>>>> BackEnd/backend_1
});
