import React, { useState } from 'react';
import type { Borough } from '../types';

const WORKSHOP_OPTIONS = [
  { id: 'cdpap-optimization', label: 'CDPAP Salary Optimization', desc: 'Maximize care hours & compensation for staff' },
  { id: 'hra-navigation', label: 'HRA Bureaucracy Navigation', desc: 'Cutting through Rider Ave delays and denials' },
  { id: 'medicaid-compliance', label: 'Medicaid Compliance Audit', desc: 'Protect your facility from compliance risk' },
  { id: 'family-education', label: 'Family Education Summit', desc: 'Empower families to advocate for loved ones' },
];

const FORMSPREE_URL = 'https://formspree.io/f/mreozbnq';

type Status = 'idle' | 'loading' | 'success' | 'error';

const FunnelB: React.FC = () => {
  const [form, setForm] = useState({
    facilityName: '',
    contactPerson: '',
    title: '',
    borough: 'Bronx' as Borough,
    phone: '',
    email: '',
    workshop: '',
    residentCount: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.facilityName || !form.contactPerson || !form.phone || !form.email || !form.workshop) {
      setErrorMsg('Please fill in all required fields and select a workshop.');
      return;
    }
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          funnel: 'Facility_Partners',
          _subject: `Workshop Request — ${form.facilityName} (${form.borough})`,
          ...form,
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-building-circle-check text-3xl text-green-600 dark:text-green-400"></i>
        </div>
        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Workshop Request Received</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Valentine will confirm your workshop date and send a pre-event intake form within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-2">
          <i className="fa-solid fa-chalkboard-user text-gold-500 mr-2"></i>
          Facility Workshops
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
          Bring Valentine to your adult day program, assisted living, or community health center for an on-site education workshop tailored to your residents and staff.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
        {/* Workshop selection */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            Select a Workshop <span className="text-gold-500">*</span>
          </label>
          <div className="space-y-2">
            {WORKSHOP_OPTIONS.map((w) => (
              <button
                type="button"
                key={w.id}
                onClick={() => setForm({ ...form, workshop: w.label })}
                className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                  form.workshop === w.label
                    ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-gold-400'
                }`}
              >
                <span className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${
                  form.workshop === w.label ? 'border-gold-500 bg-gold-500' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {form.workshop === w.label && <span className="w-1.5 h-1.5 rounded-full bg-white block"></span>}
                </span>
                <div>
                  <div className="text-sm font-bold text-navy-900 dark:text-white">{w.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{w.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Facility Name */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Facility Name <span className="text-gold-500">*</span>
          </label>
          <input
            type="text"
            value={form.facilityName}
            onChange={(e) => setForm({ ...form, facilityName: e.target.value })}
            placeholder="e.g. Bronx Senior Center"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
          />
        </div>

        {/* Contact + Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Contact Person <span className="text-gold-500">*</span>
            </label>
            <input
              type="text"
              value={form.contactPerson}
              onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Director"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            />
          </div>
        </div>

        {/* Borough + Residents */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Borough</label>
            <select
              value={form.borough}
              onChange={(e) => setForm({ ...form, borough: e.target.value as Borough })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            >
              <option value="Bronx">Bronx</option>
              <option value="Manhattan">Manhattan</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Resident Count</label>
            <input
              type="number"
              value={form.residentCount}
              onChange={(e) => setForm({ ...form, residentCount: e.target.value })}
              placeholder="Approx. #"
              min="1"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            />
          </div>
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Phone <span className="text-gold-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(718) 555-0000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Email <span className="text-gold-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@facility.org"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            />
          </div>
        </div>

        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
        {status === 'error' && (
          <p className="text-red-500 text-sm text-center">Submission failed. Please email us directly.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-navy-900 dark:bg-gold-500 text-gold-500 dark:text-navy-900 font-extrabold rounded-xl hover:bg-navy-800 dark:hover:bg-gold-400 transition-all shadow-lg disabled:opacity-60 text-sm tracking-wide"
        >
          {status === 'loading' ? (
            <span><i className="fa-solid fa-spinner fa-spin mr-2"></i>Booking...</span>
          ) : (
            <span><i className="fa-solid fa-calendar-check mr-2"></i>Request Workshop Booking</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default FunnelB;
