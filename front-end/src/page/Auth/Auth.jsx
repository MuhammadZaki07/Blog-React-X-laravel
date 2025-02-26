import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setToken, token } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (token || storedToken) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = response.data;
      if (data.errors) {
        setErrors(data.errors);
      } else {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        localStorage.setItem("role", data.role);
        setErrors(null);

        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setErrors(null)

        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response) {
        setErrors(
          error.response.data.errors || { message: error.response.data.message }
        );
      } else {
        setErrors({ message: "Something went wrong" });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white-100 to-red-100 min-h-screen flex items-center justify-center p-4">
      <div
        className={`w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 ${
          isSignUp ? "mode-signup" : ""
        }`}
      >
        <div className="absolute top-4 right-4 md:top-6 md:right-6 text-red-800 hover:text-red-600 transition-colors">
          <div className="absolute top-4 right-4 md:top-6 md:right-6 text-red-800 hover:text-red-600 transition-colors">
            <button onClick={() => navigate("/")} className="flex items-center">
              <span className="mr-2">Back</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 transition-all duration-500">
          {!isSignUp && (
            <div className="px-8 py-12 md:px-12 w-full animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
              <p className="text-gray-600 mb-8">
                Welcome back! Please log in to your account
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                      errors.email ? "border-red-500" : "border-transparent"
                    } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                    placeholder="Your email"
                    name="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                        errors.password
                          ? "border-red-500"
                          : "border-transparent"
                      } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                      placeholder="Your password"
                      name="password"
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password[0]}
                      </p>
                    )}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff
                          className="text-gray-500 hover:text-gray-700"
                          size={18}
                        />
                      ) : (
                        <Eye
                          className="text-gray-500 hover:text-gray-700"
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              </form>

              <p className="text-center mt-8 text-gray-600 md:hidden">
                Don&apos;t have an account yet?
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-purple-800 font-semibold hover:text-purple-600 hover:underline transition duration-200 ml-1"
                >
                  Register Now!
                </button>
              </p>
            </div>
          )}

          {isSignUp && (
            <div className="px-8 py-12 md:px-12 w-full animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Create Account
              </h1>
              <p className="text-gray-600 mb-8">Create Your Account Now</p>

              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                      errors.username ? "border-red-500" : "border-transparent"
                    } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                    placeholder="Your name"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                      errors.email ? "border-red-500" : "border-transparent"
                    } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="signup-password"
                      name="password"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                        errors.password
                          ? "border-red-500"
                          : "border-transparent"
                      } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff
                          className="text-gray-500 hover:text-gray-700"
                          size={18}
                        />
                      ) : (
                        <Eye
                          className="text-gray-500 hover:text-gray-700"
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password[0]}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      name="password_confirmation"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                        errors.password_confirmation
                          ? "border-red-500"
                          : "border-transparent"
                      } focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          className="text-gray-500 hover:text-gray-700"
                          size={18}
                        />
                      ) : (
                        <Eye
                          className="text-gray-500 hover:text-gray-700"
                          size={18}
                        />
                      )}
                    </button>
                  </div>
                  {errors.password_confirm && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password_confirm[0]}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="hidden md:block w-1/2 bg-gradient-to-br bg-slate-900 to-indigo-900 p-12 text-white">
          {!isSignUp && (
            <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in">
              <h1 className="text-3xl font-bold mb-4">Halo, Guys!</h1>
              <p className="mb-8 text-white/90 max-w-md">
                Enter your personal details and start your journey with us today
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-2 px-8 border border-white rounded-lg transition duration-300"
              >
                Register
              </button>
            </div>
          )}

          {isSignUp && (
            <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in">
              <h1 className="text-3xl font-bold mb-4">Welcome</h1>
              <p className="mb-8 text-white/90 max-w-md">
                To stay connected with us, please log in with your personal
                information
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-2 px-8 border border-white rounded-lg transition duration-300"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
