import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './Header';
import Footer from './Footer';
import NavigationDrawer from './NavigationDrawer';
import MenuButton from './MenuButton';
import CookieConsent from './CookieConsent';

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative bg-black min-h-screen font-sans selection:bg-[#EAEAEA] selection:text-black">
      <Header />
      <CookieConsent />
      <main>
        <Outlet />
      </main>
      <Footer />
      <NavigationDrawer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <MenuButton isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
    </div>
  );
};

export default Layout;
