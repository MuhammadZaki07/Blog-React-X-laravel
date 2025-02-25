import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen,menuItems }) => {
  const {pathname} = useLocation();

  return (
    <div className={`bg-slate-900 fixed h-full transition-all duration-300 ${isOpen ? "w-72" : "w-0 -translate-x-full"}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-white text-xl font-bold">Menu</h2>
        </div>
        <div className={`flex-1 p-4 ${isOpen ? "block" : "hidden"}`}>
          {menuItems.map((item, index) => {
            const isActive = pathname == item.path;
            return (
              <a
                key={index}
                href={item.path}
                className={`flex items-center gap-3 text-white p-3 rounded-lg transition-colors mb-2 ${
                  isActive ? "bg-red-500" : "hover:bg-red-500"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen:PropTypes.bool.isRequired,
  menuItems:PropTypes.array.isRequired,
}

export default Sidebar;
