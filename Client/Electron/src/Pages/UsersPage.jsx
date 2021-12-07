import React, { useEffect, useState } from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from '../configData.json'
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
const UsersPage = () => {
  const [users, setUsers] = useState();
  const { loading, request } = useQueryHandler();
  useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.RETRIVEVE_USERS) });
      setUsers(JSON.parse(response.executionResult).responseModel)
      console.log(JSON.parse(response.executionResult).responseModel);
    })();

  }, [])


  return (
    <div>

    </div>
  );
};

export default UsersPage;