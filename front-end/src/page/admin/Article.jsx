import { Link } from "react-router-dom";
import Table from "../../components/Table";

function Article() {
  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "image", label: "Image" },
    { key: "caption", label: "Caption" },
  ];

  const articles = [
    {
      id: 1,
      title: "React Basics",
      category: "Programming",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      title: "Tailwind CSS",
      category: "Design",
      image: "https://via.placeholder.com/100",
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete clicked:", row);
  };
  return (
    <div className="w-full py-10 px-10 lg:px-44">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-slate-900 text-4xl font-bold">Article</h1>
          <p className="text-gray-500 text-sm">
            Explore various articles on different topics.
          </p>
        </div>
        <Link
          to={`/admin/create`}
          className="py-2.5 px-8 rounded-lg text-white bg-red-500 hover:bg-red-600"
        >
          Create
        </Link>
      </div>

      <Table
        columns={columns}
        data={articles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Article;
