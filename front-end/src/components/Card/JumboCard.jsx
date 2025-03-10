import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JumboCard = ({ image, title,create,view,slug }) => {
  return (
    <Link to={`detail-post/${slug}`} className="overflow-hidden relative">
      <img
        src={`http://127.0.0.1:8000/storage/${image}`}
        alt={title}
        className="w-full h-[450px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-10 left-5 z-10 flex flex-col gap-5 px-5">
        <h1 className="font-semibold text-4xl hover:underline text-slate-50 cursor-pointer">
          {title}
        </h1>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <i className="bi bi-calendar-event text-red-500"></i>
            <h1 className="text-gray-300 font-normal text-xs">
             {create}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <i className="bi bi-eye text-red-500"></i>
            <h1 className="text-gray-300 font-normal text-xs">{view} dilihat</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

JumboCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default JumboCard;
