// src/axiosConfig.js
import axios from 'axios';
import { refreshToken } from './services/refreshToken';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
            .then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return axios(originalRequest);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
            try {
                const tokens = await refreshToken();
                localStorage.setItem('accessToken', tokens.accessToken);
                localStorage.setItem('refreshToken', tokens.refreshToken);

                apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + tokens.accessToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + tokens.accessToken;
                processQueue(null, tokens.accessToken);
                resolve(axios(originalRequest));
            } catch (err) {
                processQueue(err, null);
                reject(err);
            } finally {
                isRefreshing = false;
            }
        });
    }

    return Promise.reject(error);
});

export default apiClient;