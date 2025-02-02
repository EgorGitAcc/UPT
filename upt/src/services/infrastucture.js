import apiClient from '../axiosConfig';

export const getAllCities = async () => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_API_CITY_GET_ALL}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to get cities');
    }
};

export const getAllGenders = async () => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_API_GET_GENDERS}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to get cities');
    }
};