import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-7xl font-extrabold text-red-700 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>
        <Link
          to="/"
          className="bg-red-700 text-white font-semibold px-6 py-2 rounded hover:bg-red-800 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </>
  );
}
export default NotFound;
