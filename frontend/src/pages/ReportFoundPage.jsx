import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/api';

const ReportFoundPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    description: '',
    building: '',
    floor: '',
    date: '',
    time: '',
    contactName: '',
    contactPhone: '',
    notifications: true,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      toast.error('You can only upload up to 3 images');
      e.target.value = null; // reset
      return;
    }
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('type', 'found');
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      await api.post('/items', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Found item reported successfully! Thank you for helping.');
      navigate('/check');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to report item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl lg:max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
             <h2 className="text-3xl font-bold font-title relative z-10 flex items-center gap-3">
               <span className="material-symbols-outlined text-4xl">verified</span>
               Report Found Item
             </h2>
             <p className="mt-2 text-emerald-100 relative z-10 text-lg">
               Thank you for finding this! Provide details to help us locate the owner.
             </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6 font-title">
                1. Item Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">What did you find? <span className="text-red-500">*</span></label>
                  <input
                    type="text" id="name" name="name" required
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none transition-shadow"
                    placeholder="e.g. AirPods Pro case, Dorm Keys"
                    value={formData.name} onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                  <select
                    id="category" name="category"
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none cursor-pointer"
                    value={formData.category} onChange={handleInputChange}
                  >
                    <option value="electronics">Electronics (Phones, Laptops)</option>
                    <option value="accessories">Accessories (Keys, Wallets, Glasses)</option>
                    <option value="documents">Documents (IDs, Notebooks)</option>
                    <option value="clothing">Clothing (Jackets, Umbrellas)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description <span className="text-red-500">*</span></label>
                  <textarea
                    id="description" name="description" required
                    className="mt-1 block w-full h-[150px] rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none resize-none"
                    placeholder="Please describe the item. You can omit very specific details (like lock screen photos) to verify the true owner later."
                    value={formData.description} onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images (Max 3)</label>
                  <label htmlFor="images" className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer relative w-full">
                    <div className="space-y-2 text-center">
                      <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-emerald-500 transition-colors">cloud_upload</span>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative font-medium text-emerald-600 px-2 py-1 shadow-sm">
                          Upload files
                          <input id="images" name="images" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} />
                        </span>
                        <p className="pl-1 pt-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB each</p>
                    </div>
                  </label>
                  {images.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600 font-medium">
                      {images.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6 font-title">
                2. Where & When
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label htmlFor="building" className="block text-sm font-medium text-gray-700">Where did you find it? <span className="text-red-500">*</span></label>
                   <input
                     type="text" id="building" name="building" required
                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none"
                     placeholder="e.g. Cafeteria, East Gate"
                     value={formData.building} onChange={handleInputChange}
                   />
                </div>
                <div>
                   <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Specific Location details</label>
                   <input
                     type="text" id="floor" name="floor"
                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none"
                     placeholder="e.g. Table 5, under bench"
                     value={formData.floor} onChange={handleInputChange}
                   />
                </div>
                <div>
                   <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date Found <span className="text-red-500">*</span></label>
                   <input
                     type="date" id="date" name="date" required
                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none cursor-pointer"
                     value={formData.date} onChange={handleInputChange}
                     max={new Date().toISOString().split('T')[0]}
                   />
                </div>
                <div>
                   <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time Found</label>
                   <input
                     type="time" id="time" name="time"
                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none cursor-pointer"
                     value={formData.time} onChange={handleInputChange}
                   />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6 font-title">
                3. Your Contact Info (Optional)
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                We'll use your account email so the owner can reach out to you safely.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Name to display</label>
                   <input
                     type="text" id="contactName" name="contactName"
                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none"
                     value={formData.contactName} onChange={handleInputChange}
                   />
                </div>
                <div>
                   <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone (Visible to owner)</label>
                   <input
                     type="text" id="contactPhone" name="contactPhone"
                     className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 border p-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm outline-none"
                     placeholder="+1 (555) 000-0000"
                     value={formData.contactPhone} onChange={handleInputChange}
                   />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
               <button
                 type="button"
                 onClick={() => navigate(-1)}
                 className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
               >
                 Cancel
               </button>
               <button
                 type="submit"
                 disabled={loading}
                 className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[170px]"
               >
                 {loading ? (
                   <span className="flex items-center gap-2">
                     <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                     Submitting...
                   </span>
                 ) : (
                   'Post Found Report'
                 )}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportFoundPage;
