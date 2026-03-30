import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Search, Compass, ShieldCheck, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate('/check');
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', formData);
      login(data.user, data.token);
      toast.success('Successfully logged in!');
      navigate('/check');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)] min-h-[600px] w-full bg-gray-50 overflow-hidden">
      {/* LEFT SIDE - Brand & Features (50%) */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 text-white flex-col justify-center p-16 xl:p-24 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-lg mx-auto w-full">
          <Link to="/" className="inline-block mb-12">
            <h1 className="text-4xl md:text-5xl font-title font-bold tracking-tight text-white mb-2">
              <span className="text-primary-500">FindIt</span>@Campus
            </h1>
            <p className="text-gray-400 tracking-widest text-sm uppercase">Campus Lost & Found Intelligence</p>
          </Link>

          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 text-primary-400 shadow-lg">
                <Search size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Track Items</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Know exactly where your items are being safely stored.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 text-primary-400 shadow-lg">
                <Compass size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Browse Global Feed</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Find and match with items found across all campus locations instantly.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 text-primary-400 shadow-lg">
                <ShieldCheck size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Secure Validation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Robust identity validation ensures items return to true owners.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 text-primary-400 shadow-lg">
                <Bell size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Stay Notified</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Never miss an update when someone finds a similar item.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form (50%) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 xl:p-24 bg-white relative">
        <div className="w-full max-w-md mx-auto relative z-10">
          
          <div className="flex justify-center mb-10 gap-2 p-1.5 bg-gray-100 rounded-xl overflow-hidden self-start sm:w-max mx-auto sm:mx-0">
             <div className="px-8 py-2.5 bg-white text-gray-900 font-bold rounded-lg shadow-sm text-sm">Sign In</div>
             <Link to="/register" className="px-8 py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-lg transition-colors text-sm">Register</Link>
          </div>

          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to your FindIt@Campus account</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="email">Email address</label>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                placeholder="you@campus.edu"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="password">Password</label>
                 <Link to="/forgot-password" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative">
                 <input
                   id="password" name="password" type={showPassword ? 'text' : 'password'} required
                   value={formData.password} onChange={handleChange}
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
                type="submit" disabled={loading}
                className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all focus:ring-4 focus:ring-primary-100 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                    Sign In
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center sm:text-left text-sm text-gray-500">
             Log in with your university `.edu` account for full access.
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
