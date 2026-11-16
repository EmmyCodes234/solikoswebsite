import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  ReceiptText,
  Plus,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
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
      icon: ReceiptText,
      count: invoices.length,
    },
    {
      to: '/pulse/contacts',
      label: 'Clients',
      icon: Users,
      count: contacts.length,
    },
    {
      to: '/pulse/catalog',
      label: 'Products',
      icon: Package,
    },
    {
      to: '/pulse/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] flex flex-col md:flex-row font-sans antialiased">
      {/* Mobile Bar */}
      <header className="md:hidden bg-white border-b border-[#ECECEB] px-5 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <Link to="/pulse/invoices" className="flex items-center gap-2.5">
          <img src="/solikos-icon.png" alt="Solikos" className="w-7 h-7 object-contain" />
          <span className="font-semibold text-sm tracking-tight text-[#111111]">Solikos Pulse</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/pulse/create"
            className="bg-[#111111] text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <Plus size={14} />
            <span>New</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg text-[#666666] hover:bg-[#F4F4F3]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-[#ECECEB] flex flex-col justify-between transform transition-transform duration-200 ease-out md:translate-x-0 md:static ${
          mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F4F4F3] flex items-center justify-between">
            <Link to="/pulse/invoices" className="flex items-center gap-2.5 group">
              <img src="/solikos-icon.png" alt="Solikos Energy" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm tracking-tight text-[#111111]">
                  Solikos Pulse
                </span>
                <span className="text-[10px] text-[#888888]">Invoicing</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-[#888888] hover:text-[#111111]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Create Action */}
          <div className="p-3">
            <Link
              to="/pulse/create"
              onClick={() => setMobileOpen(false)}
              className="w-full bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus size={14} />
              <span>New invoice</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-2 py-1 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F4F4F3] text-[#111111] font-semibold'
                        : 'text-[#666666] hover:bg-[#F9F9F8] hover:text-[#111111]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className="text-[#888888]" />
                    <span>{item.label}</span>
                  </div>
                  {typeof item.count === 'number' && (
                    <span className="text-[11px] text-[#999999] font-mono">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#F4F4F3] space-y-2">
          {/* User Profile */}
          <div className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#EFEFEF] text-[#555555] font-semibold text-[10px] flex items-center justify-center shrink-0">
                {user?.avatar || 'SP'}
              </div>
              <span className="text-xs text-[#444444] font-medium truncate">{user?.name || 'Staff'}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="text-[#999999] hover:text-red-600 transition-colors p-1"
            >
              <LogOut size={13} />
            </button>
          </div>

          <div className="px-2 pt-1 border-t border-[#F4F4F3]">
            <Link
              to="/"
              target="_blank"
              className="text-[#888888] hover:text-[#111111] text-[11px] flex items-center gap-1 transition-colors"
            >
              <span>solikosenergyltd.com</span>
              <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PulseLayout;
