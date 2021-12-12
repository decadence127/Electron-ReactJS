import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import SearchBar from 'material-ui-search-bar'
import Paper from '@mui/material/Paper';
import TablePaginator from '../TablePaginator/TablePaginator';
import { EnhancedTableHead, EnhancedTableToolbar, getComparator, stableSort } from '../EnhancedTableHead/EnhancedTableHead';
import { Button, Checkbox, Chip } from '@mui/material';
import ElectronWindowsApi from '../../ElectronComponents/renderer_sided/ElectronWindowsApi';
import { useQueryHandler } from '../../Hooks/queryHandler.hook';
import ConfigData from '../../configData.json'
import { TransferModel } from '../../../transferModel/transferModel';
import { actionTypes } from '../../Utils/actionTypes';
const UnitsList = ({ units, error, success, setReload, newItemData, setNewItemData, changeHandler }) => {
  const windowApi = new ElectronWindowsApi();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('unitTitle');
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);




  const requestSearch = (searchedVal) => {
    const filteredRows = units.filter((row) => {
      return row.unitTitle.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setUsers(filteredRows);
  };

  const createReport = () => {
    windowApi.createReport(units)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = units.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - units.length) : 0;

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

  return (
    <TableContainer component={Paper} sx={{ margin: 4 }} size={dense ? 'small' : 'medium'}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        type="items"
        reload={setReload}
        name="Все вещи"
        changeHandler={changeHandler}
        newItemData={newItemData}
        success={success}
        error={error}
        setNewItemData={setNewItemData}
        selectedArray={selected} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTableHead
          type="items"
          numSelected={selected.length}
          reload={setReload}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={!units ? 0 : units.length}
        />
        <TableBody>
          {units && (rowsPerPage > 0
            ? stableSort(units, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : units
          ).map((unit, index) => {
            const isItemSelected = isSelected(unit.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (<TableRow
              onClick={(event) => handleClick(event, unit.id)}
              tabIndex={-1}
              selected={isItemSelected}
              aria-checked={isItemSelected}
              key={unit.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  key={unit.id}
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
              <TableCell padding="none" component="th" id={labelId} scope="row">
                {unit.unitTitle}
              </TableCell>
              <TableCell align="right">{unit.taxValue}</TableCell>
              <TableCell align="right">{unit.userEmail}</TableCell>
              <TableCell align="right">{unit.unitDesc}</TableCell>
              <TableCell align="right">{unit.categoryList.map((category) => category.category + " ")}</TableCell>
              <TableCell align="right">{unit.arrivalDate}</TableCell>
            </TableRow>)
          })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: (dense ? 33 : 53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination

              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={!units ? 0 : units.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginator}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>

  );
};

export default UnitsList;