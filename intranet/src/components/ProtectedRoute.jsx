import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirigir a login si no está autenticado
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
