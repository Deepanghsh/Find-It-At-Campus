import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Search, Compass, ShieldCheck, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    phone: '',
  });
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
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', formData);
      toast.success('Registration successful!');
      
      // Auto login after registration
      login(data.user, data.token);
      navigate('/check');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] w-full bg-gray-50 overflow-hidden">
      {/* LEFT SIDE - Brand & Features (50%) */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 text-white flex-col justify-center p-16 xl:p-24 relative overflow-hidden sticky top-0 h-[calc(100vh-65px)]">
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
        <div className="w-full max-w-[500px] mx-auto relative z-10">
          
          <div className="flex justify-center mb-10 gap-2 p-1.5 bg-gray-100 rounded-xl overflow-hidden self-start sm:w-max mx-auto sm:mx-0">
             <Link to="/login" className="px-8 py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-lg transition-colors text-sm">Sign In</Link>
             <div className="px-8 py-2.5 bg-white text-gray-900 font-bold rounded-lg shadow-sm text-sm">Register</div>
          </div>

          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">Create Account</h2>
            <p className="text-gray-500">Join the campus intelligence network</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="firstName">First Name</label>
                <input
                  id="firstName" name="firstName" type="text" required
                  value={formData.firstName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName" name="lastName" type="text" required
                  value={formData.lastName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="email">University Email</label>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                placeholder="you@campus.edu"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="studentId">Student ID / Roll No</label>
                 <input
                   id="studentId" name="studentId" type="text"
                   value={formData.studentId} onChange={handleChange}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                   placeholder="Optional"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="phone">Phone Number</label>
                 <input
                   id="phone" name="phone" type="text"
                   value={formData.phone} onChange={handleChange}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                   placeholder="Optional"
                 />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="password">Password</label>
                 <div className="relative">
                    <input
                      id="password" name="password" type={showPassword ? 'text' : 'password'} required minLength="6"
                      value={formData.password} onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 pr-10"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="confirmPassword">Confirm Password</label>
                 <div className="relative">
                    <input
                      id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} required minLength="6"
                      value={formData.confirmPassword} onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 pr-10"
                      placeholder="••••••••"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
               </div>
            </div>

            <div className="pt-6">
              <button
                type="submit" disabled={loading}
                className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all focus:ring-4 focus:ring-primary-100 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    Registering...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                    Create Account
                  </span>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
