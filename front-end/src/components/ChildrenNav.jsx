  import MenuItem from "./MenuItem";
  import PropTypes from "prop-types";

  const ChildrenNav = ({ items }) => {
    const currentDate = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <nav className="w-full bg-slate-900 flex gap-56  px-44 py-6 items-center sticky z-[999] top-0">
        <div>
          <h1 className="text-white font-medium">{currentDate}</h1>
        </div>

        <ul className="flex gap-15 justify-center">
          {items.map((item, index) => (
            <MenuItem key={index} label={item.label} path={item.path} submenu={item.submenu} />
          ))}
        </ul>
      </nav>
    );
  };

  ChildrenNav.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        submenu: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              path: PropTypes.string
            })
          ])
        ),
      })
    ).isRequired,
  };


  export default ChildrenNav;
