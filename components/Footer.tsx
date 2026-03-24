import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-slate-400 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-navy-900 text-sm"></i>
              </div>
              <span className="text-white font-extrabold text-sm">Valentine Saint Martin</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Independent advisory for healthcare, homecare, and housing in the Bronx and Manhattan.
              Fiduciary representation. No institutional affiliations.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Services</h4>
            <ul className="space-y-2 text-xs">
              {[
                'CDPAP Salary Audits',
                'HRA Navigation & Appeals',
                'Medicaid Homecare Advocacy',
                'Housing Rights Support',
                'Facility Workshops',
                'Caregiver Burnout Support',
              ].map((svc) => (
                <li key={svc} className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-right text-gold-500 text-[9px]"></i>
                  {svc}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-gold-500"></i>
                <span>Bronx & Manhattan, New York</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-clock text-gold-500"></i>
                <span>Mon – Sat · 9 AM – 6 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>© {year} Valentine Saint Martin Independent Advisory · All rights reserved.</p>
          <p className="text-center max-w-sm">
            Advisory services only. Not a law firm. Not a licensed healthcare provider.
            Information provided is educational and does not constitute legal or medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
