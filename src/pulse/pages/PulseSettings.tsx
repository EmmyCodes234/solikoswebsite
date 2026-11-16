import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
} from 'lucide-react';
import { usePulse } from '../context/PulseContext';
import { CompanySettings, BankAccount } from '../types';

export const PulseSettings: React.FC = () => {
  const { settings, updateSettings } = usePulse();
  const [formData, setFormData] = useState<CompanySettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof CompanySettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (idx: number, field: keyof BankAccount, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.bankAccounts];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, bankAccounts: updated };
    });
  };

  const handleAddBank = () => {
    const newBank: BankAccount = {
      currency: 'NGN',
      bankName: 'First Bank of Nigeria',
      accountName: 'SOLIKOS ENERGY LIMITED',
      accountNumber: '2039102910',
    };
    setFormData((prev) => ({ ...prev, bankAccounts: [...prev.bankAccounts, newBank] }));
  };

  const handleRemoveBank = (idx: number) => {
    if (formData.bankAccounts.length > 1) {
      setFormData((prev) => ({
        ...prev,
        bankAccounts: prev.bankAccounts.filter((_, i) => i !== idx),
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECECEB]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">Settings</h1>
          <p className="text-xs text-[#737373] mt-1">
            Company information, bank accounts, and invoice defaults.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#111111] hover:bg-[#222222] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
        >
          {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
          <span>{saved ? 'Saved' : 'Save changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Company Information */}
        <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-4">
          <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider border-b border-[#F4F4F3] pb-3">
            Company information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">Company name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">Slogan</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">RC Number</label>
              <input
                type="text"
                value={formData.rcNumber}
                onChange={(e) => handleChange('rcNumber', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">TIN / Tax ID</label>
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => handleChange('taxId', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">Email address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">Phone number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111] font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#444444] mb-1">Office address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>
          </div>
        </div>

        {/* 2. Bank Accounts */}
        <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F4F3] pb-3">
            <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider">
              Bank accounts
            </h2>
            <button
              type="button"
              onClick={handleAddBank}
              className="bg-[#F4F4F3] hover:bg-[#EAEAEA] text-[#111111] text-xs font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus size={13} />
              <span>Add account</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.bankAccounts.map((bank, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-[#ECECEB] bg-[#FAFAFA] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#111111]">Account {idx + 1}</span>
                  {formData.bankAccounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBank(idx)}
                      className="text-[#A3A3A3] hover:text-red-600 p-1"
                      title="Remove account"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#737373] mb-1">Currency</label>
                    <select
                      value={bank.currency}
                      onChange={(e) => handleBankChange(idx, 'currency', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-[#ECECEB] rounded-md text-[#111111]"
                    >
                      <option value="NGN">NGN (₦)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#737373] mb-1">Bank name</label>
                    <input
                      type="text"
                      value={bank.bankName}
                      onChange={(e) => handleBankChange(idx, 'bankName', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-[#ECECEB] rounded-md text-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#737373] mb-1">Account name</label>
                    <input
                      type="text"
                      value={bank.accountName}
                      onChange={(e) => handleBankChange(idx, 'accountName', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-[#ECECEB] rounded-md text-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#737373] mb-1">Account number</label>
                    <input
                      type="text"
                      value={bank.accountNumber}
                      onChange={(e) => handleBankChange(idx, 'accountNumber', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-[#ECECEB] rounded-md text-[#111111] font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Invoice Defaults */}
        <div className="bg-white p-5 rounded-xl border border-[#ECECEB] space-y-4">
          <h2 className="text-xs font-medium text-[#111111] uppercase tracking-wider border-b border-[#F4F4F3] pb-3">
            Invoice defaults
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">Default currency</label>
              <select
                value={formData.defaultCurrency}
                onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#444444] mb-1">Default VAT rate (%)</label>
              <input
                type="number"
                value={formData.defaultTaxRate}
                onChange={(e) => handleChange('defaultTaxRate', Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#444444] mb-1">Default payment terms</label>
              <textarea
                rows={2}
                value={formData.defaultPaymentTerms}
                onChange={(e) => handleChange('defaultPaymentTerms', e.target.value)}
                className="w-full p-2.5 text-xs bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#444444] mb-1">Default warranty &amp; notes</label>
              <textarea
                rows={2}
                value={formData.defaultNotes}
                onChange={(e) => handleChange('defaultNotes', e.target.value)}
                className="w-full p-2.5 text-xs bg-[#FBFBFA] border border-[#ECECEB] rounded-lg focus:bg-white focus:outline-none focus:border-[#111111] text-[#111111]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PulseSettings;
