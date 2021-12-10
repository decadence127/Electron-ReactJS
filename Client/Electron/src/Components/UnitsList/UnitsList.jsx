import React from 'react';

const UnitsList = ({ units, setReload }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [searched, setSearched] = useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);



  const requestSearch = (searchedVal) => {
    const filteredRows = units.filter((row) => {
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
      const newSelecteds = units.map((n) => n.Name);
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
        type="items"
        reload={setReload}
        name="Все вещи"
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
            const isItemSelected = isSelected(unit.email);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (<TableRow
              onClick={(event) => handleClick(event, units.id)}
              tabIndex={-1}
              selected={isItemSelected}
              aria-checked={isItemSelected}
              key={units.id}
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
                {unit.Name}
              </TableCell>
              <TableCell align="right">{unit.unitTitle}</TableCell>
              <TableCell align="right">{unit.email}</TableCell>
              <TableCell align="right">{unit.userRole === 3 ? "Администратор" : unit.userRole === 2 ? "Оператор" : "Пользователь"}</TableCell>
              <TableCell align="right">{unit.cartId}</TableCell>
              <TableCell align="right">{unit.isBanned ? "Да" : "Нет"}</TableCell>
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