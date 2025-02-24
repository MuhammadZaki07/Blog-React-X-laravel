import PropTypes from "prop-types";

const ContentArticle = ({image,title,category,description}) => {
  return (
    <div className="card w-full flex items-center">
      <div className="relative">
      <img
          src={`/assets/${image}`}
          className="w-full h-full rounded-lg object-cover"
          alt={title}
        />
        <h1 className="absolute text-white top-5 left-5 bg-red-500 rounded-lg text-sm py-2 px-4">
          {category}
        </h1>
      </div>
      <div className="flex flex-col gap-3 w-full px-10">
        <h1 className="font-semibold text-lg">
          {title}
        </h1>
        <p className="font-light text-sm text-slate-500 text-wrap text-justify w-4/5">
          {description}
        </p>
        <div className="flex gap-4">
          <div className="flex gap-4 w-1/5 items-center">
            <img src="/assets/user.png" alt="user.png" className="w-8 rounded-full" />
            <a
              href="#"
              className="text-xs text-slate-500 underline hover:text-red-500 cursor-pointer"
            >
              Jhon Doe
            </a>
          </div>
          <div className="flex gap-5 w-5/4">
            <div className="flex gap-2 items-center">
              <i className="bi bi-calendar-event text-red-500"></i>
              <h1 className="text-slate-500 font-normal text-xs">
                5 desember 2025
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <i className="bi bi-eye text-red-500"></i>
              <h1 className="text-slate-500 font-normal text-xs">
                100 dilihat
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContentArticle.propTypes = {
    image:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    category:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
}

export default ContentArticle;
