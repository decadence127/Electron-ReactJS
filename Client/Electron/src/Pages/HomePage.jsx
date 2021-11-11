import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REG_ROUTE, UNIT_ROUTE, USER_ROUTE } from '../Utils/pageNames';

const HomePage = () => {
  return (
    <div>
      Homepage
      <Link to={LOGIN_ROUTE} replace>Login</Link>
      <Link to={REG_ROUTE} replace>Reg</Link>
      <Link to={USER_ROUTE} replace>Users</Link>
      <Link to={UNIT_ROUTE} replace >Units</Link>
    </div>
  );
};

export default HomePage;