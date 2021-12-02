import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../Utils/pageNames';
import { Box, TextField, Typography, Button } from "@mui/material"
import PaperContainer from '../../Components/PaperContainer/PaperContainer';
import classes from './LoginComponent.module.css'


const LoginComponent = ({ setLogin, setPassword }) => {
  let loginInput = React.useRef();
  let passwordInput = React.useRef();

  const clickHandler = (e) => {
    e.preventDefault();
    setLogin(loginInput.current.value);
    setPassword(passwordInput.current.value);
  }


  return (
    <PaperContainer paddingProp={4} widthProp={400} heightProp={450} displayProp={"flex"} elevation={4}>
      <Box className={classes.loginBox}>
        <Typography fontWeight="600" textAlign="center" variant="h5">Войти</Typography>
        <TextField inputRef={loginInput} label="Email" variant="outlined" className={classes.textInput} placeholder="Email" />
        <TextField inputRef={passwordInput} label="Пароль" variant="outlined" className={classes.textInput} placeholder="Пароль" />
        <Button variant="outlined" onClick={clickHandler}>Войти</Button>
        <Typography>Еще нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link></Typography>
      </Box>
    </PaperContainer>
  );
};

export default LoginComponent;