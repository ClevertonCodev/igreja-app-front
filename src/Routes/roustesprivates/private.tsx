import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute( {isLogged}:any  ){
  
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;