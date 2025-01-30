// src/services/register.js
import apiClient from '../axiosConfig';

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post(process.env.REACT_APP_API_REGISTER, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Registration failed');
    }
};