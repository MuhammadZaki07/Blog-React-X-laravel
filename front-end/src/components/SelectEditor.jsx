const SelectEditor = () => {
  return (
    <section className="w-full bg-gray-200/[0.5] px-44 py-14">
      <div>
        <h1 className="text-5xl font-bold">Pilihan Editor</h1>
        <div className="w-52 bg-red-500 h-0.5"></div>
      </div>
      <div className="grid grid-cols-3 gap-5 py-16">
        <div className="w-full">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/assets/news-1.jpg"
              alt="news.jpg"
              className="h-56 w-full object-cover"
            />
            <h1 className="absolute left-5 top-8 text-white bg-red-500 rounded-lg py-2 px-3 font-light text-sm">
              Gaya Hidup
            </h1>
          </div>
          <div className="flex gap-5 items-center py-5">
            <img src="/assets/user.png" alt="user.png" className="w-10 rounded-full" />
            <h1 className="font-normal text-slate-500 text-lg underline">
              Jhon doe
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-lg font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              perferendis.
            </h1>
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <i className="bi bi-calendar-event text-red-500"></i>
                <h1 className="text-gray-500 font-normal text-xs">
                  5 desember 2024
                </h1>
              </div>
              <div className="flex gap-2 items-center">
                <i className="bi bi-eye text-red-500"></i>
                <h1 className="text-gray-500 font-normal text-xs">
                  100 dilihat
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <button className="w-1/6 hover:bg-red-500 transition-all duration-500 ease-in-out hover:text-white text-red-500 font-medium py-4 rounded-lg cursor-pointer">
        Lihat lainnya <i className="bi bi-arrow-right"></i>
      </button>
      </div>
    </section>
  );
};

export default SelectEditor;
