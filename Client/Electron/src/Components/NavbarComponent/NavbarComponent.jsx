import { Button, Grid, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Tooltip, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HOME_ROUTE, LOGIN_ROUTE, REG_ROUTE, UNIT_ROUTE, USER_ROUTE } from '../../Utils/pageNames';
import classes from "./NavbarComponent.module.css"
import { useHistory } from 'react-router';

const pages = [{ title: 'Калькулятор', route: '/' }, { title: 'Войти', route: "/login" }];
const settings = ['Профиль', 'Вещи', 'Выйти'];

const NavbarComponent = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const [auth, setAuth] = React.useState(false);

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
            sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
          >
            Customs
          </Typography>

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
              {pages.map((page) => (
                <MenuItem MenuItem value={page.route} key={page.route} onClick={handleComponentChange} >
                  <Typography value={page.route} textAlign="center">{page.title}</Typography>
                </MenuItem>
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
            {pages.map((page) => (
              <Button
                key={page.route}
                value={page.route}
                onClick={handleComponentChange}
                sx={{ my: 2, color: 'navy', display: 'block' }}

              >
                {page.title}
              </Button>
            ))}
          </Box>

          {auth && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="No Image" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default NavbarComponent;
