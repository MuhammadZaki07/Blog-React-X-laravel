import { Menu, LogOut } from "lucide-react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

function NavDash({ toggleSidebar }) {
  const { setUser, setToken,token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin logout?");
  
    if (!isConfirmed) {
      return;
    }
  
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/auth");
    } catch (error) {
      console.error("Logout gagal:", error);
  
      alert("Logout gagal. Silakan coba lagi.");
    }
  };
  
  return (
    <div className="bg-slate-900 text-white h-16 flex items-center justify-between px-4 fixed w-full z-1000">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-700 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-5 text-white hover:text-slate cursor-pointer"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}

NavDash.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default NavDash;
