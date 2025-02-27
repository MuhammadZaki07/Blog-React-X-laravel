import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardMedium = ({image,category,title,create,view,slug}) => {
  return (
    <Link to={`detail-post/${slug}`} className="card-1">
      <div className="overflow-hidden relative">
        <img
          src={`http://127.0.0.1:8000/storage/${image}`}
          alt={title}
          className="w-full h-60 object-cover rounded-lg"
        />
        <div className="absolute top-8 left-5 bg-red-500 text-white text-lg px-6 py-1 rounded-md font-light">
          {category}
        </div>
      </div>

      <div className=" flex flex-col gap-3 py-3 w-4/5">
        <h1 className="text-lg font-semibold hover:underline cursor-pointer">
          {title}
        </h1>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <i className="bi bi-calendar-event text-red-500"></i>
            <h1 className="text-slate-500 font-normal text-xs">
              {create}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <i className="bi bi-eye text-red-500"></i>
            <h1 className="text-slate-500 font-normal text-xs">{view} dilihat</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

CardMedium.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default CardMedium;
