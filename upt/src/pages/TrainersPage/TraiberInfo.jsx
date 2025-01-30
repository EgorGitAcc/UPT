import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Switch, Card, CardContent } from '@mui/material';
import { IMaskInput } from 'react-imask';
import { Link as RouterLink } from 'react-router-dom';
import {ArrowBack} from '@mui/icons-material';

const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];
const genders = ['Мужской', 'Женский'];
const experienceLevels = ['1-3 года', '3-6 лет', 'Более 6 лет'];
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const TrainerInfo = () => {
    const [trainerData, setTrainerData] = useState({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        gender: '',
        experience: '',
        injuryWork: false,
        medicalEducation: false,
        workingDays: [],
    });
    const handleExperienceSelect = (level) => {
        setTrainerData({ ...trainerData, experience: level });
    };

    const handleSwitchChange = (name) => {
        setTrainerData({ ...trainerData, [name]: !trainerData[name] });
    };

    const handleDayToggle = (day) => {
        setTrainerData((prev) => ({
            ...prev,
            workingDays: prev.workingDays.includes(day)
                ? prev.workingDays.filter((d) => d !== day)
                : [...prev.workingDays, day],
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTrainerData({ ...trainerData, [name]: value });
      };
    
    const PhoneMask = (props) => (
        <IMaskInput {...props} mask="+7 (000) 000-00-00" value={trainerData.phone} />
    );

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}>
            <Card sx={{ width: '600px', padding: '20px', borderRadius: '10px' }}>
                <CardContent>
                <Button
                        component={RouterLink}
                        to="/trainer-pay"
                        startIcon={<ArrowBack />}
                        sx={{ mt: 2, mb: 2 }}
                        data-cy="back-button"
                    >
                        Назад
                    </Button>
                    <Typography variant="h4" align='center' gutterBottom>Информация о тренере</Typography>
                    <Box maxWidth={600} width="100%" display="flex" flexDirection="column" gap={2}>
                        <TextField fullWidth label="ФИО" name="fullName" value={trainerData.fullName} onChange={handleChange}/>
                        <TextField fullWidth label="Телефон" name="phone" InputProps={{ inputComponent: PhoneMask }} />
                        <TextField fullWidth label="Почта" name="email" value={trainerData.email} onChange={handleChange}/>
                        <TextField fullWidth select label="Город" name="city" value={trainerData.city}  onChange={handleChange} >
                            {cities.map((city) => (<MenuItem key={city} value={city}>{city}</MenuItem>))}
                        </TextField>
                        <TextField fullWidth select label="Пол" name="gender" value={trainerData.gender}  onChange={handleChange} >
                            {genders.map((gender) => (<MenuItem key={gender} value={gender}>{gender}</MenuItem>))}
                        </TextField>
                        <Box display="flex" align='center' flexDirection="column" gap={1}>
                            <Typography>Стаж:</Typography>
                            <Box display="flex" justifyContent='center' width='100%' gap={4}>
                                {experienceLevels.map((level) => (
                                    <Button key={level} variant={trainerData.experience === level ? 'contained' : 'outlined'}
                                        onClick={() => handleExperienceSelect(level)}>
                                        {level}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography>Работа с травмами</Typography>
                            <Switch checked={trainerData.injuryWork} onChange={() => handleSwitchChange('injuryWork')} />
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography>Медицинское образование</Typography>
                            <Switch checked={trainerData.medicalEducation} onChange={() => handleSwitchChange('medicalEducation')} />                </Box>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography>Дни приема:</Typography>
                            <Box display="flex" gap={2}>
                                {weekDays.map((day) => (
                                    <Button key={day} variant={trainerData.workingDays.includes(day) ? 'contained' : 'outlined'}
                                        onClick={() => handleDayToggle(day)}>
                                        {day}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TrainerInfo;
