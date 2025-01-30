import React, { useState } from 'react';
import { Container, Grid, MenuItem, Select, Typography, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ClientCard from '../../components/ClientCard';
import client1 from '../../assets/Trainer 1 man.png';
import client2 from '../../assets/Trainer 2 woman.png';
import client3 from '../../assets/Trainer 3 man.png';

const clients = [
    { id: 1, name: 'Алексей Кузнецов', goal: 'Коррекция и снижение веса', avatar: client1 },
    { id: 2, name: 'Мария Петрова', goal: 'Набор мышечной массы', avatar: client2 },
    { id: 3, name: 'Дмитрий Смирнов', goal: 'Подготовка к соревнованиям', avatar: client3 }
];

const ClientListPage = () => {
    const [goalFilter, setGoalFilter] = useState('');
    const [showMyClients, setShowMyClients] = useState(false);

    const handleGoalFilterChange = (event) => {
        setGoalFilter(event.target.value);
    };

    const handleClientFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setShowMyClients(newFilter === 'myClients');
        }
    };

    const filteredClients = clients.filter(client => !showMyClients || client.id !== 1);
    const displayedClients = goalFilter ? filteredClients.filter(client => client.goal === goalFilter) : filteredClients;

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Список клиентов
            </Typography>
            <ToggleButtonGroup
                value={showMyClients ? 'myClients' : 'allClients'}
                exclusive
                onChange={handleClientFilterChange}
                sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
            >
                <ToggleButton value="allClients" color="primary">Все клиенты</ToggleButton>
                <ToggleButton value="myClients" color="primary">Мои клиенты</ToggleButton>
            </ToggleButtonGroup>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Фильтр по цели</InputLabel>
                <Select value={goalFilter} onChange={handleGoalFilterChange} label="Фильтр по цели">
                    <MenuItem value="">Все клиенты</MenuItem>
                    <MenuItem value="Коррекция и снижение веса">Коррекция и снижение веса</MenuItem>
                    <MenuItem value="Набор мышечной массы">Набор мышечной массы</MenuItem>
                    <MenuItem value="Подготовка к соревнованиям">Подготовка к соревнованиям</MenuItem>
                    <MenuItem value="Восстановление Опорно-двигательной Системы">Восстановление Опорно-двигательной Системы</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3}>
                {displayedClients.map((client) => (
                    <Grid item key={client.id} xs={12} sm={6} md={4}>
                        <ClientCard client={client} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ClientListPage;
