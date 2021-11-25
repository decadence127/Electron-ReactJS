import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REG_ROUTE, UNIT_ROUTE, USER_ROUTE } from '../Utils/pageNames';
import transferModel from "../../transferModel/transferModel"
import { actionTypes } from '../Utils/actionTypes';
const HomePage = () => {
  const clickHandler = (e) => {
    e.preventDefault();
  }
  return (
    <Box pt={4}>
      <Button>
        <Link to={LOGIN_ROUTE} replace>Login</Link>
      </Button>
      <Button>
        <Link to={REG_ROUTE} replace>Registration</Link>
      </Button>
      <Button>
        <Link to={UNIT_ROUTE} replace>Unit</Link>
      </Button>
      <Button>
        <Link to={USER_ROUTE} replace>User</Link>
      </Button>
    </Box>
  );
};

export default HomePage;