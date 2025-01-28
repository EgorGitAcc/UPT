import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import { Notifications, ExitToApp } from '@mui/icons-material';
import { Outlet, Link } from 'react-router-dom';

const ClientMain = () => {
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

                    <IconButton color="inherit">
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
        </Box>
    );
};

export default ClientMain;
