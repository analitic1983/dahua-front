import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const { authState } = useContext(AuthContext);

    if (!authState) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" />;
    }

    return <>{children}</>; // Render the children if authenticated
};
