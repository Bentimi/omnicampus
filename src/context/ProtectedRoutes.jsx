import { Navigate } from "react-router";
import { useAuth } from "./AuthContext"


const ProtectedRoutes = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();


    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/login' replace />;
    }

    const userRole = user?.role?.toLowerCase();
    const hasPermission = allowedRoles.length === 0 || allowedRoles.map(r => r.toLowerCase()).includes(userRole)

    if (!hasPermission) {
        return <Navigate to='/unauthorized' replace />
    }
    return children;
}

export default ProtectedRoutes;