import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Carousel() {
  const [articles, setArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/articles/latest")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  return (
    <div className="overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="carousel w-full h-[500px] relative z-10">
          {articles.map((article, index) => (
            <Link to={`detail-post/${article.slug}`} key={article.id}>
            <div
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0 opacity-100"
                  : index < currentSlide
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
            >
              <img
                src={`http://127.0.0.1:8000/storage/${article.image}`}
                className="w-full h-full object-cover"
                alt={article.title}
              />

              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/50 text-white p-6 text-center rounded-lg">
                <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
                <p className="text-lg">{article.description}</p>
                <p className="text-sm mt-2">By {article.user.full_name}</p>
              </div>
            </div>
            </Link>
          ))}

          {/* Tombol Navigasi */}
          <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 transform justify-between px-4">
            <button
              onClick={prevSlide}
              className="btn btn-circle bg-white/30 hover:bg-white/50 text-white p-2 text-3xl"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="btn btn-circle bg-white/30 hover:bg-white/50 text-white p-2 text-3xl"
            >
              ❯
            </button>
          </div>

          {/* Indikator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {articles.map((_, index) => (
              <span
                key={index}
                className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-gray-500"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
