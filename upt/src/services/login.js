// src/services/login.js
import apiClient from '../axiosConfig';

export const loginUser = async (userData) => {
    try {
        const response = await apiClient.post(process.env.REACT_APP_API_LOGIN, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Login failed');
    }
};