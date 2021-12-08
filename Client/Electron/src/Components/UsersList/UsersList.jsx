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
import { EnhancedTableHead, EnhancedTableToolbar } from '../EnhancedTableHead/EnhancedTableHead';
import { Checkbox } from '@mui/material';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const UsersList = ({ users, setReload }) => {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
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

  return (
    <TableContainer component={Paper} sx={{ margin: 4 }} size={dense ? 'small' : 'medium'}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        type="users"
        reload={setReload}
        name="Пользователи"
        selectedArray={selected} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTableHead
          type="users"
          numSelected={selected.length}
          reload={setReload}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={!users ? 0 : users.length}
        />
        <TableBody>
          {users && (rowsPerPage > 0
            ? stableSort(users, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((user, index) => {
            const isItemSelected = isSelected(user.email);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (<TableRow
              onClick={(event) => handleClick(event, user.email)}
              tabIndex={-1}
              selected={isItemSelected}
              aria-checked={isItemSelected}
              key={user.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
              <TableCell padding="none" component="th" id={labelId} scope="row">
                {user.Name}
              </TableCell>
              <TableCell align="right">{user.login ? user.login : "Отсутствует"}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.userRole === 3 ? "Администратор" : user.userRole === 2 ? "Оператор" : "Пользователь"}</TableCell>
              <TableCell align="right">{user.cartId}</TableCell>
              <TableCell align="right">{user.isBanned ? "Да" : "Нет"}</TableCell>
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
              count={!users ? 0 : users.length}
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

export default UsersList;