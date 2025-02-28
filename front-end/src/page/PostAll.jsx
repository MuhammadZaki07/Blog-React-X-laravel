import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PostAll() {
  const [articles, setArticles] = useState([]);
  const {token} = useContext(AuthContext);

  const fetchAllArticles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/post/all",{
        headers : {
          Authorization:`Bearer ${token}`
        }
      });
      setArticles(response.data);
      
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return (
    <section className="w-full bg-gray-200/[0.5] px-44 py-14">
      <div>
        <h1 className="text-5xl font-bold">Article All</h1>
        <div className="w-52 bg-red-500 h-0.5"></div>
      </div>

      <div className="grid grid-cols-3 gap-5 py-16">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link to={`/detail-post/${article.slug}`} key={article.id} className="w-full">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={article.image ? `http://127.0.0.1:8000/storage/${article.image}` : "/assets/news-1.jpg"}
                  alt={article.title}
                  className="h-56 w-full object-cover"
                />
                <h1 className="absolute left-5 top-8 text-white bg-red-500 rounded-lg py-2 px-3 font-light text-sm">
                  {article.category?.name || "Tanpa Kategori"}
                </h1>
              </div>
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
            </Link>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada artikel tersedia</p>
        )}
      </div>
    </section>
  );
}

export default PostAll;
