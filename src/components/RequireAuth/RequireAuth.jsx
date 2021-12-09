import { Navigate } from 'react-router-dom';

export default function RequireAuth({ user, requireAdmin, children }) {
    if (requireAdmin && user?.isAdmin) {
        return children;
    } else if (requireAdmin && user) {
        return <Navigate to='/' />;
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' />;
}
