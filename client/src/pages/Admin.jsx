import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-red-700 text-white p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Mobilku</h1>
        <ul className="list-none flex flex-col gap-2">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "btn bg-white text-red-700 w-full mb-1"
                  : "btn bg-red-700 text-white hover:bg-red-800 w-full mb-1"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/mobil"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-white text-red-700 w-full mb-1"
                  : "btn bg-red-700 text-white hover:bg-red-800 w-full mb-1"
              }
            >
              Kelola Mobil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/kategori"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-white text-red-700 w-full mb-1"
                  : "btn bg-red-700 text-white hover:bg-red-800 w-full mb-1"
              }
            >
              Kelola Kategori
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-white text-red-700 w-full mb-1"
                  : "btn bg-red-700 text-white hover:bg-red-800 w-full mb-1"
              }
            >
              Kelola User
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};
export default Admin;
