import { useState } from "react";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function Category() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Technology" },
    { id: 2, name: "Business" },
    { id: 3, name: "Health" },
    { id: 4, name: "Education" },
  ]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
  });

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === currentCategory.id ? currentCategory : cat
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: prev.length + 1, name: currentCategory.name },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="py-10 px-32">
      <div className="mb-14 flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-gray-800">
          Category Management
        </h1>
        <p className="text-gray-500">
          Manage categories for your articles easily.
        </p>
      </div>

      <div className="flex justify-between items-center mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="border border-gray-300 px-3 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-red-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-red-700"
          onClick={() => openModal()}
        >
          <IoMdAdd className="text-xl" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  rounded-lg">
          <thead>
          <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-4 text-left">#</th>
              <th
                className="py-3 px-4 text-left flex items-center gap-2 cursor-pointer"
                onClick={toggleSort}
              >
                Category Name <FaSort />
              </th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.length > 0 ? (
              sortedCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(category)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-gray-600">Category Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
                placeholder="Category"
             />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
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
