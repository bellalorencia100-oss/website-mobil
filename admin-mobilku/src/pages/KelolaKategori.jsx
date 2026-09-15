import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const KelolaKategori = () => {
  const [dataKategori, setDataKategori] = useState([]);
  const [nama, setNama] = useState("");
  const [icon, setIcon] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setDataKategori(response.data.categories);
      setIsLoading(false);
    });
  }, []);

  const token = localStorage.getItem("token");

  const handleTambahKategori = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nama);
    formData.append("icon", icon);

    setIsSubmitting(true);

    if (!editId) {
      axios
        .post("/api/categories", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          document.getElementById("modal_tambah_kategori").close();
          axios.get("/api/categories").then((response) => {
            setDataKategori(response.data.categories);
          });
          setNama("");
          setIcon(null);
          setEditId(null);
          setIsSubmitting(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setIsSubmitting(false);
        });
    } else {
      axios
        .put(`/api/categories/${editId}`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          document.getElementById("modal_tambah_kategori").close();
          axios.get("/api/categories").then((response) => {
            setDataKategori(response.data.categories);
          });
          setNama("");
          setIcon(null);
          setEditId(null);
          setIsSubmitting(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setIsSubmitting(false);
        });
    }
  };

  const handleHapusKategori = (id) => {
    if (window.confirm("yakin mau hapus kategori ini")) {
      axios
        .delete(`/api/categories/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          axios.get("/api/categories").then((response) => {
            setDataKategori(response.data.categories);
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  };

  const handleEditClick = (kategori) => {
    setNama(kategori.name);
    setEditId(kategori.id);
    document.getElementById("modal_tambah_kategori").showModal();
  };

  const getImageUrl = (icon) => {
    if (!icon) return "";
    if (icon.startsWith("http")) return icon;
    return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${icon}`;
  };

  return (
    <div className="w-full">
      <div className="mb-4 md:hidden">
        <h1 className="text-xl font-extrabold text-gray-900">
          Kelola Kategori
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {dataKategori.length} kategori terdaftar
        </p>
      </div>

      <button
        onClick={() => {
          setNama("");
          setIcon(null);
          setEditId(null);
          document.getElementById("modal_tambah_kategori").showModal();
        }}
        className="btn bg-red-700 text-white hover:bg-red-800 w-full md:w-auto"
        id="btn-tambah-kategori"
      >
        + Tambah Kategori
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <table className="w-full border-b hidden md:table">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Icon</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataKategori.map((kategori, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={getImageUrl(kategori.icon)}
                      alt={kategori.name}
                      className="w-28 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{kategori.name}</td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(kategori)}
                        className="btn bg-red-700 text-white hover:bg-red-800 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleHapusKategori(kategori.id)}
                        className="btn bg-white text-red-700 border border-red-700 rounded-lg"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex flex-col gap-3 md:hidden">
            {dataKategori.map((kategori, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3"
              >
                <img
                  src={getImageUrl(kategori.icon)}
                  alt={kategori.name}
                  className="w-20 h-16 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-base truncate">
                    {kategori.name}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(kategori)}
                    className="btn btn-sm bg-red-700 text-white hover:bg-red-800 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleHapusKategori(kategori.id)}
                    className="btn btn-sm bg-white text-red-700 border border-red-700 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <dialog id="modal_tambah_kategori" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-700 mb-1">
            {editId ? "Edit Kategori" : "Tambah Kategori"}
          </h3>
          {isSubmitting ? (
            <div className="flex justify-center items-center h-40 bg-black/10 rounded-lg">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <form onSubmit={handleTambahKategori}>
              <input
                type="file"
                onChange={(e) => setIcon(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
              <label className="block mt-1">Nama Kategori</label>
              <input
                type="text"
                placeholder="Nama Kategori"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered w-full mt-1 text-gray-400"
              />
              <button className="btn bg-red-700 text-white hover:bg-red-800 mt-1">
                Submit
              </button>
            </form>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Tutup</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default KelolaKategori;
