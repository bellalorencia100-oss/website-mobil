import Navbar from "../components/Navbar.jsx";
import Banner from "../components/banner.jsx";
import SearchBox from "../components/SearchBox.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import FaqItem from "../components/FaqItem.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaCar,
  FaHandshake,
  FaHeadset,
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaTags,
  FaBolt,
  FaUserTie,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import MobilCard from "../components/MobilCard.jsx";

//foto logo merek mobil
import byd from "../assets/byd.png";
import mercedesbenz from "../assets/mercedesbenz.png";
import hyundai from "../assets/hyundai.png";
import mitsubishi from "../assets/mitsubishi.png";
import chevrolet from "../assets/chevrolet.png";
import nissan from "../assets/nissan.png";
import suzuki from "../assets/suzuki.png";
import isuzu from "../assets/isuzu.png";
import logomazda from "../assets/logomazda.png";
import volkswagen from "../assets/volkswagen.png";
import bmw from "../assets/bmw.png";
import mini from "../assets/mini.png";
import kia from "../assets/kia.png";
import lexus from "../assets/lexus.png";
import dfsk from "../assets/dfsk.png";
import ford from "../assets/ford.png";
import mg from "../assets/mg.png";
import jeep from "../assets/jeep.png";
import wuling from "../assets/wuling.png";
import cherry from "../assets/cherry.png";
import gwm from "../assets/gwm.png";
import Honda from "../assets/Honda.png";
import baic from "../assets/baic.png";

//foto etalase produk mobil
import logotoyota from "../assets/logotoyota.png";

//foto logo penilaian pemilik website
import kualitasterbaik from "../assets/kualitasterbaik.png";
import dokumenterbaiik from "../assets/dokumenterbaiik.jpg";
import hargaterbaik from "../assets/hargaterbaik.png";
import customersenang from "../assets/customersenang.jpg";
import bantuantimahli from "../assets/bantuantimahli.png";

import CategoryCard from "../components/CategoryCard.jsx";

function Home() {
  const [dataMobil, setDataMobil] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);
  useEffect(() => {
    axios.get("/api/mobil").then((response) => {
      setDataMobil(response.data.mobil);
    });

    axios.get("/api/categories").then((response) => {
      setDataKategori(response.data.categories);
    });
  }, []);

  const getImageUrl = (icon) => {
    if (!icon) return "";
    if (icon.startsWith("http")) return icon;
    return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${icon}`;
  };

  //gambar penilaian terbaik
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

  //FAQ
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
      <div className="relative pb-40">
        <Banner />
        <div className="absolute top-[46%] left-[1%] md:left-[14.6%] w-[98%] md:w-[70.5%] md:top-[85%]">
          <SearchBox />
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto mt-60 md:mt-16">
        <p className="text-red-700 text-xs font-bold tracking-wide mb-2">
          — PILIH MEREK
        </p>
        <h2 className="text-2xl font-extrabold text-gray-900">
          Cari Berdasarkan <span className="text-red-700">Merek Favorit</span>
        </h2>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-8 mt-6 md:mt-10 max-w-4xl mx-auto">
        <CategoryCard name="Byd" logo={byd} />
        <CategoryCard name="Mercedes Benz" logo={mercedesbenz} />
        <CategoryCard name="Hyundai" logo={hyundai} />
        <CategoryCard name="Toyota" logo={logotoyota} />
        <CategoryCard name="Mitsubishi" logo={mitsubishi} />
        <CategoryCard name="Chevrolet" logo={chevrolet} />
        <CategoryCard name="Suzuki" logo={suzuki} />
        <CategoryCard name="Nissan" logo={nissan} />
        <CategoryCard name="Isuzu" logo={isuzu} />
        <CategoryCard name="Mazda" logo={logomazda} />
        <CategoryCard name="Dfsk" logo={dfsk} />
        <CategoryCard name="Ford" logo={ford} />
        <CategoryCard name="MG" logo={mg} />
        <CategoryCard name="Jeep" logo={jeep} />
        <CategoryCard name="Volkswagen" logo={volkswagen} />
        <CategoryCard name="Bmw" logo={bmw} />
        <CategoryCard name="Mini" logo={mini} />
        <CategoryCard name="Kia" logo={kia} />
        <CategoryCard name="Lexus" logo={lexus} />
        <CategoryCard name="Wuling" logo={wuling} />
        <CategoryCard name="Cherry" logo={cherry} />
        <CategoryCard name="Gwm" logo={gwm} />
        <CategoryCard name="Honda" logo={Honda} />
        <CategoryCard name="Baic" logo={baic} />
      </div>

      {dataKategori.length > 0 && (
        <>
          <div className="text-center max-w-4xl mx-auto mt-14 md:mt-16">
            <p className="text-red-700 text-xs font-bold tracking-wide mb-2">
              — PILIH KATEGORI
            </p>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Cari Berdasarkan{" "}
              <span className="text-red-700">Kategori Mobil</span>
            </h2>
          </div>
          <div className="flex flex-nowrap justify-center items-start gap-x-5 md:gap-x-8 overflow-x-auto px-4 mt-6 md:mt-10 max-w-4xl mx-auto">
            {dataKategori.map((kategori) => (
              <div key={kategori.id} className="shrink-0 scale-80 md:scale-100">
                <CategoryCard
                  name={kategori.name}
                  logo={getImageUrl(kategori.icon)}
                  categoryId={kategori.id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-2 md:flex md:justify-center gap-8 max-w-4xl mx-auto py-6">
        <div className="flex items-center justify-center gap-2">
          <FaShieldAlt className="text-red-600 text-2xl" />
          <div>
            <h3 className="font-semibold text-sm">Aman & Terpercaya</h3>
            <p className="text-xs text-gray-500">Transaksi Lebih Aman</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <FaCar className="text-red-600 text-2xl" />
          <div>
            <h3 className="font-semibold text-sm">Pilihan Terlengkap</h3>
            <p className="text-xs text-gray-500">Mobil Baru & Bekas</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <FaHandshake className="text-red-600 text-2xl" />
          <div>
            <h3 className="font-semibold text-sm">Proses Mudah</h3>
            <p className="text-xs text-gray-500">Cepat Dan Praktis</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <FaHeadset className="text-red-600 text-2xl" />
          <div>
            <h3 className="font-semibold text-sm">Layanan 24/7</h3>
            <p className="text-xs text-gray-500">Siap Membantu</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-2 max-w-4xl mx-auto mb-4">
        <h2 className="text-xl font-bold border-l-4 border-red-700 pl-3">
          <Link to="/katalog">Mobil Pilihan</Link>
        </h2>
        <Link
          to="/katalog"
          className="text-red-700 text-sm font-semibold hover:underline transition"
        >
          Lihat Semua
        </Link>
      </div>
      {/* section mobilcard */}
      <div className="grid grid-cols-2 md:grid-cols-4 px-3 gap-4 max-w-4xl mx-auto">
        {dataMobil.slice(0, 4).map((mobil, index) => (
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

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-red-700 rounded-lg max-w-4xl mx-auto my-8 px-8 py-6">
        <div className="flex items-center gap-4">
          <FaCar className="text-white text-3xl" />
          <div>
            <h3 className="text-white font-bold text-lg">
              Ingin Menjual Mobil Anda?
            </h3>
            <p className="text-red-100 text-sm">
              Pasang Iklan Gratis Dan Temukan Pembeli Dengan Cepat!
            </p>
          </div>
        </div>
        <Link
          to="/jual-mobil"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-red-700 font-semibold px-5 py-2 rounded hover:bg-red-100 transition whitespace-nowrap"
        >
          <FaPlus />
          Jual Mobil Sekarang
        </Link>
      </div>
      <div className="bg-red-50">
        <div className="bg-red-700 py-6 mb-6">
          <h2 className="text-3xl font-bold text-center text-white">
            Kenapa Pilih Mobilku?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-4xl mx-auto py-6 ">
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
      </div>
      <div className="text-center py-6">
        <div className="w-10 h-1 bg-red-700 mx-auto mb-3" />
        <h2 className="text-2xl font-bold">FAQ</h2>
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

export default Home;
