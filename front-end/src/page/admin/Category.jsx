import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AuthContext } from "../../../context/AuthContext";

function Category() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { token } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const openModal = (category = { id: null, name: "" }) => {
    setCurrentCategory(category);
    setIsEdit(!!category.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory({ id: null, name: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://127.0.0.1:8000/api/category/${currentCategory.id}`,
          currentCategory,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/category",
          currentCategory,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors);
      } else {
        setErrors("Terjadi kesalahan, silakan coba lagi.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="py-10 px-32">
      <div className="mb-14">
        <h1 className="text-4xl font-bold text-gray-800">
          Category Management
        </h1>
        <p className="text-slate-500 text-sm mt-3 w-3/4">
          This page allows you to manage the categories used in the system. You
          can add, edit, delete, as well search categories easily. Use search
          and sort features to find the desired category faster.
        </p>
      </div>

      <div className="flex justify-between items-center mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="border border-gray-300 px-3 py-2 rounded-lg w-80 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => openModal()}
        >
          <IoMdAdd /> Add Category
        </button>
      </div>

      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="py-3 px-4">#</th>
            <th
              className="py-3 px-4 flex items-center gap-2 cursor-pointer"
              onClick={toggleSort}
            >
              Category Name <FaSort />
            </th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.length > 0 ? (
            sortedCategories.map((category, index) => (
              <tr
                key={category.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    className="text-blue-500"
                    onClick={() => openModal(category)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(category.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
                placeholder="Category Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
              <div className="flex justify-end mt-4 gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
