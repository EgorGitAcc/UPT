import apiClient from '../axiosConfig';

export const addGoal = async (goalData) => {
    try {
        // Выполняем POST-запрос к эндпоинту создания клиента
        const response = await apiClient.post(`${process.env.REACT_APP_API_GOAL_CREATE}`, goalData);
        return response.data; // Возвращаем данные ответа сервера
    } catch (error) {
        // Обработка ошибок
        throw new Error(error.response ? error.response.data.message : 'Failed to add goal');
    }
};

