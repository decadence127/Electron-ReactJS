import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from './AppRouter';
import transferModel from '../transferModel/transferModel';
import { actionTypes } from './Utils/actionTypes';
import ReconnectComponent from './Components/ReconnectComponent/ReconnectComponent';
import UnsuccessfulReconnection from './Components/UnsuccessfullReconnection/UnsuccessfulReconnection';
import { Button } from '@mui/material';
import { io } from 'socket.io-client'

const App = () => {
  const [reconnect, setReconnect] = React.useState(false)
  const [recAttempts, setRecAttempts] = React.useState(0);
  const [reconnectedSuccessfully, setReconnectedSuccessfully] = React.useState(true)
  const [socket, setSocket] = React.useState(null);
  const handler = () => {
    //   window.api.request("toMainAsync", { message: { data: '', actionType: actionTypes.CONNECT } });
    //   window.api.response("fromMainAsync", (message) => { console.log(message); })
    // }
    // function attemptToConnect() {
    //   let breakloop = false;
    //   for (let i = 1; i < 11; i++) {
    //     window.api.request("toMainAsync", { message: { data: '', actionType: actionTypes.CONNECT } })

    //     new Promise((resolve, reject) => {
    //       window.api.response("fromMainAsync", (message) => {
    //         resolve(message);
    //       })
    //     }).then((response) => {
    //       console.log(breakloop);
    //       console.log(response);
    //       if (response.message.actionType === actionTypes.INTERNAL_ERROR) {
    //         setReconnect(true);
    //         setReconnectedSuccessfully(false);
    //         setRecAttempts(i);
    //       }
    //       if (response.message.actionType === actionTypes.SUCCESS) {
    //         setReconnect(false);
    //         setReconnectedSuccessfully(true)
    //         breakloop = true;
    //       }
    //     })
    //     if (breakloop)
    //       console.log("haha");;
    //   }
    //   setReconnect(false);
    console.log('yo');
  }


  const attemptToConnect = () => {
    const newSocket = io(`http://localhost:9119`);
    setSocket(newSocket)
  }
  useEffect(() => {
    setReconnect(false)
    attemptToConnect()
  }, [])

  return (
    <>
      {reconnect ? <ReconnectComponent attempts={recAttempts} /> : reconnectedSuccessfully ? <HashRouter> <AppRouter /> </HashRouter> : <UnsuccessfulReconnection />}
      <Button p={4} onClick={e => { attemptToConnect() }}>asd</Button>
      <Button onClick={handler}>sdsssd</Button>
    </>);
};

export default App;