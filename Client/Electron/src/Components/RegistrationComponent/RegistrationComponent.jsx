import React from 'react';
import { StepLabel, Stepper, Step, LinearProgress, Alert } from '@mui/material';
import { Box, TextField, Typography, Button } from "@mui/material"
import PaperContainer from '../../Components/PaperContainer/PaperContainer';
import classes from './RegistrationComponent.module.css';
import sharedClasses from '../../sharedStyles.module.css'
import { useHistory } from 'react-router';
import { LOGIN_ROUTE } from '../../Utils/pageNames';

const getSteps = () => {
  return ["Данные для входа", "Доп. информация"]
}

const RegistrationComponent = ({ loading, success, setError, error, clickHandler, credentials, setCredentials }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();
  const history = useHistory();

  const handleNext = (e) => {
    if (!credentials.hasOwnProperty("email") || !credentials.hasOwnProperty("password")) {
      setError("Заполните пустые поля!");
    }
    else {
      setError(null);
      setActiveStep(prev => prev + 1);
    }
  }
  const handleBack = () => {
    setError(null);
    setActiveStep(prev => prev - 1);
  }
  const returnToLogin = () => {
    history.push(LOGIN_ROUTE)
  }
  const handleClick = async (e) => {
    if (!credentials.hasOwnProperty("name")) {
      setError("Заполните пустые поля!")
      return;
    }
    setError(null);
    try {
      await clickHandler();
      console.log(credentials);
    } catch (e) {
      setError(e.message || e);
    }
  }


  return (
    <>
      {activeStep === 0 && (<Box className={classes.outerRegBox}>
        <Stepper activeStep={activeStep} alternativeLabel >{steps.map((label, index) => {
          return (<Step key={index}><StepLabel>{label}</StepLabel></Step>)
        })}</Stepper>

        <PaperContainer paddingProp={4} widthProp={400} maxWidth={400} heightProp={450} displayProp={"flex"} elevation={4}>
          <Box className={classes.regBox}>
            <Typography fontWeight="600" textAlign="center" variant="h5" >Регистрация</Typography>
            <TextField required onChange={e => setCredentials({ ...credentials, [e.target.name]: e.target.value })} name="email" label="Email" variant="outlined" className={classes.textInput} placeholder="Email" />
            <TextField type="password" required onChange={e => setCredentials({ ...credentials, [e.target.name]: e.target.value })} name="password" label="Пароль" variant="outlined" className={classes.textInput} placeholder="Пароль" />
            {error && <Alert severity="error">{error}</Alert>}
            <Box minWidth="250px" display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={returnToLogin}>Вернуться</Button>
              <Button variant="contained" color="info" onClick={handleNext}>Далее</Button>
            </Box>
            <Typography fontStyle="italic" textAlign="center" variant="caption">* - необходимо</Typography>
          </Box>
        </PaperContainer>
      </Box>)}

      {activeStep === 1 && (<Box className={classes.outerRegBox}>
        <Stepper activeStep={activeStep} alternativeLabel >{steps.map((label, index) => {
          return (<Step key={index}><StepLabel>{label}</StepLabel></Step>)
        })}</Stepper>

        <PaperContainer paddingProp={4} widthProp={400} heightProp={450} displayProp={"flex"} elevation={4} >
          <Box className={classes.regBox}>
            <Typography fontWeight="600" textAlign="center" variant="h5">Регистрация</Typography>
            <TextField onChange={e => setCredentials({ ...credentials, [e.target.name]: e.target.value })} name="login" label="Логин" variant="outlined" className={classes.textInput} placeholder="Логин" />
            <TextField required onChange={e => setCredentials({ ...credentials, [e.target.name]: e.target.value })} name="name" label="Имя" variant="outlined" className={classes.textInput} placeholder="Имя" />
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Box id="boxContainer" minWidth="400px" display="flex" flexDirection="row" justifyContent="space-evenly">
              <Button variant="contained" color="info" onClick={handleBack}>Вернуться</Button>
              <Button variant="contained" color="success" onClick={handleClick}>Завершить</Button>
            </Box>
            <Typography fontStyle="italic" textAlign="center" variant="caption">* - необходимо</Typography>
          </Box>
        </PaperContainer>
      </Box>)}
    </>
  );
};

export default RegistrationComponent;