import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const sudahDiperingatkan = useRef(false);

  useEffect(() => {
    if (!user && !sudahDiperingatkan.current) {
      sudahDiperingatkan.current = true;
      alert("Silakan daftar atau login terlebih dahulu");
      setTimeout(() => {
        document.getElementById("my_modal_1")?.showModal();
      }, 100);
    }
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default RequireAuth;
