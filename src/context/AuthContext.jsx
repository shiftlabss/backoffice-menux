import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // MOCK AUTH: Check for mock token first
                if (token === 'mock-token-admin-123') {
                    setUser({
                        id: 'mock-admin-id',
                        name: 'Admin User',
                        email: 'admin@admin.com',
                        role: 'admin',
                        restaurant_id: 'mock-restaurant-id'
                    });
                    setLoading(false);
                    return;
                }

                try {
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        // MOCK AUTH: Bypass backend for specific credentials
        if (email === 'admin@admin.com' && password === 'admin') {
            console.log("Using Mock Auth for Admin");
            const mockToken = 'mock-token-admin-123';
            localStorage.setItem('token', mockToken);
            setUser({
                id: 'mock-admin-id',
                name: 'Admin User',
                email: 'admin@admin.com',
                role: 'admin',
                restaurant_id: 'mock-restaurant-id'
            });
            return;
        }

        const response = await api.post('/auth/login', { email, password });
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        const userResponse = await api.get('/auth/me');
        setUser(userResponse.data);
    };

    const forgotPassword = async (email) => {
        await api.post('/auth/forgot-password', { email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, forgotPassword, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
