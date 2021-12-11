import React from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from '../configData.json'
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import UnitsList from '../Components/UnitsList/UnitsList';
import { Box } from '@mui/system';
import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';
const UnitsPage = () => {
  const [units, setUnits] = React.useState();
  const { loading, request } = useQueryHandler();
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.GET_ALL_UNITS) });
      setUnits(JSON.parse(response.executionResult).responseModel.unitList)
      console.log(JSON.parse(response.executionResult).responseModel.unitList);
      console.log('users page rerendered');
    })();

  }, [reload])


  return (
    <Box>
      {loading ? <LoadingComponent loading={loading} /> : <UnitsList units={units} setReload={setReload} />}
    </Box>

  );
};

export default UnitsPage;