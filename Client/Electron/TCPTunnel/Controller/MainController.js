const TCPController = require("../TCPController/TCPController");

let tcp = new TCPController(5000);
tcp.startConnection();

class MainController {
  async start(req, res) {
    try {
      let buffer = Buffer.from(JSON.stringify(req.body), "utf-8");
      tcp.clientSocket.write(buffer);

      const response = await new Promise((resolve, reject) => {
        tcp.clientSocket.once("data", (data) => {
          resolve(data.toString());
        });
      });
      console.log(
        `Trying to connect to a handler via port ${Number.parseInt(
          JSON.parse(response).TransferObject
        )}`
      );
      tcp = null;
      tcp = new TCPController(
        Number.parseInt(JSON.parse(response).TransferObject)
      );
      tcp.startConnection();

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

// async start(req, res) {
//   let tcpConnector = new TCPController(5000);
//   tcpConnector.startConnection();

//   let buffer = Buffer.from(JSON.stringify(req.body), "utf8");
//   tcpConnector.clientSocket.write(buffer);

//   const response = await new Promise((resolve, reject) => {
//     tcpConnector.clientSocket.on("data", function (data) {
//       resolve(data.toString());
//     });
//   });
//   tcpConnector.closeConnection();

//   tcpConnector = new TCPController(
//     Number.parseInt(JSON.parse(response).TransferObject)
//   );
//   tcpConnector.startConnection();
//   console.log(
//     `Trying to connect to a handler via port ${Number.parseInt(
//       JSON.parse(response).TransferObject
//     )}`
//   );
// }
// async send(req, res) {
//   try {
//     let buffer = Buffer.from(JSON.stringify(req.body), "utf8");

//     tcpConnector.clientSocket.write(buffer);

//     const response = await new Promise((resolve, reject) => {
//       tcpConnector.clientSocket.on("data", function (data) {
//         console.log(data.toString());
//         resolve(data.toString());
//       });
//     });
//     console.log("response: ", response);
//     return res.status(200).json(JSON.parse(response));
//   } catch (e) {
//     console.error(e);
//   }
// }
// test(req, res) {
//   return res.status(200).send("hello");
// }
