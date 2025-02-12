import apiClient from '../axiosConfig';

export const getAllNews = async () => {
    try {
        const response = await apiClient.get(process.env.REACT_APP_API_NEWS_GET_ALL);
        return response.data; // Возвращаем массив новостей
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to fetch news');
    }
};