import React, { useEffect } from 'react';
import { Context } from '../renderer';
import { Box } from '@mui/system';
import { Avatar, Button, TextField, Typography, Alert } from '@mui/material';
import PaperContainer from '../Components/PaperContainer/PaperContainer';
import { toJS } from 'mobx';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from "../configData.json"
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import sharedClasses from '../sharedStyles.module.css'
const UserPage = () => {
  const { user } = React.useContext(Context);
  const [change, setChange] = React.useState(false);
  const [newData, setNewData] = React.useState({});
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();
  const { loading, request } = useQueryHandler();
  const handleSave = async (e) => {
    try {
      setSuccess(null);
      setError(null);
      const response = await request(ConfigData.queryLink, { ... new TransferModel({ ...newData, ['id']: user.userData.userId }, actionTypes.EDIT_USER) })
      if (response.executionCode === 1) {
        setError(JSON.parse(response.executionResult).errorMessage)
        return;
      }
      const userModel = { ...JSON.parse(response.executionResult).responseModel, isAuth: true };
      console.log(userModel)
      user.setUserData(userModel);
      setSuccess("Данные были изменены");
    } catch (e) {
      setError(e)
    }
  }
  const clickHandler = (e) => {
    setSuccess(null);
    setError(null);
    setChange(prev => !prev);
  }
  useEffect(() => { }, [user])

  return (
    <PaperContainer paddingProp={4} widthProp={500} heightProp={450} displayProp={"flex"} elevation={4} flexFlow="column wrap" justifyContent="flex-start" alignItems="center">
      <Box display="flex" justifyContent="center" alignItems="center" minWidth="340px" pb={3}>
        <Typography textAlign="center" variant="h6">Ваш профиль</Typography>
      </Box>
      <Box display="flex" flexFlow="row wrap" justifyContent="space-between">
        <Box id="icon-box" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" sx={{ padding: 2, '& *': { marginBottom: 2 } }}>
          <Avatar sx={{ width: 56, height: 56 }} alt={user.userData.userLogin} src="/static/images/avatar/2.jpg" />

          <Typography>
            {user.userData.userRole === 3 ? "Администратор" : user.userData.userRole === 2 ? "Оператор" : "Пользователь"}
          </Typography>
        </Box>
        <Box id="info-box" display="flex" flexDirection="column" alignItems="flex-start" sx={{ paddingTop: 2, width: "210px", '& *': { marginBottom: 2 } }}>
          <Typography>
            Имя: {user.userData.userName}
          </Typography>
          <Typography>
            Логин: {user.userData.userLogin || "Отсутствует"}
          </Typography>
          <Button sx={{ marginBottom: 2 }} variant="outlined" onClick={clickHandler}>
            Изменить
          </Button>
          {change && <>
            <hr style={{ width: '200px' }} />
            <TextField name="userName" variant="outlined" label="Имя" onChange={e => setNewData({ ...newData, [e.target.name]: e.target.value })} />
            <TextField name="userLogin" variant="outlined" label="Логин" onChange={e => setNewData({ ...newData, [e.target.name]: e.target.value })} />
            <TextField name="userPassword" variant="outlined" label="Пароль" onChange={e => setNewData({ ...newData, [e.target.name]: e.target.value })} />
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Button variant="outlined" onClick={handleSave}>Сохранить</Button>
          </>}
        </Box>
      </Box>
    </PaperContainer>
  );
};

export default UserPage;