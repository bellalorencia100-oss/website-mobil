import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { FaShieldAlt, FaTags, FaBolt, FaHeadset } from "react-icons/fa";
import bannerJualMobil from "../assets/banner-jual-mobil.png";

function JualMobil() {
  const [merek, setMerek] = useState("");
  const [model, setModel] = useState("");
  const [tahun, setTahun] = useState("");
  const [warna, setWarna] = useState("");
  const [transmisi, setTransmisi] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [namaKontak, setNamaKontak] = useState("");
  const [noHp, setNoHp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Terima kasih! Iklan Anda akan segera kami tinjau.");
  };

  const scrollKeForm = () => {
    document
      .getElementById("form-jual-mobil")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <button
        onClick={scrollKeForm}
        className="block w-full cursor-pointer transition hover:opacity-90"
      >
        <img
          src={bannerJualMobil}
          className="w-full h-auto"
          alt="Jual Mobil di MobilKu"
        />
      </button>

      <div className="max-w-4xl mx-auto px-3 py-8" id="form-jual-mobil">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 flex flex-col gap-3 bg-white rounded-lg shadow-sm border border-gray-100 p-5"
          >
            <h2 className="text-lg font-bold text-gray-900">
              Informasi Data Mobil
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Merek Mobil</label>
                <input
                  type="text"
                  placeholder="Contoh: Toyota"
                  className="input input-bordered w-full"
                  value={merek}
                  onChange={(e) => setMerek(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Model</label>
                <input
                  type="text"
                  placeholder="Contoh: Avanza"
                  className="input input-bordered w-full"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Tahun Produksi</label>
                <input
                  type="text"
                  placeholder="Contoh: 2021"
                  className="input input-bordered w-full"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Warna</label>
                <input
                  type="text"
                  placeholder="Contoh: Putih"
                  className="input input-bordered w-full"
                  value={warna}
                  onChange={(e) => setWarna(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Transmisi</label>
                <select
                  className="select select-bordered w-full"
                  value={transmisi}
                  onChange={(e) => setTransmisi(e.target.value)}
                >
                  <option value="">Pilih transmisi</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Kilometer</label>
                <input
                  type="text"
                  placeholder="Contoh: 50000"
                  className="input input-bordered w-full"
                  value={kilometer}
                  onChange={(e) => setKilometer(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Kondisi Mobil</label>
                <select
                  className="select select-bordered w-full"
                  value={kondisi}
                  onChange={(e) => setKondisi(e.target.value)}
                >
                  <option value="">Pilih kondisi</option>
                  <option value="Baik">Baik</option>
                  <option value="Perlu Servis">Perlu Servis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Harga Yang Diinginkan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 150000000"
                  className="input input-bordered w-full"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Deskripsi Singkat</label>
              <textarea
                placeholder="Ceritakan kondisi mobil Anda, riwayat servis, kelengkapan dokumen, dll"
                className="textarea textarea-bordered w-full"
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mt-2">
              Informasi Kontak
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Nama Anda</label>
                <input
                  type="text"
                  placeholder="Nama lengkap"
                  className="input input-bordered w-full"
                  value={namaKontak}
                  onChange={(e) => setNamaKontak(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  placeholder="Contoh: 081234567890"
                  className="input input-bordered w-full"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition"
            >
              Kirim Iklan
            </button>
          </form>

          <div className="flex flex-col gap-4">
            <div className="bg-red-50 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-3">
                Kenapa Jual di MobilKu?
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <FaShieldAlt className="text-red-700 mt-1" />
                  <div>
                    <p className="font-semibold">Aman &amp; Terpercaya</p>
                    <p className="text-gray-500">
                      Data Anda kami jaga kerahasiaannya.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaTags className="text-red-700 mt-1" />
                  <div>
                    <p className="font-semibold">Harga Terbaik</p>
                    <p className="text-gray-500">
                      Dapatkan penawaran harga yang kompetitif.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaBolt className="text-red-700 mt-1" />
                  <div>
                    <p className="font-semibold">Proses Cepat</p>
                    <p className="text-gray-500">
                      Cukup isi form, tim kami akan menghubungi Anda.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaHeadset className="text-red-700 mt-1" />
                  <div>
                    <p className="font-semibold">Tim Support</p>
                    <p className="text-gray-500">
                      Siap membantu Anda setiap saat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default JualMobil;
