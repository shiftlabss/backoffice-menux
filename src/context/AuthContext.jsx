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
                // Mock Session Restore
                if (token === 'mock-jwt-token-dev-123') {
                    setUser({
                        id: 1,
                        name: 'Admin User',
                        email: 'admin@admin.com',
                        role: 'admin',
                        restaurant_id: 1
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
        // Check if mock mode is enabled via environment variable
        const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

        // Mock Login for Development (no backend required)
        if (useMockAuth) {
            if (email === 'admin@admin.com' && password === 'admin') {
                const mockUser = {
                    id: 1,
                    name: 'Admin User',
                    email: 'admin@admin.com',
                    role: 'admin',
                    restaurant_id: 1
                };
                const mockToken = 'mock-jwt-token-dev-123';

                localStorage.setItem('token', mockToken);
                setUser(mockUser);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                return;
            } else {
                // Invalid credentials in mock mode
                throw new Error('Invalid credentials');
            }
        }

        // Real API Login (requires backend)
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
        // Clean session and force redirect to clear any cached sensitive state
        window.location.href = '/login';
    };

    /**
     * trackAction handles the consistent execution of actions with audit logging and feedback.
     * Consistent with the Audit Lead's specification for actionId and feedback.
     */
    const trackAction = async (actionId, callback, options = {}) => {
        const {
            successToast = 'Ação realizada com sucesso',
            errorToast = 'Erro ao realizar ação',
            showFeedback = true
        } = options;

        try {
            // Placeholder for audit logging - in production this would call an API
            console.log(`[AUDIT] Action: ${actionId}`, { timestamp: new Date(), context: options.context });

            const result = await callback();

            // if (showFeedback) toast.success(successToast); // Integration with toast system
            return result;
        } catch (error) {
            console.error(`[AUDIT ERROR] Action: ${actionId}`, error);
            // if (showFeedback) toast.error(errorToast);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, forgotPassword, loading, trackAction, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
