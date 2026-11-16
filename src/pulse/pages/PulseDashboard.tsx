import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  Plus,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { usePulse } from '../context/PulseContext';
import { InvoiceStatus, Invoice } from '../types';

export const PulseDashboard: React.FC = () => {
  const { invoices, updateInvoiceStatus, deleteInvoice } = usePulse();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');

  // Stats
  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.total, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === 'issued')
    .reduce((acc, inv) => acc + inv.total, 0);

  const paidCount = invoices.filter((i) => i.status === 'paid').length;
  const pendingCount = invoices.filter((i) => i.status === 'issued').length;

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

  const renderStatus = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Paid
          </span>
        );
      case 'issued':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Draft
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
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
      `Hello ${inv.customer.name},\n\nHere is your invoice ${inv.invoiceNumber} from Solikos Energy LTD for ${formatMoney(
        inv.total,
        inv.currency
      )}.\n\nYou can view and download your invoice here:\n${invoiceUrl}\n\nSolikos Energy LTD · Your Power, Our Priority`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">Invoices</h1>
          <p className="text-xs text-[#737373] mt-1">Create, track, and share client invoices.</p>
        </div>

        <Link
          to="/pulse/create"
          className="bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus size={15} />
          <span>New invoice</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#ECECEB]">
          <span className="text-xs font-medium text-[#737373]">Total invoiced</span>
          <p className="text-2xl font-semibold text-[#111111] tracking-tight mt-1">
            {formatMoney(totalInvoiced, 'NGN')}
          </p>
          <span className="text-xs text-[#A3A3A3] mt-1 block">
            {invoices.length} {invoices.length === 1 ? 'invoice' : 'invoices'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#ECECEB]">
          <span className="text-xs font-medium text-[#737373]">Paid</span>
          <p className="text-2xl font-semibold text-[#111111] tracking-tight mt-1">
            {formatMoney(totalPaid, 'NGN')}
          </p>
          <span className="text-xs text-[#A3A3A3] mt-1 block">
            {paidCount} {paidCount === 1 ? 'invoice' : 'invoices'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#ECECEB]">
          <span className="text-xs font-medium text-[#737373]">Pending</span>
          <p className="text-2xl font-semibold text-[#111111] tracking-tight mt-1">
            {formatMoney(totalPending, 'NGN')}
          </p>
          <span className="text-xs text-[#A3A3A3] mt-1 block">
            {pendingCount} {pendingCount === 1 ? 'invoice' : 'invoices'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-2.5 rounded-xl border border-[#ECECEB] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={15} />
          <input
            type="text"
            placeholder="Search by client or invoice number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#A3A3A3] transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { key: 'all', label: 'All' },
              { key: 'issued', label: 'Pending' },
              { key: 'paid', label: 'Paid' },
              { key: 'draft', label: 'Draft' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === item.key
                  ? 'bg-[#111111] text-white'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#F4F4F3]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List / Table */}
      <div className="bg-white rounded-xl border border-[#ECECEB] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-14 px-6 text-center">
            <FileText size={32} className="mx-auto text-[#CCCCCC] mb-2.5" />
            <h3 className="text-sm font-medium text-[#111111]">No invoices found</h3>
            <p className="text-xs text-[#737373] mt-1 mb-4">
              {search ? 'Try searching with different keywords.' : 'Create your first invoice to get started.'}
            </p>
            <Link
              to="/pulse/create"
              className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-[#222222] transition-colors"
            >
              <Plus size={14} />
              <span>New invoice</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAFAFA] border-b border-[#ECECEB] text-[#737373] font-medium text-[11px]">
                <tr>
                  <th className="py-3 px-5">Invoice</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F3]">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#FAFAFA] transition-colors">
                    {/* Invoice ID */}
                    <td className="py-3.5 px-5 font-mono text-xs font-medium text-[#111111]">
                      <Link
                        to={`/inv/${inv.id}`}
                        target="_blank"
                        className="hover:text-amber-700 transition-colors inline-flex items-center gap-1"
                        title="Open invoice"
                      >
                        <span>{inv.invoiceNumber}</span>
                        <ArrowUpRight size={12} className="text-[#A3A3A3]" />
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#111111]">{inv.customer.name}</div>
                      <div className="text-xs text-[#737373] mt-0.5">
                        <span>{inv.customer.phone}</span>
                        {inv.customer.email && (
                          <>
                            <span className="mx-1.5 text-[#CCCCCC]">·</span>
                            <span className="truncate max-w-[140px]">{inv.customer.email}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-[#737373] whitespace-nowrap">
                      <div>Issued {inv.issueDate}</div>
                      <div className="text-[#A3A3A3] text-[11px]">Due {inv.dueDate}</div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 px-4 font-medium text-[#111111] whitespace-nowrap">
                      {formatMoney(inv.total, inv.currency)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">{renderStatus(inv.status)}</td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* WhatsApp Link */}
                        <a
                          href={getWhatsAppShareUrl(inv)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on WhatsApp"
                          className="p-1.5 text-[#555555] hover:text-[#111111] hover:bg-[#F4F4F3] rounded-md transition-colors"
                        >
                          <MessageSquare size={15} />
                        </a>

                        {/* View link */}
                        <Link
                          to={`/inv/${inv.id}`}
                          target="_blank"
                          title="View digital invoice"
                          className="p-1.5 text-[#555555] hover:text-[#111111] hover:bg-[#F4F4F3] rounded-md transition-colors"
                        >
                          <ArrowUpRight size={15} />
                        </Link>

                        {/* Toggle Paid / Pending */}
                        {inv.status !== 'paid' ? (
                          <button
                            onClick={() => updateInvoiceStatus(inv.id, 'paid')}
                            title="Mark as paid"
                            className="p-1.5 text-[#555555] hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateInvoiceStatus(inv.id, 'issued')}
                            title="Mark as pending"
                            className="p-1.5 text-emerald-700 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
                          >
                            <RotateCcw size={15} />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete invoice ${inv.invoiceNumber}?`)) {
                              deleteInvoice(inv.id);
                            }
                          }}
                          title="Delete invoice"
                          className="p-1.5 text-[#A3A3A3] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={15} />
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
