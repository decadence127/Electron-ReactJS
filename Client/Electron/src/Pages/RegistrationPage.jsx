import React from 'react';
import { TransferModel } from '../../transferModel/transferModel';
import RegistrationComponent from '../Components/RegistrationComponent/RegistrationComponent';
import { actionTypes } from '../Utils/actionTypes';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from "../configData.json"
import LoadingComponent from '../Components/LoadingComponent/LoadingComponent';

const RegistrationPage = () => {
  const [credentials, setCredentials] = React.useState({});
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const { loading, request } = useQueryHandler();
  const clickHandler = async (e) => {

    const response = await request(ConfigData.queryLink,
      { ...new TransferModel({ login: credentials.login || null, password: credentials.password, name: credentials.name, email: credentials.email }, actionTypes.REGISTRATION_ACTION) });

    console.log(response);
    if (response.executionCode === 1) {
      setError(JSON.parse(response.executionResult).errorMessage)
    } else {
      setSuccess("Вы были зарегистрированы");
    }
  }

  return (
    <>
      {loading && <LoadingComponent loading={loading} />}
      <RegistrationComponent success={success} clickHandler={clickHandler} setError={setError} error={error} credentials={credentials} setCredentials={setCredentials} />
    </>
  );
};

export default RegistrationPage;