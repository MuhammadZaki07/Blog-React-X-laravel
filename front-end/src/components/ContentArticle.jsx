import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ContentArticle = ({
  image,
  title,
  category,
  description,
  author,
  create_at,
  views,
  slug
}) => {
  return (
    <Link to={`${slug}`} className="card w-full flex items-center">
      <div className="relative">
        <img
          src={`http://127.0.0.1:8000/storage/${image}`}
          className="w-64 h-40 rounded-lg object-cover"
          alt={title}
        />

        <h1 className="absolute text-white top-5 left-5 bg-red-500 rounded-lg text-sm py-2 px-4">
          {category}
        </h1>
      </div>
      <div className="flex flex-col gap-3 w-full px-10">
        <h1 className="font-semibold text-lg">{title}</h1>
        <p
          className="font-light text-sm text-slate-500 text-wrap text-justify w-4/5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>

        <div className="flex gap-4 w-full">
          <div className="flex gap-4 w-1/2 items-center">
            <img
              src="/assets/user.png"
              alt="user.png"
              className="w-8 rounded-full"
            />
            <a
              href="#"
              className="text-xs text-slate-500 underline hover:text-red-500 cursor-pointer"
            >
              {author}
            </a>
          </div>
          <div className="flex gap-5 w-5/4">
            <div className="flex gap-2 items-center">
              <i className="bi bi-calendar-event text-red-500"></i>
              <h1 className="text-slate-500 font-normal text-xs">
                {create_at}
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <i className="bi bi-eye text-red-500"></i>
              <h1 className="text-slate-500 font-normal text-xs">
                {views} dilihat
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ContentArticle.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ContentArticle;
