import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Rating,
    Button,
    Avatar,
} from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const ClientCard = ({  client }) => {
    return (
        <Card
            sx={{
                height: '100%', // Карточка занимает всю высоту контейнера
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Равномерное распределение контента
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                        src={ client.avatar}
                        alt={ client.name}
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            { client.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            { client.address}
                        </Typography>

                    </Box>
                </Box>
            </CardContent>
            <Box sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ChatIcon />}
                    sx={{ mt: 2 }}
                >
                    Написать
                </Button>
            </Box>
        </Card>
    );
};

export default ClientCard;
