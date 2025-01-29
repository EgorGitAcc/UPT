import React, { useState } from 'react';
import { Container, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TrainerCard from '../../components/TrainerCard';
import trainer1 from '../../assets/Trainer 1 man.png'
import trainer2 from '../../assets/Trainer 2 woman.png'
import trainer3 from '../../assets/Trainer 9 man.png'


const trainers = [
    { id: 1, name: 'Иван Иванов', address: 'Фитнес-центр "Энергия"', rating: 4.5, avatar: trainer1 },
    { id: 2, name: 'Анна Смирнова', address: 'Зал "Сила"', rating: 4.8, avatar: trainer2 },
    { id: 3, name: 'Петр Васильев', address: 'Клуб "Форма"', rating: 4.2, avatar: trainer3 }
];

const clientTrainers = [
    { id: 2, name: 'Анна Смирнова', address: 'Зал "Сила"', rating: 4.8, avatar: trainer2 }
];

const ClientTrainerPage = () => {
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setFilter(newFilter);
        }
    };

    const displayedTrainers = filter === 'all' ? trainers : clientTrainers;

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Список тренеров
            </Typography>
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
            >
                <ToggleButton value="all" color="primary">Все тренеры</ToggleButton>
                <ToggleButton value="client" color="primary">Мои тренеры</ToggleButton>
            </ToggleButtonGroup>
            <Grid container spacing={3}>
                {displayedTrainers.map((trainer) => (
                    <Grid item key={trainer.id} xs={12} sm={6} md={4}>
                        <TrainerCard trainer={trainer} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ClientTrainerPage;