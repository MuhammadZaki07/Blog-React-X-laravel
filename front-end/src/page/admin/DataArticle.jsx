import { useState } from "react";
import { FaSort } from "react-icons/fa";

function DataArticle() {
  const [articles] = useState([
    {
      id: 1,
      title: "React Hooks Explained",
      author: "John Doe",
      date: "2025-02-20",
    },
    {
      id: 2,
      title: "Understanding JavaScript Closures",
      author: "Jane Smith",
      date: "2025-02-18",
    },
    {
      id: 3,
      title: "Tailwind CSS Best Practices",
      author: "Michael Lee",
      date: "2025-02-15",
    },
    {
      id: 4,
      title: "Laravel API Authentication",
      author: "Sarah Connor",
      date: "2025-02-10",
    },
  ]);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.author.toLowerCase().includes(search.toLowerCase())
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
                  <td className="py-3 px-4">{article.author}</td>
                  <td className="py-3 px-4">{article.date}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-gray-00 cursor-not-allowed">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          id="switch-3"
                          type="checkbox"
                          className="peer sr-only"
                        />
                        <label htmlFor="switch-3" className="hidden"></label>
                        <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-slate-300/[0.5] after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
                      </label>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
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
