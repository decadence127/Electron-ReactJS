import React, { useEffect, useState } from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from '../configData.json'
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';
import { Box } from '@mui/system';
import UsersList from '../Components/UsersList/UsersList';



const UsersPage = () => {
  const [users, setUsers] = useState();
  const { loading, request } = useQueryHandler();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.RETRIVEVE_USERS) });
      setUsers(JSON.parse(response.executionResult).responseModel.userList)
      console.log('users page rerendered');
    })();

  }, [reload])



  return (
    <Box>
      {loading ? <LoadingComponent loading={loading} /> : <UsersList users={users} setReload={setReload} />}
    </Box>
  );
};

export default UsersPage;