import React, { useState, useEffect } from 'react';
import { Bell, Search, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically fetch items where status might be matched or recently found items
    // This serves as an intelligent dynamic alert system based on recent DB activity
    const fetchRecentAlerts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/items?limit=5'); // Fetching 5 most recent global items
        const rawItems = data.items || [];
        
        const readIds = JSON.parse(localStorage.getItem('readNotificationIds') || '[]');
        
        // Map them into a notification format
        const dynamicAlerts = rawItems.map(item => ({
          id: item._id,
          title: item.type === 'found' ? 'New Item Found on Campus' : 'New Lost Item Report',
          message: `A ${item.name} was marked as ${item.type} near ${item.location.building}.`,
          type: item.type,
          date: item.createdAt,
          read: readIds.includes(item._id)
        }));

        setNotifications(dynamicAlerts);
        
        // Mark as seen globally to clear navbar badge
        localStorage.setItem('alertsReadAt', new Date().toISOString());
        window.dispatchEvent(new Event('alertsRead'));
      } catch (err) {
        toast.error('Failed to sync notification center');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAlerts();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    const readIds = JSON.parse(localStorage.getItem('readNotificationIds') || '[]');
    if (!readIds.includes(id)) {
      localStorage.setItem('readNotificationIds', JSON.stringify([...readIds, id]));
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    const allIds = notifications.map(n => n.id);
    const readIds = JSON.parse(localStorage.getItem('readNotificationIds') || '[]');
    const newIds = [...new Set([...readIds, ...allIds])];
    localStorage.setItem('readNotificationIds', JSON.stringify(newIds));
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
           <p className="text-gray-500 font-medium tracking-wide">Syncing alerts...</p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex justify-between items-end">
           <div>
             <h1 className="text-3xl font-bold text-gray-900 font-title mb-1 flex items-center gap-2">
               <Bell className="text-primary-600" /> Notifications
             </h1>
             <p className="text-gray-500">Stay updated with latest intelligence on lost items.</p>
           </div>
           {unreadCount > 0 && (
             <button onClick={markAllRead} className="text-sm font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg transition-colors">
               Mark all read
             </button>
           )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="p-16 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 text-gray-400">
                 <CheckCircle2 size={36} />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-2 font-title">You're all caught up!</h3>
               <p className="text-gray-500">There are no new intelligence alerts or matching items right now.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-6 flex gap-5 transition-colors ${notif.read ? 'bg-white opacity-70' : 'bg-blue-50/30'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border ${notif.type === 'found' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 'bg-red-100 text-red-600 border-red-200'}`}>
                    {notif.type === 'found' ? <CheckCircle2 size={24} /> : <Search size={24} />}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-base font-bold text-gray-900">{notif.title}</h4>
                      <span className="text-xs font-semibold text-gray-400 tracking-wide">
                        {new Date(notif.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">{notif.message}</p>
                    <div className="mt-4 flex gap-3">
                      <Link to="/check" className="text-sm font-bold text-primary-600 hover:text-primary-700">View Details</Link>
                      {!notif.read && (
                        <button onClick={() => markAsRead(notif.id)} className="text-sm font-bold text-gray-500 hover:text-gray-700">Mark read</button>
                      )}
                    </div>
                  </div>
                  {!notif.read && (
                    <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationsPage;
