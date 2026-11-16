import React from 'react';
import { Menu, X } from 'lucide-react';

interface MenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="fixed bottom-8 right-6 md:right-12 z-[60] bg-[#F4F4F4] text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 hover:scale-105 transition-transform shadow-2xl"
    >
      <span className="text-sm font-medium">{isOpen ? 'Close' : 'Menu'}</span>
      <div className="bg-[#2A2A2A] text-[#F4F4F4] p-2 rounded-full">
        {isOpen ? <X size={16} strokeWidth={2.5} /> : <Menu size={16} strokeWidth={2.5} />}
      </div>
    </button>
  );
};

export default MenuButton;
