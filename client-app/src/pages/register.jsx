import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { registerUser, selectLoading, selectError } from '../store/slices/authSlice';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: ''
    });        
    //
    const [notification, setNotification] = useState({ severity: null, message: '' });
    const [errors, setErrors] = useState({});

    //селекторы
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    /*useEffect(() => {
        if (message && message.type === 'success') {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate]);*/

    const handleRegister = async () => {
        try {
            await dispatch(registerUser({ email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword })).unwrap();
            setNotification({ severity: 'success', message: 'Регистрация успешна' });
            //navigate('/dashboard');
        } catch (error) {
            setNotification({ severity: 'error', message: error.message || 'Регистрация не выполнена'});
        }
    };

    const validate = () => {
      let tempErrors = {};
      if (!formData.email) tempErrors.email = 'Электронная почта обязательна';
      if (!formData.password) tempErrors.password = 'Пароль обязателен';
      if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Пароли не совпадают';
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
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
        handleRegister();
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
    return (
        <>
        {console.log(error)}
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
                        Регистрация
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
                    
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Электронная почта"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Повторите пароль"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouterLink to="/login" variant="body2">
                                    Уже есть учетная запись? Войти
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
  );
};

export {RegisterPage};