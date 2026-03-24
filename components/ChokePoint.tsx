import React from 'react';

const PAIN_POINTS = [
  {
    icon: 'fa-clock-rotate-left',
    headline: 'HRA Takes Months',
    body: 'Rider Avenue moves at its own pace. We know the shortcuts, the right staff to contact, and how to escalate without burning bridges.',
  },
  {
    icon: 'fa-sack-xmark',
    headline: 'Caregivers Are Underpaid',
    body: 'Most CDPAP workers are earning less than they're entitled to. We audit ADL documentation and fight for correct compensation.',
  },
  {
    icon: 'fa-file-circle-xmark',
    headline: 'Denials Aren\'t Final',
    body: 'A Medicaid denial or housing rejection is the beginning of negotiation, not the end. We appeal, document, and persist.',
  },
  {
    icon: 'fa-people-arrows',
    headline: 'You Shouldn\'t Navigate This Alone',
    body: 'Bronx and Manhattan families face a system designed to be confusing. An independent advocate in your corner changes outcomes.',
  },
];

const STATS = [
  { value: '200+', label: 'Families Served' },
  { value: '98%', label: 'Medicaid Appeals Won' },
  { value: '$0', label: 'Hidden Fees Ever' },
  { value: '48hr', label: 'Average Response Time' },
];

const ChokePoint: React.FC = () => {
  return (
    <>
      {/* Stats bar */}
      <section className="bg-gold-500 dark:bg-gold-600 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-navy-900">{stat.value}</div>
                <div className="text-navy-900/70 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 dark:text-white mb-3">
              The System Is Hard by Design
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              HRA, CDPAP agencies, and housing bureaucracies bank on families giving up. We don't.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PAIN_POINTS.map((point) => (
              <div
                key={point.headline}
                className="flex gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-navy-900 dark:bg-gold-500/10 flex items-center justify-center">
                  <i className={`fa-solid ${point.icon} text-gold-500 dark:text-gold-400 text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-navy-900 dark:text-white mb-1">{point.headline}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / testimony */}
      <section className="py-16 bg-navy-900 dark:bg-slate-900 border-y border-gold-500/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <i className="fa-solid fa-quote-left text-gold-500 text-3xl mb-6 block"></i>
          <blockquote className="text-white text-xl md:text-2xl font-bold italic leading-relaxed mb-6">
            "Valentine fought for what my mother deserved. HRA had denied us three times.
            Within two weeks of working with Valentine, we had approval and back pay."
          </blockquote>
          <div className="text-gold-400 text-sm font-semibold">— Family Client, South Bronx</div>
        </div>
      </section>
    </>
  );
};

export default ChokePoint;
