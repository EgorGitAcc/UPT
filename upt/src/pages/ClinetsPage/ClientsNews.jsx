import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const NewsPage = () => {
    const todayNews = [
        { id: 1, title: "Новость 1", description: "Описание новости 1" },
        { id: 2, title: "Новость 2", description: "Описание новости 2" },
    ];

    const weeklyNews = [
        { id: 3, title: "Новость 3", description: "Описание новости 3" },
        { id: 4, title: "Новость 4", description: "Описание новости 4" },
    ];

    const monthlyNews = [
        { id: 5, title: "Новость 5", description: "Описание новости 5" },
        { id: 6, title: "Новость 6", description: "Описание новости 6" },
    ];

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            padding={3}
            marginTop="10px"
        >
            <Typography variant="h4" gutterBottom>
                Новости
            </Typography>

            <Box display="flex" flexDirection="column" gap={4} width="100%" maxWidth="800px">
                <NewsSection title="Новости сегодня" items={todayNews} />
                <NewsSection title="Новости недели" items={weeklyNews} />
                <NewsSection title="Новости месяца" items={monthlyNews} />
            </Box>
        </Box>
    );
};

const NewsSection = ({ title, items }) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            border="1px solid #ccc" 
            borderRadius="8px" 
            overflow="hidden"
        >
            <Typography 
                variant="h5" 
                gutterBottom 
                textAlign="center" 
                padding={1} 
                bgcolor="#f5f5f5" 
                borderBottom="1px solid #ccc"
            >
                {title}
            </Typography>
            <Box 
                maxHeight="300px" 
                overflow="auto" 
                padding={2} 
                display="flex" 
                flexDirection="column" 
                gap={2}
            >
                {items.map((item) => (
                    <Card key={item.id} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default NewsPage;