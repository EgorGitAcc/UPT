import React, { useState } from 'react';
import { Container, Grid, Tab, Tabs, Box, TextField, Typography, InputAdornment, Modal, Card, CardContent, Button, MenuItem, Switch } from '@mui/material';
import { AccountCircle, Settings, Email, Face, Payment, Phone } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import SettingsClients from '../../components/SettingsClients';

const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];
const genders = ['Мужской', 'Женский'];
const experienceLevels = ['1-3 года', '3-6 лет', 'Более 6 лет'];
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const TrainerProfile = () => {
    const [value, setValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState({
        fullName: 'Иван Иванов',
        phone: '+7 (123) 456-78-90',
        email: 'ivan@example.com',
        city: 'Москва',
        gender: 'Мужской',
        experience: '1-3 года',
        injuryWork: false,
        medicalEducation: false,
        workingDays: ['Пн', 'Вт', 'Ср'],
        height: '180 см',
        weight: '75 кг',
        chest: '100 см',
        waist: '80 см',
        belly: '85 см',
        hips: '95 см',
        thighs: '55 см'
    });

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSwitchChange = (name) => {
        setUserData({ ...userData, [name]: !userData[name] });
    };

    const handleDayToggle = (day) => {
        setUserData((prev) => ({
            ...prev,
            workingDays: prev.workingDays.includes(day)
                ? prev.workingDays.filter((d) => d !== day)
                : [...prev.workingDays, day],
        }));
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const PhoneMask = (props) => {
        return (
            <IMaskInput
                {...props}
                mask="+7 (000) 000-00-00"
                value={userData.phone}
            />
        );
    };

    const tariffs = [
        {
            id: 1,
            title: "Тариф Базовый",
            price: "500 руб.",
            duration: "1 месяц",
            smsCount: "100 SMS",
            events: "Нет",
        },
        {
            id: 2,
            title: "Тариф Стандартный",
            price: "1000 руб.",
            duration: "3 месяца",
            smsCount: "300 SMS",
            events: "Да",
        },
        {
            id: 3,
            title: "Тариф Премиум",
            price: "2000 руб.",
            duration: "6 месяцев",
            smsCount: "600 SMS",
            events: "Да",
        },
    ];

    const payments = [
        {
            id: 1,
            title: "Оплата тарифа",
            amount: "500 руб.",
        },
        {
            id: 2,
            title: "Списание баланса",
            amount: "200 руб.",
        },
    ];

    return (
        <Container>
            <Box sx={{ borderBottom: 1, padding: 5, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="profile tabs">
                    <Tab label="Мои данные" icon={<AccountCircle />} />
                    <Tab label="Настройки" icon={<Settings />} />
                    <Tab label="Оплата" icon={<Payment />} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Typography variant="h6" gutterBottom>Мои данные</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="ФИО"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Face color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Почта"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Город"
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                        >
                            {cities.map((city) => (
                                <MenuItem key={city} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Пол"
                            name="gender"
                            value={userData.gender}
                            onChange={handleChange}
                        >
                            {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" align='center' flexDirection="column" gap={1}>
                            <Typography>Стаж:</Typography>
                            <Box display="flex" justifyContent='center' width='100%' gap={4}>
                                {experienceLevels.map((level) => (
                                    <Button key={level} variant={userData.experience === level ? 'contained' : 'outlined'}
                                        onClick={() => setUserData({ ...userData, experience: level })}>
                                        {level}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography>Работа с травмами</Typography>
                            <Switch checked={userData.injuryWork} onChange={() => handleSwitchChange('injuryWork')} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography>Медицинское образование</Typography>
                            <Switch checked={userData.medicalEducation} onChange={() => handleSwitchChange('medicalEducation')} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography>Дни приема:</Typography>
                            <Box display="flex" gap={2}>
                                {weekDays.map((day) => (
                                    <Button key={day} variant={userData.workingDays.includes(day) ? 'contained' : 'outlined'}
                                        onClick={() => handleDayToggle(day)}>
                                        {day}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Номер телефона"
                            name="phone"
                            value={userData.phone}
                            InputProps={{
                                inputComponent: PhoneMask,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Typography variant="h6" gutterBottom>Настройки</Typography>

                <SettingsClients />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Typography variant="h6" gutterBottom>Оплата</Typography>
                {/* Увеличиваем отступ кнопки "Сменить тариф" */}
                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mb: 3 }}>
                    Сменить тариф
                </Button>
                <Grid container spacing={2}> {/* Уменьшаем отступ между плашками */}
                    {payments.map((payment) => (
                        <Grid item xs={12} key={payment.id}> {/* Плашки занимают всю ширину */}
                            <Card variant="outlined" sx={{
                                borderRadius: 2,
                                padding: 1.5,
                                bgcolor: 'common.black', // Фон primary
                                color: 'white', // Белый текст
                            }}>
                                <CardContent sx={{ padding: 1.5 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        {/* Заголовок слева */}
                                        <Typography
                                            variant="h6" // Увеличиваем шрифт
                                            sx={{ fontWeight: 'bold' }} // Делаем текст полужирным
                                        >
                                            {payment.title}
                                        </Typography>
                                        {/* Сумма справа */}
                                        <Typography
                                            variant="h6" // Увеличиваем шрифт
                                            sx={{ fontWeight: 'bold' }} // Делаем текст полужирным
                                        >
                                            {payment.amount}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 1200, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Выберите тариф
                    </Typography>
                    <Grid container spacing={3}>
                        {tariffs.map((tariff) => (
                            <Grid item xs={4} key={tariff.id}>
                                <Card variant="outlined" sx={{ borderRadius: 3, padding: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" align="center" gutterBottom>
                                            {tariff.title}
                                        </Typography>
                                        <Typography variant="h5" align="center" color="primary" gutterBottom>
                                            {tariff.price}
                                        </Typography>
                                        <Typography variant="body1" align="center" color="textSecondary">
                                            Срок: {tariff.duration}
                                        </Typography>
                                        <Typography variant="body1" align="center" color="textSecondary">
                                            Количество SMS: {tariff.smsCount}
                                        </Typography>
                                        <Typography variant="body1" align="center" color="textSecondary">
                                            Участие в мероприятиях: {tariff.events}
                                        </Typography>
                                        <Box display="flex" justifyContent="center" mt={2}>
                                            <Button variant="contained" color="primary" fullWidth onClick={handleCloseModal}>
                                                Выбрать
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </Container>
    );
};

function TabPanel(props) {
    const { value, index, children } = props;
    return value === index && (
        <Box sx={{ p: 3 }}>
            {children}
        </Box>
    );
}

export default TrainerProfile;