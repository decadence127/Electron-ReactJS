import React, { useEffect } from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import { LinearProgress } from '@mui/material';
import CalculatorComponent from '../Components/CalculatorComponent/CalculatorComponent';
import ConfigData from "../configData.json";
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
const HomePage = () => {
  const { loading, request } = useQueryHandler();
  const [calcData, setCalcData] = React.useState({});
  const [carCalcData, setCarCalcData] = React.useState({});
  const [calcType, setCalcType] = React.useState("item");
  const [carType, setCarType] = React.useState("phys");
  const typeChanger = (value) => {
    setCalcType(value);
  }
  const [tax, setTax] = React.useState();
  const [error, setError] = React.useState();
  const clickHandler = async (e) => {
    try {
      const response = calcType === "item" ?
        await request(ConfigData.queryLink, { ...new TransferModel({ ...calcData }, actionTypes.CALC_GOODS_ACTION) }) :
        await request(ConfigData.queryLink, { ...new TransferModel({ ...calcData }, actionTypes.CALC_AUTO_ACTION) })

      console.log(JSON.parse(response.executionResult).responseModel.taxValue);
      setTax(JSON.parse(response.executionResult).responseModel.taxValue);
    } catch (e) {
      setError(e)
    }
  }

  return (
    <>
      {loading && <LinearProgress />}
      <CalculatorComponent setTax={setTax} tax={tax} calcType={calcType} setCalcType={typeChanger} calcData={calcData} setCalcData={setCalcData} clickHandler={clickHandler} error={error} />
    </>
  );
};

export default HomePage;