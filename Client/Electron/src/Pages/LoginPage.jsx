import React, { useEffect } from 'react';
import { TransferModel } from '../../transferModel/transferModel';
import LoginComponent from '../Components/LoginComponent/LoginComponent';
import { useIsMount } from '../Hooks/effectIsMount.hook';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import { Context } from '../renderer';
import { actionTypes } from '../Utils/actionTypes';
import { observer } from 'mobx-react-lite'
import { HOME_ROUTE } from '../Utils/pageNames';
import { useHistory } from 'react-router';
import ConfigData from "../configData.json"

const LoginPage = observer(() => {
  const [login, setLogin] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const { loading, request } = useQueryHandler();
  const { user } = React.useContext(Context);
  const history = useHistory();
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {

      (async () => {
        let userModel;
        const response = await request(ConfigData.queryLink,
          { ...new TransferModel({ login: login, password: password }, actionTypes.LOGIN_ACTION) });
        console.log("response: ", response);

        if (response.executionCode === 1) {
          setError(JSON.parse(response.executionResult).errorMessage)
        } else {
          userModel = { ...JSON.parse(response.executionResult).responseModel, isAuth: true };

          user.setUserData(userModel);
          user.setIsAuth(true);

          console.log(user.userData);
          history.push(HOME_ROUTE);
        }

      })();
    }
    else console.log("first render");
  }, [login, password])


  return (
    <LoginComponent loading={loading} error={error} setLogin={setLogin} setPassword={setPassword} />
  );
});

export default LoginPage;