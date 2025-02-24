import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MediaSocial = ({ icon }) => {
  return (
    <Link>
      <div className="w-10 h-10 rounded-full text-white border border-slate-300/[0.5] flex items-center justify-center hover:scale-115 transition-all duration-300 ease-in-out">
        <i className={`bi ${icon} text-sm`}></i>
      </div>
    </Link>
  );
};

MediaSocial.propTypes = {
  icon: PropTypes.string,
};

export default MediaSocial;
