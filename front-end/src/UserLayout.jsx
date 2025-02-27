import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/user/Sidebar";
import NavDash from "./components/user/NavDash";
import { BookOpen, LayoutDashboard, UserCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const UserLayout = () => {
  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/user/dashboard" },
    { title: "Article", icon: <BookOpen size={20} />, path: "/user/my-article" },
    { title: "Profile", icon: <UserCircle size={20} />, path: "/user/profile" },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const {token,user} = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isEditArtikelPage = location.pathname.includes(
    "/dashboard/editartikel"
  );


  return (
    <div className="flex h-screen">
      {!isEditArtikelPage && <Sidebar isOpen={isSidebarOpen} menuItems={menuItems}/>}

      <div className="flex-1 flex flex-col">
        {!isEditArtikelPage && <NavDash toggleSidebar={toggleSidebar} />}

        <div
          className={`flex-1 ${!isEditArtikelPage ? "mt-16" : ""} ${
            isSidebarOpen && !isEditArtikelPage ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
