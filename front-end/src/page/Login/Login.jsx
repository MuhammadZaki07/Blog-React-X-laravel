import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Facebook, Mail, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-br from-white-100 to-red-100 min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 ${isSignUp ? 'mode-signup' : ''}`}>
        {/* Back Button */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 text-red-800 hover:text-red-600 transition-colors">
        <div className="absolute top-4 right-4 md:top-6 md:right-6 text-red-800 hover:text-red-600 transition-colors">
  <button
    onClick={() => navigate('/')}
    className="flex items-center"
  >
    <span className="mr-2">Back</span>
    <ArrowRight size={18} />
  </button>
</div>
        </div>

        {/* Form Container */}
        <div className="w-full md:w-1/2 transition-all duration-500">
          {/* Sign In Form */}
          {!isSignUp && (
            <div className="px-8 py-12 md:px-12 w-full animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Masuk</h1>
              <p className="text-gray-600 mb-8">Selamat Datang kembali! Silakan masuk ke akun Anda</p>
              
              <form>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200" 
                    placeholder="Masukkan email"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200" 
                      placeholder="Masukkan password"
                    />
                    <button 
                      type="button" 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff className="text-gray-500 hover:text-gray-700" size={18} /> : 
                        <Eye className="text-gray-500 hover:text-gray-700" size={18} />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                
                  <a href="#" className="text-sm text-blue-800 hover:text-blue-600 hover:underline transition duration-200">
                    Lupa Password??
                  </a>
                </div>
                
                <button 
                  type="button"
                  onClick={() => navigate('/dashboard/userdashboard')}
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
                >
                Masuk
                </button>

              </form>
              
              <div className="mt-8">
                <p className="text-center text-gray-600 mb-4">Atau Dengan</p>
                <div className="flex justify-center space-x-4">
                 
                  <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 transition duration-300">
                    <Mail size={20} className="text-red-600" />
                  </a>
                  
                </div>
              </div>
              
              <p className="text-center mt-8 text-gray-600 md:hidden">
                Belum Memiliki Akun?
                <button 
                  onClick={() => setIsSignUp(true)}
                  className="text-purple-800 font-semibold hover:text-purple-600 hover:underline transition duration-200 ml-1"
                >
                  Daftar Sekarang!
                </button>
              </p>
            </div>
          )}
          
          {/* Sign Up Form */}
          {isSignUp && (
            <div className="px-8 py-12 md:px-12 w-full animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Buat Akun</h1>
              <p className="text-gray-600 mb-8">Buat Akunmu Sekarang</p>
              
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200" 
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="signup-email" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200" 
                    placeholder="Masukkan email"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="signup-password" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200" 
                      placeholder="Buat password"
                    />
                    <button 
                      type="button" 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff className="text-gray-500 hover:text-gray-700" size={18} /> : 
                        <Eye className="text-gray-500 hover:text-gray-700" size={18} />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 transition duration-200" 
                      placeholder="Konfirmasi password"
                    />
                    <button 
                      type="button" 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="text-gray-500 hover:text-gray-700" size={18} /> : 
                        <Eye className="text-gray-500 hover:text-gray-700" size={18} />
                      }
                    </button>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
                >
                  Buat Akun
                </button>
              </form>
              
            </div>
          )}
        </div>
        
        {/* Toggle Container */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br bg-slate-900 to-indigo-900 p-12 text-white">
          {/* Sign Up Panel */}
          {!isSignUp && (
            <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in">
              <h1 className="text-3xl font-bold mb-4">Halo, Teman!</h1>
              <p className="mb-8 text-white/90 max-w-md">Masukkan detail pribadi Anda dan mulailah perjalanan Anda bersama kami hari ini</p>
              <button 
                onClick={() => setIsSignUp(true)}
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-2 px-8 border border-white rounded-lg transition duration-300"
              >
                Daftar
              </button>
            </div>
          )}
          
          {/* Sign In Panel */}
          {isSignUp && (
            <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in">
              <h1 className="text-3xl font-bold mb-4">Selamat Datang</h1>
              <p className="mb-8 text-white/90 max-w-md">Untuk tetap terhubung dengan kami, silakan login dengan informasi pribadi Anda</p>
              <button 
                onClick={() => setIsSignUp(false)}
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-2 px-8 border border-white rounded-lg transition duration-300"
              >
                Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;