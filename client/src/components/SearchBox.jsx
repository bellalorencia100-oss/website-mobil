import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";
import pilihanfavorit from "../assets/pilihanfavorit.png";
import mobilkeluarga from "../assets/mobilkeluarga.png";
import tdprendah from "../assets/tdprendah.png";
import kmrendah from "../assets/kmrendah.png";

function SearchBox() {
  const [KataKunci, setKatakunci] = useState("");
  const [historiPencarian, sethistoriPencarian] = useState([]);
  const [pencarianFokus, setPencarianFokus] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const pencarianTeratas = [
    "Honda Brio",
    "Honda Jazz",
    "Toyota Avanza",
    "Toyota yaris",
    "Honda Mobilio",
    "Honda Civic",
    "Honda HR-V",
    "Toyota Agya",
    "Toyota Fortuner",
    "Toyota Kijang innova",
  ];

  useEffect(() => {
    function tanganKlikDiluar(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setPencarianFokus(false);
      }
    }
    document.addEventListener("mousedown", tanganKlikDiluar);
    return () => {
      document.removeEventListener("mousedown", tanganKlikDiluar);
    };
  }, []);

  useEffect(() => {
    const dataTersimpan = localStorage.getItem("historiPencarian");
    if (dataTersimpan) {
      sethistoriPencarian(JSON.parse(dataTersimpan));
    }
  }, []);

  function simpanPencarian(kataKunci) {
    const historiBaru = [kataKunci, ...historiPencarian];
    sethistoriPencarian(historiBaru);
    localStorage.setItem("historiPencarian", JSON.stringify(historiBaru));
  }

  function hapusHistori() {
    sethistoriPencarian([]);
    localStorage.removeItem("historiPencarian");
  }

  return (
    <div
      ref={boxRef}
      className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto md:-mt-28"
    >
      <div className="flex gap-2 md:hidden mb-4">
        <button
          className="flex-1 px-4 py-2 rounded border bg-red-700 text-white transition hover:bg-red-800"
          onClick={() => navigate("/katalog")}
        >
          Beli Mobil
        </button>
        <button
          className="flex-1 px-4 py-2 rounded border bg-white text-red-700 border-red-700 transition hover:bg-red-50"
          onClick={() => navigate("/jual-mobil")}
        >
          Jual Mobil
        </button>
      </div>

      <h1 className="hidden md:block text-xl font-bold text-gray-800 mb-3">
        Beli Mobil
      </h1>
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari mobil menurut merek, model, atau kata kunci"
          className="w-full border rounded pl-8 pr-4 py-2"
          value={KataKunci}
          onChange={(e) => setKatakunci(e.target.value)}
          onFocus={() => setPencarianFokus(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/katalog?search=${KataKunci}`);
              simpanPencarian(KataKunci);
            }
          }}
        />
      </div>

      {pencarianFokus && (
        <div className="border-t pt-3 mb-4">
          {historiPencarian.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-700 mb-2">
                  Histori Pencarian
                </p>
                <FaTrash
                  className="text-xs text-black cursor-pointer"
                  onClick={hapusHistori}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {historiPencarian.map((item, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer"
                    onClick={() => {
                      setKatakunci(item);
                      simpanPencarian(item);
                      navigate(`/katalog?search=${item}`);
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-bold text-gray-700 mb-2">
            Pencarian Teratas 🔥
          </p>
          <div className="flex flex-wrap gap-2">
            {pencarianTeratas.map((item, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer"
                onClick={() => {
                  setKatakunci(item);
                  simpanPencarian(item);
                  navigate(`/katalog?search=${item}`);
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:flex gap-3 mt-4 ">
        <button className="relative flex-1 h-24 rounded overflow-hidden">
          <img
            src={pilihanfavorit}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            Pilihan Favorit
          </span>
        </button>

        <button className="relative flex-1 h-24 rounded overflow-hidden">
          <img
            src={mobilkeluarga}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            Mobil Keluarga
          </span>
        </button>

        <button className="relative flex-1 h-24 rounded overflow-hidden">
          <img
            src={tdprendah}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            TDP Rendah
          </span>
        </button>
        <button className="relative flex-1 h-24 rounded overflow-hidden">
          <img
            src={kmrendah}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <span className="absolute top-1 left-2 text-sm font-semibold text-black">
            Km Rendah
          </span>
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
