import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

function AdminRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        api.get("/auth/me")
            .then((res) => {
                setRole(res.data.data.role);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setRole(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === false) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "admin") {
        return <Navigate to="/client/dashboard" replace />;
    }

    return children;
}

export default AdminRoute;