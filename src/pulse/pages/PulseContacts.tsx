import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { usePulse } from '../context/PulseContext';

export const PulseContacts: React.FC = () => {
  const { contacts } = usePulse();
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

  const getWhatsAppUrl = (phone: string, name: string) => {
    const clean = phone.replace(/[\s\-\(\)\+]/g, '');
    const text = encodeURIComponent(
      `Hello ${name},\n\nReaching out from Solikos Energy LTD regarding your clean energy solutions.\n\nSolikos Energy LTD · Your Power, Our Priority`
    );
    return `https://wa.me/${clean}?text=${text}`;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">Clients</h1>
          <p className="text-xs text-[#737373] mt-1">
            Client contacts are automatically saved when you create invoices.
          </p>
        </div>

        <Link
          to="/pulse/create"
          className="bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus size={15} />
          <span>New invoice</span>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#ECECEB]">
          <span className="text-xs font-medium text-[#737373]">Total clients</span>
          <p className="text-2xl font-semibold text-[#111111] tracking-tight mt-1">
            {contacts.length}
          </p>
          <span className="text-xs text-[#A3A3A3] mt-1 block">Saved from invoices</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#ECECEB]">
          <span className="text-xs font-medium text-[#737373]">Total billed</span>
          <p className="text-2xl font-semibold text-[#111111] tracking-tight mt-1">
            {formatMoney(totalClientVolume)}
          </p>
          <span className="text-xs text-[#A3A3A3] mt-1 block">Across all clients</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2.5 rounded-xl border border-[#ECECEB]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={15} />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#A3A3A3]"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-xl border border-[#ECECEB] text-center">
            <Users size={32} className="mx-auto text-[#CCCCCC] mb-2" />
            <h3 className="text-sm font-medium text-[#111111]">No clients found</h3>
            <p className="text-xs text-[#737373] mt-1">
              Clients are automatically added when you issue invoices.
            </p>
          </div>
        ) : (
          filtered.map((client) => (
            <div
              key={client.id}
              className="bg-white p-5 rounded-xl border border-[#ECECEB] flex flex-col justify-between space-y-4 hover:border-[#CCCCCC] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">{client.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#737373] mt-1 font-mono">
                      <Phone size={12} className="text-[#A3A3A3]" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl(client.phone, client.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Send WhatsApp message"
                    className="p-1.5 text-[#555555] hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                  >
                    <MessageSquare size={16} />
                  </a>
                </div>

                {client.email && (
                  <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                    <Mail size={12} className="text-[#A3A3A3]" />
                    <span>{client.email}</span>
                  </div>
                )}

                {client.address && (
                  <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                    <MapPin size={12} className="text-[#A3A3A3]" />
                    <span>{client.address}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#F4F4F3] flex items-center justify-between text-xs">
                <span className="text-[#737373]">
                  {client.invoiceCount} {client.invoiceCount === 1 ? 'invoice' : 'invoices'}
                </span>
                <span className="font-medium text-[#111111]">
                  {formatMoney(client.totalInvoiced)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PulseContacts;
