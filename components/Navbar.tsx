import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-gold-500/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-navy-900 dark:bg-gold-500 flex items-center justify-center shadow-md">
            <i className="fa-solid fa-shield-halved text-gold-500 dark:text-navy-900 text-sm"></i>
          </div>
          <div className="leading-tight">
            <span className="block font-extrabold text-navy-900 dark:text-gold-500 text-sm tracking-tight">
              Valentine Saint Martin
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase">
              Independent Advisory
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-gold-100 dark:hover:bg-slate-700 transition-all"
            aria-label="Toggle dark mode"
          >
            <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
