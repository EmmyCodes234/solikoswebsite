import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
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
      setError(result.message || 'Login failed. Please verify credentials.');
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-slate-900 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Lockup */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/solikos-icon.png"
              alt="Solikos Energy"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col text-left leading-none">
              <span className="text-2xl font-bold tracking-tight uppercase text-slate-900">
                SOLIKOS
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-amber-600 mt-1">
                PULSE &bull; INVOICING
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Institutional Billing &amp; Invoicing Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-8 sm:p-10">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-900">Staff Authentication</h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with your Solikos internal staff credentials to manage invoices and client accounts.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@solikosenergyltd.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Solikos Pulse'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Access Dev Helper */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={14} className="text-amber-600" />
              <span>One-Click Staff Access (Demo)</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-1">
              Internal portal protected by role-based session control.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-slate-400">
          Solikos Energy LTD &bull; Victoria Island, Lagos &bull; Your Power, Our Priority
        </div>
      </div>
    </div>
  );
};

export default PulseLogin;
