import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, token } = useContext(AuthContext);
  const direct = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <nav className="w-full bg-slate-900 flex justify-between px-32 py-4.5 items-center border-b border-b-slate-500/[0.5]">
      <div>
        <Link to="/">
          <img src="/assets/loger.png" className="w-64" alt="loger.png" />
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <form action="" className="relative">
          <input
            type="text"
            className="w-full rounded-lg border text-white font-normal border-slate-200/[0.5] py-2 px-4 pl-10 bg-slate-800 focus:outline-none"
            placeholder="Search"
          />
          <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </form>

        <div>
          {!token ? (
            <Link
              to="/auth"
              className="text-white py-1.5 px-4 rounded-lg text-lg hover:text-slate-300 cursor-pointer"
            >
              Masuk
            </Link>
          ) : (
            <Link
              to={direct}
              className="text-white py-1.5 px-4 rounded-lg text-lg hover:text-slate-300 cursor-pointer"
            >
              Dashboard <i className="bi bi-arrow-bar-right"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;