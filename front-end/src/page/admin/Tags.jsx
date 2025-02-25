import { useState, useEffect } from "react";
import axios from "axios";

function Tags() {
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [editingTag, setEditingTag] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  const handleEdit = (tag) => {
    setTagName(tag.name);
    setEditingTag(tag);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tags/${id}`);
      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Tags</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Tag Name"
          className="border p-2 rounded focus:outline-none border-slate-300/[0.3] w-1/5"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTag ? "Update" : "Add"}
        </button>
      </form>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            {tag.name}
            <div>
              <button
                onClick={() => handleEdit(tag)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tag.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
