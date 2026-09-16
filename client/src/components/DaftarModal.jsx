import { useState } from "react";
import axios from "../api/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function DaftarModal({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email tidak boleh kosong");
    } else if (!emailRegex.test(value)) {
      setEmailError("Format email tidak valid, contoh: nama@gmail.com");
    } else {
      setEmailError("");
    }
  };

  const validateFullName = (value) => {
    if (!value) {
      setFullNameError("Nama lengkap tidak boleh kosong");
    } else if (value.trim().length < 3) {
      setFullNameError("Nama Lengkap Minimal 3 karakter");
    } else {
      setFullNameError("");
    }
  };

  const validateUsername = (value) => {
    if (!value) {
      setUsernameError("Username tidak boleh kosong");
    } else if (value.trim().length < 4) {
      setUsernameError("Username minimal 4 karakter");
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("password tidak boleh kosong");
    } else if (value.length < 6) {
      setPasswordError("Password minimal 6 karakter");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      setConfirmPasswordError("Konfirmasi password tidak boleh kosong");
    } else if (value !== password) {
      setConfirmPasswordError("Password dan konfirmasi password tidak cocok");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleDaftar = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password dan konfirmasi password tidak cocok");

      return;
    }
    setLoading(true);
    axios
      .post("/api/auth/register", {
        username,
        password,
        email,
        fullName,
      })

      .then((response) => {
        alert(response.data.message);
        document.getElementById("my_modal_2").close();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoggedIn(true);
      })

      .catch((error) => {
        alert(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-[92%] max-w-md max-h-[85vh] rounded-2xl overflow-y-auto md:w-11/12 md:max-w-lg md:max-h-[90vh] md:rounded-2xl">
        <h3 className="font-bold text-sm text-gray-500">Daftar</h3>
        <p className="py-2 text-sm text-gray-500">
          Daftar sekarang dan mulai jual beli mobil bersama MobilKu
        </p>
        <form className="flex flex-col gap-3 mt-4" onSubmit={handleDaftar}>
          <label className="block mt-1">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="input input-bordered w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={(e) => validateFullName(e.target.value)}
          />
          {fullNameError && (
            <p className="text-red-600 text-xs">{fullNameError}</p>
          )}
          <label className="block mt-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
          />
          {emailError && <p className="text-red-600 text-xs">{emailError}</p>}
          <label className="block mt-1">Username</label>

          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => validateUsername(e.target.value)}
          />
          {usernameError && (
            <p className="text-red-600 text-xs">{usernameError}</p>
          )}

          <label className="block mt-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validatePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-600 text-xs">{passwordError}</p>
          )}

          <label className="block mt-1">Konfirmasi Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              className="input input-bordered w-full pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => validateConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-red-600 text-xs">{confirmPasswordError}</p>
          )}

          <button
            className="btn bg-red-700 text-white hover:bg-red-800 transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Daftar"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-3">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => {
              document.getElementById("my_modal_2").close();
              document.getElementById("my_modal_1").showModal();
            }}
            className="text-red-700 font-semibold hover:underline"
          >
            Silakan login di sini
          </button>
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Tutup</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default DaftarModal;
