// src/auth.ts
import { API_BASE_URL } from './config';

export const authProvider = {
    isAuthenticated: false,

    login: async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            if (data.success === true) {
                isAuthenticated = true; // Mark as authenticated
                return true;
            }

            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },

    logout: async () => {
        isAuthenticated = false;
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            if (data.success === true) {
                return true;
            }

            return false;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    },
};