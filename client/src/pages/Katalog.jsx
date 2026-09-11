import { useState, useEffect } from "react";
import axios from "axios";
import MobilCard from "../components/MobilCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import pilihanfavorit from "../assets/pilihanfavorit.png";
import mobilkeluarga from "../assets/mobilkeluarga.png";
import tdprendah from "../assets/tdprendah.png";
import kmrendah from "../assets/kmrendah.png";
import FeatureCard from "../components/FeatureCard.jsx";
import { FaFileAlt, FaTags, FaBolt, FaUserTie } from "react-icons/fa";
import kualitasterbaik from "../assets/kualitasterbaik.png";
import dokumenterbaiik from "../assets/dokumenterbaiik.jpg";
import hargaterbaik from "../assets/hargaterbaik.png";
import customersenang from "../assets/customersenang.jpg";
import bantuantimahli from "../assets/bantuantimahli.png";
import Footer from "../components/Footer.jsx";
import FaqItem from "../components/FaqItem.jsx";
import { useSearchParams } from "react-router-dom";

function Katalog() {
  const [dataMobil, setDataMobil] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const merek = searchParams.get("merek");
  const search = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownTerbuka, setDropdownTerbuka] = useState(false);
  const [keyword, setKeyword] = useState(search || "");
  const itemsPerPage = 12;
  useEffect(() => {
    axios.get("/api/mobil").then((responses) => {
      setDataMobil(responses.data.mobil);
    });
  }, []);

  let mobilTerfilter = merek
    ? dataMobil.filter(
        (mobil) => mobil.merek?.toLowerCase() === merek.toLowerCase(),
      )
    : dataMobil;

  if (search) {
    mobilTerfilter = mobilTerfilter.filter((mobil) =>
      mobil.nama.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const totalPages = Math.ceil(mobilTerfilter.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const mobilHalamanIni = mobilTerfilter.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const nomorHalaman = Array.from(
    { length: totalPages },
    (nilai, index) => index + 1,
  );
  const dataFeature = [
    {
      image: kualitasterbaik,
      Icon: FaSearch,
      judul: "Kualitas Terjamin",
      deskripsi: "Setiap mobil melalui pemeriksaan menyeluruh sebelum dijual",
    },
    {
      image: dokumenterbaiik,
      Icon: FaFileAlt,
      judul: "Dokumen Lengkap & Legal",
      deskripsi: "Surat-surat kendaraan asli, lengkap, dan aman",
    },
    {
      image: hargaterbaik,
      Icon: FaTags,
      judul: "Harga Transparan",
      deskripsi: "Harga jujur tanpa biaya tersembunyi",
    },
    {
      image: customersenang,
      Icon: FaBolt,
      judul: "Proses Mudah & Cepat",
      deskripsi: "Transaksi jual beli mobil bekas jadi lebih praktis",
    },
    {
      image: bantuantimahli,
      Icon: FaUserTie,
      judul: "Bantuan Tim Ahli",
      deskripsi: "Tim kami siap membantu memilih mobil sesuai kebutuhan Anda",
    },
  ];

  const dataFaq = [
    {
      pertanyaan:
        "Apakah biaya balik nama sudah termasuk saat saya membeli mobil di MobilKu?",
      jawaban:
        "Anda dapat melakukan balik nama pada mobil yang sudah dibeli, namun biaya balik nama tidak ditanggung oleh pihak MobilKu dan menjadi tanggung jawab pembeli.",
    },

    {
      pertanyaan:
        "Apakah MobilKu menanggung biaya pajak tahunan mobil yang saya beli?",
      jawaban:
        "Pajak kendaraan menjadi tanggung jawab pembeli setelah proses serah terima selesai. Pastikan untuk mengecek masa berlaku pajak sebelum melakukan pembelian.",
    },

    {
      pertanyaan:
        "Bagaimana saya tahu pembayaran saya aman dilakukan ke MobilKu?",
      jawaban:
        "Semua transaksi resmi MobilKu hanya dilakukan melalui rekening dan metode pembayaran yang tertera resmi di website kami. Jika menemukan nomor rekening yang berbeda dari yang tertera, segera hubungi Customer Service kami di [Nomor Customer Service]. Waspadalah terhadap skema penipuan dan jangan bagikan informasi sensitif Anda kepada siapa pun.",
    },

    {
      pertanyaan: "Mengapa harus membeli mobil di MobilKu?",
      jawaban:
        "Kami menawarkan mobil bekas pilihan yang telah melalui pemeriksaan kualitas dan kelengkapan dokumen, dengan harga transparan dan proses yang mudah, sehingga Anda bisa membeli dengan lebih tenang",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-lg">
        <div className="max-w-4xl mx-auto mt-10 px-3 relative">
          <input
            type="text"
            placeholder="Cari mobil"
            className="input input-bordered w-full"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchParams(
                  merek ? { merek, search: keyword } : { search: keyword },
                );
              }
            }}
          />
          <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="max-w-4xl mx-auto px-3 relative mt-4">
          <div className="flex gap-2 overflow-x-auto justify-between">
            <button
              className="px-9 py-2 rounded-lg bg-red-700 border text-white text-sm font-semibold"
              onClick={() => setSearchParams({})}
            >
              Semua
            </button>
            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold"
              onClick={() => setSearchParams({ merek: "Toyota" })}
            >
              Toyota
            </button>

            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold"
              onClick={() => setSearchParams({ merek: "Honda" })}
            >
              Honda
            </button>

            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold"
              onClick={() => setSearchParams({ merek: "Mazda" })}
            >
              Mazda
            </button>

            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold"
              onClick={() => setSearchParams({ merek: "MG" })}
            >
              MG
            </button>

            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold"
              onClick={() => setSearchParams({ merek: "Lexus" })}
            >
              Lexus
            </button>

            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold"
              onClick={() => setSearchParams({ merek: "Bmw" })}
            >
              BMW
            </button>

            <button
              className="px-7 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-semibold flex items-center gap-1 relative"
              onClick={() => setDropdownTerbuka(!dropdownTerbuka)}
            >
              Lainnya
              <FaChevronDown className="text-xs" />
            </button>
          </div>
          {dropdownTerbuka && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-56 z-10">
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Byd" });
                  setDropdownTerbuka(false);
                }}
              >
                Byd
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Mercedes Benz" });
                  setDropdownTerbuka(false);
                }}
              >
                Mercedes Benz
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Hyundai" });
                  setDropdownTerbuka(false);
                }}
              >
                Hyundai
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Mitsubishi" });
                  setDropdownTerbuka(false);
                }}
              >
                Mitsubishi
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Chevrolet" });
                  setDropdownTerbuka(false);
                }}
              >
                Chevrolet
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Suzuki" });
                  setDropdownTerbuka(false);
                }}
              >
                Suzuki
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Nissan" });
                  setDropdownTerbuka(false);
                }}
              >
                Nissan
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Isuzu" });
                  setDropdownTerbuka(false);
                }}
              >
                Isuzu
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Dfsk" });
                  setDropdownTerbuka(false);
                }}
              >
                Dfsk
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Ford" });
                  setDropdownTerbuka(false);
                }}
              >
                Ford
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Jeep" });
                  setDropdownTerbuka(false);
                }}
              >
                Jeep
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Volkswagen" });
                  setDropdownTerbuka(false);
                }}
              >
                Volkswagen
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Mini" });
                  setDropdownTerbuka(false);
                }}
              >
                Mini
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Kia" });
                  setDropdownTerbuka(false);
                }}
              >
                Kia
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Wuling" });
                  setDropdownTerbuka(false);
                }}
              >
                Wuling
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Cherry" });
                  setDropdownTerbuka(false);
                }}
              >
                Cherry
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Gwm" });
                  setDropdownTerbuka(false);
                }}
              >
                Gwm
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Honda" });
                  setDropdownTerbuka(false);
                }}
              >
                Honda
              </div>
              <div
                className="px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded cursor-pointer"
                onClick={() => {
                  setSearchParams({ merek: "Baic" });
                  setDropdownTerbuka(false);
                }}
              >
                Baic
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:flex gap-3 mt-10 max-w-4xl mx-auto px-3">
        <button className="relative flex-1 h-28 rounded overflow-hidden">
          <img
            src={pilihanfavorit}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            Pilihan Favorit
          </span>
        </button>

        <button className="relative flex-1 h-28 rounded overflow-hidden">
          <img
            src={mobilkeluarga}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            Mobil Keluarga
          </span>
        </button>

        <button className="relative flex-1 h-28 rounded overflow-hidden">
          <img
            src={tdprendah}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            TDP Rendah
          </span>
        </button>
        <button className="relative flex-1 h-28 rounded overflow-hidden">
          <img
            src={kmrendah}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            Km Rendah
          </span>
        </button>
      </div>

      <section className="flex min-h-[100px] items-center justify-center bg-gradient-to-r bg-red-700 px-6 text-center text-white mt-3">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-3xl md:text-3xl">
            Katalog Mobil
          </h1>

          <p className="mt-2 text-lg text-red-100 sm:text-xl">
            Wujudkan mobil impian Anda bersama MobilKu
          </p>
        </div>
      </section>

      <div className="flex justify-between items-center px-3 max-w-4xl mx-auto mb-4">
        <h2 className="text-xl font-bold border-l-4 border-red-700 pl-3 mt-3">
          Daftar Promo
        </h2>
        <h2 className="text-xl font-bold pl-3 transition mt-3">
          Harga Menarik
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-3 mt-10">
        {mobilTerfilter.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FaCar className="text-5xl text-gray-300 mb-4" />
            <p className="text-lg font-bold text-gray-700">
              {merek
                ? `Belum ada mobil merek ${merek} saat ini`
                : search
                  ? `Mobil "${search}" tidak ditemukan`
                  : "Belum ada mobil yang tersedia"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Coba pilih merek lain atau cek kembali nanti ya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mobilHalamanIni.map((mobil, index) => (
              <MobilCard
                key={index}
                image={mobil.images?.[0]}
                nama={mobil.nama}
                tahun={mobil.tahun}
                harga={mobil.harga}
                id={mobil.id}
              />
            ))}
          </div>
        )}
      </div>

      <div className="join max-w-4xl mx-auto px-3 flex justify-center mt-5">
        {nomorHalaman.map((nomor) => (
          <input
            checked={currentPage === nomor}
            key={nomor}
            onChange={() => {
              setCurrentPage(nomor);
            }}
            className="join-item btn btn-sm checked:bg-red-700"
            type="radio"
            name="options"
            aria-label={nomor}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-4xl mx-auto py-6">
        {dataFeature.map((fitur, index) => (
          <FeatureCard
            key={index}
            image={fitur.image}
            Icon={fitur.Icon}
            judul={fitur.judul}
            deskripsi={fitur.deskripsi}
          />
        ))}
      </div>
      <div className="max-w-4xl mx-auto py-6">
        {dataFaq.map((faq, index) => (
          <FaqItem
            key={index}
            pertanyaan={faq.pertanyaan}
            jawaban={faq.jawaban}
          />
        ))}
      </div>
      <div className="text-center py-6">
        <div className="w-10 h-1 bg-red-700 mx-auto mb-3" />
        <h2 className="text-xl font-bold">FAQ lainnya</h2>
      </div>
      <Footer />
    </>
  );
}
export default Katalog;
