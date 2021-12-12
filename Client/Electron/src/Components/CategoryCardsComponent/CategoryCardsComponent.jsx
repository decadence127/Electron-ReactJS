import React, { useEffect } from 'react';
import { useQueryHandler } from '../../Hooks/queryHandler.hook';
import ConfigData from '../../configData.json'
import { TransferModel } from '../../../transferModel/transferModel';
import { actionTypes } from '../../Utils/actionTypes';
import { Card, Paper, Typography, Button } from '@mui/material';
import ChangeModal from '../ChangeModal/ChangeModal';
import CategoryModal from '../CategoryModal/CategoryModal';

const CategoryCardsComponent = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState({});
  const { loading, request } = useQueryHandler();
  const [openModal, setOpenModal] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const deleteClickHandler = (e) => {
    console.log(e.currentTarget.id);
    request(ConfigData.queryLink, { ... new TransferModel({ id: e.currentTarget.id }, actionTypes.DELETE_CATEGORY) }).then(setReload(!reload))
  }
  const clickHandler = async (e) => {
    const response = await request(ConfigData.queryLink, { ... new TransferModel({ ...category }, actionTypes.CREATE_CATEGORY) })
    setReload(!reload);
  }
  useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ... new TransferModel({}, actionTypes.RETRIVEVE_ALL_CATEGORIES) })
      setCategories(JSON.parse(response.executionResult).responseModel.categoriesList);

    })();
  }, [reload])
  useEffect(() => {
    console.log(categories);
  }, [categories])

  return (
    <Paper sx={{ height: '600px', display: 'flex', flexBasis: '400px' }}>
      {categories && categories.map((category, index) => (
        <Card key={index} sx={{ paddingLeft: 3, minWidth: 200, height: 150, margin: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <Typography>
            Категория: {category.category}
          </Typography>
          <Typography>
            Процент сборов: {category.taxPercentage}%
          </Typography>
          <Button id={category.id} onClick={deleteClickHandler}>Удалить</Button>
        </Card>
      ))}
      <Card sx={{ minWidth: 200, height: 150, margin: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={e => setOpenModal(true)}>добавить</Button>
      </Card>
      <CategoryModal category={category} setCategory={setCategory} setOpen={setOpenModal} open={openModal} clickHandler={clickHandler} />
    </Paper>
  );
};

export default CategoryCardsComponent;