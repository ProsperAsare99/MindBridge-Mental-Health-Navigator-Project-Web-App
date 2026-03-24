import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.0.197:5000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {},
});

// Request interceptor for adding JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                console.log('[AXIOS DEBUG] Sending token:', token.substring(0, 10) + '...');
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn('[AXIOS DEBUG] No token found in localStorage');
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || error.response?.data?.message || error.message || 'API Request failed';
        
        if (error.response?.status === 401) {
            console.warn('Unauthorized access - clearing stale session');
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                // Optional: window.location.href = '/login';
            }
        }

        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;
