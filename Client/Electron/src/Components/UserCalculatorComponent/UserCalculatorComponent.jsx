import {
  TextField,
  Select,
  Box,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Alert,

} from '@mui/material';
import React from 'react';
import PaperContainer from '../PaperContainer/PaperContainer';
import { useQueryHandler } from '../../Hooks/queryHandler.hook';
import ConfigData from "../../configData.json";
import { TransferModel } from '../../../transferModel/transferModel';
import { actionTypes } from '../../Utils/actionTypes';
import CategoryChipList from '../CategoryChipList/CategoryChipList';

import CategoryList from '../CategoryList/CategoryList';

const UserCalculatorComponent = ({ selectedCategories, setSelectedCategories, clickAddHandler, unit, setUnit, tax, success, error, clickHandler, calcData, setCalcData, calcType, setCalcType }) => {
  const { loading, request } = useQueryHandler();
  const [chipData, setChipData] = React.useState([]);


  const handleChange = (e) => {
    setCalcType(e.target.value);
    setCalcData({});
    tax.set(null);
    setSelectedCategories(new Set());

  }
  const handleClick = async e => {
    await clickHandler();
    await clickAddHandler();
  }

  const addCategory = (value) => () => {
    setSelectedCategories(prev => new Set(prev.add(value)));
    console.log(value);
    console.log(selectedCategories);
  }

  React.useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.RETRIVEVE_ALL_CATEGORIES) });
      setChipData(JSON.parse(response.executionResult).responseModel.categoriesList);
    })()
  }, [])

  return (
    <PaperContainer widthProp={900} heightProp={450} displayProp="flex" elevation={4} paddingProp={4} justifyContent="space-evenly" alignItems="center" flexFlow="row wrap">
      <Box display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column" minWidth="300px" minHeight="400px">
        <Typography sx={{ padding: "20px 0px 20px 0px" }} variant="h5">Таможенный калькулятор</Typography>
        {tax.get() > 0 && <Typography>Стоимость растаможки: {tax.get()} € </Typography>}
        <Typography sx={{ padding: "20px 0px 20px 0px" }} fontStyle="italic" color="CaptionText" variant="caption">Курс ЦБ взят: 1€ ≈ 2.87 Br</Typography>
        {error && <Alert sx={{ mt: 3, pt: 0 }} severity='error'>{error}</Alert>}
        {success && <Alert sx={{ mt: 3, pt: 0 }} severity='success'>{success}</Alert>}
        <CategoryList chipData={chipData} addCategory={addCategory} />
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
          {calcType === "item" && (<>
            <TextField variant="filled" label="Название" name="unitTitle" onChange={e => setUnit({ ...unit, [e.target.name]: e.target.value })} />
            <TextField variant="filled" label="Описание" name="unitDesc" onChange={e => setUnit({ ...unit, [e.target.name]: e.target.value })} />
            <TextField type="number" variant="filled" label="Стоимость посылки (€)" name="unitCost" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />
            <TextField type="number" variant="filled" label="Вес посылки" name="unitWeight" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} /></>)}
          {calcType === 'auto' && (
            <>
              <TextField variant="filled" label="Название" name="unitTitle" onChange={e => setUnit({ ...unit, [e.target.name]: e.target.value })} />
              <TextField variant="filled" label="Описание" name="unitDesc" onChange={e => setUnit({ ...unit, [e.target.name]: e.target.value })} />
              <TextField type="number" variant="filled" label="Объем двигателя" name="engineCapacity" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />
              <TextField type="number" variant="filled" label="Год выпуска" name="carAge" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />
              <TextField type="number" variant="filled" label="Стоимость авто (€)" name="carCost" onChange={e => setCalcData({ ...calcData, [e.target.name]: e.target.value })} />

            </>
          )}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 2
        }}>
          <CategoryChipList selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} chipData={chipData} ></CategoryChipList>
          <Button sx={{ marginLeft: 3 }} variant="contained" color="info" onClick={handleClick}>Добавить</Button>
        </Box>
      </Box>
    </PaperContainer>
  );
};

export default UserCalculatorComponent;