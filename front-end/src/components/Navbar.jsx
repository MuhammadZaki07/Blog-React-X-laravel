import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 flex justify-between px-32 py-4.5 items-center border-b border-b-slate-500/[0.5]">
      <div>
        <Link to={"/"}>
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
          <Link to={`/auth`} className="bg-red-700 py-1.5 px-4 text-white rounded-lg text-lg hover:bg-red-600 cursor-pointer">
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
