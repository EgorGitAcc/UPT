import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';
import sberLogo from '../../assets/banks/Sber.png';
import alphaLogo from '../../assets/banks/Alpha.png';
import tBankLogo from '../../assets/banks/T-Bank.png';
import vtbLogo from '../../assets/banks/VTB.png';

const banks = [
    { id: 'sber', name: 'Сбербанк', logo: sberLogo },
    { id: 'alpha', name: 'Альфа-Банк', logo: alphaLogo },
    { id: 'tbank', name: 'Тинькофф', logo: tBankLogo },
    { id: 'vtb', name: 'ВТБ', logo: vtbLogo },
];

const TrainerPay = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [selectedBank, setSelectedBank] = useState(null);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}>
            <Card sx={{ display:'flex', width: '600px', padding:'50px', borderRadius: '10px', justifyContent:'center'}}>
                <CardContent>
                    <Typography variant="h4" align='center' gutterBottom>Оплата</Typography>
                    <Button
                        component={RouterLink}
                        to="/trainer-plan"
                        startIcon={<ArrowBack />}
                        sx={{ mt: 2, mb: 2 }}
                        data-cy="back-button"
                    >
                        Назад
                    </Button>
                    {/* Выбор банка */}
                    <Box display="flex" gap={2} marginBottom={3}>
                        {banks.map((bank) => (
                            <Card
                                key={bank.id}
                                onClick={() => setSelectedBank(bank.id)}
                                sx={{
                                    width: 120,
                                    cursor: 'pointer',
                                    border: selectedBank === bank.id ? '2px solid #1976d2' : '2px solid transparent',
                                    textAlign: 'center',
                                    padding: 2,
                                }}
                            >
                                <img src={bank.logo} alt={bank.name} style={{ width: '100%' }} />
                            </Card>
                        ))}
                    </Box>

                    <Card variant="outlined" sx={{ maxWidth: 600, padding: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Введите данные карты</Typography>

                            <TextField
                                fullWidth
                                label="Номер карты"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                InputProps={{
                                    inputComponent: IMaskInput,
                                    inputProps: {
                                        mask: '0000 0000 0000 0000',
                                    },
                                }}
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                label="Срок действия (MM/YY)"
                                name="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                InputProps={{
                                    inputComponent: IMaskInput,
                                    inputProps: {
                                        mask: '00/00',
                                    },
                                }}
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                label="CVC"
                                name="cvc"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                InputProps={{
                                    inputComponent: IMaskInput,
                                    inputProps: {
                                        mask: '000',
                                    },
                                }}
                                margin="normal"
                            />

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Оплатить
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TrainerPay;
