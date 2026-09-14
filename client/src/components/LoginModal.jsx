import { useState } from "react";
import axios from "../api/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginModal({ setLoggedIn }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateIdentifier = (value) => {
    if (!value) {
      setIdentifierError("Email atau username tidak boleh kosong");
    } else {
      setIdentifierError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password tidak boleh kosong");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/login", {
        password,
        identifier,
      })

      .then((response) => {
        alert(response.data.message);
        document.getElementById("my_modal_1").close();
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

  const handleGoToDaftar = () => {
    document.getElementById("my_modal_1").close();
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-700">Login</h3>
        <p className="py-2 text-sm text-gray-500">Masuk Ke Akun Mobilku</p>
        <form className="flex flex-col gap-3 mt-4" onSubmit={handleLogin}>
          <label className="block mt-1">Email atau Username</label>
          <input
            type="text"
            placeholder="email atau username"
            className="input input-bordered w-full"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onBlur={(e) => validateIdentifier(e.target.value)}
          />
          {identifierError && (
            <p className="text-red-600 text-xs">{identifierError}</p>
          )}

          <label className="block mt-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
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

          <button
            className="btn bg-red-700 text-white hover:bg-red-800 transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={handleGoToDaftar}
              className="text-red-700 font-semibold hover:underline cursor-pointer"
            >
              Daftar di sini
            </button>
          </p>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Tutup</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default LoginModal;
