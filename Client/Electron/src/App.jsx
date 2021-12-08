import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom'
import AppRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { actionTypes } from './Utils/actionTypes';
import { useQueryHandler } from './Hooks/queryHandler.hook';
import { TransferModel } from '../transferModel/transferModel';
import { useIsMount } from './Hooks/effectIsMount.hook';
import ConfigData from './configData.json'
import { Context } from './renderer';
import { CssBaseline } from '@mui/material';
import { ruRU } from "@mui/material/locale";

const App = () => {
  const { request, loading, error, clearError } = useQueryHandler();
  const isMount = useIsMount();
  const [mode, setMode] = React.useState('light');
  const context = React.useContext(Context);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }, ruRU),
    [mode],
  );

  useEffect(() => {
    if (isMount) {
      (async () => {
        const response = await request(ConfigData.apiUrl, { ...new TransferModel({}, actionTypes.CONNECT) });
        console.log(response);
      })();

      return async () => {
        const response = await request(ConfigData.apiUrl, { ...new TransferModel({}, actionTypes.CLOSE_CONNECTION) });
        console.log(response);
      }
    } else {
      console.log("rerendered");
    }
  }, [])


  return (
    <Context.Provider value={{
      ...context,
      colorMode: colorMode
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter><AppRouter /></HashRouter>
      </ThemeProvider>
    </Context.Provider>

  )
};

export default App;