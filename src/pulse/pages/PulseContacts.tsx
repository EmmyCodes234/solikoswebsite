import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  FileText,
  PlusCircle,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import { usePulse } from '../context/PulseContext';
import { Contact } from '../types';

export const PulseContacts: React.FC = () => {
  const { contacts, invoices } = usePulse();
  const [search, setSearch] = useState('');

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.address && c.address.toLowerCase().includes(q))
    );
  });

  const totalClientVolume = contacts.reduce((acc, c) => acc + c.totalInvoiced, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-1">
            <span>Solikos Pulse</span>
            <span>&bull;</span>
            <span>CRM &amp; Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Client Contacts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Contacts are automatically harvested, deduplicated, and updated every time an invoice is issued.
          </p>
        </div>

        <Link
          to="/pulse/create"
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm"
        >
          <PlusCircle size={15} />
          <span>New Invoice</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Total Client Accounts
          </span>
          <p className="text-2xl font-extrabold text-slate-900">{contacts.length}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Active energy consumers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Aggregated Client Value
          </span>
          <p className="text-2xl font-extrabold text-emerald-700">{formatMoney(totalClientVolume)}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Lifetime invoiced volume</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Repeat Procurement
          </span>
          <p className="text-2xl font-extrabold text-amber-700">
            {contacts.filter((c) => c.invoiceCount > 1).length} Accounts
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Multi-project partnerships</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search contacts by name, phone number, email, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-900"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((contact) => {
          const cleanPhone = contact.phone.replace(/[\s\-\(\)\+]/g, '');
          const waLink = `https://wa.me/${cleanPhone}`;
          const clientInvoices = invoices.filter(
            (inv) =>
              inv.customer.phone.replace(/[\s\-\(\)]/g, '') === cleanPhone ||
              (inv.customer.email && inv.customer.email.toLowerCase() === (contact.email || '').toLowerCase())
          );

          return (
            <div
              key={contact.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400/80 transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold text-sm flex items-center justify-center shrink-0">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {contact.invoiceCount} {contact.invoiceCount === 1 ? 'Invoice' : 'Invoices'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug mb-2">
                  {contact.name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-800">{contact.phone}</span>
                  </div>

                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  )}

                  {contact.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">{contact.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial Stats */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Total Billed</span>
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {formatMoney(contact.totalInvoiced)}
                  </span>
                </div>

                {/* Direct Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare size={13} className="text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    to={`/pulse/create?name=${encodeURIComponent(contact.name)}&phone=${encodeURIComponent(
                      contact.phone
                    )}`}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PlusCircle size={13} />
                    <span>Invoice</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PulseContacts;
