import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Tooltip, Avatar, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { HOME_ROUTE, LOGIN_ROUTE, UNIT_ROUTE, USERS_ROUTE } from '../../Utils/pageNames';
import classes from "./NavbarComponent.module.css"
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router';
import { Context } from '../../renderer';
import { observer } from 'mobx-react-lite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';


const pages = [{ title: 'Калькулятор', route: HOME_ROUTE }, { title: 'Войти', route: LOGIN_ROUTE }];



const NavbarComponent = observer(() => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const { user } = React.useContext(Context);
  const { colorMode } = React.useContext(Context);

  const authPages = user.userData.userRole === 3 ? [{ title: 'Калькулятор', route: HOME_ROUTE }, { title: 'Список ваших вещей', route: UNIT_ROUTE }, { title: 'Список всех пользователей', route: USERS_ROUTE }] : [{ title: 'Калькулятор', route: HOME_ROUTE }, { title: 'Список ваших вещей', route: UNIT_ROUTE }]


  const logoutHandler = () => {
    user.setUserData({});
    user.setIsAuth(false);
  }
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  }

  const openProfileHandler = () => {
    console.log("clicked");
  }
  const itemHandler = () => {
    console.log("clicked");
  }
  const settings = [
    { title: 'Профиль', handler: openProfileHandler },
    { title: 'Вещи', handler: itemHandler },
    { title: 'Выйти', handler: logoutHandler }];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleComponentChange = (e) => {
    console.log(e.currentTarget.value);
    history.push(e.currentTarget.value)
  }

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl" >
        <Toolbar disableGutters style={{ paddingTop: 32 }} >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 3, display: { xs: 'none', md: 'flex' } }}
          >
            Customs
          </Typography>
          <IconButton sx={{ mr: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user.isAuth ? authPages.map((page) => (
                <MenuItem MenuItem value={page.route} key={page.route} onClick={handleComponentChange} >
                  <Typography value={page.route} textAlign="center">{page.title}</Typography>
                </MenuItem>
              )) : (pages.map((page) => (
                <MenuItem MenuItem value={page.route} key={page.route} onClick={handleComponentChange} >
                  <Typography value={page.route} textAlign="center">{page.title}</Typography>
                </MenuItem>)
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Customs
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
            >
              {user.isAuth ? authPages.map((page, index) => (
                <Tab
                  value={index}
                  key={page.route}
                  label={page.title}
                  color="inherit"
                  component={Link}
                  to={page.route}

                />

              )) : pages.map((page, index) => (
                <Tab
                  color="inherit"
                  key={page.route}
                  value={index}
                  label={page.title}
                  component={Link}
                  to={page.route}

                />
              ))}
            </Tabs>
          </Box>

          {user.isAuth && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.userData.userLogin} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseNavMenu}>
                  <Typography onClick={setting.handler} textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}

        </Toolbar>
      </Container>
    </AppBar >
  );
});

export default NavbarComponent;
