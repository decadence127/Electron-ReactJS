import React from 'react';
import { Alert, Button, Paper, Typography } from '@mui/material';
import { useQueryHandler } from '../../Hooks/queryHandler.hook';
import { useEffect } from 'react';
import ConfigData from '../../configData.json'
import { TransferModel } from '../../../transferModel/transferModel';
import { actionTypes } from '../../Utils/actionTypes';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
  PieSeries,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation, EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { Box } from '@mui/system';
import ElectronWindowsApi from '../../ElectronComponents/renderer_sided/ElectronWindowsApi';

const StatsChart = () => {
  const [data, setData] = React.useState([]);
  const { loading, request } = useQueryHandler();
  const [categories, setCategories] = React.useState();
  const totalValue = data.reduce((a, b) => a + b.taxValue, 0);
  const windowApi = new ElectronWindowsApi();
  const [success, setSuccess] = React.useState(null);
  const reportHandler = () => {
    windowApi.createReport({ allData: { ...data }, categories: { ...categories }, totalValue: totalValue })
    setSuccess("Отчет был составлен");
  }


  useEffect(() => {
    (async () => {
      setSuccess(null)
      const response = await request(ConfigData.queryLink, { ... new TransferModel({}, actionTypes.GET_ALL_UNITS) })
      setData(JSON.parse(response.executionResult).responseModel.unitList);

    })()
  }, [])
  useEffect(() => {
    setSuccess(null)
    console.log(data);
    const arr = data.map((value) => value.categoryList);
    let idArray = arr.reduce((a, b) => a.concat(b), []).map(value => { return { id: value.id, category: value.category } })
    let arrmeet = [];
    let result = {};
    idArray.forEach(function (a) {
      result = { ["meets"]: a.id + 1 || 1, ["category"]: a.category }
      arrmeet.push(result)
    });
    let armeet = [...new Map(arrmeet.map(v => [JSON.stringify([v.category]), v])).values()]
    setCategories(armeet)
    console.log(armeet);
  }, [data])

  return (
    <Paper sx={{ minWidth: '1000px', display: 'flex' }} >
      {categories && (
        <Paper sx={{ minWidth: '500px' }}>
          <Chart
            data={categories}
          >
            <PieSeries

              valueField="meets"
              argumentField="category"
            />
            <Title text="Категории" />
            <Legend />
            <Animation />
            <EventTracker />
            <HoverState />
            <Tooltip />

          </Chart>
        </Paper>
      )}
      {data && (<Paper sx={{ minWidth: '500px' }}>
        <Chart
          data={data}
        >
          <PieSeries
            valueField="taxValue"
            argumentField="unitTitle"
          />
          <Title text="Размер сборов(€)" />
          <Legend />
          <Animation />
          <EventTracker />
          <HoverState />
          <Tooltip />

        </Chart>
        {data &&
          <Box display="flex" flexDirection="column" minHeight={120} maxWidth={300} mt={4} ml={4}>
            <Typography>Общая стоимость сборов: € {totalValue}</Typography>
            <Button sx={{ mb: 2 }} onClick={reportHandler} variant="contained">Составить отчет</Button>
            {success && <Alert severity='success'>{success}</Alert>}
          </Box>}
      </Paper>)}
    </Paper>
  );
};

export default StatsChart;