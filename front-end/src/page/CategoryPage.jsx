import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ContentArticle from "../components/ContentArticle";
import PopularCategory from "../components/PopularCategory";
import { AuthContext } from "../../context/AuthContext";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const {token} = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/articles?category=${categoryName}`)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryName]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories/popular",{
     
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.replace(/<\/?[^>]+(>|$)/g, "").split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <section className="w-full bg-gray-100/[0.5] px-44 py-14">
      <div>
        <h1 className="text-5xl font-bold">{categoryName}</h1>
        <div className="w-32 bg-red-500 h-0.5"></div>
      </div>
      <div className="w-full flex gap-5">
        <div className="flex flex-[3] flex-col gap-5 py-16">
          {loading ? (
            <p>Loading...</p>
          ) : articles.length > 0 ? (
            articles.map((item) => (
              <ContentArticle
              slug={`/detail-post/${item.slug}`}
                key={item.id}
                title={item.title}
                description={truncateText(item.body, 20)}
                image={item.image}
                author={item.user.full_name}
                create_at={new Date(item.created_at).toLocaleDateString()}
                views={0}
                category={item.category.name}
              />
            ))
          ) : (
            <p>Tidak ada artikel dalam kategori ini.</p>
          )}
        </div>
        <div className="w-96">
          <div className="bg-gray-100 flex-[1] rounded-xl w-full px-8 pt-10">
            <h1 className="text-xl font-bold">Kategori Populer</h1>
            <div className="flex flex-col gap-7 py-8">
              {categories.map((item, index) => (
                <PopularCategory
                  link={item.name}
                  name={item.name}
                  qount={item.articles_count}
                  key={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
