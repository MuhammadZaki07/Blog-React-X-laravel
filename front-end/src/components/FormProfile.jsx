import { Camera, Save, X, Lock } from "lucide-react";
import { useState } from "react";

function FormProfile() {
    const [previewImage, setPreviewImage] = useState(null);

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



  const handleRemoveImage = () => {
    setPreviewImage(null);
  };
  return (
    <form className="p-6">
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
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <p className="text-sm text-slate-600 mt-2">
            JPG, PNG or GIF (MAX. 2MB)
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
          name="name"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          Email Address
          <Lock size={14} className="text-slate-400" />
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-300 focus:outline-none rounded-lg text-slate-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Lock size={16} className="text-slate-400" />
          </div>
        </div>
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
          name="phone"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
        >
          <option value="L">Boy</option>
          <option value="G">Girl</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          rows="4"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none transition-colors"
          placeholder="Write something about yourself..."
        />
      </div>
    </div>

    <div className="mt-8 flex justify-end">
      <button
        type="submit"
        className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
      >
        <Save size={20} />
        Save Changes
      </button>
    </div>
  </form>
  )
}

export default FormProfile