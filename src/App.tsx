import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Solutions from './pages/Solutions';
import WhySolikos from './pages/WhySolikos';
import Impact from './pages/Impact';
import Partnership from './pages/Partnership';
import BrandGuidelines from './pages/BrandGuidelines';
import NotFound from './pages/NotFound';

// Solikos Pulse Invoicing Sub-App
import { AuthProvider, RequirePulseAuth } from './pulse/context/AuthContext';
import { PulseProvider } from './pulse/context/PulseContext';
import PulseLayout from './pulse/components/PulseLayout';
import PulseLogin from './pulse/pages/PulseLogin';
import PulseDashboard from './pulse/pages/PulseDashboard';
import PulseInvoiceBuilder from './pulse/pages/PulseInvoiceBuilder';
import PulseContacts from './pulse/pages/PulseContacts';
import PulseCatalog from './pulse/pages/PulseCatalog';
import PulseSettings from './pulse/pages/PulseSettings';
import PulseBranding from './pulse/pages/PulseBranding';
import PublicInvoiceView from './pulse/pages/PublicInvoiceView';

export const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Skip preloader on invoicing portal and public invoices
      if (
        window.location.pathname.startsWith('/pulse') ||
        window.location.pathname.startsWith('/inv') ||
        window.location.pathname.startsWith('/invoice')
      ) {
        return false;
      }
      return !sessionStorage.getItem('solikos-preloaded');
    }
    return true;
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('solikos-preloaded', 'true');
    setShowPreloader(false);
  };

  return (
    <AuthProvider>
      <PulseProvider>
        <AnimatePresence mode="wait">
          {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        </AnimatePresence>

        <BrowserRouter>
          <Routes>
            {/* 1. Main Solikos Corporate Website */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="introduction" element={<Introduction />} />
              <Route path="solutions" element={<Solutions />} />
              <Route path="products" element={<Solutions />} />
              <Route path="why-solikos" element={<WhySolikos />} />
              <Route path="impact" element={<Impact />} />
              <Route path="partnership" element={<Partnership />} />
              <Route path="brand-guidelines" element={<BrandGuidelines />} />
            </Route>

            {/* 2. Public Client Digital Invoice Viewer (No Auth Required) */}
            <Route path="inv/:id" element={<PublicInvoiceView />} />
            <Route path="pulse/view/:id" element={<PublicInvoiceView />} />

            {/* 3. Solikos Pulse Internal Portal (Auth Protected) */}
            <Route path="pulse/login" element={<PulseLogin />} />

            <Route
              path="pulse"
              element={
                <RequirePulseAuth>
                  <PulseLayout />
                </RequirePulseAuth>
              }
            >
              <Route index element={<Navigate to="/pulse/invoices" replace />} />
              <Route path="invoices" element={<PulseDashboard />} />
              <Route path="create" element={<PulseInvoiceBuilder />} />
              <Route path="contacts" element={<PulseContacts />} />
              <Route path="catalog" element={<PulseCatalog />} />
              <Route path="settings" element={<PulseSettings />} />
              <Route path="branding" element={<PulseBranding />} />
            </Route>

            {/* Aliases for convenience */}
            <Route path="invoice" element={<Navigate to="/pulse" replace />} />
            <Route path="invoicing" element={<Navigate to="/pulse" replace />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PulseProvider>
    </AuthProvider>
  );
};

export default App;
