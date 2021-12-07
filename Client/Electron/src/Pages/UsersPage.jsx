import React, { useEffect, useState } from 'react';
import { useQueryHandler } from '../Hooks/queryHandler.hook';
import ConfigData from '../configData.json'
import { TransferModel } from '../../transferModel/transferModel';
import { actionTypes } from '../Utils/actionTypes';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UsersPage = () => {
  const [users, setUsers] = useState();
  const { loading, request } = useQueryHandler();
  useEffect(() => {
    (async () => {
      const response = await request(ConfigData.queryLink, { ...new TransferModel({}, actionTypes.RETRIVEVE_USERS) });
      setUsers(JSON.parse(response.executionResult).responseModel.userList, () => {
        console.log(users);
      })
    })();

  }, [])


  return (
    <TableContainer component={Paper} sx={{ margin: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell align="right">Логин</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Права доступа</TableCell>
            <TableCell align="right">Номер корзины</TableCell>
            <TableCell align="right">Заблокирован</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <TableRow
              key={user.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.Name}
              </TableCell>
              <TableCell align="right">{user.login ? user.login : "Отсутствует"}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.userRole === 3 ? "Администратор" : user.userRole === 2 ? "Оператор" : "Пользователь"}</TableCell>
              <TableCell align="right">{user.cartId}</TableCell>
              <TableCell align="right">{user.isBanned ? "Да" : "Нет"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersPage;