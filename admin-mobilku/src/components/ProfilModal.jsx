import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const ProfilModal = ({ onClose }) => {
  const [profil, setProfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfil(response.data.user);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data profil");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50" />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-red-700">Profil Saya</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>

        {isLoading && <p className="text-sm text-gray-500">Memuat data...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {profil && (
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs text-gray-500">Nama Lengkap</p>
              <p className="text-sm font-semibold text-gray-800">
                {profil.fullName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Username</p>
              <p className="text-sm font-semibold text-gray-800">
                {profil.username}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-semibold text-gray-800">
                {profil.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">No HP</p>
              <p className="text-sm font-semibold text-gray-800">
                {profil.noHp || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm font-semibold text-gray-800 capitalize">
                {profil.role}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilModal;
