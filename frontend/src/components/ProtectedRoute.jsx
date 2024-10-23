import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {useUser}  from "../context/UserContext"; // assuming you are using context for user

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useUser();
  console.log(loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/signin" />;
  }
  
  return element;
  
};

export default ProtectedRoute;
