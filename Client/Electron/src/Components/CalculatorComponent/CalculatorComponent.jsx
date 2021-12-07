import { TextField, Select, Box, MenuItem, Button, Typography, FormControl, InputLabel } from '@mui/material';
import React from 'react';
import PaperContainer from '../PaperContainer/PaperContainer';



const CalculatorComponent = ({ setTax, tax, error, clickHandler, calcData, setCalcData, calcType, setCalcType }) => {


  const handleChange = (e) => {
    setCalcType(e.target.value);
    setCalcData({});
    setTax(null);
  }
  return (
    <PaperContainer widthProp={800} heightProp={450} displayProp="flex" elevation={4} paddingProp={4} justifyContent="flex-start" alignItems="center" flexFlow="row wrap">
      <Box display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column" minWidth="300px" minHeight="400px" sx={{
        '& * ': {
          paddingTop: "48px"
        }
      }}>
        <Typography variant="h5">Таможенный калькулятор</Typography>
        {tax && <Typography>Цена товара с пошлиной: {tax} € </Typography>}
        <Typography fontStyle="italic" color="CaptionText" variant="caption">Курс ЦБ взят: 1€ ≈ 2.87 Br</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box id="main-calc-field" ml={4} display="flex" sx={
          {
            minWidth: '385px',
            flexDirection: 'column',
            justifyContent: "space-evenly",
            '& *': {
              margin: 2
            }
          }
        }>
          <FormControl variant="filled" style={{ width: "355px" }} >
            <InputLabel id="demo-simple-select-helper-label">Тип</InputLabel>
            <Select fullWidth value={calcType} onChange={handleChange}>
              <MenuItem value={'item'} sx={{ minWidth: "275px" }}>Расчет пошлины на товар/посылку</MenuItem>
              <MenuItem value={'auto'} sx={{ minWidth: "275px" }}>Расчет пошлины на автомобиль</MenuItem>
            </Select>
          </FormControl>
          {calcType === "item" && (<><TextField variant="filled" label="Стоимость посылки (€)" name="unitCost" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />
            <TextField variant="filled" label="Вес посылки" name="unitWeight" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} /></>)}
          {calcType === 'auto' && (
            <>

              <TextField variant="filled" label="Объем двигателя" name="engineCapacity" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />
              <TextField variant="filled" label="Год выпуска" name="carAge" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />
              <TextField variant="filled" label="Стоимость авто (€)" name="carCost" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />

            </>
          )}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2
        }}>
          <Button variant="contained" color="info" onClick={clickHandler}>Рассчитать</Button>
        </Box>
      </Box>
    </PaperContainer>
  );
};

export default CalculatorComponent;