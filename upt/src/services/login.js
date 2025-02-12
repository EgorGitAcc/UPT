// src/services/login.js
import apiClient from '../axiosConfig';

export const loginUser = async (userData) => {
    try {
        const response = await apiClient.post(process.env.REACT_APP_API_LOGIN, userData);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userEmail', userData.emailAddress);
        const userResponse = await getUserByEmail(userData.emailAddress);
        localStorage.setItem('userId', userResponse.id);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Login failed');
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_API_USER_GET_BY_EMAIL}?EmailAddress=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to get user by email');
    }
};