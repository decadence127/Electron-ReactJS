const net = require("net");
require("dotenv").config();
const transferModel = require("TransferModel");
const { actionTypes } = require("../../Utils/actionTypes");
class socketInstance {
  constructor(port) {
    this.port = port;
  }
  get clientPort() {
    return this.port;
  }
  startConnection(callback) {
    try {
      this.socketInstance = net
        .connect(
          {
            host: "localhost",
            port: this.port,
          },
          () => {
            console.log("Connected to server");
            callback(new transferModel("", actionTypes.SUCCESS));
          }
        )
        .on("error", (err) => {
          callback(new transferModel(err, actionTypes.INTERNAL_ERROR));
        });
    } catch (e) {
      console.log("Caught error", e);
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
module.exports = new socketInstance(Number.parseInt(process.env.PORT));
