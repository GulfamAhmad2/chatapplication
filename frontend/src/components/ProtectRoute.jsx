import { Navigate } from "react-router-dom";

const ProtectRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated){
    return <Navigate to="/login" replace />;
  } 
  return children;
};

export default ProtectRoute;
