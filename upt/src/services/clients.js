import apiClient from '../axiosConfig';

export const addClient = async (clientData) => {
    try {
        // Выполняем POST-запрос к эндпоинту создания клиента
        const response = await apiClient.post(`${process.env.REACT_APP_API_CLIENT_CREATE}`, clientData);
        return response.data; // Возвращаем данные ответа сервера
    } catch (error) {
        // Обработка ошибок
        throw new Error(error.response ? error.response.data.message : 'Failed to add client');
    }
};

export const getClientById = async (userId) => {
    try {
        const response = await apiClient.get(`${process.env.REACT_APP_API_GET_CLIENT_ID}?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to get client by user ID');
    }
};