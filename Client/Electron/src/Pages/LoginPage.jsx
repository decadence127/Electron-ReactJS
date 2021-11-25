import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../Utils/pageNames';
import { Box, TextField } from "@mui/material"
const LoginPage = () => {
  return (
    <div>
      LoginPage
      <Box display="flex">
        <TextField />
        <TextField />
      </Box>
      <Link to={HOME_ROUTE} replace>Login</Link>
    </div>
  );
};

export default LoginPage;