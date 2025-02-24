import { FileText, UserCircle, PenSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';


function UserDashboard() {
  return (
    <div className="h-full bg-white rounded-xl shadow-xl overflow-hidden relative">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-slate-900"
                style={{
                  backgroundImage: `
                    linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                    linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                    linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                    linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
                    linear-gradient(60deg, #77777777 25%, transparent 25.5%, transparent 75%, #77777777 75%, #77777777)
                  `,
                  backgroundSize: '80px 140px',
                  backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0'
                }}>
              </div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-8">
              {/* Welcome Text */}
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-slate-900 mb-2">
                  Selamat Datang di Dashboard User!
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Tempat Anda mengelola konten, membuat artikel baru, dan mengatur profil Anda.
                  Mulai jelajahi fitur-fitur yang tersedia melalui menu di sidebar.
                </p>
              </div>

              {/* Enhanced Stats/Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="group bg-slate-50 p-6 rounded-lg shadow-md border border-slate-100 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors">
                      Artikel Saya
                    </h3>
                  </div>
                  <p className="text-slate-600 group-hover:text-slate-200 transition-colors">
                    Kelola semua artikel yang telah Anda buat
                  </p>
                </div>

                <div className="group bg-slate-50 p-6 rounded-lg shadow-md border border-slate-100 hover:bg-red-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <UserCircle className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors">
                      Profil
                    </h3>
                  </div>
                  <p className="text-slate-600 group-hover:text-slate-100 transition-colors">
                    Perbarui informasi profil Anda
                  </p>
                </div>

                <div className="group bg-slate-50 p-6 rounded-lg shadow-md border border-slate-100 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <PenSquare className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white transition-colors">
                      Buat Artikel
                    </h3>
                  </div>
                  <p className="text-slate-600 group-hover:text-slate-100 transition-colors">
                    Mulai menulis artikel baru
                  </p>
                </div>
              </div>

              {/* Back to News Button */}
              <div className="flex gap-4">
                <Link 
                  to="/"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft size={20} />
                  <span>Kembali ke Beranda</span>
                </Link>
              </div>
            </div>
          </div>
  )
}

export default UserDashboard