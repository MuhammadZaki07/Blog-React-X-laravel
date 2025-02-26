import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Camera, Save, X, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

function FormProfile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "other",
    bio: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;
        setUser(userData);

        setFormData({
          full_name: userData.full_name || "",
          no_tlp: userData.no_tlp || "",
          email: userData.email || "",
          gender: ["male", "female", "other"].includes(userData.gender)
            ? userData.gender
            : "other",
          bio: userData.bio || "",
          image: null,
        });

        if (userData.image) {
          setPreviewImage(`http://127.0.0.1:8000/storage/${userData.image}`);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setErrors({ ...errors, image: "" });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!user?.id) {
      alert("User ID not found");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "PUT");
    formDataToSend.append("full_name", formData.full_name || "");
    formDataToSend.append("no_tlp", formData.no_tlp || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("gender", formData.gender || "other");
    formDataToSend.append("bio", formData.bio || "");

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/users/${user.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");

      setFormData({
        ...formData,
        image: null,
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to update profile");
      }
    }
  };

  if (!user) {
    return (
      <h1 className="text-center text-4xl text-slate-500 font-semibold py-10">
        Loading...
      </h1>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
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
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div>
            <label className="bg-slate-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors inline-block">
              <span className="flex items-center gap-2">
                <Camera size={20} />
                Upload New Photo
              </span>
              <input
                type="file"
                className="hidden"
                name="image"
                onChange={handleImageChange}
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
            )}
            <p className="text-sm text-slate-600 mt-2">
              JPG, PNG atau GIF (MAX. 2MB)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
            placeholder="Enter your name"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name[0]}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            Email Address
            <Lock size={14} className="text-slate-400" />
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-300 focus:outline-none rounded-lg text-slate-500"
            disabled
            value={formData.email}
          />
          <p className="text-xs text-slate-500 mt-1">
            Email tidak dapat diubah
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="no_tlp"
            value={formData.no_tlp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
            placeholder="Enter your phone number"
          />
          {errors.no_tlp && (
            <p className="text-red-500 text-sm mt-1">{errors.no_tlp[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
          >
            <option value="other">Other</option>
            <option value="male">Boy</option>
            <option value="female">Girl</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
            placeholder="Write something about yourself..."
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio[0]}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-red-600"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default FormProfile;
