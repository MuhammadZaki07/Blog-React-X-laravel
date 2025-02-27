import { useEffect, useState } from "react";
import axios from "axios";
import CardLarge from "./Card/CardLarge";
import CardOne from "./Card/CardMedium";
import CardMini from "./Card/CardMini";
import JumboCard from "./Card/JumboCard";

const Header = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const shuffled = response.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setNews(shuffled);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  return (
    <section className="w-full bg-gray-100/[0.5] px-44 py-14">
      <div className="flex gap-10">
        {news.length === 6 && (
          <>
            <div className="container flex flex-col gap-5">
              {news[0] && (
                <CardOne
                  slug={news[0].slug}
                  image={news[0].image}
                  category={news[1].category?.name}
                  title={news[0].title}
                  view={0}
                  create={
                    news[4].created_at
                      ? new Date(news[4].created_at).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Tanggal tidak tersedia"
                  }
                />
              )}
              {news[1] && (
                <CardMini
                  slug={news[1].slug}
                  image={news[1].image}
                  category={news[1].category?.name} // <- Fix
                  title={news[1].title}
                  view={0}
                  create={
                    news[4].created_at
                      ? new Date(news[4].created_at).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Tanggal tidak tersedia"
                  }
                />
              )}
            </div>
            <div className="container">
              <JumboCard
                slug={news[2].slug}
                image={news[2].image}
                title={news[2].title}
                view={0}
                create={
                  news[4].created_at
                    ? new Date(news[4].created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"
                }
              />
              <CardLarge
                slug={news[2].slug}
                title={news[2].title}
                category={news[2].category?.name}
                description={truncateText(news[2].body, 40)}
                image={news[2].image}
                view={0}
                create={
                  news[4].created_at
                    ? new Date(news[4].created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"
                }
              />
              <CardLarge
                slug={news[4].slug}
                title={news[4].title}
                category={news[2].category?.name}
                description={truncateText(news[4].body, 40)}
                image={news[4].image}
                view={0}
                create={
                  news[4].created_at
                    ? new Date(news[4].created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"
                }
              />
            </div>
            <div className="container flex flex-col gap-5">
              <CardOne
                slug={news[5].slug}
                image={news[5].image}
                category={news[5].category?.name}
                title={news[5].title}
                view={0}
                create={
                  news[4].created_at
                    ? new Date(news[4].created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"
                }
              />
              <CardMini
              slug={news[0].slug}
                image={news[0].image}
                category={news[0].category?.name}
                title={news[0].title}
                view={0}
                create={
                  news[4].created_at
                    ? new Date(news[4].created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"
                }
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Header;
