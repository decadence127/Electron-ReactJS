import React from 'react';
import { Redirect, Route, Routes, Switch } from 'react-router';
import { HOME_ROUTE, LOGIN_ROUTE } from './Utils/pageNames';
import { authRoutes, publicRoutes } from './Utils/routes';

const AppRouter = () => {
  let isAuth = true;
  return (
    <Switch>
      {console.log(new Date(), "called")}\

      {isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;