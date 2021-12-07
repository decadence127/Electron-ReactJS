const TCPController = require("../TCPController/TCPController");
let tcp;
class MainController {
  async start(req, res) {
    try {
      tcp = new TCPController(5000);
      tcp.startConnection();
      let buffer = Buffer.from(JSON.stringify(req.body), "utf-8");
      tcp.clientSocket.write(buffer);

      const response = await new Promise((resolve, reject) => {
        tcp.clientSocket.once("data", (data) => {
          console.log(data.toString());
          resolve(data.toString());
        });
      });
      console.log(
        `Trying to connect to a handler via port ${Number.parseInt(
          JSON.parse(response).executionResult
        )}`
      );
      tcp = null;
      await new Promise((resolve, reject) => {
        tcp = new TCPController(
          Number.parseInt(JSON.parse(response).executionResult)
        );
        setTimeout(() => {
          resolve(tcp.startConnection());
        }, 2000);
      });

      return res.status(201).json(response);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Error" });
    }
  }
  async send(req, res) {
    try {
      let buffer = Buffer.from(JSON.stringify(req.body), "utf8");

      tcp.clientSocket.write(buffer);
      console.log(req.body);
      const response = await new Promise((resolve, reject) => {
        tcp.clientSocket.once("data", function (data) {
          console.log(data.toString());
          resolve(data.toString());
        });
      });
      console.log("response: ", response);
      return res.status(200).json(JSON.parse(response));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Error" });
    }
  }
}

module.exports = new MainController();
