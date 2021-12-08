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
import useStateSync from '../Hooks/useStateSync.hook';

const HomePage = observer(() => {
  const { loading, request } = useQueryHandler();
  const [calcData, setCalcData] = React.useState({});
  const [calcType, setCalcType] = React.useState("item");
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [unit, setUnit] = React.useState();
  const { user } = React.useContext(Context);

  const typeChanger = (value) => {
    setCalcType(value);
  }
  const tax = useStateSync(0);
  const clickHandler = async (e) => {
    try {
      const response = calcType === "item" ?
        await request(ConfigData.queryLink, { ...new TransferModel({ ...calcData }, actionTypes.CALC_GOODS_ACTION) }) :
        await request(ConfigData.queryLink, { ...new TransferModel({ ...calcData }, actionTypes.CALC_AUTO_ACTION) })
      if (response.executionCode === 1) {
        setError(JSON.parse(response.executionResult).errorMessage)
        return;
      }
      tax.set(JSON.parse(response.executionResult).responseModel.taxValue);

    } catch (e) {
      setError(e)
    }
  }

  const clickUserAddHandler = async (e) => {
    if (user.isAuth && tax.get()) {
      setSuccess(null);
      setError(null);
      const response = await request(ConfigData.queryLink, { ...new TransferModel({ ...unit, ['taxValue']: tax.get(), ['cartId']: user.userData.cartId }, actionTypes.ADD_UNIT) })
      if (response.executionCode === 1) {
        setError(JSON.parse(response.executionResult).errorMessage)
        return;
      }
      setSuccess("Результат был добавлен!")
    }
  }
  return (
    <>
      {loading && <LinearProgress />}
      {user.isAuth ? <UserCalculatorComponent clickAddHandler={clickUserAddHandler} success={success} unit={unit} setUnit={setUnit} tax={tax} calcType={calcType} setCalcType={typeChanger} calcData={calcData} setCalcData={setCalcData} clickHandler={clickHandler} error={error} /> : <CalculatorComponent tax={tax} calcType={calcType} setCalcType={typeChanger} calcData={calcData} setCalcData={setCalcData} clickHandler={clickHandler} error={error} />}
    </>
  );
});

export default HomePage;