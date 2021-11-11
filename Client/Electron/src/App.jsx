import React, { Context, useContext, useEffect } from 'react';
import { SocketContext } from './Context/socketContext'


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
    <div>
      Hello from react
      <input onChange={(e) => setMessage(e.target.value)} type="text" />
      <button onClick={clickHandler}>click</button>
      <button onClick={(e) => { setReconnect(true) }}>reconnect</button>
      {serverMessage}
    </div>
  );
};

export default App;