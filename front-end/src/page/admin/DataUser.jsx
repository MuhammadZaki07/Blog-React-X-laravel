import { useContext, useEffect, useState } from "react";
import { FaTrash, FaSort } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

function DataUser() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataUsers();
  }, [token]);

  const getDataUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.full_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sortOrder === "asc"
      ? a.full_name.localeCompare(b.full_name)
      : b.full_name.localeCompare(a.full_name);
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleBlock = async (id, status) => {
    const url =
      status === "unblock"
        ? `http://127.0.0.1:8000/api/users/block/${id}`
        : `http://127.0.0.1:8000/api/users/unblock/${id}`;

    try {
      const response = await axios.put(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id
              ? { ...user, status: status === "unblock" ? "block" : "unblock" }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status.");
    }
  };

  const handleToggleRole = async (id, role) => {
    const url = `http://127.0.0.1:8000/api/users/role/${id}`;

    try {
      const response = await axios.put(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id
              ? { ...user, role: role === "user" ? "admin" : "user" }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="py-10 px-32">
      <div className="flex justify-between items-center">
        <div className="mb-14 flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">
            Manage user accounts with block and delete options.
          </p>
        </div>
        <div>
          <Link
            to={`/admin/create-user`}
            className="py-2.5 px-4 bg-red-500 rounded-lg text-white"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search user..."
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
                Name <FaSort />
              </th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : sortedUsers.length > 0 ? (
              sortedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.full_name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-lg ${
                        user.status === "unblock"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {user.status === "unblock" ? (
                        <>{user.status === "unblock" && "active"}</>
                      ) : (
                        <>{user.status}</>
                      )}
                    </span>
                  </td>
                  <td className={`py-3 px-4 flex ${user.role !== "admin" ? "gap-7 justify-center" : "gap-4 justify-center"}`}>
                    <button
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleToggleRole(user.id, user.role)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    {user.role !== "admin" && (
                    <button
                      className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      onClick={() => handleBlock(user.id, user.status)}
                    >
                      <i className="bi bi-person-slash text-xl text-red-500"></i>
                    </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataUser;
