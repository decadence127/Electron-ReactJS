const net = require("net");

class TCPController {
  constructor(port) {
    this.port = port;
    this.clientSocket = null;
  }
  startConnection() {
    this.clientSocket = net.connect(
      {
        host: "localhost",
        port: this.port,
      },
      () => {
        console.log("Connected to server");
      }
    );
  }
  closeConnection() {
    this.clientSocket.destroy();
  }
}

module.exports = TCPController;
