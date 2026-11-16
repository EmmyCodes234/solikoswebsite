import React, { useState } from 'react';
import {
  Settings,
  Building2,
  CreditCard,
  Percent,
  FileCheck,
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
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 font-semibold mb-1">
            <span>Solikos Pulse</span>
            <span>&bull;</span>
            <span>Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company &amp; Banking Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure default billing parameters, official remittance bank accounts, and legal entity details.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Legal Entity Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 size={18} className="text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Corporate Legal Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Legal Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Slogan</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">RC / Corporate Reg Number</label>
              <input
                type="text"
                value={formData.rcNumber}
                onChange={(e) => handleChange('rcNumber', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tax ID / TIN</label>
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => handleChange('taxId', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Billing Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Support Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 2. Official Remittance Bank Accounts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. Official Remittance Bank Accounts
              </h2>
            </div>
            <button
              type="button"
              onClick={handleAddBank}
              className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} />
              <span>Add Account</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.bankAccounts.map((bank, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-700">
                    Account #{idx + 1} &bull; {bank.currency}
                  </span>
                  {formData.bankAccounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBank(idx)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove Bank Account"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bank.bankName}
                      onChange={(e) => handleBankChange(idx, 'bankName', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                      Beneficiary Account Name
                    </label>
                    <input
                      type="text"
                      value={bank.accountName}
                      onChange={(e) => handleBankChange(idx, 'accountName', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={bank.accountNumber}
                      onChange={(e) => handleBankChange(idx, 'accountNumber', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Defaults & Terms */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Percent size={18} className="text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Default Commercial Terms &amp; VAT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Statutory VAT / Tax Rate (%)
              </label>
              <select
                value={formData.defaultTaxRate}
                onChange={(e) => handleChange('defaultTaxRate', Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value={0}>0% (Clean Energy / Solar Tax Exemption)</option>
                <option value={7.5}>7.5% (Standard Federal VAT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Currency
              </label>
              <select
                value={formData.defaultCurrency}
                onChange={(e) => handleChange('defaultCurrency', e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                <option value="NGN">NGN (₦) - Nigerian Naira</option>
                <option value="USD">USD ($) - United States Dollar</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Milestone Payment Schedule
              </label>
              <textarea
                rows={2}
                value={formData.defaultPaymentTerms}
                onChange={(e) => handleChange('defaultPaymentTerms', e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PulseSettings;
