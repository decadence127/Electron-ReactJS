import { Typography } from '@mui/material';
import React from 'react';
import CustomAppBar from '../UI_Library/CustomAppBar';

const UnsuccessfulReconnection = () => {
  return (
    <div>
      <CustomAppBar />
      <Typography pt={4} textAlign="center">Couldnt connect to a server. Cant continue working</Typography>
    </div >
  );
};

export default UnsuccessfulReconnection;