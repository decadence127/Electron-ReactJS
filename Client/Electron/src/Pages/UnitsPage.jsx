import React from 'react';
import React, { useEffect } from 'react';
import { Context } from '../renderer';
import { Box } from '@mui/system';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import PaperContainer from '../Components/PaperContainer/PaperContainer';
import { toJS } from 'mobx';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from "../configData.json"
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import sharedClasses from '../sharedStyles.module.css'

const UnitsPage = () => {
  const [users, setUsers] = useState();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const { loading, request } = useQueryHandler();
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);
  const requestSearch = (searchedVal) => {
    const filteredRows = users.filter((row) => {
      return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setUsers(filteredRows);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.Name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const handleChangeDense = (event) => {
    console.log(event.target);
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const clickHandler = async () => {
    const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.RETRIVEVE_ALL_CATEGORIES) });
    console.log(response);
  }
  useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.GET_ALL_UNITS) });
      setUsers(JSON.parse(response.executionResult).responseModel.userList)
    })();

  }, [])

  return (
    <div>
      <button onClick={clickHandler}>asdasd</button>
    </div>
  );
};

export default UnitsPage;