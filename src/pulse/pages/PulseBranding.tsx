import React, { useState } from 'react';
import { Palette, CheckCircle2, Save, FileCheck, Shield, Sparkles } from 'lucide-react';
import { usePulse } from '../context/PulseContext';

export const PulseBranding: React.FC = () => {
  const { settings, updateSettings } = usePulse();
  const [signatoryName, setSignatoryName] = useState(settings.authorizedSignatoryName);
  const [signatoryTitle, setSignatoryTitle] = useState(settings.authorizedSignatoryTitle);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      authorizedSignatoryName: signatoryName,
      authorizedSignatoryTitle: signatoryTitle,
    });
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
            <span>Brand Identity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Branding &amp; Authorized Signatures
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage company seal, official signature endorsement, and visual invoice styling.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          <span>{saved ? 'Saved' : 'Save Endorsements'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Signatory Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileCheck size={18} className="text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Authorized Signatory
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Officer Full Name
            </label>
            <input
              type="text"
              value={signatoryName}
              onChange={(e) => setSignatoryName(e.target.value)}
              placeholder="e.g. Collins Okafor"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Executive Title
            </label>
            <input
              type="text"
              value={signatoryTitle}
              onChange={(e) => setSignatoryTitle(e.target.value)}
              placeholder="e.g. Managing Director / Head of Operations"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          {/* Endorsement Preview Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 border-dashed text-center">
            <div className="font-serif italic text-lg text-slate-800 font-bold mb-1">
              {signatoryName || 'Authorized Signatory'}
            </div>
            <div className="h-0.5 w-36 bg-slate-300 mx-auto my-2" />
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              {signatoryTitle || 'Operations Directorate'}
            </div>
            <div className="text-[9px] text-amber-700 font-mono mt-1 font-bold">
              SOLIKOS ENERGY LTD &bull; DIGITAL CORPORATE SEAL
            </div>
          </div>
        </div>

        {/* Brand System Reference */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Palette size={18} className="text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Brand Visual Standards
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/solikos-icon.png" alt="Solikos" className="w-10 h-10 object-contain" />
              <div>
                <span className="text-lg font-bold uppercase tracking-tight block">SOLIKOS</span>
                <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-amber-400">
                  ENERGY
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 border border-white/20 px-2 py-1 rounded">
              Primary Lockup
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Corporate Slogan:</span>
              <span className="font-semibold text-slate-800">{settings.tagline}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Invoice Style:</span>
              <span className="font-semibold text-slate-800">High-Contrast Executive Light Mode</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Document Grid:</span>
              <span className="font-semibold text-slate-800">ISO 216 Standard A4 Printable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseBranding;
