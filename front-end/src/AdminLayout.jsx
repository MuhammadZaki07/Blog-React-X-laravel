import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/user/Sidebar";
import NavDash from "./components/user/NavDash";
import { BookOpen, LayoutDashboard, Tags, User, UserCircle } from "lucide-react";
import { MdCategory } from "react-icons/md";
import { GrArticle } from "react-icons/gr";

const AdminLayout = () => {
  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { title: "Article", icon: <BookOpen size={20} />, path: "/admin/my-article" },
    { title: "Category", icon: <MdCategory size={20} />, path: "/admin/category" },
    { title: "Tags", icon: <Tags size={20} />, path: "/admin/tags" },
    { title: "Data User", icon: <User size={20} />, path: "/admin/data-user" },
    { title: "Data Article", icon: <GrArticle size={20} />, path: "/admin/data-article" },
    { title: "Profile", icon: <UserCircle size={20} />, path: "/admin/profile" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
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

export default AdminLayout;
