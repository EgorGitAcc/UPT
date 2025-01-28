//Импорты
import React, { useState, forwardRef } from 'react';
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

// Маска ввода телефона
const PhoneMaskInput = forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+7 (000) 000-00-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => {
        onChange({ target: { name: props.name, value } });
      }}
      overwrite
    />
  );
});


//Временные массивы для проверки фронта без бэка
const cities = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'kazan', label: 'Казань' },
];

//Создание страницы
const RoleSelection = () => {
  const [role, setRole] = useState('client');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
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
          {/* Кнопка "Назад" */}
          <Button
            component={RouterLink}
            to="/register"
            startIcon={<ArrowBack />} // Иконка стрелки назад
            sx={{ mb: 2 }}
            data-cy="back-button"
          >
            Назад
          </Button>

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
            inputProps={{ 'data-cy': 'phone-input' }}
          />

          {/* Выпадающий список городов с иконкой */}
          <TextField
            select
            label="Город"
            variant="outlined"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
              <MenuItem key={option.value} value={option.value} data-cy={`city-option-${option.value}`}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Кнопка "Продолжить" с иконкой */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            endIcon={<ArrowForward />} 
            data-cy="submit-button"
          >
            Продолжить
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoleSelection;