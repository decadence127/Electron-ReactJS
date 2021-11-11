const net = require("net");
require("dotenv").config();
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
