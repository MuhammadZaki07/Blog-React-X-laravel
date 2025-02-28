import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const SelectEditor = () => {
  const [articles, setArticles] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchUserArticles = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/post/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching user articles:", error);
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, [token]); 

  return (
    <section className="w-full bg-gray-200/[0.5] px-44 py-14">
      <div>
        <h1 className="text-5xl font-bold">Pilihan Editor</h1>
        <div className="w-52 bg-red-500 h-0.5"></div>
      </div>

      <div className="grid grid-cols-3 gap-5 py-16">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="w-full">
              <Link to={`detail-post/${article.slug}`} className="relative rounded-lg overflow-hidden">
                <img
                  src={article.image ? `http://127.0.0.1:8000/storage/${article.image}` : "/assets/news-1.jpg"}
                  alt={article.title}
                  className="h-56 w-full object-cover"
                />
                <h1 className="absolute left-5 top-8 text-white bg-red-500 rounded-lg py-2 px-3 font-light text-sm">
                  {article.category?.name || "Tanpa Kategori"}
                </h1>
              </Link>
              <div className="flex gap-5 items-center py-5">
                <img src="/assets/user.png" alt="User" className="w-10 rounded-full" />
                <h1 className="font-normal text-slate-500 text-lg underline">
                  {article.user?.full_name || "Anonim"}
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <h1 className="text-lg font-semibold">{article.title}</h1>
                <div className="flex gap-5">
                  <div className="flex gap-2 items-center">
                    <i className="bi bi-calendar-event text-red-500"></i>
                    <h1 className="text-gray-500 font-normal text-xs">
                      {new Date(article.created_at).toLocaleDateString("id-ID")}
                    </h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="bi bi-eye text-red-500"></i>
                    <h1 className="text-gray-500 font-normal text-xs">
                      {article.views || 0} dilihat
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada artikel tersedia</p>
        )}
      </div>

      <div className="flex justify-center">
        <Link to={`post-all`} className="w-1/6 hover:bg-red-500 transition-all duration-500 ease-in-out hover:text-white text-red-500 font-medium py-4 rounded-lg cursor-pointer text-center">
          Lihat lainnya <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
};

export default SelectEditor;
