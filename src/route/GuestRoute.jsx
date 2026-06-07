import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

function GuestRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        api
            .get("/auth/me")
            .then((res) => {
                const role = res.data.data.role;

                if (role === "admin") {
                    setRedirectPath("/admin/dashboard");
                } else {
                    setRedirectPath("/client/dashboard");
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}

export default GuestRoute;