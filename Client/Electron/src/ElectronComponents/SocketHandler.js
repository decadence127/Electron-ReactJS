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
<<<<<<< HEAD
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
=======
        return result;
      } catch (e) {
        console.error(e);
      }
      break;
    }
    case actionTypes.LOGIN_ACTION: {
      try {
        const response = await apiFunctionWrapper();
      } catch (e) {
        console.error(e);
      }
>>>>>>> BackEnd/backend_1
      break;
    }
    case "receiveData": {
      BrowserWindow.getFocusedWindow().unmaximize();
      window.webContents.send("fromMain", "unmaximized");
      break;
    }
<<<<<<< HEAD
    case "close": {
      BrowserWindow.getFocusedWindow().destroy();
=======
    case actionTypes.CLOSE_CONNECTION: {
      try {
        const result = await apiFunctionWrapper(
          socketInstance.closeConnection.bind(socketInstance)
        );
        return result;
      } catch (e) {
        console.error(e);
      }

>>>>>>> BackEnd/backend_1
      break;
    }
  }
}
module.exports = SocketHandler;
