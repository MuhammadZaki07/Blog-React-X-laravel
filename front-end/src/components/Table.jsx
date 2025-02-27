import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Search, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const TableComponent = ({ columns, data, onDelete }) => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = () => {
    const sorted = [...sortedData].sort((a, b) =>
      isAscending
        ? a[columns[0].key]
            ?.toString()
            .localeCompare(b[columns[0].key]?.toString())
        : b[columns[0].key]
            ?.toString()
            .localeCompare(a[columns[0].key]?.toString())
    );
    setSortedData(sorted);
    setIsAscending(!isAscending);
  };

  const filteredData = sortedData.filter((item) =>
    columns.some((col) =>
      item[col.key]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="mt-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-full sm:w-64"
          />
        </div>
        <button
          onClick={handleSort}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Sort <ArrowUpDown size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mt-10">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="p-3">
                      {col.key === "image" ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${row[col.key]}`}
                          alt={row.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : col.key === "category" ? (
                        row.category?.name
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <Link
                     to={`/${user.role === "admin" ? "admin" : "user"}/edit/${
                      row.id
                    }`}
                      className="bg-blue-500 text-white px-3 py-2 cursor-pointer rounded-lg hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="bg-red-500 text-white px-3 py-2 cursor-pointer rounded-lg hover:bg-red-600"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${row.title}?`
                          )
                        ) {
                          onDelete(row.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableComponent;
