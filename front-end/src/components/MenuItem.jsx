import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuItem = ({ label, path, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeout;

  return (
    <li
      className="relative cursor-pointer text-white  hover:text-red-500 group"
      onMouseEnter={() => {
        clearTimeout(timeout);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        timeout = setTimeout(() => setIsOpen(false), 200);
      }}
    >
      <div className="flex items-center gap-2.5">
        {path ? (
          <Link
            to={path}
            className="block"
            onClick={() => console.log(`"${label}" diklik, menuju: ${path}`)}
          >
            {label}
          </Link>
        ) : (
          <span>{label}</span>
        )}
        {submenu && <i className="bi bi-chevron-down"></i>}
      </div>

      {submenu && isOpen && (
        <ul
          className="absolute left-0 mt-2 w-40 bg-white text-slate-800 rounded-md shadow-lg z-50"
          onMouseEnter={() => {
            clearTimeout(timeout);
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            timeout = setTimeout(() => setIsOpen(false), 200);
          }}
        >
          {submenu.map((item, index) => (
            <li key={index} className="px-4 py-3 hover:text-sky-400">
              {typeof item === "string" ? (
                item
              ) : (
                <Link
                  to={item.path}
                  className="block"
                  onClick={() => console.log(`"${item.label}" diklik, menuju: ${item.path}`)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  submenu: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),
    ])
  ),
};

export default MenuItem;
