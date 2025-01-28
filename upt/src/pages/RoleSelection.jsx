// src/pages/RoleSelection.jsx
import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Card,
    CardContent,
    MenuItem
} from '@mui/material';

const cities = [ // Список городов можно брать из API
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'kazan', label: 'Казань' },
];

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
                    <Typography variant="h4" gutterBottom align="center" data-cy="role-selection-title">
                        Выбор роли
                    </Typography>

                    {/* ToggleButton для выбора роли */}
                    <ToggleButtonGroup
                        value={role}
                        exclusive
                        onChange={handleRoleChange}
                        fullWidth
                        sx={{ mb: 3 }}
                        data-cy="role-toggle-group"
                    >
                        <ToggleButton
                            value="client"
                            aria-label="клиент"
                            data-cy="client-button"
                        >
                            Я клиент
                        </ToggleButton>
                        <ToggleButton
                            value="trainer"
                            aria-label="тренер"
                            data-cy="trainer-button"
                        >
                            Я тренер
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Поле ФИО */}
                    <TextField
                        label="Ваше ФИО"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        inputProps={{ 'data-cy': 'fullname-input' }}
                    />

                    {/* Поле номера телефона */}
                    <TextField
                        label="Номер телефона"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        inputProps={{ 'data-cy': 'phone-input' }}
                    />

                    {/* Выпадающий список городов */}
                    <TextField
                        select
                        label="Город"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        inputProps={{ 'data-cy': 'city-select' }}
                    >
                        {cities.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                data-cy={`city-option-${option.value}`}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Кнопка продолжения */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
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