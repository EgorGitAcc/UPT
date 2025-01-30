import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import {ArrowBack} from '@mui/icons-material';

const TrainerChoosePlan = () => {
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

    return (
        <Box display="flex" height="100%" flexDirection="column" alignItems="center" justifyContent="center" padding={5} marginTop="20px">
            <Button
                component={RouterLink}
                to="/role-selection"
                startIcon={<ArrowBack />}
                sx={{ mt: 2, mb: 2 }}
                data-cy="back-button"
            >
                Назад
            </Button>
            <Typography variant="h4" gutterBottom>
                Выберите тариф
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {tariffs.map((tariff) => (
                    <Grid item xs={12} sm={4} key={tariff.id}>
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

                                {/* Кнопка для выбора тарифа */}
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button variant="contained" color="primary" fullWidth>
                                        Выбрать
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TrainerChoosePlan;
