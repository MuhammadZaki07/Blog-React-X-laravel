import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Camera, Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  // Ambil data artikel dari localStorage saat komponen dimount
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    const articleToEdit = storedArticles.find((article) => article.id === parseInt(id));
    if (articleToEdit) {
      setFormData({
        title: articleToEdit.title,
        content: articleToEdit.content
      });
      setPreviewImage(articleToEdit.image);
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedArticle = {
      id: parseInt(id),
      title: formData.title,
      content: formData.content,
      image: previewImage
    };

    // Ambil artikel yang sudah ada di localStorage
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    const updatedArticles = storedArticles.map((article) =>
      article.id === parseInt(id) ? updatedArticle : article
    );

    // Simpan kembali ke localStorage
    localStorage.setItem('articles', JSON.stringify(updatedArticles));

    // Arahkan ke halaman Artikelku
    navigate('/dashboard/artikelku');
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
    <div className="p-6">
      {/* Background Pattern */}
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
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Edit Artikel</h1>
          <p className="text-slate-600 mt-1">Edit detail artikel di bawah ini</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Judul Artikel */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Judul Artikel
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="Masukkan judul artikel"
            />
          </div>

          {/* Gambar Artikel */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gambar Artikel
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
                  <Camera size={20} /> Upload Gambar
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Isi Artikel */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Isi Artikel
            </label>
            <Editor
              apiKey="b2crfesyaj3stk42hj8sezjky5hiffwhi2u077yb9isclvf9"
              value={formData.content}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
            />
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            >
              <Save size={20} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;