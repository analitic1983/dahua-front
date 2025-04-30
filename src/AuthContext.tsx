import React, { createContext, useState } from 'react';

interface AuthState {
    isAuthenticated: boolean;
}

interface AuthContextType {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false });

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};