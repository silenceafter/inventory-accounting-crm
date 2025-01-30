import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import { ButtonGroup, Tabs, Tab } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { TabPanel } from './TabPanel';
import { useDispatch, useSelector } from 'react-redux';
//import { setUnsavedChanges } from '../store/slices/unsavedChangesSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { setLeftMenuItem, selectItem } from '../store/slices/leftMenuSlice';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
function LeftMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //селекторы
  const menuItem = useSelector(selectItem);

  /*useEffect(() => {
    dispatch(setLeftMenuItem());
    dispatch(warehousesFetchData());
}, [dispatch]);*/

  const actionPanel = [
    { id: 1, name: 'Рабочий стол', route: 'desktop' },
    { id: 2, name: 'Товары', route: 'products' }, 
    { id: 3, name: 'Категории', route: 'category' }, 
    { id: 4, name: 'Склады', route: 'warehouses' },
    { id: 5, name: 'Клиенты', route: 'customers' }, 
    { id: 6, name: 'Поставщики', route: 'suppliers' }, 
    { id: 7, name: 'Отчеты', route: 'reports' }, 
    { id: 8, name: 'Настройки', route: 'settings' }
  ];
  //
  return (
    <>              
      <Paper elevation={3} sx={{ width: '100%', height: 'auto', margin: '0', padding: '0', overflow: 'hidden', flexBasis: '100%', flexGrow: 0, flexShrink: 0 }}>
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
            <Typography color="inherit">
                Разделы
            </Typography>                
        </Toolbar>
        </AppBar>
        <Box sx={{overflow: 'auto', height: '100%'}}>
            <List>
            { actionPanel.map((item) => (
                <React.Fragment key={item.id}>
                    <ListItem>
                        <ListItemButton
                         onClick={() => {
                          dispatch(setLeftMenuItem(item.route));
                          //navigate(`/${item.route}`);
                         }}
                        >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            ))}
            </List>          
        </Box>
      </Paper>        
    </>
  );
}

export {LeftMenu};