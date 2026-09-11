import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import showroomtoyota from "../assets/showroomtoyota.png";
import {
  FaCar,
  FaShieldAlt,
  FaFileAlt,
  FaBolt,
  FaTags,
  FaUpload,
  FaSearch,
  FaHeart,
  FaCommentDots,
} from "react-icons/fa";
const TentangKami = () => {
  const dataMisi = [
    "Menyediakan pilihan mobil bekas berkualitas dari berbagai merek, tipe, dan harga.",
    "Memberikan informasi kendaraan secara transparan, lengkap, dan mudah dipahami.",
    "Mempermudah proses jual beli mobil agar lebih praktis dan efisien.",
    "Membangun transaksi yang aman dan terpercaya bagi pembeli maupun penjual.",
    "Memberikan pengalaman terbaik kepada pengguna dalam mencari dan menjual kendaraan",
  ];

  const dataKeunggulan = [
    {
      Icon: FaCar,
      judul: "Pilihan Mobil Beragam",
      deskripsi: "Berbagai tipe dan merek mobil sesuai kebutuhan.",
    },
    {
      Icon: FaShieldAlt,
      judul: "Aman & Terpercaya",
      deskripsi: "Informasi kendaraan ditampilkan secara jelas dan transparan",
    },
    {
      Icon: FaFileAlt,
      judul: "Dokumen Lengkap",
      deskripsi: "Kami membantu memastikan kelengkapan dokumen kendaraan.",
    },
    {
      Icon: FaBolt,
      judul: "Proses Mudah & Cepat",
      deskripsi:
        "Proses mencari, menjual, dan membeli mobil dibuat lebih praktis.",
    },
    {
      Icon: FaTags,
      judul: "Harga Kompetitif",
      deskripsi: "Pilihan kendaraan dengan harga yang sesuai pasar.",
    },
  ];

  const dataLayanan = [
    { Icon: FaCar, label: "Beli Mobil Bekas" },
    { Icon: FaUpload, label: "Jual Mobil" },
    { Icon: FaSearch, label: "Cari Berdasarkan Kategori" },
    { Icon: FaFileAlt, label: "Detail Informasi Kendaraan" },
    { Icon: FaHeart, label: "Simpan Mobil Favorit" },
    { Icon: FaCommentDots, label: "Hubungi Penjual" },
  ];

  return (
    <>
      <Navbar />
      {/* tentang kami */}
      <section className="flex flex-col md:flex-row items-center max-w-6xl mx-auto px-6 py-10 gap-8">
        <div className="flex-1 text-left">
          <p className="text-red-700 text-xs font-bold tracking-wide mb-2">
            — TENTANG KAMI
          </p>

          <h1 className="text-3xl font-extrabold sm:text-3xl md:text-3xl">
            <span className="text-gray-900">Kami Hadir untuk</span>
            <br />
            <span className="text-red-700">Memudahkan Anda</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 sm:text-xl">
            Kami adalah platform jual beli mobil bekas yang membantu Anda
            menemukan mobil berkualitas dengan proses yang mudah, aman, dan
            terpercaya.
          </p>

          <div className="flex gap-3 justify-start mt-4">
            <button className="px-6 py-2 rounded-lg bg-red-700 text-white text-sm font-semibold">
              Cari Mobil
            </button>
            <button className="px-6 py-2 rounded-lg border border-red-700 text-red-700 text-sm font-semibold">
              Jual Mobil
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div
            className="absolute -top-4 -right-4 w-[92%] h-[92%] bg-red-700 rounded-lg"
            style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0% 85%)" }}
          ></div>

          <img
            src={showroomtoyota}
            alt="Showroom Mobilku"
            className="w-full h-60 rounded-lg object-cover relative"
          ></img>
          <div className="absolute -left-5 -bottom-5 z-10 bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg max-w-[220px]">
            <div className="w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center flex-shrink-0">
              <FaCar />
            </div>
            <p className="text-xs font-bold text-gray-900">
              Mobil Berkualitas untuk Masa Depan Anda
            </p>
          </div>
        </div>
      </section>
      {/* visi misi  */}
      <section className="max-w-5xl mx-auto px-6 py-14 text-center">
        <p className="text-red-700 text-xs font-bold tracking-wide mb-3">
          — VISI & MISI
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 max-w-2xl mx-auto">
          Bersama Mewujudkan Transaksi Mobil Bekas{" "}
          <span className="text-red-700">yang Lebih Baik</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-6 text-left">
          <div className="flex-1 bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-9 text-white shadow-xl">
            <div className="w-12 h-12 rounded-full bg-white text-red-700 flex items-center justify-center text-xl mb-5 shadow-lg">
              👁️
            </div>
            <h3 className="text-lg font-extrabold mb-3">Visi</h3>
            <p className="text-sm text-red-100 leading-relaxed">
              Menjadi platform jual beli mobil bekas yang terpercaya dan pilihan
              utama masyarakat dalam menemukan kendaraan berkualitas.
            </p>
          </div>

          <div className="flex-1 bg-white rounded-2xl p-9 shadow-lg border border-red-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xl mb-5">
              🎯
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-4">Misi</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {dataMisi.map((misi, index) => (
                <li
                  key={index}
                  className="flex gap-3 border-b border-dashed border-red-100 pb-3"
                >
                  <span className="w-5 h-5 rounded bg-red-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  {misi}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* keunggulan */}
      <section className="max-w-6xl mx-auto px-6 py-14 text-center">
        <p className="text-red-700 text-xs font-bold tracking-wide mb-3">
          — KENAPA MEMILIH KAMI
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Keunggulan <span className="text-red-700">yang Kami Tawarkan</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {dataKeunggulan.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-md border border-red-50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg">
                <item.Icon />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900 mb-2">
                {item.judul}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* layanan */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-1 text-left">
            <p className="text-red-700 text-xs font-bold tracking-wide mb-3">
              — LAYANAN KAMI
            </p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              Apa Saja yang Kami Tawarkan?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Kami menyediakan berbagai layanan untuk memudahkan Anda dalam
              mencari, menjual, dan membeli mobil bekas.
            </p>
            <button className="bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg">
              Lihat Semua Mobil →
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dataLayanan.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white border border-red-50 rounded-xl px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-lg">
                    <item.Icon />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.label}
                  </span>
                </div>
                <span className="text-red-700 text-lg">›</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative flex items-center min-h-[220px] px-6 py-14"
        style={{
          backgroundImage: `linear-gradient(rgba(17,17,17,0.75), rgba(17,17,17,0.75)), url(${showroomtoyota})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <p className="text-xs font-bold tracking-wide mb-3 text-red-400">
                KOMITMEN KAMI
              </p>
              <h2 className="text-white text-3xl font-extrabold">
                Kepercayaan Anda Adalah Prioritas Kami
              </h2>
            </div>
            <div className="hidden md:block border-white/20 self-stretch border-l"></div>
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed">
                Kami berkomitmen memberikan informasi kendaraan yang jelas dan
                membantu pengguna mendapatkan pengalaman jual beli mobil bekas
                yang lebih mudah, nyaman, dan terpercaya.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-red-800 to-red-600 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-extrabold mb-2">
              Temukan Mobil Impianmu Hari Ini
            </h2>

            <p className="text-red-100 text-sm">
              Jelajahi berbagai pilihan mobil bekas dan temukan kendaraan yang
              sesuai dengan kebutuhan dan budget kamu.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-red-700 px-6 py-3 rounded-lg text-sm font-bold shadow-lg">
              Cari Mobil
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg text-sm font-bold">
              Jual Mobil
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default TentangKami;
