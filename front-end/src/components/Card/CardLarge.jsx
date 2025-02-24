import PropTypes from "prop-types";

const CardLarge = ({image,title,category,description}) => {
  return (
    <div className="card-2 flex gap-5 py-7">
      <div className="relative w-52 h-52 flex-shrink-0">
        <img
          src={`/assets/${image}`}
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
          <p className="font-extralight text-slate-700 text-wrap text-lg">
            {description}
          </p>
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
            <h1 className="text-slate-500 font-normal text-xs">100 dilihat</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

CardLarge.propTypes = {
    image:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    category:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
}

export default CardLarge;
