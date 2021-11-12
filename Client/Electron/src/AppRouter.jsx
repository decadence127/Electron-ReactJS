import { Box } from '@mui/system';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import CustomAppBar from './Components/UI_Library/CustomAppBar.jsx';
import { HOME_ROUTE, LOGIN_ROUTE } from './Utils/pageNames';
import { authRoutes, publicRoutes } from './Utils/routes';

const AppRouter = () => {
  let isAuth = true;
  return (
    <>
      <CustomAppBar />
      <Switch>

        {isAuth && authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
        <Redirect to={LOGIN_ROUTE} />
      </Switch>
    </>
  );
};

export default AppRouter;