import {
  FaUser,
  FaPhoneAlt,
  FaMobileAlt,
  FaHome,
  FaCar,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import LoginModal from "./LoginModal.jsx";
import DaftarModal from "./DaftarModal.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [username, setUsername] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setLoggedIn(true);
    }
    if (storedUser) {
      setUserName(storedUser.fullName);
      setUsername(storedUser.username);
    }
  }, [isLoggedIn]);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(" ").filter(Boolean);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handleMenuClick = (path) => (e) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
      document.getElementById("my-drawer-1").checked = false;
    }, 400);
  };

  return (
    <nav>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="flex justify-end gap-4 bg-red-500 text-white text-sm px-6 py-1">
            <span className="hidden md:flex items-center gap-1">
              <FaPhoneAlt />
              Telepon: 082176957132
            </span>
            <span className="flex items-center gap-1">
              <Link
                to="/buka-di-hp"
                className="flex items-center gap-1 hover:underline hover:text-red-100 transition"
              >
                <FaMobileAlt />
                Dapatkan Aplikasi
              </Link>
            </span>
          </div>
          <div className="flex justify-start md:justify-between gap-3 md:gap-0 bg-red-700 items-center px-6 py-2 md:py-3">
            <label htmlFor="my-drawer-1" className="md:hidden">
              <RxHamburgerMenu className="text-white text-2xl" />
            </label>

            <h1 className="text-white text-3xl font-bold font-explora">
              <Link to="/">MobilKu</Link>
            </h1>

            <ul className="hidden md:flex gap-6 list-none text-white md:mx-auto">
              <li>
                <Link to="/" onClick={handleMenuClick("/")}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/katalog" onClick={handleMenuClick("/katalog")}>
                  Katalog
                </Link>
              </li>
              <li>
                <Link
                  to="/tentang-kami"
                  onClick={handleMenuClick("/tentang-kami")}
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>

            <div className="flex ml-auto md:ml-0 gap-3">
              {isLoggedIn ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <div className="w-8 h-8 rounded-full bg-white text-red-700 flex items-center justify-center text-xs font-bold">
                      {getInitials(userName)}
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-1 w-64 p-2 shadow-md text-red-700"
                  >
                    <li className="mb-2 pb-2 border-b border-gray-100">
                      <div className="flex items-center gap-3 px-2 py-1 hover:bg-transparent cursor-default">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {getInitials(userName)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {userName}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            @{username}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="hover:bg-red-50 active:bg-red-100 rounded-lg transition text-red-700"
                      >
                        Profil Saya
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/profile"
                        className="hover:bg-red-50 active:bg-red-100 rounded-lg transition text-red-700"
                      >
                        Pengaturan Akun
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/6282176957132"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-red-50 active:bg-red-100 rounded-lg transition text-red-700"
                      >
                        Pusat Bantuan
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition"
                      >
                        <FaSignOutAlt />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <button
                    className="px-4 py-2 rounded border border-white text-white font-semibold hover:bg-white hover:text-red-700 transition"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Login
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-white text-red-700 font-semibold hover:bg-red-100 transition"
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                  >
                    Daftar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-red-700 text-white min-h-full w-64 p-4 gap-6">
            <li>
              <Link
                to="/"
                onClick={handleMenuClick("/")}
                className="hover:bg-red-800 active:bg-red-800 rounded-lg transition"
              >
                <FaHome />
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/katalog"
                onClick={handleMenuClick("/katalog")}
                className="hover:bg-red-800 active:bg-red-800 rounded-lg transition"
              >
                <FaCar />
                Katalog
              </Link>
            </li>
            <li>
              <Link
                to="/tentang-kami"
                onClick={handleMenuClick("/tentang-kami")}
                className="hover:bg-red-800 active:bg-red-800 rounded-lg transition"
              >
                <FaInfoCircle />
                Tentang Kami
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <LoginModal setLoggedIn={setLoggedIn} />
      <DaftarModal setLoggedIn={setLoggedIn} />
      {isNavigating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <span className="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
