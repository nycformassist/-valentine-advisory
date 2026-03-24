import React, { useState } from 'react';

const CATEGORIES = [
  { value: 'Agency Complaint', icon: 'fa-building-circle-xmark', label: 'Agency Complaint' },
  { value: 'Salary Dispute', icon: 'fa-sack-dollar', label: 'Salary Dispute' },
  { value: 'Caregiver Burnout', icon: 'fa-heart-crack', label: 'Caregiver Burnout' },
  { value: 'Housing Crisis', icon: 'fa-house-circle-exclamation', label: 'Housing Crisis' },
  { value: 'Medicaid Issue', icon: 'fa-file-medical', label: 'Medicaid Issue' },
  { value: 'Other / Confidential', icon: 'fa-lock', label: 'Other / Confidential' },
];

const FORMSPREE_URL = 'https://formspree.io/f/mreozbnq';

type Status = 'idle' | 'loading' | 'success' | 'error';

const FunnelC: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    currentAgency: '',
    category: '',
    message: '',
    isUrgent: false,
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.category || !form.message) {
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
          funnel: 'Caregiver_Sanctuary',
          _subject: `Sanctuary Message — ${form.category}${form.isUrgent ? ' 🚨 URGENT' : ''}`,
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
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-shield-heart text-3xl text-purple-600 dark:text-purple-400"></i>
        </div>
        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Message Secured</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Your message is in the Sanctuary Vault. Valentine will reach out to you directly and confidentially.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with confidentiality badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
          <i className="fa-solid fa-vault"></i>
          SANCTUARY VAULT · CONFIDENTIAL
        </div>
        <h2 className="text-2xl font-extrabold text-navy-900 dark:text-white mb-2">
          <i className="fa-solid fa-shield-heart text-gold-500 mr-2"></i>
          Caregiver Sanctuary
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
          This is a safe, private space. Whether you're burned out, fighting a bad agency, or just need someone in your corner — speak freely. Nothing here is shared without your permission.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Name or Alias <span className="text-gold-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="You may use a first name only"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
          />
        </div>

        {/* Phone + Agency */}
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
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Current Agency</label>
            <input
              type="text"
              value={form.currentAgency}
              onChange={(e) => setForm({ ...form, currentAgency: e.target.value })}
              placeholder="If applicable"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            What Brings You Here? <span className="text-gold-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.value}
                onClick={() => setForm({ ...form, category: cat.value })}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                  form.category === cat.value
                    ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10 text-navy-900 dark:text-gold-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-gold-400'
                }`}
              >
                <i className={`fa-solid ${cat.icon} text-lg ${form.category === cat.value ? 'text-gold-500' : ''}`}></i>
                <span className="text-[10px] font-bold leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Your Message <span className="text-gold-500">*</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            placeholder="Tell us what's happening. Be as specific or as vague as you need to be. This is confidential."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-sm resize-none"
          />
        </div>

        {/* Urgent toggle */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => setForm({ ...form, isUrgent: !form.isUrgent })}
            className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${form.isUrgent ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.isUrgent ? 'left-5' : 'left-1'}`} />
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-bold text-red-500">Mark Urgent</span> — I need a callback today
          </span>
        </label>

        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
        {status === 'error' && (
          <p className="text-red-500 text-sm text-center">Submission failed. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-navy-900 dark:bg-gold-500 text-gold-500 dark:text-navy-900 font-extrabold rounded-xl hover:bg-navy-800 dark:hover:bg-gold-400 transition-all shadow-lg disabled:opacity-60 text-sm tracking-wide"
        >
          {status === 'loading' ? (
            <span><i className="fa-solid fa-spinner fa-spin mr-2"></i>Securing Message...</span>
          ) : (
            <span><i className="fa-solid fa-vault mr-2"></i>Send to Sanctuary Vault</span>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          <i className="fa-solid fa-lock mr-1"></i>
          End-to-end confidential. Never shared without consent.
        </p>
      </form>
    </div>
  );
};

export default FunnelC;
