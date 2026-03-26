import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {},
});

// Request interceptor for adding JWT token
axiosInstance.interceptors.request.use(
    async (config) => {
        if (typeof window !== 'undefined') {
            // Priority 1: Explicitly provided Authorization header
            if (config.headers.Authorization) {
                return config;
            }

            // Priority 2: Get token directly from the NextAuth session (most reliable)
            try {
                const session = await getSession();
                const sessionToken = (session?.user as any)?.accessToken;
                
                if (sessionToken) {
                    config.headers.Authorization = `Bearer ${sessionToken}`;
                    return config;
                }
            } catch (sessionError) {
                console.warn('[AXIOS DEBUG] Failed to get session:', sessionError);
            }

            // Priority 3: Fallback to localStorage (legacy/guest support)
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors and retries
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        
        // If config does not exist or retry option is not set, reject
        if (!config || !config.retry) {
            const message = error.response?.data?.error || error.response?.data?.message || error.message || 'API Request failed';
            
            if (error.response?.status === 401) {
                console.warn('Unauthorized access - clearing stale session');
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                }
            }

            // Dispatch connectivity error for 503 or network errors
            if (error.response?.status === 503 || !error.response) {
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('mindbridge:connectivity-error', { 
                        detail: { message: "Cloud services are temporarily unreachable. Retrying..." } 
                    }));
                }
            }

            return Promise.reject(new Error(message));
        }

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            const finalMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Connection failed after multiple attempts';
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('mindbridge:connectivity-error', { 
                    detail: { message: "Connection lost. Please check your internet or try again later." } 
                }));
            }
            return Promise.reject(new Error(finalMessage));
        }

        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        const backoff = new Promise((resolve) => {
            const delay = Math.pow(2, config.__retryCount) * 1000; // 2s, 4s, 8s
            setTimeout(() => {
                resolve(null);
            }, delay);
        });

        // Return the promise in which recalls axios to retry the request
        await backoff;
        console.log(`[AXIOS] Retrying request (${config.__retryCount}/${config.retry}) for ${config.url}`);
        return axiosInstance(config);
    }
);

export default axiosInstance;
