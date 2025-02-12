import apiClient from '../axiosConfig';
export const getTrainerById = async (userId) => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_API_GET_TRAINER_ID}?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to get trainer by user ID');
    }
};