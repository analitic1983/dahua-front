import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {React, useEffect, useContext} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import CamerasListPage from './pages/CamerasListPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from './AuthContext';
import {authProvider} from './auth'
import {RequireAuth} from './RequireAuth';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';


const queryClient = new QueryClient();

export default function App() {
    const {authState, setAuthState} = useContext(AuthContext);

    useEffect(() => {
        // Check if the user is already authenticated on app load (e.g., from localStorage)
        const checkAuth = async () => {
            const authenticated = authProvider.isAuthenticated;
            setAuthState(authenticated);
        };

        checkAuth();
    }, [setAuthState])

    return (
        <QueryClientProvider client={queryClient}>
            <div className="container">
                <RequireAuth>
                    <nav style={{marginBottom: '1rem'}}>
                        <Link to="/">CamerasList</Link> | <Link to="/about">About</Link>
                    </nav>
                </RequireAuth>

                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={<RequireAuth><DashboardPage/></RequireAuth>}/>
                    <Route path="/cameras" element={<RequireAuth><CamerasListPage/></RequireAuth>}/>
                    <Route path="/about" element={<RequireAuth><AboutPage/></RequireAuth>}/>
                </Routes>
            </div>
        </QueryClientProvider>
    );
}
