import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  PlusCircle,
  Users,
  Cpu,
  Settings,
  Palette,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePulse } from '../context/PulseContext';

export const PulseLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { invoices, contacts } = usePulse();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/pulse/login');
  };

  const navItems = [
    {
      to: '/pulse/invoices',
      label: 'Invoices',
      icon: FileText,
      badge: invoices.length.toString(),
    },
    {
      to: '/pulse/create',
      label: 'Create Invoice',
      icon: PlusCircle,
      highlight: true,
    },
    {
      to: '/pulse/contacts',
      label: 'Contacts (CRM)',
      icon: Users,
      badge: contacts.length.toString(),
    },
    {
      to: '/pulse/catalog',
      label: 'Hardware Catalog',
      icon: Cpu,
    },
    {
      to: '/pulse/settings',
      label: 'Company & Banking',
      icon: Settings,
    },
    {
      to: '/pulse/branding',
      label: 'Branding & Templates',
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Mobile Topbar */}
      <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <img src="/solikos-icon.png" alt="Solikos" className="w-8 h-8 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight uppercase text-slate-900">Solikos</span>
            <span className="text-[8px] font-bold tracking-widest text-amber-600 uppercase">Pulse</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/pulse/create"
            className="bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"
          >
            <PlusCircle size={14} />
            <span>New</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link to="/pulse/invoices" className="flex items-center gap-3">
              <img src="/solikos-icon.png" alt="Solikos Energy" className="w-9 h-9 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-lg tracking-tight uppercase text-slate-900">
                  SOLIKOS
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-amber-600 uppercase mt-0.5">
                  PULSE &bull; PORTAL
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Create CTA */}
          <div className="p-4">
            <Link
              to="/pulse/create"
              onClick={() => setMobileOpen(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-slate-900/10 transition-all hover:scale-[1.01]"
            >
              <PlusCircle size={15} />
              <span>Create New Invoice</span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-50 text-amber-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-slate-400 group-hover:text-slate-900" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono font-medium">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          {/* User Profile */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-150">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
              {user?.avatar || 'SP'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.name || 'Staff User'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded uppercase">
              {user?.role || 'Staff'}
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center justify-between text-xs pt-1 px-1">
            <Link
              to="/"
              target="_blank"
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors text-[11px]"
            >
              <span>Main Website</span>
              <ExternalLink size={11} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors text-[11px]"
            >
              <LogOut size={12} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/30 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Outlet */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PulseLayout;
