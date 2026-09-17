import React, { useState } from 'react';
import Layout from '../components/Layout';
import { community } from '../data/mockData';

export default function Community() {
  const [vetoActive, setVetoActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = community.members.filter((member) => {
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getRankBadgeStyle = (rank) => {
    switch (rank) {
      case 'Leader':
        return 'bg-primary text-on-primary font-bold';
      case 'Co-leader':
      case 'Co-Leader':
        return 'bg-surface-container-high text-secondary font-semibold';
      case 'Elder':
        return 'bg-tertiary-container/30 text-tertiary font-semibold';
      default:
        return 'bg-surface-container-high text-outline';
    }
  };

  return (
    <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className="flex flex-col w-full pb-16 space-y-8 pt-4">
        {/* Header Banner */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 shadow-md">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-lg text-headline-lg text-on-surface">{community.name} Roster &amp; Governance</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-label-sm text-label-sm font-semibold">
                  {community.status}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {community.visibility} Access · Governance by Knowledge, Engagement, and Care Stewardship metrics.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-bold">
              {community.members.length} Active Custodians
            </span>
          </div>
        </div>

        {/* Community Decision Vote Card */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-tertiary font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
              Active Community Proposal
            </span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-label-sm text-label-sm">
              Voting Open
            </span>
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface">{community.proposal.title}</h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-body-sm text-on-surface-variant">
              <span>Current Member Approval Rate</span>
              <span className="font-bold text-tertiary">{community.proposal.approval}% Consensus</span>
            </div>
            <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: `${community.proposal.approval}%` }}></div>
            </div>
          </div>
        </div>

        {/* Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Member Roster */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">group</span>
                Custodian Roster &amp; Rank Breakdown
              </h3>
            </div>

            <div className="space-y-3">
              {filteredMembers.map((m) => (
                <div key={m.name} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-4 hover:bg-surface-container transition-colors shadow-sm">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary font-bold flex items-center justify-center flex-shrink-0 text-lg shadow-inner">
                      {m.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="font-title-lg text-title-lg text-on-surface block truncate font-semibold">{m.name}</span>
                      <div className="flex items-center gap-3 text-label-sm text-outline mt-0.5 flex-wrap">
                        <span>Knowledge: <strong className="text-on-surface">{m.knowledge}</strong></span>
                        <span>Activity: <strong className="text-on-surface">{m.engagement}</strong></span>
                        <span>Care: <strong className="text-on-surface">{m.stewardship}</strong></span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-label-sm font-label-sm flex-shrink-0 ${getRankBadgeStyle(m.rank)}`}>
                    {m.rank}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Elder Content Protection Veto Authority */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 shadow-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">shield</span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Elder Content Protection</h3>
              </div>

              <p className="font-body-sm text-body-sm text-outline leading-relaxed">
                Individual elders retain final approval over content tied to their personal knowledge or family craft, protecting sacred knowledge regardless of general votes.
              </p>

              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20 space-y-3">
                <h4 className="font-title-md text-title-md text-on-surface font-semibold">Entry: Traditional Festival Spice Blend &amp; Chants</h4>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-outline">Group Consensus:</span>
                  <span className="font-bold text-tertiary">{community.proposal.approval}% Approved</span>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Elder Veto Control:</span>
                  <button
                    onClick={() => setVetoActive(!vetoActive)}
                    className={`px-3 py-1.5 rounded-xl font-label-sm text-label-sm flex items-center gap-1.5 cursor-pointer transition-colors ${
                      vetoActive ? 'bg-red-900/40 text-red-300 border border-red-500/40' : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{vetoActive ? 'lock' : 'verified_user'}</span>
                    {vetoActive ? 'Restricted by Elder' : 'Approved by Elder'}
                  </button>
                </div>
              </div>

              {vetoActive ? (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-200 text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-400 text-[18px]">lock</span>
                  <span><strong>Content Restricted:</strong> Hidden from public view under direct Elder protection authority.</span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span><strong>Content Visible:</strong> Approved for sharing under community access terms.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
