import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PulseLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@solikosenergyltd.com');
  const [password, setPassword] = useState('solikos2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/pulse/invoices';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Invalid email or password.');
    }
  };

  const handleQuickLogin = async () => {
    setEmail('admin@solikosenergyltd.com');
    setPassword('solikos2026');
    setLoading(true);
    const result = await login('admin@solikosenergyltd.com', 'solikos2026');
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center items-center p-6 text-[#111111] font-sans">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src="/solikos-icon.png"
            alt="Solikos Energy"
            className="w-10 h-10 object-contain mb-3"
          />
          <h1 className="text-xl font-semibold tracking-tight text-[#111111]">
            Solikos Pulse
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Sign in to manage invoices and clients.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-[#ECECEB] p-6 sm:p-7 shadow-xs">
          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@solikosenergyltd.com"
                  required
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={14} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs mt-2"
            >
              <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              <ArrowRight size={13} />
            </button>
          </form>

          {/* Quick Login button */}
          <div className="mt-4 pt-4 border-t border-[#F4F4F3] text-center">
            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={loading}
              className="text-xs text-[#737373] hover:text-[#111111] font-medium transition-colors"
            >
              Sign in with demo credentials
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#A3A3A3] mt-6">
          Solikos Energy LTD · Your Power, Our Priority
        </p>
      </div>
    </div>
  );
};

export default PulseLogin;
