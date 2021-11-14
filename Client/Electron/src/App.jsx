import React, { Context, useContext, useEffect } from 'react';
import { SocketContext } from './Context/socketContext'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from './AppRouter';
import transferModel from '../transferModel/transferModel';
import { actionTypes } from './Utils/actionTypes';
import ReconnectComponent from './Components/ReconnectComponent/ReconnectComponent';
import UnsuccessfulReconnection from './Components/UnsuccessfullReconnection/UnsuccessfulReconnection';
const App = () => {
  const [reconnect, setReconnect] = React.useState(false)
  const [recAttempts, setRecAttempts] = React.useState(0);
  const [reconnectedSuccessfully, setReconnectedSuccessfully] = React.useState(true)

  const timer = ms => new Promise(res => setTimeout(res, ms))


  const attemptToConnect = async () => {
    let i = 1
    do {
      console.log("called attempt number: ", i);
      const response = await window.api.asyncAction({ message: { data: "", actionType: actionTypes.CONNECT } })
      console.log("Response code: ", response.message.actionType);

      if (response.message.actionType === 500) {
        setReconnect(true);
        setReconnectedSuccessfully(false)
        setRecAttempts(i);

      }
      if (response.message.actionType === 200) {
        setReconnect(false);
        setReconnectedSuccessfully(true)
        break;
      }
      await timer(1000)
      i++;
    } while (i <= 10)
    setReconnect(false)
  }

  useEffect(() => {
    setReconnect(true)
    attemptToConnect()
  }, [])

  return (
    <>
      {reconnect ? <ReconnectComponent attempts={recAttempts} /> : reconnectedSuccessfully ? <HashRouter> <AppRouter /> </HashRouter> : <UnsuccessfulReconnection />}

    </>);
};

export default App;