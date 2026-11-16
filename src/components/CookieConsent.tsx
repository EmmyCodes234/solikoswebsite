import React, { useState, useEffect } from 'react';
import { Cookie, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('solikos-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'solikos-cookie-consent',
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'solikos-cookie-consent',
      JSON.stringify({ ...preferences, timestamp: Date.now() })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-[#181818] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {showSettings ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#F4F4F4]">
                  Preferences
                </h4>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-[#A3A3A3] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#F4F4F4]">Strictly Necessary</p>
                    <p className="text-[#888]">Core system functions</p>
                  </div>
                  <span className="text-[#B5B0A1] font-mono">Always Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#F4F4F4]">Analytics</p>
                    <p className="text-[#888]">Traffic optimization</p>
                  </div>
                  <button
                    onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                    className={`w-9 h-5 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? 'bg-[#B5B0A1]' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 bg-black rounded-full transition-transform ${
                        preferences.analytics ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#F4F4F4]">Marketing</p>
                    <p className="text-[#888]">Personalized partners</p>
                  </div>
                  <button
                    onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                    className={`w-9 h-5 rounded-full flex items-center px-1 transition-colors ${
                      preferences.marketing ? 'bg-[#B5B0A1]' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 bg-black rounded-full transition-transform ${
                        preferences.marketing ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSavePreferences}
                className="w-full py-3 bg-[#F4F4F4] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
              >
                Save Preferences
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#B5B0A1]/10 flex items-center justify-center text-[#B5B0A1]">
                  <Cookie size={18} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#F4F4F4]">
                  Cookie Notice
                </h4>
              </div>
              <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
                We use cookies to optimize your experience and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="w-full py-3 bg-[#F4F4F4] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
                >
                  Accept All
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 py-3 bg-white/5 text-[#B5B0A1] text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings size={14} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="px-4 py-3 bg-white/5 text-[#B5B0A1] hover:text-[#F4F4F4] rounded-lg transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
