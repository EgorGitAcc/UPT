import axios from 'axios';

// Создаем экземпляр axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Базовый URL вашего API
});

// Функция для проверки, нужно ли добавлять токен к запросу
const shouldAddToken = (url) => {
  const excludedEndpoints = [
    process.env.REACT_APP_API_REGISTER,
    process.env.REACT_APP_API_LOGIN,
    process.env.REACT_APP_API_REFRESH_TOKEN,
  ];

  return !excludedEndpoints.some(endpoint => url.endsWith(endpoint));
};

// Interceptor для добавления токена в заголовки запроса
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Получаем токен из localStorage

    if (token && shouldAddToken(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Обработка ошибки 401 (Unauthorized)
      // Например, можно попытаться обновить токен или перенаправить на страницу входа
    }
    return Promise.reject(error);
  }
);

export default api;