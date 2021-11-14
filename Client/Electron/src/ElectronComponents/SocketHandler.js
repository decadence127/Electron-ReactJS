const transferModel = require("../../transferModel/transferModel");
const { actionTypes } = require("../Utils/actionTypes");
const socketInstance = require("./SocketController/SocketInstance");

function apiFunctionWrapper(func) {
  return new Promise((resolve, reject) => {
    func((successResponse) => {
      resolve(successResponse);
    });
  });
}

async function SocketHandler(msg, window) {
  console.log("Message Recieved: ", msg);
  console.log("Action type: ", msg.message.actionType);
  switch (msg.message.actionType) {
    case actionTypes.CONNECT: {
      try {
        const result = await apiFunctionWrapper(
          socketInstance.startConnection.bind(socketInstance)
        );
        console.log("Response from socket Start", result);
        console.log("Response: ", result);
        return result;
      } catch (e) {
        console.log(e);
      }
      break;
    }
    case "sendData": {
      BrowserWindow.getFocusedWindow().maximize();
      window.webContents.send("fromMain", "maximized");
      break;
    }
    case "receiveData": {
      BrowserWindow.getFocusedWindow().unmaximize();
      window.webContents.send("fromMain", "unmaximized");
      break;
    }
    case "close": {
      BrowserWindow.getFocusedWindow().destroy();
      break;
    }
  }
}
module.exports = SocketHandler;
