import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REG_ROUTE, UNIT_ROUTE, USER_ROUTE } from '../Utils/pageNames';
import transferModel from "../../transferModel/transferModel"
import { actionTypes } from '../Utils/actionTypes';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
const HomePage = () => {
  const { request } = useQueryHandler();
  const clickHandler = async (e) => {
    e.preventDefault();
    const response = await request("http://localhost:9119/login", { ...new TransferModel({}, actionTypes.LOGIN_ACTION) })
  }
  return (
    <Box pt={4}>
      HomePage!)
      <Button onClick={async e => await clickHandler(e)}></Button>
    </Box>
  );
};

export default HomePage;