import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { FaCar, FaTag, FaUsers, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalMobil, setTotalMobil] = useState(0);
  const [totalKategori, setTotalKategori] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalStok, setTotalStok] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    Promise.allSettled([
      axios.get("/api/mobil"),
      axios.get("/api/categories"),
      axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]).then(([mobilResult, kategoriResult, userResult]) => {
      if (mobilResult.status === "fulfilled") {
        const response = mobilResult.value;
        setTotalMobil(response.data.mobil.length);
        setTotalStok(
          response.data.mobil.reduce((akumulator, itemSekarang) => {
            return akumulator + itemSekarang.stok;
          }, 0),
        );
      }

      if (kategoriResult.status === "fulfilled") {
        setTotalKategori(kategoriResult.value.data.categories.length);
      }

      if (userResult.status === "fulfilled") {
        setTotalUser(userResult.value.data.users.length);
      } else {
        console.log(userResult.reason);
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <p className="text-sm text-gray-500 mt-1">
          Selamat datang kembali!{" "}
          <span className="text-red-600 font-medium">
            Kelola data mobil kamu dengan mudah di sini.
          </span>
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/mobil"
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-gradient-to-b from-white to-red-50 rounded-2xl md:rounded-lg shadow p-4 md:p-10 md:pb-10 relative transition hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-11 h-11 md:w-24 md:h-24 bg-red-600 flex items-center justify-center rounded-2xl md:rounded-3xl mb-1 md:mb-0">
              <FaCar className="text-white text-lg md:text-6xl" />
            </div>

            <div>
              <div className="text-gray-500 text-[11px] md:text-base font-bold">
                Total Mobil
              </div>
              <div className="text-2xl md:text-5xl font-bold text-red-700 mt-1">
                {totalMobil}
              </div>
              <div className="text-[10px] md:text-sm text-gray-500 mt-1">
                Jumlah mobil terdaftar
              </div>
            </div>
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FaCar className="text-red-600 text-[10px] md:text-sm" />
            </div>
          </Link>

          <Link
            to="/admin/kategori"
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-gradient-to-b from-white to-red-50 rounded-2xl md:rounded-lg shadow p-4 md:p-10 md:pb-10 relative transition hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-11 h-11 md:w-24 md:h-24 bg-red-600 flex items-center justify-center rounded-2xl md:rounded-3xl mb-1 md:mb-0">
              <FaTag className="text-white text-lg md:text-6xl" />
            </div>
            <div>
              <div className="text-gray-500 text-[11px] md:text-base font-bold">
                Total Kategori
              </div>
              <div className="text-2xl md:text-5xl font-bold text-red-700 mt-1">
                {totalKategori}
              </div>
              <div className="text-[10px] md:text-sm text-gray-500 mt-1">
                Kategori mobil tersedia
              </div>
            </div>
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FaTag className="text-red-600 text-[10px] md:text-sm" />
            </div>
          </Link>

          <Link
            to="/admin/user"
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-gradient-to-b from-white to-red-50 rounded-2xl md:rounded-lg shadow p-4 md:p-10 md:pb-10 relative transition hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-11 h-11 md:w-24 md:h-24 bg-red-600 flex items-center justify-center rounded-2xl md:rounded-3xl mb-1 md:mb-0">
              <FaUsers className="text-white text-lg md:text-6xl" />
            </div>
            <div>
              <div className="text-gray-500 text-[11px] md:text-base font-bold">
                Total User
              </div>
              <div className="text-2xl md:text-5xl font-bold text-red-700 mt-1">
                {totalUser}
              </div>

              <div className="text-[10px] md:text-sm text-gray-500 mt-1">
                Jumlah user terdaftar
              </div>
            </div>
            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FaUsers className="text-red-600 text-[10px] md:text-sm" />
            </div>
          </Link>

          <Link
            to="/admin/mobil"
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-gradient-to-b from-white to-red-50 rounded-2xl md:rounded-lg shadow p-4 md:p-10 md:pb-10 relative transition hover:shadow-lg hover:-translate-y-1"
          >
            <div className="w-11 h-11 md:w-24 md:h-24 bg-red-600 flex items-center justify-center rounded-2xl md:rounded-3xl mb-1 md:mb-0">
              <FaBoxOpen className="text-white text-lg md:text-6xl" />
            </div>
            <div>
              <div className="text-gray-500 text-[11px] md:text-base font-bold">
                Total Stok
              </div>
              <div className="text-2xl md:text-5xl font-bold text-red-700 mt-1">
                {totalStok}
              </div>
              <div className="text-[10px] md:text-sm text-gray-500 mt-1">
                Mobil siap dijual
              </div>
            </div>

            <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FaBoxOpen className="text-red-600 text-[10px] md:text-sm" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
