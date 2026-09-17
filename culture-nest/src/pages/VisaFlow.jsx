import React, { useState } from 'react';
import Layout from '../components/Layout';
import { visaTiers, community } from '../data/mockData';

export default function VisaFlow() {
  const [selectedTier, setSelectedTier] = useState(visaTiers[0].level);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRequestVisa = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className="flex flex-col w-full pb-16 space-y-8 pt-4">
        {/* Header Banner */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 shadow-md">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">explore</span>
                Cultural Passport System
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">Visitor Access Passes</h1>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-bold">
              Consent-Based Access
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Request permission to explore <strong>{community.name}</strong> archives, workshops, and traditional practices. Access levels are set under community rules and Elder consensus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pass Request Form */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-5 shadow-md">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <span className="material-symbols-outlined text-primary">badge</span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Request a Visitor Pass</h3>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-body-sm flex items-start gap-2.5 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-emerald-400 text-[20px] flex-shrink-0">check_circle</span>
                  <div>
                    <span className="font-bold block">Request Submitted!</span>
                    <span>Your pass request for <strong>{selectedTier} Pass</strong> has been sent to community leaders for review.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleRequestVisa} className="space-y-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Select Access Tier</label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary/60 font-body-md"
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                  >
                    {visaTiers.map((t) => (
                      <option key={t.level} value={t.level}>
                        {t.level} Pass ({t.auto ? 'Instant Public Access' : 'Leader Approval Required'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/20 space-y-2">
                  <div className="flex items-center gap-2 text-label-sm text-tertiary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">gavel</span>
                    <span>Community Terms of Access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded border-outline-variant text-primary focus:ring-primary" id="termsCheck" defaultChecked required />
                    <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="termsCheck">
                      I agree to abide by community guidelines (No unauthorized commercial usage, photography, or recording of restricted sacred records).
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-lg hover:bg-primary-fixed-dim transition-all cursor-pointer flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Submit Pass Request
                </button>
              </form>
            </div>
          </div>

          {/* Available Pass Tiers Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">card_membership</span>
              Available Visitor Pass Levels
            </h3>

            <div className="space-y-4">
              {visaTiers.map((t) => (
                <div key={t.level} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col space-y-3 hover:bg-surface-container transition-all shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-surface-container-high text-tertiary font-bold flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                      </span>
                      <h4 className="font-title-lg text-title-lg text-on-surface font-bold">{t.level} Access Pass</h4>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold ${t.auto ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-tertiary/20 text-tertiary border border-tertiary/30'}`}>
                      {t.auto ? 'Instant Public Access' : 'Leader Review Required'}
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
