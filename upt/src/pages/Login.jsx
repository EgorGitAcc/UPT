// src/pages/Login.jsx
import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Card,
    CardContent,
    InputAdornment,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Email, Lock, Person } from '@mui/icons-material';

const Login = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}
        >
            <Card sx={{ width: '400px', padding: '20px', borderRadius: '10px' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center" data-cy="login-title">
                        Авторизации
                    </Typography>

                    {/* Поле для почты */}
                    <TextField
                        label="Почта"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ 'data-cy': 'email-input' }} // Селектор для Cypress
                    />

                    {/* Поле для пароля */}
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ 'data-cy': 'password-input' }} // Селектор для Cypress
                    />

                    {/* Кнопка "Войти" */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                        startIcon={<Person color="inherit" />}
                        data-cy="login-button" // Селектор для Cypress
                    >
                        Войти
                    </Button>

                    {/* Ссылка на страницу регистрации */}
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Нет аккаунта?{' '}
                        <Link component={RouterLink} to="/register" color="primary" data-cy="register-link">
                            Зарегистрируйтесь
                        </Link>
                    </Typography>

                    {/* Ссылка "Забыли пароль" */}
                    <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        <Link component={RouterLink} to="/forgot-password" color="primary" data-cy="forgot-password-link">
                            Забыли пароль?
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;