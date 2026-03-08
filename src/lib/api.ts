const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
    private token: string | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('token');
        }
    }

    setToken(token: string | null) {
        this.token = token;
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }
    }

    getToken() {
        return this.token;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${API_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'API Request failed');
        }

        return response.json();
    }

    async get(endpoint: string) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint: string, body: any) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }
}

export const api = new ApiClient();
