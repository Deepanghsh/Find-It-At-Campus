import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/api';

const CheckStatusPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', status: '' });

  const fetchMyItems = async () => {
    try {
      const res = await api.get('/items/my');
      setItems(res.data.items);
    } catch (err) {
      toast.error('Failed to load your reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/items/${itemToDelete}`);
      setItems(items.filter(item => item._id !== itemToDelete));
      toast.success('Report deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete report');
    }
    setItemToDelete(null);
  };

  const openEdit = (item) => {
    setItemToEdit(item);
    setEditForm({ name: item.name, description: item.description, status: item.status || 'open' });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/items/${itemToEdit._id}`, editForm);
      setItems(items.map(i => i._id === itemToEdit._id ? res.data.item : i));
      toast.success('Report updated successfully');
      setItemToEdit(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update report');
    }
  };

  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
           <p className="text-gray-500 font-medium tracking-wide">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-title">My Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage your reported items</p>
          </div>
          <div className="flex gap-3">
             <Link to="/lost" className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
               <span className="material-symbols-outlined text-[20px] text-red-500">search</span>
               Report Lost
             </Link>
             <Link to="/found" className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg shadow-sm hover:bg-primary-700 transition-colors flex items-center gap-2">
               <span className="material-symbols-outlined text-[20px]">verified</span>
               Report Found
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Reports</p>
              <p className="text-3xl font-bold font-title text-gray-900">{items.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-2xl">monitoring</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Items Lost</p>
              <p className="text-3xl font-bold font-title text-gray-900">{items.filter(i => i.type === 'lost').length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Items Found</p>
              <p className="text-3xl font-bold font-title text-gray-900">{items.filter(i => i.type === 'found').length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex -mb-px px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('all')}
                className={`w-1/3 md:w-auto py-4 px-6 text-center border-b-2 font-medium text-sm sm:text-base transition-colors ${activeTab === 'all' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                All Reports
              </button>
              <button
                onClick={() => setActiveTab('lost')}
                className={`w-1/3 md:w-auto py-4 px-6 text-center border-b-2 font-medium text-sm sm:text-base transition-colors ${activeTab === 'lost' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Lost Items
              </button>
              <button
                onClick={() => setActiveTab('found')}
                className={`w-1/3 md:w-auto py-4 px-6 text-center border-b-2 font-medium text-sm sm:text-base transition-colors ${activeTab === 'found' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Found Items
              </button>
            </nav>
          </div>

          <div className="p-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <span className="material-symbols-outlined text-4xl text-gray-400">inventory_2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-title">No reports found</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  {activeTab === 'all' 
                    ? "You haven't reported any lost or found items yet."
                    : `You haven't made any ${activeTab} item reports.`}
                </p>
                <div className="flex items-center justify-center gap-4">
                   <Link to="/lost" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                     Report Lost
                   </Link>
                   <Link to="/found" className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg shadow-sm hover:bg-primary-700 transition-colors">
                     Report Found
                   </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map(item => (
                  <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white relative group overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.type === 'lost' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                    
                    <div className="w-full sm:w-32 h-32 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 flex justify-center items-center border border-gray-100 relative">
                      {item.images && item.images.length > 0 ? (
                        <img 
                           src={`http://localhost:5000/uploads/${item.images[0]}`} 
                           alt={item.name} 
                           className="w-full h-full object-cover"
                           onError={(e) => {
                             e.target.onerror = null;
                             e.target.style.display = 'none';
                             e.target.nextSibling.style.display = 'flex';
                           }}
                        />
                      ) : null}
                      {(!item.images || item.images.length === 0) && (
                        <div className="w-full h-full flex items-center justify-center flex-col text-gray-400">
                          <span className="material-symbols-outlined text-3xl mb-1">image_not_supported</span>
                          <span className="text-xs font-medium">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow flex flex-col pt-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.type === 'lost' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                              {item.type}
                            </span>
                            <span className="text-xs text-gray-500 font-medium tracking-wide">
                              {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 font-title hover:text-primary-600 transition-colors cursor-pointer">{item.name}</h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                           <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                             item.status === 'resolved' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                             item.status === 'matched' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                             'bg-gray-100 text-gray-700 border border-gray-200'
                           }`}>
                             {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                           </span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5" title="Category">
                            <span className="material-symbols-outlined text-[16px]">category</span>
                            <span className="capitalize">{item.category}</span>
                          </span>
                          <span className="hidden sm:flex items-center gap-1.5" title="Location">
                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                            <span className="truncate max-w-[150px]">{item.location?.building}</span>
                          </span>
                        </div>
                        <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(item)} className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded bg-gray-50 border border-gray-200 transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button 
                            onClick={() => setItemToDelete(item._id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded bg-gray-50 border border-gray-200 transition-colors" title="Delete"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative mt-10">
             <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
               <span className="material-symbols-outlined text-2xl">warning</span>
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Report?</h3>
             <p className="text-gray-600 mb-6 text-sm">This action cannot be undone. This report will be permanently removed.</p>
             <div className="flex justify-end gap-3">
               <button onClick={() => setItemToDelete(null)} className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
               <button onClick={confirmDelete} className="px-5 py-2.5 bg-red-600 text-white font-bold hover:bg-red-700 rounded-lg shadow-sm transition-colors">Yes, Delete</button>
             </div>
          </div>
        </div>
      )}

      {itemToEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative mt-10">
             <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
               <h3 className="text-xl font-bold text-gray-900 font-title">Edit Report</h3>
               <button onClick={() => setItemToEdit(null)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                 <span className="material-symbols-outlined">close</span>
               </button>
             </div>
             <form onSubmit={handleEditSubmit} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input type="text" required value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none cursor-pointer">
                    <option value="open">Open</option>
                    <option value="matched">Matched (Pending Exchange)</option>
                    <option value="resolved">Resolved (Returned/Found)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={4} required value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"></textarea>
               </div>
               <div className="pt-4 flex justify-end gap-3 border-t border-gray-50 mt-4">
                 <button type="button" onClick={() => setItemToEdit(null)} className="px-5 py-2.5 bg-gray-50 text-gray-700 font-medium hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors">Cancel</button>
                 <button type="submit" className="px-5 py-2.5 bg-primary-600 text-white font-bold hover:bg-primary-700 rounded-lg shadow-sm transition-colors">Save Changes</button>
               </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckStatusPage;
