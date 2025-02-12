// src/services/user.js
import apiClient from '../axiosConfig';

export const getUserByEmail = async (email) => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_API_USER_GET_BY_EMAIL}?EmailAddress=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to get user by email');
    }
};


export const deleteUserById = async (userId) => {
    try {
        await apiClient.delete(`${process.env.REACT_APP_API_USER_DELETE}?id=${userId}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to delete user');
    }
};

export const updateUserById = async (updatedUserData) => {
    try {
        const response = await apiClient.put(`${process.env.REACT_APP_API_USER_UPDATE}`, updatedUserData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to update user');
    }
};