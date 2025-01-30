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
import { Header } from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';
//import { Dashboard } from '../components/Dashboard';
import { LeftMenu } from './LeftMenu';
import { Content } from './Content';
//import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const actions = [
  { id: 1, name: 'Таблица товаров', route: 'products' }, 
  { id: 2, name: 'Карточка товара', route: 'category' }, 
  { id: 3, name: 'Добавить товар', route: 'warehouses' },
  { id: 4, name: 'Изменить товар', route: 'customers' }, 
  { id: 5, name: 'Удалить товар', route: 'suppliers' },
];

const Products = () => {
  const dispatch = useDispatch();

  //селекторы
  //const isAuthenticated = useSelector(selectIsAuthenticated);  

  /*useEffect(() => {
        dispatch(checkAuthStatus());
  }, [dispatch]);*/
  //
  return (
    <>
    <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
          Товары         
        </Toolbar>
    </AppBar>
    <Box sx={{           
        height: '90%',
        overflowY: 'auto',
        padding: 2,
        gap: 2,
        display: 'flex',
        flexDirection: 'column', // Устанавливает направление flex как горизонтальное
        alignItems: 'flex-start', // Выравнивает элементы по вертикали по центру
        alignContent: 'flex-start',
        justifyContent: 'flex-start', // Распределяет элементы равномерно по горизонтали
        flexWrap: 'nowrap'
    }}>
      <List>
      { actions.map((item) => (
          <React.Fragment key={item.id}>
              <ListItem>
                  <ListItemButton                    
                  >
                      <ListItemText 
                        primary={item.name}
                        slotProps={{
                          primary: {
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                          }
                        }}                                                
                        sx={{ my: 0 }}  
                      />
                  </ListItemButton>
              </ListItem>
          </React.Fragment>
      ))}
      </List>
      
   </Box>
    </>
  );
};

export {Products};