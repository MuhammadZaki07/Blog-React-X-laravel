import { useEffect, useState } from "react";
import ContentArticle from "./ContentArticle";
import PopularCategory from "./PopularCategory";
import axios from "axios";

const NewArticle = () => {
  const [newArticles, setNewArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/articles/component"
        );
        if (Array.isArray(response.data)) {
          const latestArticles = response.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4);
          setNewArticles(latestArticles);
        } else {
          console.error("Data tidak valid:", response.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/popular"
        );
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Kategori tidak valid:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };    

    fetchArticles();
    fetchCategories();
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
        <h1 className="text-5xl font-bold">Artikel Terbaru</h1>
        <div className="w-52 bg-red-500 h-0.5"></div>
      </div>
      <div className="w-full flex gap-5">
        <div className="flex flex-[3] flex-col gap-5 py-16">
          {newArticles.map((item, index) => {
            return (
              <ContentArticle
                slug={`detail-post/${item.slug}`}
                key={index}
                title={item.title}
                description={truncateText(item.body, 20)}
                image={item.image}
                category={item.category?.name}
                create_at={
                  item.created_at
                    ? new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"
                }
                author={item.user.full_name}
                views={0}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-10 w-96">
          <div>
          <div className="bg-gray-100 flex-[1] rounded-xl w-full px-8 pt-10">
            <h1 className="text-xl font-bold">Kategori Populer</h1>
            <div className="flex flex-col gap-7 py-8">
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <PopularCategory
                    key={index}
                    link={item.name}
                    name={item.name}
                    qount={item.articles_count}
                  />
                ))
              ) : (
                <p>Tidak ada kategori tersedia</p>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArticle;
