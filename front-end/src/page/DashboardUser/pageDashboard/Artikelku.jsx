import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

function Artikelku() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Mengambil data artikel dari localStorage saat komponen dimuat
  useEffect(() => {
    try {
      const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
      setArticles(storedArticles);
    } catch (error) {
      console.error('Terjadi kesalahan saat memuat artikel dari localStorage:', error);
      setArticles([]);
    }
  }, []);

  // Fungsi untuk menghapus artikel
  const handleDelete = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles); // Memperbarui state
  };

  return (
    <div className="p-6">
      {/* Pola Latar Belakang */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 bg-slate-900"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
              linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
              linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
              linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
              linear-gradient(60deg, #77777777 25%, transparent 25.5%, transparent 75%, #77777777 75%, #77777777)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
        {/* Konten Utama */}
        <div className="relative p-8">
          {/* Tombol Tambah Artikel Baru */}
          <div className="mb-4">
            <Link
              to="/dashboard/buatartikel"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
            >
              <PlusCircle size={20} />
              Tambah Artikel Baru
            </Link>
          </div>

          {/* Judul Halaman */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Artikelku
            </h1>
            <p className="text-slate-600 text-lg">
              Berikut adalah daftar artikel yang telah Anda tulis:
            </p>
          </div>

          {/* Grid Artikel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Kartu Artikel */}
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md h-48 flex flex-col items-center justify-center p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer relative"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt="Gambar Artikel"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 text-center">
                  Klik untuk melihat detail
                </p>

                {/* Tombol Hapus dan Edit */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah navigasi saat tombol diklik
                      handleDelete(article.id);
                    }}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah navigasi saat tombol diklik
                      navigate(`/dashboard/editartikel/${article.id}`);
                    }}
                    className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artikelku;
