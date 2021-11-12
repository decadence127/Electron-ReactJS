const net = require("net");
require("dotenv").config();
const { contextBridge, ipcRenderer } = require("electron");

class socketInstance {
  constructor(port) {
    this.port = port;
  }
  get clientPort() {
    return this.port;
  }
  async startConnection() {
    try {
      this.socketInstance = await net.connect(
        {
          host: "localhost",
          port: this.port,
        },
        () => {
          console.log("Connected to server");
        }
      );
    } catch (e) {
      console.error("Couldnt connect to the server. Error: ", e);
    }
  }
  sendDataToServer(message) {
    this.socketInstance.write(message);
  }
  recvDataFromServer() {
    let message;
    this.socketInstance.on("data", (data) => {
      console.log("called");
      this.message.data = data.toString();
    });
    return message;
  }
}
console.log(process.env.PORT);
window.clientSocket = new socketInstance(Number.parseInt(process.env.PORT));

contextBridge.exposeInMainWorld("api", {
  request: (channel, data) => {
    let validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  response: (channel, func) => {
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
