import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import api from '../api/api';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await api.put(`/auth/resetpassword/${token}`, { password });
      toast.success('Password reset successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] w-full bg-gray-50 overflow-hidden">
      {/* LEFT SIDE - Brand */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 text-white flex-col justify-center p-16 xl:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-lg mx-auto w-full">
          <div className="inline-block mb-12">
            <h1 className="text-4xl md:text-5xl font-title font-bold tracking-tight text-white mb-2">
              <span className="text-primary-500">FindIt</span>@Campus
            </h1>
            <p className="text-gray-400 tracking-widest text-sm uppercase">Secure Account Recovery</p>
          </div>
          <div className="space-y-6">
             <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center text-primary-400 mb-6 shadow-xl border border-gray-700">
               <KeyRound size={32} strokeWidth={2} />
             </div>
             <h2 className="text-3xl font-bold font-title">Create New Password</h2>
             <p className="text-gray-400 text-lg leading-relaxed max-w-md">Almost there! Please choose a strong new password to secure your account. Make sure it's at least 6 characters long.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white relative">
        <div className="w-full max-w-md mx-auto relative z-10">
          
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">New Password</h2>
            <p className="text-gray-500">Enter your new credentials below</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="password">New Password</label>
              <div className="relative">
                 <input
                   id="password" name="password" type={showPassword ? 'text' : 'password'} required minLength="6"
                   value={password} onChange={(e) => setPassword(e.target.value)}
                   className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 pr-12"
                   placeholder="••••••••"
                 />
                 <button 
                   type="button" 
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                 >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                 <input
                   id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} required minLength="6"
                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                   className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 pr-12"
                   placeholder="••••••••"
                 />
                 <button 
                   type="button" 
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                 >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit" disabled={loading || !password || !confirmPassword}
                className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
