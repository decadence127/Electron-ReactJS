import React from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from '../configData.json'
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
const UnitsPage = () => {
  const { request } = useQueryHandler();
  const clickHandler = async () => {
    const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.RETRIVEVE_ALL_CATEGORIES) });
    const responseUnits = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.GET_ALL_UNITS) });
    console.log(JSON.parse(response.executionResult).responseModel.categoriesList);
    console.log(JSON.parse(responseUnits.executionResult).responseModel);
  }
  return (
    <div>
      <button onClick={clickHandler}>asdasd</button>
    </div>
  );
};

export default UnitsPage;