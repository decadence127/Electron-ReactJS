const net = require("net");

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
      this.message.data = data.toString();
    });
    return message;
  }
}
module.exports = socketInstance;
