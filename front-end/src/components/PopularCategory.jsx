import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

function PopularCategory({ name, qount,link }) {
  const { categoryName } = useParams();
  return (
    <Link to={`/category/${link}`} className={`flex justify-between border-b items-center py-2 border-slate-400/[0.2] ${categoryName === name ? "border-b border-b-red-500" : ""}`}>
      <div className="flex gap-5 items-center">
        <i className="bi bi-arrow-right text-red-500 font-bold"></i>
        <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
          {name}
        </h1>
      </div>
      <p className="font-light text-slate-700">({qount})</p>
    </Link>
  );
}

PopularCategory.propTypes = {
  name: PropTypes.string.isRequired,
  qount: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default PopularCategory;
