import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Cpu,
  Layers,
  ArrowRight,
  Shield,
  Save,
  Eye,
  Check,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  User as UserIcon,
  MapPin,
  X,
} from 'lucide-react';
import { usePulse } from '../context/PulseContext';
import { InvoiceItem, Currency } from '../types';
import { productsData } from '../../data/products';

export const PulseInvoiceBuilder: React.FC = () => {
  const { createInvoice, settings, contacts } = usePulse();
  const navigate = useNavigate();

  // Basic Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Invoice Meta
  const defaultInvNum = `SLK-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const [invoiceNumber, setInvoiceNumber] = useState(defaultInvNum);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [currency, setCurrency] = useState<Currency>(settings.defaultCurrency || 'NGN');

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: `item-${Date.now()}`,
      title: '24V 4KW Single Phase Hybrid Inverter',
      description: 'High-efficiency solar hybrid inverter with auto-adaptive frequency',
      specs: '4 kW Max Power · 208-240 VAC · 50/60 Hz · Parallel up to 9 units',
      warranty: '5 Years',
      image: '/products/24v-4kw-hybrid-inverter.webp',
      quantity: 1,
      unitPrice: currency === 'USD' ? 950 : 1550000,
      total: currency === 'USD' ? 950 : 1550000,
    },
  ]);

  // Calculations
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(settings.defaultTaxRate || 0);
  const [paymentTerms, setPaymentTerms] = useState(settings.defaultPaymentTerms);
  const [notes, setNotes] = useState(settings.defaultNotes);

  // Hardware Picker Modal
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);

  // Auto-fill from existing contacts
  const handlePhoneBlur = () => {
    if (!customerPhone) return;
    const clean = customerPhone.replace(/[\s\-\(\)]/g, '').toLowerCase();
    const match = contacts.find((c) => c.phone.replace(/[\s\-\(\)]/g, '').toLowerCase() === clean);
    if (match) {
      if (!customerName) setCustomerName(match.name);
      if (!customerEmail && match.email) setCustomerEmail(match.email);
      if (!customerAddress && match.address) setCustomerAddress(match.address);
    }
  };

  const handleAddItem = (product?: (typeof productsData)[0]) => {
    if (product) {
      const defaultPrice = currency === 'USD' ? 1200 : 2500000;
      const newItem: InvoiceItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        title: product.name,
        description: product.tagline,
        specs: product.detailedSpecs.map((s) => `${s.label}: ${s.value}`).slice(0, 3).join(' · '),
        warranty: product.warranty,
        image: product.image,
        quantity: 1,
        unitPrice: defaultPrice,
        total: defaultPrice,
      };
      setItems((prev) => [...prev, newItem]);
    } else {
      const newItem: InvoiceItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setCatalogModalOpen(false);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          const qty = field === 'quantity' ? Number(value) || 0 : item.quantity;
          const price = field === 'unitPrice' ? Number(value) || 0 : item.unitPrice;
          updated.total = qty * price;
        }
        return updated;
      })
    );
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  // Math
  const subtotal = items.reduce((acc, i) => acc + i.total, 0);
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = Math.round((taxableAmount * taxRate) / 100);
  const grandTotal = taxableAmount + taxAmount;

  const handleSave = (status: 'issued' | 'draft' = 'issued') => {
    if (!customerName.trim()) {
      alert('Please enter a Customer or Business Name.');
      return;
    }
    if (!customerPhone.trim()) {
      alert('Please enter a Customer Phone Number (Required).');
      return;
    }

    const newInvoice = createInvoice({
      invoiceNumber,
      status,
      issueDate,
      dueDate,
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim() || undefined,
        address: customerAddress.trim() || undefined,
      },
      items,
      currency,
      subtotal,
      discountRate,
      discountAmount,
      taxRate,
      taxAmount,
      total: grandTotal,
      paymentTerms,
      notes,
      bankAccounts: settings.bankAccounts,
    });

    navigate(`/inv/${newInvoice.id}`);
  };

  const formatCurrencySymbol = (amt: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-1">
            <span>Solikos Pulse</span>
            <span>&bull;</span>
            <span>Commercial Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Commercial Invoice
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave('issued')}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
          >
            <span>Issue &amp; View Digital Invoice</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Client Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <UserIcon size={16} className="text-amber-600" />
                <span>1. Customer Details</span>
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">
                Phone &amp; Name Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer / Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dangote Agro Hub LTD"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (WhatsApp Ready) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="e.g. +234 803 344 0084"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    onBlur={handlePhoneBlur}
                    className="w-full pl-10 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="procurement@company.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Site Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Victoria Island, Lagos"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Line Items Builder */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-amber-600" />
                <span>2. Hardware &amp; Line Items</span>
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCatalogModalOpen(true)}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5 transition-colors"
                >
                  <Cpu size={14} className="text-amber-600" />
                  <span>Catalog Picker (9 Hardware Models)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddItem()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>Custom Item</span>
                </button>
              </div>
            </div>

            {/* Line Items List */}
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
                >
                  <div className="flex items-start gap-4">
                    {/* Item Thumbnail */}
                    {item.image && (
                      <div className="w-14 h-14 bg-white rounded-lg border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          placeholder="Item Name / Model"
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          className="font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-600 focus:outline-none w-full"
                        />

                        {item.warranty && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                            {item.warranty}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Description &amp; Specifications"
                        value={item.specs || item.description}
                        onChange={(e) => updateItem(item.id, 'specs', e.target.value)}
                        className="text-xs text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-600 focus:outline-none w-full"
                      />

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-slate-500 block mb-0.5">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase text-slate-500 block mb-0.5">
                            Unit Price ({currency})
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase text-slate-500 block mb-0.5">
                            Line Total
                          </label>
                          <div className="w-full px-2.5 py-1.5 text-xs font-mono font-bold text-slate-900 bg-slate-100 rounded-lg">
                            {formatCurrencySymbol(item.total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Commercial Terms & Notes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              3. Commercial Milestone Terms &amp; Policies
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Milestones
              </label>
              <textarea
                rows={2}
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Warranty &amp; Delivery Terms
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Meta & Totals */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Invoice Settings
            </h2>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Billing Currency
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency('NGN')}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    currency === 'NGN'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  NGN (₦)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    currency === 'USD'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>

          {/* Summary / Calculations Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Financial Summary
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold">{formatCurrencySymbol(subtotal)}</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-slate-600 gap-2">
                <span>Discount (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value) || 0)}
                  className="w-16 px-2 py-0.5 text-right font-mono text-xs border border-slate-200 rounded bg-slate-50"
                />
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount Applied</span>
                  <span className="font-mono font-semibold">-{formatCurrencySymbol(discountAmount)}</span>
                </div>
              )}

              {/* Tax/VAT */}
              <div className="flex items-center justify-between text-slate-600 gap-2">
                <span>VAT / Tax (%)</span>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="text-xs border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50"
                >
                  <option value={0}>0% (Clean Energy Exemption)</option>
                  <option value={7.5}>7.5% (Standard VAT)</option>
                </select>
              </div>

              {taxAmount > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>VAT ({taxRate}%)</span>
                  <span className="font-mono font-semibold">+{formatCurrencySymbol(taxAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
                <span className="font-bold text-sm">Grand Total</span>
                <span className="font-mono font-extrabold text-lg text-amber-700">
                  {formatCurrencySymbol(grandTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSave('issued')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <span>Issue &amp; Generate Digital Invoice</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Selector Modal */}
      {catalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Solikos Hardware Catalog</h3>
                <p className="text-xs text-slate-500">Pick any verified hardware item from the invoice catalog.</p>
              </div>
              <button
                type="button"
                onClick={() => setCatalogModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
              {productsData.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleAddItem(prod)}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-4 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{prod.name}</h4>
                      <p className="text-[11px] text-slate-500">{prod.highlight}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                      {prod.warranty}
                    </span>
                    <button
                      type="button"
                      className="bg-slate-900 text-white text-[11px] font-semibold px-3 py-1 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PulseInvoiceBuilder;
