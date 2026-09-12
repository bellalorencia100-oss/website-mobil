import { useState } from "react";
import axios from "../api/axiosInstance";

function LoginModal({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email tidak boleh kosong");
    } else if (!emailRegex.test(value)) {
      setEmailError("Format email tidak valid");
    } else {
      setEmailError("");
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
        email,
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

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-700">Login</h3>
        <p className="py-2 text-sm text-gray-500">Masuk Ke Akun Mobilku</p>
        <form className="flex flex-col gap-3 mt-4" onSubmit={handleLogin}>
          <label className="block mt-1">Email</label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
          />
          {emailError && <p className="text-red-600 text-xs">{emailError}</p>}

          <label className="block mt-1">Password</label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => validatePassword(e.target.value)}
          />
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
