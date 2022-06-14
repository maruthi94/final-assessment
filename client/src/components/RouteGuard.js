import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

 const RouteGuard = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    if (!auth.isLoggedIn) {
        return <Navigate to="/login" state={{ location }} replace />;
    }

    return children;
};


export default RouteGuard; 