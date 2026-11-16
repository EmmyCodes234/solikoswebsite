import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export const App: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('solikos-preloaded');
    }
    return true;
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('solikos-preloaded', 'true');
    setShowPreloader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <BrowserRouter>
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
