import { Menu, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';

function NavDash({ toggleSidebar }) { 
  return (
    <div className="bg-slate-900 text-white h-16 flex items-center justify-between px-4 fixed w-full z-1000">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-700 rounded-lg">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <button className="flex items-center gap-2 px-5 text-white hover:text-slate cursor-pointer">
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
