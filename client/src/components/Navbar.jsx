import {
  FaUser,
  FaPhoneAlt,
  FaMobileAlt,
  FaHome,
  FaCar,
  FaInfoCircle,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import LoginModal from "./LoginModal.jsx";
import DaftarModal from "./DaftarModal.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
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
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/katalog">Katalog</Link>
              </li>
              <li>
                <Link to="/tentang-kami">Tentang Kami</Link>
              </li>
            </ul>
            <div className="flex ml-auto md:ml-0 gap-3">
              {isLoggedIn ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <FaUser className="text-white text-1xl" />
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-1 w-40 p-2 shadow-md text-red-700"
                  >
                    <li>
                      <a
                        onClick={handleLogout}
                        className="hover:bg-red-50 active:bg-red-100 rounded-lg transition"
                      >
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
                className="hover:bg-red-800 active:bg-red-800 rounded-lg transition"
              >
                <FaHome />
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/katalog"
                className="hover:bg-red-800 active:bg-red-800 rounded-lg transition"
              >
                <FaCar />
                Katalog
              </Link>
            </li>
            <li>
              <Link
                to="/tentang-kami"
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
      <DaftarModal />
    </nav>
  );
}
export default Navbar;
