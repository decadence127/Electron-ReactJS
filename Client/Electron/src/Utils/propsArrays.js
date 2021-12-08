import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  UNIT_ROUTE,
  USERS_ROUTE,
  USER_ROUTE,
} from "./pageNames";

export const usersHeadCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Имя",
  },
  {
    id: "login",
    numeric: true,
    disablePadding: false,
    label: "Логин",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "permissions",
    numeric: true,
    disablePadding: false,
    label: "Права доступа",
  },
  {
    id: "cardId",
    numeric: true,
    disablePadding: false,
    label: "Номер корзины",
  },
  {
    id: "isBanned",
    numeric: true,
    disablePadding: false,
    label: "Заблокирован",
  },
];
export const itemsHeadCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Название",
  },
  {
    id: "taxValue",
    numeric: true,
    disablePadding: false,
    label: "Стоимость с пошлниой",
  },
];

export const pages = [
  { title: "Калькулятор", route: HOME_ROUTE },
  { title: "Войти", route: LOGIN_ROUTE },
];
export const adminAuthPages = [
  { title: "Калькулятор", route: HOME_ROUTE },
  { title: "Список всех вещей", route: UNIT_ROUTE },
  { title: "Список всех пользователей", route: USERS_ROUTE },
];
export const operatorAuthPages = [
  { title: "Калькулятор", route: HOME_ROUTE },
  { title: "Список всех вещей", route: UNIT_ROUTE },
];
