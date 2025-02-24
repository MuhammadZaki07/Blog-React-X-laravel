import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"
import ChildrenNav from "./components/ChildrenNav";
import Footer from "./components/Footer";

const DefaultLayout = () => {
  const location = useLocation();

  // Mengecek apakah sedang berada di halaman login atau dashboard
  const isLoginPage = location.pathname === "/login";
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  const menuItems = [
    { label: "Beranda", path: "/" },
    { label: "Politik", path: "/politik" },
    { label: "Ekonomi", path: "/ekonomi" },
    { label: "Olahraga", path: "/olahraga" },
    { label: "Teknologi", path: "/teknologi" },
    { label: "Hiburan", path: "/hiburan" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar & ChildrenNav hanya ditampilkan jika bukan di halaman login atau dashboard */}
      {!isLoginPage && !isDashboardPage && (
        <>
          <Navbar />
          <ChildrenNav items={menuItems} />
        </>
      )}

      {/* Konten utama */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer hanya ditampilkan jika bukan di halaman login atau dashboard */}
      {!isLoginPage && !isDashboardPage && <Footer />}
    </div>
  );
};

export default DefaultLayout;
