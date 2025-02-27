import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const TagSelect = ({ onChange }) => {
    const [tags, setTags] = useState([]);
  
    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/tags");
          setTags(response.data.map((tag) => ({ value: tag.id, label: tag.name })));
        } catch (error) {
          console.error("Error fetching tags:", error);
        }
      };
  
      fetchTags();
    }, []);
  
    return (
      <Select
        options={tags}
        isMulti
        onChange={(selected) => {
          if (selected && selected.length > 0) {
            onChange(selected.map((tag) => tag.value)); // Ambil value (id) saja
          } else {
            onChange([]);
          }
        }}
        placeholder="Select tags..."
        className="basic-multi-select z-50"
        classNamePrefix="select"
      />
    );
  };
  

export default TagSelect;
