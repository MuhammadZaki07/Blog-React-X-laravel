import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../../../components/Table";
import { AuthContext } from "../../../../context/AuthContext";

function MyArticle() {
  const [articles, setArticles] = useState([]);
  const {token} = useContext(AuthContext);

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "image", label: "Image" },
    { key: "status", label: "Status" },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/article", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
  
    fetchArticles();
  }, []);
  

  const handleDelete = (row) => {
    console.log("Delete clicked:", row);
  };

  return (
    <div className="w-full py-10 px-10 lg:px-44">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-slate-900 text-4xl font-bold">Article</h1>
          <p className="text-gray-500 text-sm">Explore various articles on different topics.</p>
        </div>
        <Link to={`/admin/create`} className="py-2.5 px-8 rounded-lg text-white bg-red-500 hover:bg-red-600">
          Create
        </Link>
      </div>

      <Table columns={columns} data={articles} onDelete={handleDelete} />
    </div>
  );
}

export default MyArticle;
