import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus, selectIsAuthenticated } from '../store/slices/authSlice';
import { Grid2, Paper, AppBar, Tabs, Tab, TextField, InputAdornment, Box, Typography, Button, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//import SortableTree from 'react-sortable-tree';
//import 'react-sortable-tree/style.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import Navigator from './Navigator';
import { Header } from '../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
//import { Dashboard } from '../components/Dashboard';
import { LeftMenu } from '../components/LeftMenu';
import { Content } from '../components/Content';

function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Inventory Accounting CRM
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    typography: {
      fontSize: 13,
      h5: {
        fontWeight: 500,
        fontSize: 24 /* 26 */,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });
  theme = {
    ...theme,
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#081627',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            boxShadow: 'none',
            '&:active': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            marginLeft: theme.spacing(1),
          },
          indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            margin: '0 16px',
            minWidth: 0,
            padding: 0,
            [theme.breakpoints.up('md')]: {
              padding: 0,
              minWidth: 0,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1),
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 4,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(255,255,255,0.15)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#4fc3f7',
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: 14,
            fontWeight: theme.typography.fontWeightMedium,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: 'inherit',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
            '& svg': {
              fontSize: 20,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: 32,
            height: 32,
          },
        },
      },
    },
  };
const drawerWidth = 256;

const MainPage = () => {
  const dispatch = useDispatch();

  //селекторы
  const isAuthenticated = useSelector(selectIsAuthenticated);  

  useEffect(() => {
        dispatch(checkAuthStatus());
  }, [dispatch]);
  //
  return (
    <>
    {console.log(isAuthenticated)}
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
        <CssBaseline />        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header /*onDrawerToggle={handleDrawerToggle}*/ />
          <Box component="main" sx={{ flex: 1, py: 2, px: 2, bgcolor: '#eaeff1' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',     
                gap: 2,                   
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 1,          
                boxShadow: 1,
                height: '100%', /* 70vh */
                overflow: 'hidden'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',     
                gap: 2,                   
                padding: 0,
                paddingBottom: 2,  
                paddingRight: 0,             
                backgroundColor: 'background.paper',
                borderRadius: 1,          
                boxShadow: 0,
                width: '20%',
                height: '100%'
              }}>
                {<LeftMenu />}
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',     
                gap: 2,                   
                padding: 0,
                paddingBottom: 2,  
                paddingRight: 0,             
                backgroundColor: 'background.paper',
                borderRadius: 1,          
                boxShadow: 0,
                width: '80%',
                height: '100%'
              }}>
                {<Content />}
              </Box>
            </Box>
          </Box>
          <Box component="footer" sx={{ p: 1, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>

    {/*<Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',     
        gap: 2,                   
        padding: 2,
        backgroundColor: 'background.paper',
        borderRadius: 1,          
        boxShadow: 1,
        height: '100%',
        overflow: 'hidden'
    }}>
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',     
        gap: 2,                   
        padding: 0,
        paddingBottom: 2,  
        paddingRight: 0,             
        backgroundColor: 'background.paper',
        borderRadius: 1,          
        boxShadow: 0,
        width: '20%',
        height: '100%'
        }}>
            {<LeftMenu />}
        </Box>
        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',     
        gap: 2,                   
        padding: 0,
        paddingBottom: 2,  
        paddingRight: 0,             
        backgroundColor: 'background.paper',
        borderRadius: 1,          
        boxShadow: 0,
        width: '80%',
        height: '100%'
        }}>
        {<Content />}
        </Box>
    </Box>*/}
    </>
  );
};

export {MainPage};