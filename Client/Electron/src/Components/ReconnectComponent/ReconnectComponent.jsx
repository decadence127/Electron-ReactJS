import React from 'react';
import classes from "./ReconnectComponent.module.css"
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
const ReconnectComponent = ({ attempts }) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.reconnectContainer}>
        <Typography variant="h2">Reconnecting</Typography>
        <Typography variant="h3"> {attempts} / 10 attempts </Typography>
        <CircularProgress />
      </div>
    </div>
  );
};

export default ReconnectComponent;