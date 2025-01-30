import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, checkAuthStatus, selectIsAuthenticated, selectLoading, selectError } from '../store/slices/authSlice';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backdropFilter: 'blur(5px)',//блюра
        backgroundColor: 'rgba(255, 255, 255, 0.5)',//светлый цвет с прозрачностью
    },
}));

const LogoutPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //
    const [errors, setErrors] = useState({});

    //селекторы
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);
    
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            //navigate('/dashboard');
        } catch (error) {
        }
    };

    useEffect(() => {
        handleLogout();
    }, []);
    //
    return (
        <>
        {console.log(isAuthenticated)}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {loading ? (
                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress />
                        </Backdrop>
                    ) : (
                        <Typography component="h1" variant="h5"></Typography>
                    )}
                </Box>
            </Container>
        </>
    );
};

export {LogoutPage};