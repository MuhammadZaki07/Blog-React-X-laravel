import { useState, useEffect, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Camera, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import TagSelect from "../../../components/TagSelect";

function Create() {
  const { token, user } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    body: "",
    category_id: "",
    status: "active",
    user_id: "",
    image: null,
    tags: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  }, [formData.title]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (body) => {
    setFormData((prev) => ({ ...prev, body }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("body", formData.body);
    formDataToSend.append("category_id", formData.category_id);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("user_id", user?.id);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    if (Array.isArray(formData.tags) && formData.tags.length > 0) {
      formData.tags.forEach((tag) => {
        formDataToSend.append("tags[]", tag);
      });
    }

    try {
       await axios.post(
        "http://localhost:8000/api/article",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormData({
        title: "",
        slug: "",
        body: "",
        category_id: "",
        status: "active",
        image: null,
        tags: [],
      });
      navigate("/admin/my-article");
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      console.log("Detail error:", error.response?.data);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-300/[0.5] overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">
            Create New Article
          </h1>
          <p className="text-slate-600 mt-1">
            Fill in the article details below
          </p>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-slate-500/[0.5]"
                placeholder="Enter article title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none border-slate-500/[0.5]"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug[0]}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-slate-500/[0.5]"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none border-slate-500/[0.5]"
              >
                <option value="active">Active</option>
                <option value="non-active">Non-Active</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Article Image
              </label>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-slate-400" />
                    )}
                  </div>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <label className="bg-slate-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600">
                  <span className="flex items-center gap-2">
                    <Camera size={20} /> Upload Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
              )}
            </div>
            <div className="">
              <TagSelect
                onChange={(tagIds) => {
                  setFormData((prev) => ({ ...prev, tags: tagIds }));
                }}
              />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags[0]}</p>
              )}
            </div>
          </div>

          <div>
            <Editor
              apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
              value={formData.body}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                menubar: false,
                plugins:
                  "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                toolbar:
                  "undo redo | formatselect fontsizeselect | bold italic underline strikethrough | " +
                  "alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | code",
                content_style:
                  "body { font-family:Arial,sans-serif; font-size:14px }",
                block_formats:
                  "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6",
              }}
            />

            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body[0]}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-red-600"
            >
              <Save size={20} /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
