import React from 'react';
import { Link } from 'react-router-dom'
import { REG_ROUTE } from '../../Utils/pageNames';
import { Box, TextField, Typography, Button, LinearProgress } from "@mui/material"
import PaperContainer from '../../Components/PaperContainer/PaperContainer';
import classes from './LoginComponent.module.css'
import sharedClasses from '../../sharedStyles.module.css'


const LoginComponent = ({ setLogin, setPassword, error, loading }) => {
  let loginInput = React.useRef();
  let passwordInput = React.useRef();

  const clickHandler = (e) => {
    e.preventDefault();
    setLogin(loginInput.current.value);
    setPassword(passwordInput.current.value);
  }


  return (
    <>
      {loading && <LinearProgress />}
      <PaperContainer paddingProp={4} widthProp={400} heightProp={450} displayProp={"flex"} elevation={4} flexFlow="column wrap" justifyContent="space-between" alignItems="center">
        <Box className={classes.loginBox}>
          <Typography fontWeight="600" textAlign="center" variant="h5">Войти</Typography>
          <TextField inputRef={loginInput} label="Логин или Email" variant="outlined" className={classes.textInput} placeholder="Логин или Email" />
          <TextField type="password" inputRef={passwordInput} label="Пароль" variant="outlined" className={classes.textInput} placeholder="Пароль" />
          {error && <Box className={sharedClasses.errorBox}>{error}</Box>}
          <Button variant="outlined" onClick={clickHandler}>Войти</Button>
          <Typography>Еще нет аккаунта? <Link to={REG_ROUTE} > Зарегистрируйтесь</Link></Typography>
        </Box>
      </PaperContainer>
    </>
  );
};

export default LoginComponent;