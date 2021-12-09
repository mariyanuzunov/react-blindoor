import { Navigate } from 'react-router-dom';
import { useAuth } from '../../firebase';

export default function RequireGuest({ children }) {
    const user = useAuth();

    if (!user) {
        return children;
    }

    return <Navigate to='/' />;
}
