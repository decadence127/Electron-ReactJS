import React, { useEffect } from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import { LinearProgress } from '@mui/material';
import CalculatorComponent from '../Components/CalculatorComponent/CalculatorComponent';
import ConfigData from "../configData.json";
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import { observer } from 'mobx-react-lite';
import { Context } from '../renderer';
import UserCalculatorComponent from '../Components/UserCalculatorComponent/UserCalculatorComponent';

const HomePage = observer(() => {
  const { loading, request } = useQueryHandler();
  const [calcData, setCalcData] = React.useState({});
  const [calcType, setCalcType] = React.useState("item");
  const [unit, setUnit] = React.useState();
  const { user } = React.useContext(Context);
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

      setTax(JSON.parse(response.executionResult).responseModel.taxValue);
    } catch (e) {
      setError(e)
    }
  }


  useEffect(() => {
    (async () => {
      if (user.isAuth) {
        const response = await request(ConfigData.queryLink, { ...new TransferModel({ ...unit, ['taxValue']: tax, ['cartId']: user.userData.cartId }, actionTypes.ADD_UNIT) })
        console.log(response);
      }
    })()
  }, [tax, user])

  return (
    <>
      {loading && <LinearProgress />}
      {user.isAuth ? <UserCalculatorComponent unit={unit} setUnit={setUnit} setError={setError} setTax={setTax} tax={tax} calcType={calcType} setCalcType={typeChanger} calcData={calcData} setCalcData={setCalcData} clickHandler={clickHandler} error={error} /> : <CalculatorComponent setTax={setTax} tax={tax} calcType={calcType} setCalcType={typeChanger} calcData={calcData} setCalcData={setCalcData} clickHandler={clickHandler} error={error} />}
    </>
  );
});

export default HomePage;