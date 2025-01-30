import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Grid, Typography, Grid2 } from '@mui/material';
import Button from '@mui/material/Button';
import { checkAuthStatus, selectIsAuthenticated } from '../store/slices/authSlice';
import { warehousesFetchData, selectItems, selectLoading, selectError} from '../store/slices/warehousesSlice';
import { selectItem } from '../store/slices/leftMenuSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import MomentTZ from 'moment-timezone';
import { Products } from '../components/Products';

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

function Dashboard() {
  const dispatch = useDispatch();

  //селекторы
  const warehouses = useSelector(selectItems);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const leftMenuItem = useSelector(selectItem);

  useEffect(() => {
        dispatch(checkAuthStatus());
        dispatch(warehousesFetchData());
    }, [dispatch]);
  
  const formatDate = (timestamp) => {
    const formattedDate = moment.tz(timestamp, 'Europe/Moscow').format('DD.MM.GGGG HH:MM');
    return formattedDate;
  };
  //
  return (
    <>
    {console.log(leftMenuItem)}
    {leftMenuItem == 'products' ? (
        <Products />
    ) : (
        <>
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
            Рабочий стол          
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
      <Typography color="inherit">
          Таблица складов
      </Typography>      
      {      
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell>Наименование</StyledTableCell>
                  <StyledTableCell>Адрес</StyledTableCell>
                  <StyledTableCell>Дата добавления</StyledTableCell>
                  <StyledTableCell>Дата последнего обновления</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {warehouses.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{formatDate(row.createdAt)}</StyledTableCell>
                    <StyledTableCell>{formatDate(row.updatedAt)}</StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
      </TableContainer>
      }

      {/* уведомления */}
      {/*<Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} //нижний правый угол
      >
      <Alert
          onClose={handleClose}
          severity={requestStatus === 'success' ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
      >
          {requestStatus === 'success' ? 'Успешно сохранено!' : 'Ошибка при отправке!'}
      </Alert>
      </Snackbar>*/}
    </Box>
    </>
    )} 
    </>
  );
}

export {Dashboard};