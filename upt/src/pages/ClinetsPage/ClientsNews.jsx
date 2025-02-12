import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { getAllNews } from '../../services/news'; // Импортируем метод для получения новостей

const ClientsNews = () => {
    const [todayNews, setTodayNews] = useState([]); // Новости за сегодня
    const [weeklyNews, setWeeklyNews] = useState([]); // Новости за неделю
    const [monthlyNews, setMonthlyNews] = useState([]); // Новости за месяц
    const [selectedSection, setSelectedSection] = useState('today'); // Состояние для выбранного раздела

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const allNews = await getAllNews(); // Получаем все новости

                // Разделяем новости по датам
                const now = new Date();
                const todayStart = new Date(now.setHours(0, 0, 0, 0));
                const weekStart = new Date(now.setDate(now.getDate() - 7));
                const monthStart = new Date(now.setMonth(now.getMonth() - 1));

                const todayItems = [];
                const weeklyItems = [];
                const monthlyItems = [];

                allNews.forEach((item) => {
                    const creationDate = new Date(item.creationDate);

                    if (creationDate >= todayStart) {
                        todayItems.push(item);
                    } else if (creationDate >= weekStart) {
                        weeklyItems.push(item);
                    } else if (creationDate >= monthStart) {
                        monthlyItems.push(item);
                    }
                });

                // Устанавливаем состояния
                setTodayNews(todayItems);
                setWeeklyNews(weeklyItems);
                setMonthlyNews(monthlyItems);
            } catch (error) {
                console.error('Ошибка при получении новостей:', error.message);
            }
        };

        fetchNews(); // Вызываем функцию загрузки новостей
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={5}
            marginTop="10px"
        >
            <Typography variant="h4" gutterBottom>
                Новости
            </Typography>

            {/* Переключатель разделов */}
            <ToggleButtonGroup
                value={selectedSection}
                exclusive
                onChange={(e, newValue) => setSelectedSection(newValue)}
                aria-label="Выбор раздела новостей"
                sx={{ mb: 2 }}
            >
                <ToggleButton value="today">Сегодня</ToggleButton>
                <ToggleButton value="weekly">Неделя</ToggleButton>
                <ToggleButton value="monthly">Месяц</ToggleButton>
            </ToggleButtonGroup>

            {/* Отображение новостей для выбранного раздела */}
            <Box width="100%" maxWidth="800px" >
                {/* Блок "Новости сегодня" */}
                {selectedSection === 'today' && (
                    <Box
                        border="1px solid #ccc"
                        borderRadius="8px"
                        overflow="hidden"

                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            textAlign="center"
                            padding={1}
                            bgcolor="primary.main"
                            color="primary.contrastText"
                            borderBottom="1px solid #ccc"
                        >
                            Новости сегодня
                        </Typography>
                        <List>
                            {todayNews.map((item) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={item.text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {selectedSection === 'weekly' && (
                    <Box
                        border="1px solid #ccc"
                        borderRadius="8px"
                        overflow="hidden"
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            textAlign="center"
                            padding={1}
                            bgcolor="primary.main"
                            color="primary.contrastText"
                            borderBottom="1px solid #ccc"
                        >
                            Новости недели
                        </Typography>
                        <List>
                            {weeklyNews.map((item) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={item.text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {selectedSection === 'monthly' && (
                    <Box
                        border="1px solid #ccc"
                        borderRadius="8px"
                        overflow="hidden"
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            textAlign="center"
                            padding={1}
                            bgcolor="primary.main"
                            color="primary.contrastText"
                            borderBottom="1px solid #ccc"
                        >
                            Новости месяца
                        </Typography>
                        <List>
                            {monthlyNews.map((item) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={item.text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ClientsNews;