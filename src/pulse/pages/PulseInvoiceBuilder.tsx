import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Package,
  ArrowRight,
  Save,
  Phone,
  Mail,
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

  // Catalog Picker Modal
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
      alert('Please enter a customer name.');
      return;
    }
    if (!customerPhone.trim()) {
      alert('Please enter a customer phone number.');
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

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECECEB]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">New invoice</h1>
          <p className="text-xs text-[#737373] mt-1">Create and issue an invoice for your client.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave('draft')}
            className="px-3.5 py-2 rounded-lg border border-[#ECECEB] text-[#111111] bg-white hover:bg-[#F4F4F3] text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Save size={14} />
            <span>Save draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave('issued')}
            className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Issue invoice</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Client Card */}
          <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F4F4F3] pb-3">
              <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider">
                Client details
              </h2>
              <span className="text-[11px] text-[#A3A3A3]">Name &amp; phone required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#444444] mb-1">
                  Client name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dangote Agro Hub LTD"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#444444] mb-1">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
                  <input
                    type="tel"
                    placeholder="e.g. +234 803 344 0084"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    onBlur={handlePhoneBlur}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#444444] mb-1">
                  Email <span className="text-[#A3A3A3] font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#444444] mb-1">
                  Address <span className="text-[#A3A3A3] font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
                  <input
                    type="text"
                    placeholder="Victoria Island, Lagos"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Line Items */}
          <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F4F4F3] pb-3">
              <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider">
                Items
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCatalogModalOpen(true)}
                  className="bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Package size={13} />
                  <span>Add from catalog</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddItem()}
                  className="bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Custom item</span>
                </button>
              </div>
            </div>

            {/* Line Items List */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg border border-[#ECECEB] bg-[#FAFAFA] space-y-2.5"
                >
                  <div className="flex items-start gap-3">
                    {/* Item Thumbnail */}
                    {item.image && (
                      <div className="w-12 h-12 bg-white rounded-md border border-[#ECECEB] p-1 shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          placeholder="Item name / model"
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          className="font-medium text-xs sm:text-sm text-[#111111] bg-transparent border-b border-transparent hover:border-[#CCCCCC] focus:border-[#111111] focus:outline-none w-full"
                        />

                        {item.warranty && (
                          <span className="text-[11px] text-[#737373] bg-[#EEEEED] px-2 py-0.5 rounded shrink-0">
                            {item.warranty}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#A3A3A3] hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Description &amp; specifications"
                        value={item.specs || item.description}
                        onChange={(e) => updateItem(item.id, 'specs', e.target.value)}
                        className="text-xs text-[#737373] bg-transparent border-b border-transparent hover:border-[#CCCCCC] focus:border-[#111111] focus:outline-none w-full"
                      />

                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <div>
                          <label className="text-[10px] text-[#737373] block mb-0.5">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                            className="w-full px-2 py-1 text-xs font-mono font-medium bg-white border border-[#ECECEB] rounded-md"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-[#737373] block mb-0.5">
                            Unit Price ({currency})
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                            className="w-full px-2 py-1 text-xs font-mono font-medium bg-white border border-[#ECECEB] rounded-md"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-[#737373] block mb-0.5">
                            Total
                          </label>
                          <div className="w-full px-2 py-1 text-xs font-mono font-medium text-[#111111] bg-[#EEEEED] rounded-md">
                            {formatCurrency(item.total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Payment Terms & Notes */}
          <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-4">
            <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider border-b border-[#F4F4F3] pb-3">
              Payment terms &amp; notes
            </h2>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">
                Payment terms
              </label>
              <textarea
                rows={2}
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">
                Warranty &amp; notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 text-xs bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Details & Totals */}
        <div className="space-y-5">
          {/* Details Card */}
          <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-3.5">
            <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider border-b border-[#F4F4F3] pb-2">
              Invoice details
            </h2>

            <div>
              <label className="block text-[11px] font-medium text-[#737373] mb-1">
                Invoice number
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-medium bg-[#FBFBFA] border border-[#ECECEB] rounded-md text-[#111111]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-[#737373] mb-1">
                  Issue date
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-[#FBFBFA] border border-[#ECECEB] rounded-md text-[#111111]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#737373] mb-1">
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-[#FBFBFA] border border-[#ECECEB] rounded-md text-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#737373] mb-1">
                Currency
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency('NGN')}
                  className={`py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    currency === 'NGN'
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FBFBFA] text-[#737373] border-[#ECECEB] hover:text-[#111111]'
                  }`}
                >
                  NGN (₦)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    currency === 'USD'
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FBFBFA] text-[#737373] border-[#ECECEB] hover:text-[#111111]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-3.5">
            <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider border-b border-[#F4F4F3] pb-2">
              Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#737373]">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-[#111111]">{formatCurrency(subtotal)}</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-[#737373] gap-2">
                <span>Discount (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value) || 0)}
                  className="w-14 px-1.5 py-0.5 text-right font-mono text-xs border border-[#ECECEB] rounded bg-[#FBFBFA]"
                />
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-mono font-medium">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              {/* Tax/VAT */}
              <div className="flex items-center justify-between text-[#737373] gap-2">
                <span>VAT</span>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="text-xs border border-[#ECECEB] rounded px-1.5 py-0.5 bg-[#FBFBFA]"
                >
                  <option value={0}>0%</option>
                  <option value={7.5}>7.5%</option>
                </select>
              </div>

              {taxAmount > 0 && (
                <div className="flex justify-between text-[#737373]">
                  <span>VAT ({taxRate}%)</span>
                  <span className="font-mono font-medium text-[#111111]">+{formatCurrency(taxAmount)}</span>
                </div>
              )}

              <div className="pt-2.5 border-t border-[#ECECEB] flex justify-between items-baseline text-[#111111]">
                <span className="font-medium text-xs">Total</span>
                <span className="font-mono font-semibold text-lg">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSave('issued')}
              className="w-full bg-[#111111] hover:bg-[#222222] text-white font-medium py-2.5 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 mt-3 shadow-xs"
            >
              <span>Issue invoice</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Selector Modal */}
      {catalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#ECECEB] max-w-xl w-full max-h-[80vh] flex flex-col shadow-xl">
            <div className="p-4 border-b border-[#ECECEB] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-[#111111]">Hardware catalog</h3>
                <p className="text-xs text-[#737373]">Select a product to add to the invoice.</p>
              </div>
              <button
                type="button"
                onClick={() => setCatalogModalOpen(false)}
                className="p-1 text-[#A3A3A3] hover:text-[#111111] rounded-md"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-3 overflow-y-auto space-y-1.5 flex-1 divide-y divide-[#F4F4F3]">
              {productsData.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleAddItem(prod)}
                  className="pt-2 first:pt-0 flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-[#FBFBFA] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-md border border-[#ECECEB] p-1 shrink-0 flex items-center justify-center">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[#111111]">{prod.name}</h4>
                      <p className="text-[11px] text-[#737373]">{prod.highlight}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-[#737373] bg-[#EEEEED] px-2 py-0.5 rounded">
                      {prod.warranty}
                    </span>
                    <span className="text-xs font-medium text-[#111111] hover:underline">
                      Add
                    </span>
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
