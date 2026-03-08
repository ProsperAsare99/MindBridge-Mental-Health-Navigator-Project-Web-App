import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface User {
    id: string;
    email: string;
    name: string;
    institution?: string;
    studentId?: string;
    course?: string;
    phoneNumber?: string;
    displayName?: string; // For compatibility with existing UI
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = api.getToken();
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const userData = await api.get('/auth/me');
            setUser({
                ...userData,
                displayName: userData.name // Mapping for UI compatibility
            });
        } catch (error) {
            console.error('Failed to fetch user:', error);
            api.setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = () => {
        api.setToken(null);
        setUser(null);
    };

    return { user, loading, logout, refreshUser: fetchUser };
}
