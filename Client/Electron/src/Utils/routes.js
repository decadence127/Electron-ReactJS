import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REG_ROUTE,
  USER_ROUTE,
  UNIT_ROUTE,
  USERS_ROUTE,
  UNITS_ROUTE,
} from "./pageNames";
import HomePage from "../Pages/HomePage.jsx";
import LoginPage from "../Pages/LoginPage.jsx";
import RegistrationPage from "../Pages/RegistrationPage.jsx";
import UnitPage from "../Pages/UnitPage.jsx";
import UserPage from "../Pages/UserPage.jsx";
import UsersPage from "../Pages/UsersPage";
import UnitsPage from "../Pages/UnitPage.jsx";

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REG_ROUTE,
    Component: RegistrationPage,
  },
];
export const authRoutes = [
  {
    path: USER_ROUTE,
    Component: UserPage,
  },
  {
    path: UNIT_ROUTE,
    Component: UnitPage,
  },
  {
    path: USERS_ROUTE,
    Component: UsersPage,
  },
  {
    path: UNITS_ROUTE,
    Component: UnitsPage,
  },
];
