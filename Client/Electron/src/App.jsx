import React, { Context, useContext, useEffect } from 'react';
import { SocketContext } from './Context/socketContext'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from './AppRouter.jsx';

const App = () => {
  const [message, setMessage] = React.useState('');
  const [reconnect, setReconnect] = React.useState(false)
  const [serverMessage, setServerMessage] = React.useState('')


  const clientSocket = useContext(SocketContext)

  useEffect(async () => {
    try {
      await clientSocket.startConnection()
      console.log("Connected in React");
    } catch (e) {
      console.log("Couldnt connect to the server :(")
    }
  }, [reconnect, clientSocket])

  const clickHandler = (e) => {
    e.preventDefault();
    clientSocket.sendDataToServer(message);
    recvData();
  }

  const recvData = () => {
    clientSocket.socketInstance.on('data', (data) => {
      setServerMessage(data.toString())
    })
  }

  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};

export default App;