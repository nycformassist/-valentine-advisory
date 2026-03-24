import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative overflow-hidden bg-navy-900 dark:bg-slate-950 text-white py-20 md:py-28">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-stripes.png')" }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          <i className="fa-solid fa-location-dot text-gold-500"></i>
          Bronx & Manhattan · Independent, Not Institutional
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5">
          Stop Leaving{' '}
          <span className="text-gold-500">Money & Rights</span>
          <br />
          on the Table
        </h1>

        {/* Sub-headline */}
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          HRA moves slowly. Bureaucracy is intentional. We cut through it — auditing CDPAP salaries,
          navigating Medicaid homecare, and fighting for your housing rights in the Bronx and Manhattan.
        </p>

        <p className="text-gold-400 font-semibold text-sm mb-10 tracking-wide">
          <i className="fa-solid fa-circle-check mr-1"></i>
          Fiduciary advocate. No hidden fees. Your interests only.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onCtaClick}
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-900 font-extrabold rounded-full transition-all shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:-translate-y-0.5 text-sm tracking-wide"
          >
            <i className="fa-solid fa-magnifying-glass-dollar mr-2"></i>
            Check Your CDPAP Salary
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-slate-400 text-xs">
          {[
            { icon: 'fa-shield-halved', label: 'Licensed & Fiduciary' },
            { icon: 'fa-building-columns', label: 'HRA Specialist' },
            { icon: 'fa-handshake-angle', label: 'CDPAP Expert' },
            { icon: 'fa-house-chimney-medical', label: 'Housing Advocacy' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-1.5">
              <i className={`fa-solid ${badge.icon} text-gold-500`}></i>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
