// src/services/refreshToken.js
import apiClient from '../axiosConfig';

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const response = await apiClient.post(process.env.REACT_APP_API_REFRESH_TOKEN, { refreshToken });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to refresh token');
    }
};