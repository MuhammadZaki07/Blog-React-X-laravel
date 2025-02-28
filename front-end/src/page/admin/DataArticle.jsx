import { useState, useEffect, useContext } from "react";
import { FaSort } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

function DataArticle() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post",{
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "non-active" : "active";

    try {
      await axios.put(
        `http://localhost:8000/api/article/update-status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, status: newStatus } : article
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      (article.user?.name?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="py-10 px-32">
      <div className="mb-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-800">
            Article Management
          </h1>
          <p className="text-gray-500">View articles and manage data.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search articles..."
          className="border border-gray-300 px-3 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-4 text-left">#</th>
              <th
                className="py-3 px-4 text-left flex items-center gap-2 cursor-pointer"
                onClick={toggleSort}
              >
                Title <FaSort />
              </th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Published Date</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles.length > 0 ? (
              sortedArticles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{article.title}</td>
                  <td className="py-3 px-4">
                    {article.user?.full_name || "Unknown"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        id={`switch-${article.id}`}
                        type="checkbox"
                        className="peer sr-only"
                        checked={article.status === "active"}
                        onChange={() =>
                          toggleStatus(article.id, article.status)
                        }
                      />

                      <label
                        htmlFor={`switch-${article.id}`}
                        className="hidden"
                      ></label>
                      <div
                        className="peer h-4 w-11 rounded  bg-slate-200 
                          after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 
                          after:rounded-md after:border after:border-slate-300 after:bg-white 
                          after:transition-all after:content-[''] 
                          peer-checked:bg-green-300 peer-checked:after:translate-x-full 
                          peer-focus:ring-green-300"
                      ></div>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataArticle;
