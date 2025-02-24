import PropTypes from "prop-types";

const CardMini = ({ image, title,category }) => {
  return (
    <div className="card-2 flex gap-5 items-center">
      <div>
        <img
          src={`/assets/${image}`}
          className="w-full h-32 rounded-lg object-cover"
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-sky-500 text-lg font-light">{category}</div>
        <div className=" flex flex-col gap-3 w-72">
          <h1 className="text-sm font-medium hover:underline cursor-pointer">
            {title}
          </h1>
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <i className="bi bi-calendar-event text-red-500"></i>
              <h1 className="text-slate-500 font-normal text-xs">
                4 oktober 2025
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <i className="bi bi-eye text-red-500"></i>
              <h1 className="text-slate-500 font-normal text-xs">100</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardMini.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardMini;
