import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    InputAdornment,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
    ArrowBack,
    ArrowForward,
    Height,
    MonitorWeight,
    Female,
    Male,
    Accessibility,
    Straighten,
} from '@mui/icons-material';
import {getAllGenders} from '../../services/infrastucture';


const ClientInfo = () => {
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [stomach, setStomach] = useState('');
    const [hips, setHips] = useState('');
    const [thighs, setThighs] = useState('');

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}
        >
            <Box sx={{ width: '600px', padding: '20px', borderRadius: '10px', backgroundColor: 'white' }}>
                <Button
                    component={RouterLink}
                    to="/role-selection"
                    startIcon={<ArrowBack />}
                    sx={{ mt: 2, mb: 2 }}
                    data-cy="back-button"
                >
                    Назад
                </Button>
                <Typography variant="h4" gutterBottom align="center" data-cy="client-info-title">
                    Дополнительная информация
                </Typography>

                {/* Поле для выбора пола */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-label">Пол</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Пол"
                        inputProps={{ 'data-cy': 'gender-select' }}
                        startAdornment={
                            <InputAdornment position="start">
                                {gender === 'male' ? <Male color="primary" /> : gender === 'female' ? <Female color="primary" /> : <Accessibility color="primary" />}
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="male">Мужской</MenuItem>
                        <MenuItem value="female">Женский</MenuItem>
                        <MenuItem value="other">Другой</MenuItem>
                    </Select>
                </FormControl>

                {/* Поле для роста */}
                <TextField
                    label="Рост (см)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'height-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Height color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Поле для веса */}
                <TextField
                    label="Вес (кг)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'weight-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MonitorWeight color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Поле для объёма груди */}
                <TextField
                    label="Объём груди (см)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={chest}
                    onChange={(e) => setChest(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'chest-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Straighten color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Поле для объёма талии */}
                <TextField
                    label="Объём талии (см)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'waist-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Straighten color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Поле для объёма живота */}
                <TextField
                    label="Объём живота (см)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={stomach}
                    onChange={(e) => setStomach(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'stomach-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Straighten color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Поле для объёма ягодиц */}
                <TextField
                    label="Объём ягодиц (см)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={hips}
                    onChange={(e) => setHips(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'hips-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Straighten color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Поле для объёма бёдер */}
                <TextField
                    label="Объём бёдер (см)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={thighs}
                    onChange={(e) => setThighs(e.target.value)}
                    inputProps={{ maxLength: 3, 'data-cy': 'thighs-input' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Straighten color="primary"/>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Кнопка "Далее" */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    endIcon={<ArrowForward />}
                    data-cy="next-button"
                >
                    Далее
                </Button>
            </Box>
        </Box>
    );
};

export default ClientInfo;
