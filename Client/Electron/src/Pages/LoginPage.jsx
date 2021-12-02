import React, { useEffect } from 'react';
import { TransferModel } from '../../transferModel/transferModel';
import LoginComponent from '../Components/LoginComponent/LoginComponent';
import { useIsMount } from '../Hooks/effectIsMount.hook';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import { actionTypes } from '../Utils/actionTypes';




const LoginPage = () => {
  const [login, setLogin] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const { loading, request } = useQueryHandler();

  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      (async () => {
        const response = await request('http://localhost:9119/login',
          { ...new TransferModel({ login: login, password: password }, actionTypes.LOGIN_ACTION) })
        console.log(response);
      })();
    }
    else console.log("first render");
  }, [login, password])


  return (
    <LoginComponent setLogin={setLogin} setPassword={setPassword} />
  );
};

export default LoginPage;