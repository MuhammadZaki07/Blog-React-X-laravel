import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

function Tags() {
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [errors, setErrors] = useState({});
  const {token} = useContext(AuthContext)

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tags",{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (editingTag) {
        await axios.put(`http://localhost:8000/api/tags/${editingTag.id}`, {
          name: tagName,
        });
      } else {
        await axios.post("http://localhost:8000/api/tags", { name: tagName });
      }
      setTagName("");
      setEditingTag(null);
      fetchTags();
    } catch (error) {
      console.error("Error saving tag:", error);
      setErrors(error.response?.data?.errors || {});
    }
  };

  const handleEdit = (tag) => {
    setTagName(tag.name);
    setEditingTag(tag);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus tag ini?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/tags/${id}`);
      fetchTags();
      alert("Tag berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting tag:", error);
      alert("Terjadi kesalahan saat menghapus tag!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Tags</h2>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 w-1/2">
        <div>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            name="name"
            autoComplete="name"
            placeholder="Tag Name"
            className={`border p-2 rounded focus:outline-none w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTag ? "Update" : "Add"}
        </button>
      </form>

      {tags.length > 0 ? (
        <div className="grid grid-cols-7 gap-4">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white border border-slate-400/[0.5] rounded-lg py-2 px-4 flex justify-between items-center"
            >
              <span className="font-semibold">
                {tag.name.length > 10
                  ? tag.name.substring(0, 5) + "..."
                  : tag.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tag)}
                  className="text-yellow-500"
                >
                  <i className="bi bi-pencil-square text-xl"></i>
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="text-red-500"
                >
                  <i className="bi bi-trash text-xl"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Tidak ada data tag.</p>
      )}
    </div>
  );
}

export default Tags;
