import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { useState, useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    setIsSubmitting(true);

    axios
      .post("/api/auth/login", { identifier: username, password })
      .then((response) => {
        if (response.data.user.role !== "admin") {
          setError("Akun ini tidak memiliki akses ke panel admin");
          setIsSubmitting(false);
          return;
        }
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/admin");
      })

      .catch((error) => {
        setError(
          error.response?.data?.message || "Username atau password salah",
        );
        setIsSubmitting(false);
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-6 overflow-hidden bg-white">
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <span className="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
      <div
        className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-br from-red-600 to-red-900"
        style={{ clipPath: "ellipse(75% 100% at 50% 0%)" }}
      />

      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl px-6 pb-6 md:px-9 md:pb-9">
        <div className="text-center">
          <div className="w-[68px] h-[68px] rounded-full bg-red-700 flex items-center justify-center mx-auto -mt-[34px] mb-4 shadow-lg border-4 border-white">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Mobilku</h1>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">
            Panel Administrator
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Selamat Datang Kembali
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Masuk untuk mengakses dashboard admin
          </p>
        </div>

        {error && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 text-sm">
                Username / Email
              </span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="w-4 h-4 text-red-600 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username / Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 text-sm">
                Password
              </span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                className="w-4 h-4 text-red-600 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="cursor-pointer text-gray-400 shrink-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  className="w-[17px] h-[17px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-red-700 hover:bg-red-800 text-white w-full mt-6 disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
