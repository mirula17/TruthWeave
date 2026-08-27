import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Sparkles, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');

    try {
      await login(email.trim(), password.trim());
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Invalid email or password credentials.');
    }
  };

  const handleDemoFill = (role: 'USER' | 'ADMIN') => {
    if (role === 'ADMIN') {
      setEmail('mirula@gmail.com.com');
      setPassword('admin123');
    } else {
      setEmail('mirulaarulmurugan@gmail.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Glow circles */}
      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-500/10">
            <ShieldCheck size={28} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
            TruthWeave
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-1.5 text-xs text-slate-400">
          Weave Truth. Build Trust. Access your verification intelligence workspace.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-3xl border border-slate-800/90 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-2xl shadow-sky-500/5 space-y-6">
          
          {/* Quick Credential Fill Box */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-2">
              <Sparkles size={14} className="text-indigo-400" />
              <span>Fill Test Account Credentials:</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoFill('USER')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 py-2 px-3 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-all"
              >
                <span>Fill USER</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('ADMIN')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2 px-3 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
              >
                <Shield size={12} />
                <span>Fill ADMIN</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/60 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all">
                <Mail size={16} className="absolute left-3.5 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-sky-400 hover:text-sky-300 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900/60 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all">
                <Lock size={16} className="absolute left-3.5 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500/30"
                />
                <span>Remember this device for 8 days</span>
              </label>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              loading={loading}
              className="w-full"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          {/* Create Account Link */}
          <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-800">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-sky-400 hover:text-sky-300 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
