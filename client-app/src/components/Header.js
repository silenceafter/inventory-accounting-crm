import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Button, Grid, IconButton, Link, Toolbar, Tooltip, Typography } from '@mui/material';
import { HeaderSearch } from './HeaderSearch';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function GetCurrentDateTime() {
  const currentDate = new Date();

  // Массив для перевода месяцев на русский язык
  const monthNames = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  //
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  return `${day} ${monthNames[monthIndex]} ${year} года, ${hours}:${minutes}`;
}

function Header(props) {
  const { onDrawerToggle } = props;
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(GetCurrentDateTime());
  }, []);
  //
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            <Grid item>
              <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle} edge="start">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link href="/" variant="body2" sx={{ textDecoration: 'none', color: lightColor }}>
                {currentDate}
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" color="primary" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
          <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Складской учет CRM
              </Typography>
            </Grid>
            <Grid item>
              <Button sx={{ borderColor: lightColor }} variant="outlined" color="inherit" size="small">
                Настройки
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export {Header};