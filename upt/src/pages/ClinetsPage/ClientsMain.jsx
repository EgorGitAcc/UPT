// src/pages/ClientMain.jsx
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Notifications,
    ExitToApp,
    InfoOutlined,
    CheckCircleOutline,
    WarningAmberOutlined,
    ErrorOutline,
} from '@mui/icons-material';
import { Outlet, Link } from 'react-router-dom';

const ClientMain = () => {
    // Состояние для управления видимостью диалогового окна
    const [dialogOpen, setDialogOpen] = useState(false);

    // Пример данных уведомлений
    const notifications = [
        { id: 1, message: 'Новое сообщение от Екатерины', severity: 'info' },
        { id: 2, message: 'Вы добавлены в зал', severity: 'success' },
        { id: 3, message: 'Закрытие зала', severity: 'warning' },
        { id: 4, message: 'Подозрительный вход в систему', severity: 'error' },
    ];

    // Функция для открытия диалогового окна
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    // Функция для закрытия диалогового окна
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // Функция для определения иконки в зависимости от уровня серьезности
    const getIconBySeverity = (severity) => {
        switch (severity) {
            case 'info':
                return <InfoOutlined color="primary" />;
            case 'success':
                return <CheckCircleOutline color="success" />;
            case 'warning':
                return <WarningAmberOutlined color="warning" />;
            case 'error':
                return <ErrorOutline color="error" />;
            default:
                return <InfoOutlined color="primary" />;
        }
    };

    return (
        <Box height="100%">
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Box display="flex" flexGrow={1} gap={2}>
                        <Button component={Link} to="news" color="inherit">
                            Новости
                        </Button>
                        <Button component={Link} to="programs" color="inherit">
                            Программы
                        </Button>
                        <Button component={Link} to="trainers" color="inherit">
                            Тренера
                        </Button>
                        <Button component={Link} to="profile" color="inherit">
                            Профиль
                        </Button>
                    </Box>
                    <IconButton color="inherit" onClick={handleOpenDialog}>
                        <Notifications />
                    </IconButton>
                    <IconButton color="inherit">
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box padding={3} height="100%">
                <Outlet />
            </Box>

            {/* Диалоговое окно для уведомлений */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} >
                <DialogTitle>Уведомления</DialogTitle>
                <DialogContent>
                    <List>
                        {notifications.map((notification) => (
                            <ListItem key={notification.id} sx={{ py: 1 }}>
                                <ListItemIcon>{getIconBySeverity(notification.severity)}</ListItemIcon>
                                <ListItemText primary={notification.message} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ClientMain;