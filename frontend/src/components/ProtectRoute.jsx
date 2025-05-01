import { Navigate } from "react-router-dom";

const ProtectRoute = ({children}) => {
  const isAuthenticated = document.cookie.includes('token=')
  console.log(isAuthenticated)
  if (!isAuthenticated){
    return <Navigate to="/login" replace />;
  } 
  return children;
};

export default ProtectRoute;
