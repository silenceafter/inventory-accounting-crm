import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, rolesUser, checkAuthStatus, selectLoading, selectError, selectIsAuthenticated } from '../store/slices/authSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //
    const [notification, setNotification] = useState({ severity: null, message: '' });
    const [errors, setErrors] = useState({});

    //селекторы
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    
    const handleLogin = async () => {
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            await dispatch(rolesUser());
            setNotification({ severity: 'success', message: 'Вход выполнен' });
            //navigate('/dashboard');
        } catch (error) {
            setNotification({ severity: 'error', message: error.message || 'Неудачная попытка входа'});
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Поле электронной почты обязательно для заполнения';
        if (!password) newErrors.password = 'Поле пароля обязательно для заполнения';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setNotification({ severity: 'error', message: 'Пожалуйста, заполните все обязательные поля' });
            return;
        }
        
        setErrors({});
        setNotification({ severity: null, message: '' });
        handleLogin();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

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
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    {notification.severity && (
                        <Alert severity={notification.severity} sx={{ width: '100%', mb: 2 }} onClose={() => setNotification({ severity: null, message: '' })}>
                            {notification.message}
                        </Alert>
                    )}
                    {error && !notification.severity && (
                        <Alert severity='error' sx={{ width: '100%', mb: 2 }} onClose={() => dispatch({ type: 'auth/clearError' })}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить"
                        />
                        {loading 
                            ? (
                                <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                                    <CircularProgress />
                                </Box>
                            ) 
                            : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Войти
                                </Button>
                            )
                        }
                        <Grid container>
                            <Grid item xs>
                                <Link component={RouterLink} to="/forgot" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Нет аккаунта? Регистрация"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export { LoginPage };