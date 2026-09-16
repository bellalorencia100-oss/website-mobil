import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const KelolaUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hapusLoading, setHapusLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDataUser(response.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleTambahUser = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!editId) {
      axios
        .post("/api/auth/register", {
          username,
          password,
          email,
          fullName,
        })
        .then((response) => {
          alert(response.data.message);
          document.getElementById("modal_tambah_user").close();

          axios
            .get("/api/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setDataUser(response.data.users);
            });

          setUsername("");
          setPassword("");
          setEmail("");
          setFullName("");
          setRole("");
          setEditId(null);
          setIsSubmitting(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setPassword("");
          setIsSubmitting(false);
          setUsername("");
          setEmail("");
          setFullName("");
          setRole("");
          setPassword("");
          setIsSubmitting(false);
        });
    } else {
      axios
        .put(
          `/api/users/${editId}`,
          { username, email, fullName, role },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          alert(response.data.message);
          document.getElementById("modal_tambah_user").close();

          // langsung update baris user ini di tabel, tanpa perlu fetch ulang
          setDataUser((prevDataUser) =>
            prevDataUser.map((user) =>
              user.id === editId
                ? { ...user, username, email, fullName, role }
                : user,
            ),
          );

          setUsername("");
          setEmail("");
          setFullName("");
          setRole("");
          setEditId(null);
          setIsSubmitting(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setIsSubmitting(false);
        });
    }
  };

  const handleHapusUser = (id) => {
    if (window.confirm("yakin mau menghapus user id ini")) {
      setHapusLoading(true);
      axios
        .delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
          axios
            .get("/api/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setDataUser(response.data.users);
              setHapusLoading(false);
            });
        })

        .catch((error) => {
          alert(error.response.data.message);
          setHapusLoading(false);
        });
    }
  };
  const handleEditClick = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setFullName(user.fullName);
    setRole(user.role);
    setEditId(user.id);
    document.getElementById("modal_tambah_user").showModal();
  };

  return (
    <div className="w-full">
      {hapusLoading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <span className="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
      <div className="mb-4 md:hidden">
        <h1 className="text-xl font-extrabold text-gray-900">Kelola User</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          {dataUser.length} user terdaftar
        </p>
      </div>
      <button
        onClick={() => {
          setUsername("");
          setEmail("");
          setFullName("");
          setRole("");
          setPassword("");
          setEditId(null);
          document.getElementById("modal_tambah_user").showModal();
        }}
        className="btn bg-red-700 text-white hover:bg-red-800 w-full md:w-auto"
        id="btn-tambah-user"
      >
        + Tambah User
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <table className="w-full border-b hidden md:table">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">Role</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="btn btn-sm bg-red-700 text-white hover:bg-red-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleHapusUser(user.id)}
                      className="btn btn-sm bg-white text-red-700 border border-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex flex-col gap-3 md:hidden">
            {dataUser.map((user, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-3.5">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="min-w-0">
                    <p className="font-extrabold text-gray-900 text-[15px] truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      @{user.username}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex-shrink-0 ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {user.email}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="btn btn-sm bg-red-700 text-white hover:bg-red-800 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleHapusUser(user.id)}
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

      <dialog id="modal_tambah_user" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {editId ? "Edit User" : "Tambah User"}
          </h3>

          {isSubmitting ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <form onSubmit={handleTambahUser}>
              <label className="block mt-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full mt-2 text-gray-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label className="block mt-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full mt-2 text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="block mt-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama lengkap"
                className="input input-bordered w-full mt-2 text-gray-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <label className="block mt-1">Role</label>
              <input
                type="text"
                placeholder="Role"
                className="input input-bordered w-full mt-2 text-gray-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              {!editId && (
                <div>
                  <label>Password</label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="input input-bordered w-full pr-10 text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              )}

              <button className="btn bg-red-700 text-white hover:bg-red-800 mt-2">
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
export default KelolaUser;
