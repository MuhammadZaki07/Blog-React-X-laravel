import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setErrors({});

    try {
      await axios.post("http://127.0.0.1:8000/api/users", formData);
      e.target.reset();
      navigate("/admin/data-user");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error creating user:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="px-8 py-12 md:px-12 w-3/4 mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>
      <p className="text-gray-600 mb-8">Create Account</p>

      <form onSubmit={handleCreateUser}>
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                errors.username ? "border-red-500" : "border-transparent"
              } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
              placeholder="Your name"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                errors.email ? "border-red-500" : "border-transparent"
              } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
              placeholder="Your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                  errors.password ? "border-red-500" : "border-transparent"
                } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                placeholder="Create password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="text-gray-500 hover:text-gray-700" size={18} /> : <Eye className="text-gray-500 hover:text-gray-700" size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                  errors.password_confirmation ? "border-red-500" : "border-transparent"
                } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="text-gray-500 hover:text-gray-700" size={18} /> : <Eye className="text-gray-500 hover:text-gray-700" size={18} />}
              </button>
            </div>
            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
            <select name="gender" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors">
              <option value="male">Boy</option>
              <option value="female">Girl</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
            <select name="role" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-1/5 bg-red-700 cursor-pointer hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
