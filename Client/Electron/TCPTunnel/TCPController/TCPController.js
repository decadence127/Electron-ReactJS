const net = require("net");
class TCPController {
  constructor(port) {
    this.port = port;
    this.clientSocket = null;
  }
  startConnection() {
    try {
      this.clientSocket = net.connect(
        {
          host: "localhost",
          port: this.port,
        },
        () => {
          console.log("Connected to server");
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
  closeConnection() {
    this.clientSocket.destroy();
  }
}

module.exports = TCPController;
