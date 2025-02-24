import React, { useState } from 'react';
import { Camera, Save, X, Lock } from 'lucide-react';

function EditProfile() {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '08123456789',
    bio: 'Write your bio here...'
  });

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('New profile picture:', previewImage);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
    <div className="p-6">
      {/* Background Pattern with pointer-events-none */}
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
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
            <p className="text-slate-600 mt-1">Update your personal information and profile picture</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Profile Picture Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Profile Picture
              </label>
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

            {/* Personal Information Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  Email Address
                  <Lock size={14} className="text-slate-400" />
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Lock size={16} className="text-slate-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Email tidak dapat diubah</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
                  placeholder="Write something about yourself..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
