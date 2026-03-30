import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { KeyRound, ArrowLeft } from 'lucide-react';
import api from '../api/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgotpassword', { email });
      setIsSent(true);
      toast.success('Password reset email sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
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
          <Link to="/" className="inline-block mb-12">
            <h1 className="text-4xl md:text-5xl font-title font-bold tracking-tight text-white mb-2">
              <span className="text-primary-500">FindIt</span>@Campus
            </h1>
            <p className="text-gray-400 tracking-widest text-sm uppercase">Campus Lost & Found Intelligence</p>
          </Link>
          <div className="space-y-6">
             <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center text-primary-400 mb-6 shadow-xl border border-gray-700">
               <KeyRound size={32} strokeWidth={2} />
             </div>
             <h2 className="text-3xl font-bold font-title">Forgot your password?</h2>
             <p className="text-gray-400 text-lg leading-relaxed max-w-md">No worries! It happens to the best of us. Just tell us your email and we'll send you a secure link to reset it instantly.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white relative">
        <div className="w-full max-w-md mx-auto relative z-10">
          
          <Link to="/login" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary-600 mb-10 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to login
          </Link>

          {isSent ? (
            <div className="text-center sm:text-left space-y-6">
               <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6 mx-auto sm:mx-0">
                 <span className="material-symbols-outlined text-3xl">mark_email_read</span>
               </div>
               <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">Check your email</h2>
               <p className="text-gray-500 text-lg">We've sent a password reset link to <span className="font-bold text-gray-900">{email}</span>. Click the link to reset your password.</p>
               <p className="text-gray-400 text-sm mt-4">If you don't see it, check your spam folder or try again.</p>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">Reset Password</h2>
                <p className="text-gray-500">Enter your email to receive recovery instructions.</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="email">Email address</label>
                  <input
                    id="email" name="email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                    placeholder="you@campus.edu"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit" disabled={loading || !email}
                    className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
