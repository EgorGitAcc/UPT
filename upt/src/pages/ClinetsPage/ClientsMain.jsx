import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import { Notifications, ExitToApp } from '@mui/icons-material';

const ClientMain = () => {
    return (
        <Box>
            {/* Header Section */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    {/* Navigation Menu */}
                    <Box display="flex" flexGrow={1} gap={2}>
                        <Button color="inherit">Новости</Button>
                        <Button color="inherit">Программы</Button>
                        <Button color="inherit">Тренера</Button>
                        <Button color="inherit">Профиль</Button>
                    </Box>

                    {/* Notifications Button */}
                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>

                    {/* Logout Button */}
                    <IconButton color="inherit">
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ClientMain;