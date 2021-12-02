import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom'
import AppRouter from './AppRouter';

import { actionTypes } from './Utils/actionTypes';
import { useQueryHandler } from './Hooks/queryHandler.hook';
import { TransferModel } from '../transferModel/transferModel';
import { useIsMount } from './Hooks/effectIsMount.hook';


const App = () => {
  const { request, loading, error, clearError } = useQueryHandler();
  const isMount = useIsMount();


  useEffect(() => {
    if (isMount) {
      (async () => {
        const response = await request("http://localhost:9119/", { ...new TransferModel({}, actionTypes.CONNECT) });
        console.log(response);
      })();

      return async () => {
        const response = await request("http://localhost:9119/", { ...new TransferModel({}, actionTypes.CLOSE_CONNECTION) });
        console.log(response);
      }
    } else {
      console.log("rerendered");
    }
  }, [])


  return (
    <HashRouter><AppRouter /></HashRouter>
  )
};

export default App;