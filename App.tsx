import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FunnelA from './components/FunnelA';
import FunnelB from './components/FunnelB';
import FunnelC from './components/FunnelC';
import ChokePoint from './components/ChokePoint';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('A');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleAuditStart = () => {
    setActiveTab('A');
    // Ensure the scroll happens after a brief delay to allow DOM updates if needed
    setTimeout(() => {
      document.getElementById('funnels')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow">
        <Hero onCtaClick={handleAuditStart} />
        
        {/* Funnel Selection Section */}
        <section id="funnels" className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors scroll-mt-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button 
                onClick={() => setActiveTab('A')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'A' ? 'bg-navy-900 text-gold-500 shadow-lg dark:bg-gold-500 dark:text-navy-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                Salary Checker
              </button>
              <button 
                onClick={() => setActiveTab('B')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'B' ? 'bg-navy-900 text-gold-500 shadow-lg dark:bg-gold-500 dark:text-navy-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                Facility Workshops
              </button>
              <button 
                onClick={() => setActiveTab('C')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'C' ? 'bg-navy-900 text-gold-500 shadow-lg dark:bg-gold-500 dark:text-navy-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                Caregiver Sanctuary
              </button>
            </div>

            <div className="animate-in fade-in duration-500">
              {activeTab === 'A' && <FunnelA />}
              {activeTab === 'B' && <FunnelB />}
              {activeTab === 'C' && <FunnelC />}
            </div>
          </div>
        </section>

        <ChokePoint />
      </main>

      <Footer />
    </div>
  );
};

export default App;