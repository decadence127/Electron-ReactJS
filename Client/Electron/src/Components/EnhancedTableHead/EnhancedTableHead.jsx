import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import BlockIcon from '@mui/icons-material/Block';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { itemsHeadCells, usersHeadCells } from '../../Utils/propsArrays';
import { useQueryHandler } from '../../Hooks/queryHandler.hook';
import { TransferModel } from '../../../transferModel/transferModel';
import { actionTypes } from '../../Utils/actionTypes';
import ConfigData from '../../configData.json'

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
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


export const EnhancedTableHead = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all users',
            }}
          />
        </TableCell>
        {props.type === "users" ? usersHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )) : itemsHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export const EnhancedTableToolbar = ({ reload, ...props }) => {
  const { numSelected } = props;
  const { request } = useQueryHandler();
  const [error, setError] = React.useState(null);
  const banClickHandler = async (selectedArray) => {

    try {
      props.type === "users"
        ? await request(ConfigData.queryLink, new TransferModel({ emails: selectedArray }, actionTypes.BAN_USERS))
        : await request(ConfigData.queryLink, new TransferModel({ ids: selectedArray }, actionTypes.DELETE_ITEMS));
      reload()
    } catch (e) {
      setError(e);
    }
  }
  const unbanClickHandler = async (selectedArray) => {
    try {
      await request(ConfigData.queryLink, new TransferModel({ emails: selectedArray }, actionTypes.UNBAN_USERS))
      reload(prev => !prev)
    } catch (e) {
      setError(e)
    }

  }
  const promoteToAdministatorHanlder = async (selectedArray) => {
    try {
      const objArray = selectedArray.map((item) => ({ userMail: item, promotionValue: 3 }))
      await request(ConfigData.queryLink, new TransferModel({ users: objArray }, actionTypes.PROMOTION_ACTION))
      reload(prev => !prev)
    } catch (e) {
      setError(e)
    }
  }
  const promoteToOperatorHandler = async (selectedArray) => {
    try {
      const objArray = selectedArray.map((item) => ({ userMail: item, promotionValue: 2 }))
      await request(ConfigData.queryLink, new TransferModel({ users: objArray }, actionTypes.PROMOTION_ACTION))
      reload(prev => !prev)
    } catch (e) {
      setError(e)
    }
  }
  const demoteToUserHandler = async (selectedArray) => {
    try {
      const objArray = selectedArray.map((item) => ({ userMail: item, promotionValue: 1 }))
      await request(ConfigData.queryLink, new TransferModel({ users: objArray }, actionTypes.PROMOTION_ACTION))
      reload(prev => !prev)
    } catch (e) {
      setError(e)
    }

  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} выбрано
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.type === 'users' ? 'Пользователи' : 'Все вещи'}
        </Typography>
      )}

      {props.type === 'users' && numSelected > 0 ? (
        <>
          <Tooltip title="Заблокировать">
            <IconButton onClick={async e => { await banClickHandler(props.selectedArray) }}>
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Разблокировать">
            <IconButton onClick={async e => { await unbanClickHandler(props.selectedArray) }}>
              <NewReleasesIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Выдать права администратора">
            <IconButton onClick={async e => { await promoteToAdministatorHanlder(props.selectedArray) }}>
              <AutoFixHighIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Выдать права оператора">
            <IconButton onClick={async e => { await promoteToOperatorHandler(props.selectedArray) }}>
              <AutoFixNormalIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Выдать права пользователя">
            <IconButton onClick={async e => { await demoteToUserHandler(props.selectedArray) }}>
              <AutoFixOffIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      {props.type === 'items' && numSelected > 0 && (
        <>
          <Tooltip title="Удалить">
            <IconButton onClick={async e => { await banClickHandler(props.selectedArray) }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

    </Toolbar>
  );
};