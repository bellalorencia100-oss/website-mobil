import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profil = () => {
  const [fullName, setFullName] = useState("");
  const [noHp, setNoHp] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const user = response.data.user;
        setFullName(user.fullName);
        setNoHp(user.noHp || "");
        setuserName(user.username);
        setEmail(user.email);
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .put(
        `/api/auth/profile`,
        { fullName, noHp },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        alert(response.data.message);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = { ...storedUser, fullName, noHp };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("password baru dan konfirmasi password tidak cocok");
      return;
    }
    setIsChangingPassword(true);
    axios
      .put(
        "/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        alert(response.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        alert(error.response.data.message);
      })
      .finally(() => {
        setIsChangingPassword(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Profil Saya</h1>
        <p className="text-sm text-gray-500 mb-6">
          Kelola data akun kamu di Mobilku.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col gap-3"
        >
          <label className="block mt-1">Username</label>
          <input
            type="text"
            value={username}
            disabled
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />

          <label className="block mt-1">Email</label>
          <input
            type="text"
            value={email}
            disabled
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />

          <label className="block mt-1">Nama Lengkap</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input input-bordered w-full"
          />

          <label className="block mt-1">Nomor Whats App</label>
          <input
            type="text"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            placeholder="Contoh: 081234567890"
            className="input input-bordered w-full"
          />

          <button
            className="btn bg-red-700 text-white hover:bg-red-800 transition mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Simpan Perubahan"
            )}
          </button>
        </form>
        <form
          onSubmit={handleChangePassword}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col gap-3 mt-6"
        >
          <h2 className="text-lg font-bold text-gray-900">Ubah Password</h2>
          <label className="block mt-1">Password Lama</label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Masukkan password lama"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label className="block mt-1">Password Baru</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan password baru"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label className="block mt-1">Konfirmasi Password Baru</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Masukkan password baru"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            className="btn bg-red-700 text-white hover:bg-red-800 transition mt-2"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Konfirmasi perubahan"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profil;
