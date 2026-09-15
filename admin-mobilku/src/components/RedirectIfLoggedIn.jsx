import { Navigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user && user.role === "admin") {
    return <Navigate to="/admin" />;
  }
  return children;
};
export default RedirectIfLoggedIn;
