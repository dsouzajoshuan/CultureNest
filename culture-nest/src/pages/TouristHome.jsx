import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { community, visaTiers, archiveItems } from '../data/mockData';

export default function TouristHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('culture_user')) || { name: 'Nathan', role: 'Cultural Visitor', type: 'tourist' };
    } catch (e) {
      return { name: 'Nathan', role: 'Cultural Visitor', type: 'tourist' };
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('culture_user');
    navigate('/login');
  };

  const publicArchives = archiveItems.filter(item => !item.isSacred);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      {/* Top Header Bar */}
      <header className="sticky top-0 h-16 bg-surface/80 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-space-lg flex items-center justify-between border-b border-outline-variant/10">
        <div className="flex items-center gap-space-sm">
          <Link to="/tourist" className="font-headline-md text-headline-md text-on-surface hover:text-primary transition-colors">CultureNest</Link>
          <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary-container/40 text-tertiary font-semibold">Visitor Sanctuary</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/20">
            <span className="material-symbols-outlined text-tertiary text-[18px]">travel_explore</span>
            <div className="flex flex-col text-left">
              <span className="font-title-md text-body-sm text-on-surface font-semibold">{user.name}</span>
              <span className="font-label-sm text-[10px] text-tertiary uppercase tracking-wider">{user.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-red-950/40 hover:text-red-300 text-on-surface-variant font-label-md text-label-md font-bold transition-all flex items-center gap-1.5 border border-outline-variant/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto py-8 px-space-lg space-y-8">
        {/* Tourist Welcome Banner */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-label-sm text-label-sm font-semibold">
                  Public Pass Active
                </span>
                <span className="font-label-sm text-label-sm text-outline">Sanctuary Visitor</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2">Welcome to {community.name}</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                Explore authentic Konkani cultural stories, artisan weaver lineages, and public heritage exhibits published by verified custodians.
              </p>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-red-900/40 text-red-300 font-label-md text-label-md font-bold transition-all flex items-center gap-2 border border-red-500/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Log Out to Login Screen
              </button>
            </div>
          </div>
        </div>

        {/* Tourist Access Tiers Breakdown */}
        <div className="space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">card_membership</span>
            Your Visitor Pass Access Levels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visaTiers.map((tier) => (
              <div key={tier.level} className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                tier.level === 'Public' 
                  ? 'bg-surface-container-low border-emerald-500/40 shadow-md' 
                  : 'bg-surface-container-lowest border-outline-variant/20 opacity-80'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-title-lg text-title-lg text-tertiary font-bold">{tier.level} Pass</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tier.level === 'Public' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-container-high text-outline'
                    }`}>
                      {tier.level === 'Public' ? 'Active' : 'Approval Required'}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public Cultural Heritage Exhibits */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Public Heritage Stories &amp; Exhibits
            </h2>
            <span className="font-label-sm text-label-sm text-outline">{publicArchives.length} Public Records Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicArchives.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-4 hover:bg-surface-container transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-medium">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Public Exhibit
                    </span>
                  </div>

                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-label-sm text-outline">
                  <span>Preserved by {item.custodian}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Etiquette Guidelines for Visitors */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="material-symbols-outlined">gavel</span>
            <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Sanctuary Visitor Etiquette</h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            All cultural knowledge, weaving patterns, and oral histories are sovereign intellectual property of the community. Commercial reproduction or unauthorized recording of restricted sacred records is strictly prohibited under community rules.
          </p>
        </div>
      </main>
    </div>
  );
}
