import React from 'react';
import { Context } from '../renderer';
import { Box } from '@mui/system';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from "../configData.json"
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import UnitsList from '../Components/UnitsList/UnitsList';
import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';

const UserUnitsPage = () => {
  const [units, setUnits] = React.useState();
  const { loading, request } = useQueryHandler();
  const [reload, setReload] = React.useState(false);
  const { user } = React.useContext(Context);
  React.useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({ cartId: user.userData.cartId }, actionTypes.GET_UNITS) });
      setUnits(JSON.parse(response.executionResult).responseModel.unitList)
      console.log(JSON.parse(response.executionResult).responseModel);
    })();

  }, [reload])


  return (
    <Box>
      {loading ? <LoadingComponent loading={loading} /> : <UnitsList units={units} setReload={setReload} />}
    </Box>
  );
};

export default UserUnitsPage;