import axios from 'axios';

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        console.log('Attempting to refresh token...');
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_REFRESH_TOKEN}`,
            { refreshToken },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Refresh token response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        throw new Error(error.response ? error.response.data.message : 'Failed to refresh token');
    }
};

export default refreshToken;