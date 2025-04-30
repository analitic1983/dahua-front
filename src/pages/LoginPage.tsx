import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authProvider } from '@/auth';
import { useContext } from 'react';
import { AuthContext } from '@/AuthContext';

export default () => {
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const success = await authProvider.login(username, password);
        if (success) {
            setAuthState(true); // Update authentication state
            navigate('/'); // Redirect to the dashboard
        } else {
            setErrorMessage('Invalid credentials, please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};