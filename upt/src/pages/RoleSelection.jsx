import React, { useState, useEffect, forwardRef, useRef } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Card,
    CardContent,
    MenuItem,
    InputAdornment,
    Snackbar,
    Alert,
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import { Link as RouterLink } from 'react-router-dom';
import {
    Person,
    SportsGymnastics,
    Badge,
    Phone,
    LocationCity,
    ArrowForward,
    ArrowBack,
} from '@mui/icons-material';
import { getUserByEmail, deleteUserById, updateUserById } from '../services/user';
import {getAllCities } from '../services/city';
import { useNavigate } from 'react-router-dom';

// Маска ввода телефона
const PhoneMaskInput = forwardRef((props, ref) => {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="+{7}(000)000-00-00" // Пример маски для российского номера
            definitions={{
                '0': /[0-9]/
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const RoleSelection = () => {
    const [role, setRole] = useState('client');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]); // Состояние для хранения городов
    const [avatar, setAvatar] = useState(null); // Состояние для хранения файла аватарки
    const userEmail = localStorage.getItem('userEmail'); // Предполагаем, что email сохранен в localStorage после успешной авторизации
    const navigate = useNavigate();
    const phoneInputRef = useRef(null);

    // Состояния для управления уведомлениями
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' или 'error'

    const handleContinueClick = async () => {
        if (userEmail) {
            try {
                // Получаем данные пользователя по email
                const userData = await getUserByEmail(userEmail);

                // Подготавливаем данные для обновления
                const updatedUserData = {
                    id: userData.id,
                    name: fullName,
                    emailAddress: userEmail,
                    phoneNumber: phone,
                    cityId: city, // Предположим, что у нас есть ID города
                    avatar: avatar ? avatar.split(',')[1] : null // Если аватарка загружена, берем только данные base64 без префикса
                };

                // Вызываем функцию обновления данных пользователя
                await updateUserById(updatedUserData);

                // Уведомление об успехе
                setSnackbarMessage('Данные успешно обновлены!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);

                if (role === 'client') {
                    navigate('/client-info'); // Пример страницы для клиента
                } else if (role === 'trainer') {
                    navigate('/trainer-plan'); // Пример страницы для тренера
                }
            } catch (error) {
                // Уведомление об ошибке
                setSnackbarMessage(`Ошибка при обновлении данных пользователя: ${error.message}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.error('Ошибка при обновлении данных пользователя:', error.message);
            }
        }
    };

    // Обработчик изменения роли
    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    // Обработчик кнопки "Назад"
    const handleBackClick = async () => {
        if (userEmail) {
            try {
                // Получаем данные пользователя по email
                const userData = await getUserByEmail(userEmail);
                // Удаляем пользователя по id
                if (userData.id) {
                    await deleteUserById(userData.id);
                }
                // Очищаем localStorage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userEmail');
                // Перенаправляем на страницу регистрации
                navigate('/register');
            } catch (error) {
                // Уведомление об ошибке
                setSnackbarMessage(`Ошибка при удалении пользователя: ${error.message}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.error('Ошибка при удалении пользователя:', error.message);
            }
        } else {
            navigate('/register');
        }
    };

    // Загружаем города при монтировании компонента
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesData = await getAllCities();
                setCities(citiesData);
            } catch (error) {
                // Уведомление об ошибке
                setSnackbarMessage(`Ошибка при получении городов: ${error.message}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                console.error('Ошибка при получении городов:', error.message);
            }
        };
        fetchCities();
    }, []);

    // Функция обработки изменения файла
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Сохраняем данные изображения в состояние
            };
            reader.readAsDataURL(file);
        }
    };

    // Закрытие Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}
        >
            {/* Блок с формой */}
            <Card sx={{ width: '400px', padding: '20px', borderRadius: '10px' }}>
                <CardContent>
                
                    <Typography variant="h4" gutterBottom align="center" data-cy="role-selection-title">
                        Выбор роли
                    </Typography>
                    {/* ToggleButtonGroup с иконками */}
                    <ToggleButtonGroup
                        value={role}
                        exclusive
                        onChange={handleRoleChange}
                        fullWidth
                        sx={{ mb: 3 }}
                        data-cy="role-toggle-group"
                    >
                        <ToggleButton value="client" data-cy="client-button">
                            <Person sx={{ mr: 1 }} /> {/* Иконка клиента */}
                            Я клиент
                        </ToggleButton>
                        <ToggleButton value="trainer" data-cy="trainer-button">
                            <SportsGymnastics sx={{ mr: 1 }} /> {/* Иконка тренера */}
                            Я тренер
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginBottom: '20px' }}> {/* Flexbox для выравнивания элементов по горизонтали */}

                        <div style={{ position: 'relative', marginRight: '30px' }}>
                            {avatar ? (
                                <img src={avatar} alt="Avatar Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
                            ) : (
                                <div style={{ width: '80px', height: '80px', backgroundColor: '#e0e0e0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Person color="primary" fontSize="large" />
                                </div>
                            )}
                        </div>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                            id="avatar-upload"
                        />
                        <label htmlFor="avatar-upload">
                            <Button variant="contained" component="span" startIcon={<Person />} sx={{ marginTop: '10px', width: 'auto', }}>
                                Загрузить аватарку
                            </Button>
                        </label>
                    </div>
                    {/* Поле ФИО с иконкой */}
                    <TextField
                        label="Ваше ФИО"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Badge color="primary" /> {/* Иконка для ФИО */}
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ 'data-cy': 'fullname-input' }}
                    />
                    {/* Поле телефона с иконкой */}
                    <TextField
                        label="Номер телефона"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone color="primary" /> {/* Иконка для телефона */}
                                </InputAdornment>
                            ),
                            inputComponent: PhoneMaskInput,
                        }}
                        inputRef={phoneInputRef}
                        inputProps={{ 'data-cy': 'phone-input' }}
                    />
                    {/* Выпадающий список городов с иконкой */}
                    <TextField
                        select
                        label="Город"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={city} // Здесь city будет хранить id выбранного города
                        onChange={(e) => setCity(e.target.value)} // При изменении значения будет устанавливаться id города
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationCity color="primary" /> {/* Иконка для города */}
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ 'data-cy': 'city-select' }}
                    >
                        {cities.map((option) => (
                            <MenuItem key={option.id} value={option.id} data-cy={`city-option-${option.id}`}>
                                {option.name} {/* Отображаем название города */}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* Кнопка "Продолжить" с иконкой */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleContinueClick}
                        sx={{ mt: 3 }}
                        endIcon={<ArrowForward />}
                        data-cy="submit-button"
                    >
                        Продолжить
                    </Button>
                </CardContent>
            </Card>

            {/* Snackbar для уведомлений */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RoleSelection;