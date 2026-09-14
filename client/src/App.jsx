import Admin from "./pages/Admin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import KelolaMobil from "./pages/KelolaMobil.jsx";
import KelolaKategori from "./pages/KelolaKategori.jsx";
import KelolaUser from "./pages/KelolaUser.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Katalog from "./pages/Katalog.jsx";
import TentangKami from "./pages/TentangKami.jsx";
import DetailMobil from "./pages/DetailMobil.jsx";
import BukaDiHp from "./pages/BukaDiHp.jsx";
import JualMobil from "./pages/JualMobil.jsx";
import Profile from "./pages/Profil.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/mobil/:id" element={<DetailMobil />} />
        <Route path="/buka-di-hp" element={<BukaDiHp />} />
        <Route
          path="/jual-mobil"
          element={
            <RequireAuth>
              <JualMobil />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="mobil" element={<KelolaMobil />} />
          <Route path="kategori" element={<KelolaKategori />} />
          <Route path="user" element={<KelolaUser />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
