import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';
import CustomAppBar from './Components/UI_Library/CustomAppBar';
import { HOME_ROUTE, LOGIN_ROUTE } from './Utils/pageNames';
import { authRoutes, publicRoutes } from './Utils/routes';

const AppRouter = () => {
  let isAuth = true;
  return (
    <>
      <CustomAppBar />
      <NavbarComponent />
      <div style={{ paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Switch>
          {isAuth && authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} exact />
          ))}

          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} exact />
          ))}
          <Redirect to={LOGIN_ROUTE} />
        </Switch>
      </div>
    </>
  );
};

export default AppRouter;