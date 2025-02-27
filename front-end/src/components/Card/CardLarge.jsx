import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardLarge = ({ image, title, category, description,create,view,slug }) => {
  return (
    <Link to={`detail-post/${slug}`} className="card-2 flex gap-5 py-7">
      <div className="relative w-52 h-52 flex-shrink-0">
        <img
          src={`http://127.0.0.1:8000/storage/${image}`}
          className="w-full h-full rounded-lg object-cover"
          alt={title}
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white text-sm px-4 py-2 rounded-md font-medium">
          {category}
        </div>
      </div>

      <div className="flex flex-col gap-5 flex-1 py-3">
        <div className="flex flex-col gap-3 w-72">
          <h1 className="text-lg font-semibold text-black text-wrap">
            {title}
          </h1>
          <p
            className="font-extralight text-slate-700 text-wrap text-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>

        <div className="flex gap-5 w-5/4">
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

CardLarge.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardLarge;
