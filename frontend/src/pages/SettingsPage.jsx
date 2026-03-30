import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { User, Lock, Paintbrush, Smartphone, Mail, Hash, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/api';

const SettingsPage = () => {
  const { user, login } = useContext(AuthContext);
  const { currentTheme, themes, changeTheme } = useTheme();

  // Profile Form State
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    phone: user?.phone || '',
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const { data } = await api.put('/auth/updateprofile', profileData);
      login(data.user, localStorage.getItem('token'));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      return toast.error('New passwords do not match');
    }
    setSavingPassword(true);
    try {
      await api.put('/auth/updatepassword', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-end">
           <div>
             <h1 className="text-3xl font-bold text-gray-900 font-title mb-1">Settings</h1>
             <p className="text-gray-500">Manage your account, preferences, and appearance.</p>
           </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
           <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                <Paintbrush size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Theme & Appearance</h3>
                <p className="text-sm text-gray-500">Choose your preferred application color theme</p>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                    currentTheme === t.id ? 'border-primary-600 bg-primary-50 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex gap-1 mb-3">
                    <div style={{ backgroundColor: t.color }} className="w-5 h-5 rounded-full border border-black/10 shadow-sm"></div>
                    <div style={{ backgroundColor: t.color, opacity: 0.7 }} className="w-5 h-5 rounded-full border border-black/10 shadow-sm -ml-2"></div>
                    <div style={{ backgroundColor: t.color, opacity: 0.4 }} className="w-5 h-5 rounded-full border border-black/10 shadow-sm -ml-2"></div>
                  </div>
                  <span className={`text-sm font-semibold ${currentTheme === t.id ? 'text-primary-700' : 'text-gray-600'}`}>{t.name}</span>
                  {currentTheme === t.id && (
                    <div className="absolute top-2 right-2 text-primary-600">
                      <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                    </div>
                  )}
                </button>
              ))}
           </div>
           <p className="text-xs text-center text-gray-400 mt-6 font-medium">Theme is applied instantly and saved automatically to your device.</p>
        </div>

        {/* Profile Card Hero */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700 w-full"></div>
          <div className="px-6 md:px-10 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12 mb-6 sm:mb-2">
              <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-lg">
                <div className="w-full h-full bg-primary-100 text-primary-700 rounded-2xl flex items-center justify-center text-4xl font-bold uppercase">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              </div>
              <div className="text-center sm:text-left pb-2">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                   <span className="flex items-center gap-1.5"><Mail size={14} /> {user?.email}</span>
                   <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded font-medium text-xs capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Personal Info */}
          <form onSubmit={handleProfileSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User size={20} className="text-primary-600" /> Personal Information
              </h3>
              <button 
                type="submit" disabled={savingProfile}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 transition disabled:opacity-70 shadow-sm"
              >
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                  <input
                    type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Mail size={12}/> Email Address</label>
                <input
                  type="email" name="email" value={profileData.email} onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Hash size={12}/> Student ID</label>
                  <input
                    type="text" name="studentId" value={profileData.studentId} onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                    placeholder="E.g. 2024CS01"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Smartphone size={12}/> Phone Number</label>
                  <input
                    type="text" name="phone" value={profileData.phone} onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                    placeholder="Your contact number"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Right Column: Security */}
          <form onSubmit={handlePasswordSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Lock size={20} className="text-primary-600" /> Security & Authentication
              </h3>
              <button 
                type="submit" disabled={savingPassword}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-70 shadow-sm"
              >
                {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-4">
                 <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400">
                    <Lock size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">Password Requirements</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Ensure your account is using a long, random password to stay secure. Must be at least 6 characters.</p>
                 </div>
              </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
                 <input
                   type="password" name="currentPassword" required
                   value={passwordData.currentPassword} onChange={handlePasswordChange}
                   className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                 />
               </div>
               
               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
                 <input
                   type="password" name="newPassword" required minLength="6"
                   value={passwordData.newPassword} onChange={handlePasswordChange}
                   className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
                 <input
                   type="password" name="confirmNewPassword" required minLength="6"
                   value={passwordData.confirmNewPassword} onChange={handlePasswordChange}
                   className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                 />
               </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
