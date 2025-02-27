import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChildrenNav from "./components/ChildrenNav";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const DefaultLayout = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const isLoginPage = location.pathname === "/login";
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const menuItems = [
    { label: "Beranda", path: "/" },
    ...categories.map((category) => ({
      label: category.name,
      path: `/category/${category.name.toLowerCase()}`,
    })),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && !isDashboardPage && (
        <>
          <Navbar />
          <ChildrenNav items={menuItems} />
        </>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      {!isLoginPage && !isDashboardPage && <Footer />}
    </div>
  );
};

export default DefaultLayout;
