// src/pages/Register.jsx
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
import { Email, Lock, Person, LockReset } from '@mui/icons-material';

const Register = () => {
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
                    <Typography variant="h4" gutterBottom align="center" data-cy="register-title">
                        Регистрация
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

                    {/* Поле для повторения пароля */}
                    <TextField
                        label="Повторите пароль"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockReset color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ 'data-cy': 'confirm-password-input' }} // Селектор для Cypress
                    />

                    {/* Кнопка "Создать аккаунт" */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, mb: 2 }}
                        startIcon={<Person color="inherit" />}
                        data-cy="register-button" // Селектор для Cypress
                    >
                        Создать аккаунт
                    </Button>

                    {/* Ссылка на страницу входа */}
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Уже есть аккаунт?{' '}
                        <Link component={RouterLink} to="/login" color="primary" data-cy="login-link">
                            Войти
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;