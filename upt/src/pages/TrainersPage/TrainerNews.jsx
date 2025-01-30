import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import AddNew from '../../components/AddNews';

const TrainerNews = () => {
    const [todayNews, setTodayNews] = useState([
        { id: 1, title: "Новость 1", description: "Описание новости 1" },
        { id: 2, title: "Новость 2", description: "Описание новости 2" },
    ]);
    const [weeklyNews, setWeeklyNews] = useState([
        { id: 3, title: "Новость 3", description: "Описание новости 3" },
        { id: 4, title: "Новость 4", description: "Описание новости 4" },
    ]);
    const [monthlyNews, setMonthlyNews] = useState([
        { id: 5, title: "Новость 5", description: "Описание новости 5" },
        { id: 6, title: "Новость 6", description: "Описание новости 6" },
    ]);

    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newsType, setNewsType] = useState("");

    const handleOpen = (type) => {
        setNewsType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewTitle("");
        setNewDescription("");
    };

    const handleAddNews = () => {
        if (!newTitle || !newDescription) return;
        const newNews = { id: Date.now(), title: newTitle, description: newDescription };
        if (newsType === "today") setTodayNews([...todayNews, newNews]);
        if (newsType === "weekly") setWeeklyNews([...weeklyNews, newNews]);
        if (newsType === "monthly") setMonthlyNews([...monthlyNews, newNews]);
        handleClose();
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={5} marginTop="10px">
            <Typography variant="h4" gutterBottom>Новости</Typography>
            <Box display="flex" flexDirection="column" gap={4} width="100%" maxWidth="800px">
                <AddNew title="Новости сегодня" alignItems="center" items={todayNews} onAdd={() => handleOpen("today")} />
                <AddNew title="Новости недели" alignItems="center" items={weeklyNews} onAdd={() => handleOpen("weekly")} />
                <AddNew title="Новости месяца" alignItems="center" items={monthlyNews} onAdd={() => handleOpen("monthly")} />
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box position="absolute" top="35%" left="35%" width={400} bgcolor="background.paper" p={4} boxShadow={24} borderRadius={2}>
                    <Typography variant="h6" gutterBottom>Добавить новость</Typography>
                    <TextField fullWidth label="Заголовок" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} margin="normal" />
                    <TextField fullWidth multiline rows={4} label="Описание" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} margin="normal" />
                    <Button variant="contained" color="primary" onClick={handleAddNews} fullWidth>Добавить</Button>
                </Box>
            </Modal>
        </Box>
    );
};


export default TrainerNews;
