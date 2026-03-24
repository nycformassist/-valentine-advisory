import React, { useState } from 'react';
import type { Borough, MedicaidStatus } from '../types';

const ADL_OPTIONS = [
  'Bathing / Grooming',
  'Dressing',
  'Meal Preparation',
  'Medication Management',
  'Mobility / Walking',
  'Toileting',
  'Transportation',
  'Light Housekeeping',
];

const FORMSPREE_URL = 'https://formspree.io/f/mreozbnq';

type Status = 'idle' | 'loading' | 'success' | 'error';

const FunnelA: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    borough: 'Bronx' as Borough,
    medicaidStatus: 'Not Sure' as MedicaidStatus,
    relationship: '',
    adls: [] as string[],
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleAdl = (adl: string) => {
    setForm((prev) => ({
      ...prev,
      adls: prev.adls.includes(adl)
        ? prev.adls.filter((a) => a !== adl)
        : [...prev.adls, adl],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.relationship) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          funnel: 'Caregiver_Leads',
          _subject: `New CDPAP Lead — ${form.fullName} (${form.borough})`,
          ...form,
          adls: form.adls.join(', '),
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
          <i className="fa-solid fa-circle-check text-3xl text-green-600 dark:text-green-400"></i>
        </div>
        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Intake Received</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Valentine will review your CDPAP profile and reach out within one business day with your salary audit results.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-2">
          <i className="fa-solid fa-magnifying-glass-dollar text-gold-500 mr-2"></i>
          CDPAP Salary & ADL Checker
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
          Are you or your caregiver being underpaid? Submit your care profile and we'll audit your current CDPAP compensation against what you're legally entitled to.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Full Name <span className="text-gold-500">*</span>
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Caregiver or family member's name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
          />
        </div>

        {/* Phone */}
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

        {/* Borough + Medicaid row */}
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
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Medicaid?</label>
            <select
              value={form.medicaidStatus}
              onChange={(e) => setForm({ ...form, medicaidStatus: e.target.value as MedicaidStatus })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Your Relationship to the Patient <span className="text-gold-500">*</span>
          </label>
          <input
            type="text"
            value={form.relationship}
            onChange={(e) => setForm({ ...form, relationship: e.target.value })}
            placeholder="e.g. Adult Child, Spouse, Self"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
          />
        </div>

        {/* ADLs */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            ADL Requirements <span className="text-slate-400 font-normal">(select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ADL_OPTIONS.map((adl) => {
              const checked = form.adls.includes(adl);
              return (
                <button
                  type="button"
                  key={adl}
                  onClick={() => toggleAdl(adl)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                    checked
                      ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10 text-navy-900 dark:text-gold-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-gold-400'
                  }`}
                >
                  <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border ${checked ? 'bg-gold-500 border-gold-500' : 'border-slate-300 dark:border-slate-600'}`}>
                    {checked && <i className="fa-solid fa-check text-white text-[8px]"></i>}
                  </span>
                  {adl}
                </button>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-sm text-center">
            Submission failed. Please try again or use another funnel to reach us.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-navy-900 dark:bg-gold-500 text-gold-500 dark:text-navy-900 font-extrabold rounded-xl hover:bg-navy-800 dark:hover:bg-gold-400 transition-all shadow-lg disabled:opacity-60 text-sm tracking-wide"
        >
          {status === 'loading' ? (
            <span><i className="fa-solid fa-spinner fa-spin mr-2"></i>Submitting...</span>
          ) : (
            <span><i className="fa-solid fa-paper-plane mr-2"></i>Submit for Free Audit</span>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          <i className="fa-solid fa-lock mr-1"></i>
          Your information is confidential and never sold.
        </p>
      </form>
    </div>
  );
};

export default FunnelA;
