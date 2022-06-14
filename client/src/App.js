import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateAccountPage from './pages/CreateAccountPage';
import AuthProvider from './components/AuthProvider';
import RouteGuard from './components/RouteGuard';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <RouteGuard>
                                <HomePage />
                            </RouteGuard>
                        }
                    ></Route>
                    <Route path="/create-account" element={<CreateAccountPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
