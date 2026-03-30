import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { KeyRound, ArrowLeft, Eye, EyeOff, ShieldCheck, CheckCircle } from 'lucide-react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const STEPS = [
  { num: 1, label: 'Email' },
  { num: 2, label: 'Verify OTP' },
  { num: 3, label: 'New Password' },
];

const passwordRules = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number (0-9)', test: (p) => /[0-9]/.test(p) },
  { label: 'One special character (!@#$%^&*…)', test: (p) => /[!@#$%^&*(),.?":{}|<>_\-+=/\\\[\]~`]/.test(p) },
];

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const passwordValid = passwordRules.every((r) => r.test(password));

  // ── Step 1: Send OTP ────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgotpassword', { email });
      setStep(2);
      toast.success('OTP sent! Check your inbox.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Verify OTP ──────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return toast.error('Enter the full 6-digit OTP');
    setLoading(true);
    try {
      await api.post('/auth/verify-reset-otp', { email, otp });
      setStep(3);
      toast.success('OTP verified! Now set your new password.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Reset Password ──────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!passwordValid) return toast.error('Password does not meet all requirements');
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const { data } = await api.put('/auth/resetpassword', { email, otp, password });
      toast.success('Password reset! Logging you in…');
      login(data.user, data.token);
      navigate('/check');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] w-full bg-gray-50 overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 text-white flex-col justify-center p-16 xl:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 max-w-lg mx-auto w-full">
          <Link to="/" className="inline-block mb-12">
            <h1 className="text-4xl md:text-5xl font-title font-bold tracking-tight text-white mb-2">
              <span className="text-primary-500">FindIt</span>@Campus
            </h1>
            <p className="text-gray-400 tracking-widest text-sm uppercase">Campus Lost &amp; Found Intelligence</p>
          </Link>
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center text-primary-400 mb-6 shadow-xl border border-gray-700">
              <KeyRound size={32} strokeWidth={2} />
            </div>
            <h2 className="text-3xl font-bold font-title">Forgot your password?</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              No worries! Enter your email, verify with a 6-digit OTP, then set a new secure password.
            </p>

            {/* Step indicators on left panel */}
            <div className="space-y-3 pt-4">
              {STEPS.map((s) => (
                <div key={s.num} className={`flex items-center gap-3 transition-opacity ${step >= s.num ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step > s.num ? 'bg-green-500 border-green-500 text-white' : step === s.num ? 'border-primary-400 text-primary-400 bg-gray-800' : 'border-gray-600 text-gray-600 bg-gray-800'}`}>
                    {step > s.num ? <CheckCircle size={16} /> : s.num}
                  </div>
                  <span className={`text-sm font-medium ${step === s.num ? 'text-white' : step > s.num ? 'text-green-400' : 'text-gray-500'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white relative">
        <div className="w-full max-w-md mx-auto relative z-10">

          <Link to="/login" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary-600 mb-10 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to login
          </Link>

          {/* Mobile step indicator */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className={`flex items-center gap-1.5 text-xs font-bold ${step === s.num ? 'text-primary-600' : step > s.num ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${step > s.num ? 'bg-green-500 border-green-500 text-white' : step === s.num ? 'border-primary-500 text-primary-600' : 'border-gray-300 text-gray-400'}`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  {s.label}
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px ${step > s.num ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* ── STEP 1: Email ──────────────────────────────────── */}
          {step === 1 && (
            <>
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">Reset Password</h2>
                <p className="text-gray-500">Enter your registered email to receive a one-time code.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSendOtp}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="fp-email">Email address</label>
                  <input
                    id="fp-email" name="email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900"
                    placeholder="you@campus.edu"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit" disabled={loading || !email}
                    className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Sending OTP…
                      </span>
                    ) : 'Send OTP'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── STEP 2: Verify OTP ─────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center sm:text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">Enter OTP</h2>
                <p className="text-gray-500">We sent a 6-digit code to</p>
                <span className="font-bold text-gray-900 flex items-center gap-1 justify-center sm:justify-start mt-1">
                  <ShieldCheck size={16} className="text-primary-500" /> {email}
                </span>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">6-Digit OTP</label>
                  <input
                    type="text" required maxLength="6" placeholder="000000"
                    value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 text-center tracking-[1em] font-mono text-3xl font-extrabold placeholder:opacity-50"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit" disabled={loading || otp.length !== 6}
                    className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all focus:ring-4 focus:ring-primary-100 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Verifying…
                      </span>
                    ) : 'Verify OTP'}
                  </button>
                  <button
                    type="button" onClick={() => { setStep(1); setOtp(''); }} disabled={loading}
                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                  >
                    Use a different email
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── STEP 3: New Password ───────────────────────────── */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center sm:text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900 font-title mb-2">New Password</h2>
                <p className="text-gray-500">OTP verified ✓ — now set a strong new password for</p>
                <span className="font-bold text-gray-900 flex items-center gap-1 justify-center sm:justify-start mt-1">
                  <ShieldCheck size={16} className="text-primary-500" /> {email}
                </span>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="fp-password">New Password</label>
                  <div className="relative">
                    <input
                      id="fp-password" name="password" type={showPassword ? 'text' : 'password'} required minLength="8"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 pr-10"
                      placeholder="Min. 8 chars, uppercase, number, special"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Live password checklist */}
                  {password && (
                    <ul className="mt-2 grid grid-cols-2 gap-1">
                      {passwordRules.map((rule) => {
                        const ok = rule.test(password);
                        return (
                          <li key={rule.label} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${ok ? 'text-green-600' : 'text-red-500'}`}>
                            <span className="text-sm">{ok ? '✓' : '✗'}</span>
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide" htmlFor="fp-confirm">Confirm New Password</label>
                  <div className="relative">
                    <input
                      id="fp-confirm" name="confirmPassword" type={showPassword ? 'text' : 'password'} required minLength="8"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all outline-none text-gray-900 pr-10"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 font-medium mt-1">✗ Passwords do not match</p>
                  )}
                  {confirmPassword && password === confirmPassword && passwordValid && (
                    <p className="text-xs text-green-600 font-medium mt-1">✓ Passwords match</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit" disabled={loading || !passwordValid || password !== confirmPassword}
                    className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all focus:ring-4 focus:ring-primary-100 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Resetting…
                      </span>
                    ) : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
