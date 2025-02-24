import ContentArticle from "./ContentArticle";

const PolitikArticle = () => {
  const ArticlePolitik = [
    {
      title: "DPR Bahas RUU Perlindungan Data Pribadi",
      description:
        "Dewan Perwakilan Rakyat (DPR) tengah membahas RUU Perlindungan Data Pribadi yang bertujuan untuk melindungi informasi pengguna dari penyalahgunaan.",
      image: "news-2.jpeg",
      date: "2025-02-20",
      category: "Politik",
    },
    {
      title: "Teknologi AI Semakin Canggih, Apa Dampaknya?",
      description:
        "Kemajuan kecerdasan buatan semakin pesat. Para ahli memperkirakan bahwa AI akan merevolusi berbagai industri, mulai dari kesehatan hingga manufaktur.",
      image: "news-2.jpeg",
      date: "2025-02-19",
      category: "Teknologi",
    },
    {
      title: "Gempa Bumi 6,5 SR Guncang Wilayah Jawa Barat",
      description:
        "Gempa bumi berkekuatan 6,5 skala Richter mengguncang Jawa Barat pada pagi hari ini. Badan Meteorologi dan Geofisika menyatakan tidak ada potensi tsunami.",
      image: "news-2.jpeg",
      date: "2025-02-18",
      category: "Nasional",
    },
  ];

  return (
    <section className="w-full bg-gray-100/[0.5] px-44 py-14">
      <div>
        <h1 className="text-5xl font-bold">Article Terbaru</h1>
        <div className="w-52 bg-red-500 h-0.5"></div>
      </div>
      <div className="w-full flex gap-5">
        <div className="flex flex-[3] flex-col gap-5 py-16">
          {ArticlePolitik.map((item, index) => (
            <ContentArticle
              key={index + 1}
              title={item.title}
              description={item.description}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10 w-96">
          <div className="bg-gray-100 flex-[1] rounded-xl w-full px-8 pt-10">
            <h1 className="text-xl font-bold">Kategori Populer</h1>
            <div className="flex flex-col gap-7 py-8">
              <div className="flex justify-between border-b items-center py-2 border-slate-400/[0.2]">
                <div className="flex gap-5 items-center">
                  <i className="bi bi-arrow-right text-red-500 font-bold"></i>
                  <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
                    Teknology
                  </h1>
                </div>
                <p className="font-light text-slate-700">(10)</p>
              </div>
              <div className="flex justify-between border-b items-center py-2 border-slate-400/[0.2]">
                <div className="flex gap-5 items-center">
                  <i className="bi bi-arrow-right text-red-500 font-bold"></i>
                  <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
                    Politik
                  </h1>
                </div>
                <p className="font-light text-slate-700">(10)</p>
              </div>
              <div className="flex justify-between border-b items-center py-2 border-slate-400/[0.2]">
                <div className="flex gap-5 items-center">
                  <i className="bi bi-arrow-right text-red-500 font-bold"></i>
                  <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
                    Ekonomi
                  </h1>
                </div>
                <p className="font-light text-slate-700">(10)</p>
              </div>
              <div className="flex justify-between border-b items-center py-2 border-slate-400/[0.2]">
                <div className="flex gap-5 items-center">
                  <i className="bi bi-arrow-right text-red-500 font-bold"></i>
                  <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
                    Hiburan
                  </h1>
                </div>
                <p className="font-light text-slate-700">(10)</p>
              </div>
              <div className="flex justify-between border-b items-center py-2 border-slate-400/[0.2]">
                <div className="flex gap-5 items-center">
                  <i className="bi bi-arrow-right text-red-500 font-bold"></i>
                  <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
                    Gaya Hidup
                  </h1>
                </div>
                <p className="font-light text-slate-700">(10)</p>
              </div>
              <div className="flex justify-between border-b items-center py-2 border-slate-400/[0.2]">
                <div className="flex gap-5 items-center">
                  <i className="bi bi-arrow-right text-red-500 font-bold"></i>
                  <h1 className="font-light text-slate-700 text-lg hover:text-red-500 cursor-pointer">
                    Teknology
                  </h1>
                </div>
                <p className="font-light text-slate-700">(10)</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 flex-[1] rounded-xl w-full px-8 pt-10">
            <h1 className="text-xl font-bold">Tag Populer</h1>
            <div className="grid grid-cols-3 gap-4 py-8">
              <button className="bg-slate-50 py-3 px-5 rounded-lg col-span-2 text-center font-light">
                Megatrush
              </button>
              <button className="bg-slate-50 py-3 px-5 rounded-lg text-center font-light">
                Gempa
              </button>
              <button className="bg-slate-50 py-3 px-5 rounded-lg text-center font-light">
                BMKG
              </button>
              <button className="bg-slate-50 py-3 px-5 rounded-lg text-center font-light">
                Politik
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolitikArticle;
