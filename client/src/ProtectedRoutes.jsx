import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet} from "react-router-dom";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet/>;
}

export default ProtectedRoutes;
