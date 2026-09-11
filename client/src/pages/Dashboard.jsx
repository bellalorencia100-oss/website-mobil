import { useState, useEffect } from "react";
import axios from "axios";
import { FaCar, FaTag, FaUsers, FaBoxOpen } from "react-icons/fa";

const Dashboard = () => {
  const [totalMobil, setTotalMobil] = useState(0);
  const [totalKategori, setTotalKategori] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalStok, setTotalStok] = useState(0);

  useEffect(() => {
    axios.get("/api/mobil").then((response) => {
      console.log(response.data.mobil.map((m) => m.stok));
      setTotalMobil(response.data.mobil.length);
      setTotalStok(
        response.data.mobil.reduce((akumulator, itemSekarang) => {
          return akumulator + itemSekarang.stok;
        }, 0),
      );
    });

    axios.get("/api/categories").then((response) => {
      setTotalKategori(response.data.categories.length);
    });
    axios.get("/api/users").then((response) => {
      setTotalUser(response.data.users.length);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-4 bg-gradient-to-b from-white to-red-50 rounded-lg shadow p-10 pb-10 relative">
        <div className="w-24 h-24 bg-red-600 flex items-center justify-center rounded-3xl">
          <FaCar className="text-white text-6xl" />
        </div>
        <div>
          <div className="text-gray-500 text-base font-bold">Total Mobil</div>
          <div className="text-5xl font-bold text-red-700 mt-1">
            {totalMobil}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Jumlah mobil terdaftar
          </div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <FaCar className="text-red-600 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gradient-to-b from-white to-red-50 rounded-lg shadow p-10 pb-10 relative">
        <div className="w-24 h-24 bg-red-600 flex items-center justify-center rounded-3xl">
          <FaTag className="text-white text-6xl" />
        </div>
        <div>
          <div className="text-gray-500 text-base font-bold">
            Total Kategori
          </div>
          <div className="text-5xl font-bold text-red-700 mt-1">
            {totalKategori}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Kategori mobil tersedia
          </div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <FaTag className="text-red-600 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gradient-to-b from-white to-red-50 rounded-lg shadow p-10 pb-10 relative">
        <div className="w-24 h-24 bg-red-600 flex items-center justify-center rounded-3xl">
          <FaUsers className="text-white text-6xl" />
        </div>
        <div>
          <div className="text-gray-500 text-base font-bold">Total User</div>
          <div className="text-5xl font-bold text-red-700 mt-1">
            {totalUser}
          </div>

          <div className="text-sm text-gray-500 mt-1">
            Jumlah user terdaftar
          </div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <FaUsers className="text-red-600 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gradient-to-b from-white to-red-50 rounded-lg shadow p-10 pb-10 relative">
        <div className="w-24 h-24 bg-red-600 flex items-center justify-center rounded-3xl">
          <FaBoxOpen className="text-white text-6xl" />
        </div>
        <div>
          <div className="text-gray-500 text-base font-bold">Total Stok</div>
          <div className="text-5xl font-bold text-red-700 mt-1">
            {totalStok}
          </div>
          <div className="text-sm text-gray-500 mt-1">Mobil siap dijual</div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <FaBoxOpen className="text-red-600 text-sm" />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
