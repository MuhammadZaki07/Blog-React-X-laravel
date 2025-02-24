import CardLarge from "./Card/CardLarge";
import CardOne from "./Card/CardMedium";
import CardMini from "./Card/CardMini";
import JumboCard from "./Card/JumboCard";

const Header = () => {
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  const News = {
    CardOne: {
      image: "news-1.jpg",
      category: "Politik",
      title:
        "DPR Sahkan UU Minerba, Ormas dan UMKM Dapat Kelonggaran Garap Tambang",
    },
    CardTwo: {
      image: "news-2.jpeg",
      category: "Politik",
      title:
        "Komisi VII DPR Tinjau Kinerja Lembaga Penyiaran di Sumatera Utara",
    },
    CardThree: {
      image: "news-3.jpeg",
      title:
        "DPR dan Pemerintah Minta Penundaan Sidang Uji Ketentuan Teritorial Putusan Arbitrase",
    },
    Tech: [
      {
        title: "Kecerdasan Buatan (AI) yang Lebih Canggih",
        description:
          "AI terus mengalami perkembangan pesat dengan munculnya model kecerdasan buatan yang semakin pintar dan dapat memahami konteks dengan lebih baik. Chatbot dan asisten virtual kini semakin manusiawi, mampu berinteraksi lebih alami, serta membantu dalam berbagai aspek, seperti customer service, pendidikan, dan analisis data.",
        category: "Technology",
        image: "tec-1.jpeg",
      },
      {
        title: "Komputasi Kuantum Makin Dekat dengan Kehidupan Nyata",
        description:
          "Perusahaan seperti Google, IBM, dan Intel terus mengembangkan komputer kuantum yang dapat menyelesaikan perhitungan kompleks dalam hitungan detik. Teknologi ini berpotensi merevolusi bidang kriptografi, riset medis, dan pengembangan kecerdasan buatan.",
        category: "Technology",
        image: "tec-2.jpg",
      },
    ],
  };
  return (
    <section className="w-full bg-gray-100/[0.5] px-44 py-14">
      <div className="flex gap-10">
        <div className="container flex flex-col gap-5">
          <CardOne
            image={News.CardOne.image}
            category={News.CardOne.category}
            title={News.CardOne.title}
          />
          <CardMini
            image={News.CardTwo.image}
            category={News.CardTwo.category}
            title={News.CardTwo.title}
          />
        </div>
        <div className="container">
          <JumboCard
            image={News.CardThree.image}
            title={News.CardThree.title}
          />
          {News.Tech.map((item,index) => (
          <CardLarge key={index + 1} title={item.title} category={item.category} description={truncateText(item.description, 40)}  image={item.image}/>
          ))}
        </div>
        <div className="container flex flex-col gap-5">
          <CardOne
            image={News.CardTwo.image}
            category={News.CardTwo.category}
            title={News.CardTwo.title}
          />
          <CardMini
            image={News.CardOne.image}
            category={News.CardOne.category}
            title={News.CardOne.title}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
