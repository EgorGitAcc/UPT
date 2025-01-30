// src/pages/Register.jsx
import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Card,
    CardContent,
    InputAdornment,
    Snackbar,
    Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Email, Lock, Person, LockReset } from '@mui/icons-material';
import { registerUser } from '../services/register';
import { loginUser } from '../services/login';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [emailAddress, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setSnackbarMessage('Пароли не совпадают');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            await registerUser({ emailAddress, password });
            setSnackbarMessage('Регистрация успешна!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Автоматическая авторизация после успешной регистрации
            const loginResponse = await loginUser({ emailAddress, password });
            localStorage.setItem('accessToken', loginResponse.accessToken);
            localStorage.setItem('refreshToken', loginResponse.refreshToken);
            localStorage.setItem('userEmail', emailAddress);

            // Задержка на 1 секунду перед перенаправлением
            setTimeout(() => {
                navigate('/role-selection');
            }, 1000);
        } catch (err) {
            setSnackbarMessage(err.message || 'Ошибка регистрации');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

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
                        type="emailAddress"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={emailAddress}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ 'data-cy': 'emailAddress-input' }} // Селектор для Cypress
                    />
                    {/* Поле для пароля */}
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        onClick={handleSubmit}
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

            {/* Snackbar для уведомлений */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;