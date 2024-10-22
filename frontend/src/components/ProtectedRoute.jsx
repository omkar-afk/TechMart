import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {useUser}  from "../context/UserContext"; // assuming you are using context for user

const ProtectedRoute = ({ element }) => {
    const {user} = useUser();

  // If user is not logged in, redirect to the signin page
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // If user is logged in, render the component
  return element;
};

export default ProtectedRoute;
