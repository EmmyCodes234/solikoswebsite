import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  PlusCircle,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { usePulse } from '../context/PulseContext';
import { InvoiceStatus, Invoice } from '../types';

export const PulseDashboard: React.FC = () => {
  const { invoices, updateInvoiceStatus, deleteInvoice } = usePulse();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');

  // Stats calculation
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.total, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'issued')
    .reduce((acc, inv) => acc + inv.total, 0);

  const formatMoney = (amount: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filtered list
  const filtered = invoices.filter((inv) => {
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(query) ||
      inv.customer.name.toLowerCase().includes(query) ||
      inv.customer.phone.toLowerCase().includes(query) ||
      (inv.customer.email && inv.customer.email.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Paid
          </span>
        );
      case 'issued':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Issued / Pending
          </span>
        );
      case 'draft':
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Draft
          </span>
        );
      case 'overdue':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Overdue
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
            {status}
          </span>
        );
    }
  };

  const getWhatsAppShareUrl = (inv: Invoice) => {
    const cleanPhone = inv.customer.phone.replace(/[\s\-\(\)\+]/g, '');
    const origin = window.location.origin;
    const invoiceUrl = `${origin}/inv/${inv.id}`;
    const text = encodeURIComponent(
      `Hello ${inv.customer.name},\n\nYour official commercial invoice (${inv.invoiceNumber}) from Solikos Energy LTD for ${formatMoney(
        inv.total,
        inv.currency
      )} is ready.\n\nYou can review your hardware specifications and download the PDF here:\n${invoiceUrl}\n\nSolikos Energy LTD - Your Power, Our Priority.`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-1">
            <span>Solikos Pulse</span>
            <span>&bull;</span>
            <span>Commercial Invoicing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Invoices Management
          </h1>
        </div>

        <Link
          to="/pulse/create"
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] self-start sm:self-auto"
        >
          <PlusCircle size={16} />
          <span>New Invoice</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Invoiced</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {formatMoney(totalBilled, 'NGN')}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {invoices.length} commercial transactions
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Collected
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle size={16} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-700">
            {formatMoney(totalPaid, 'NGN')}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {invoices.filter((i) => i.status === 'paid').length} paid invoices
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-amber-600">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending / Issued
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock size={16} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-700">
            {formatMoney(pendingAmount, 'NGN')}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Awaiting client remittance
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by client name, phone number, or invoice #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-slate-900"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'issued', 'paid', 'draft'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? 'All Invoices' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No invoices found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {search ? 'Try adjusting your search criteria.' : 'Create your first commercial invoice.'}
            </p>
            <Link
              to="/pulse/create"
              className="inline-flex items-center gap-2 bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <PlusCircle size={14} />
              <span>New Invoice</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Invoice #</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Invoice ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-slate-900">
                      <Link
                        to={`/inv/${inv.id}`}
                        target="_blank"
                        className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
                      >
                        <span>{inv.invoiceNumber}</span>
                        <ExternalLink size={12} className="text-slate-400" />
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-900">{inv.customer.name}</div>
                      <div className="text-xs text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                        <span>{inv.customer.phone}</span>
                        {inv.customer.email && (
                          <>
                            <span>&bull;</span>
                            <span className="truncate max-w-[140px]">{inv.customer.email}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs text-slate-600 whitespace-nowrap">
                      <div>Issued: {inv.issueDate}</div>
                      <div className="text-slate-400 text-[11px]">Due: {inv.dueDate}</div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {formatMoney(inv.total, inv.currency)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">{getStatusBadge(inv.status)}</td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Action */}
                        <a
                          href={getWhatsAppShareUrl(inv)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share to Client WhatsApp"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <MessageSquare size={16} />
                        </a>

                        {/* Public Link */}
                        <Link
                          to={`/inv/${inv.id}`}
                          target="_blank"
                          title="View Digital Invoice"
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <ArrowUpRight size={16} />
                        </Link>

                        {/* Status Toggle */}
                        {inv.status !== 'paid' ? (
                          <button
                            onClick={() => updateInvoiceStatus(inv.id, 'paid')}
                            title="Mark as Paid"
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <CheckCircle size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateInvoiceStatus(inv.id, 'issued')}
                            title="Mark as Pending"
                            className="p-1.5 text-emerald-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete invoice ${inv.invoiceNumber}?`)) {
                              deleteInvoice(inv.id);
                            }
                          }}
                          title="Delete Invoice"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PulseDashboard;
