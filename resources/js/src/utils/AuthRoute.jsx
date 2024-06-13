import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    return children;
};

export default AuthRoute;
