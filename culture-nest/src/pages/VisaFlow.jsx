import React, { useState } from 'react';
import Layout from '../components/Layout';
import { visaTiers, community, initialTouristRequests } from '../data/mockData';

export default function VisaFlow() {
  const [requests, setRequests] = useState(initialTouristRequests);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFeedback, setActionFeedback] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          notes: newStatus === 'Approved' ? 'Approved by Community Leader' : 'Restricted by Community Elder'
        };
      }
      return req;
    }));

    setActionFeedback(`Request ${id} status updated to ${newStatus}`);
    setTimeout(() => setActionFeedback(''), 3000);
  };

  const filteredRequests = requests.filter(req => {
    if (filterStatus !== 'ALL' && req.status !== filterStatus) {
      return false;
    }
    if (searchQuery && !req.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) && !req.purpose.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
      case 'Rejected':
        return 'bg-red-950/40 text-red-300 border border-red-500/40';
      default:
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/40';
    }
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
                Custodian Review Dashboard
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">Tourist Visitor Pass Requests</h1>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-bold">
              {requests.filter(r => r.status === 'Pending Review').length} Pending Requests
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Review, approve, or restrict access pass requests submitted by visitors &amp; cultural tourists for <strong>{community.name}</strong>. Access is governed under Elder consensus.
          </p>
        </div>

        {actionFeedback && (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-body-sm flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Tourist Pass Requests Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">badge</span>
              Tourist Pass Applications ({requests.length})
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 select-none">
              <button
                onClick={() => setFilterStatus('ALL')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm cursor-pointer transition-colors ${
                  filterStatus === 'ALL' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                All Applications ({requests.length})
              </button>
              <button
                onClick={() => setFilterStatus('Pending Review')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm cursor-pointer transition-colors ${
                  filterStatus === 'Pending Review' ? 'bg-amber-500 text-black font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                Pending ({requests.filter(r => r.status === 'Pending Review').length})
              </button>
              <button
                onClick={() => setFilterStatus('Approved')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm cursor-pointer transition-colors ${
                  filterStatus === 'Approved' ? 'bg-emerald-500 text-black font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                Approved ({requests.filter(r => r.status === 'Approved').length})
              </button>
              <button
                onClick={() => setFilterStatus('Rejected')}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm cursor-pointer transition-colors ${
                  filterStatus === 'Rejected' ? 'bg-red-500 text-white font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                Restricted ({requests.filter(r => r.status === 'Rejected').length})
              </button>
            </div>
          </div>

          {/* Request Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-4 hover:bg-surface-container transition-all shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline font-semibold">Ref: {req.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-label-sm font-label-sm font-semibold ${getStatusBadge(req.status)}`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">account_circle</span>
                      <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{req.applicantName}</h3>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-bold">
                      Requested: {req.requestedTier}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 space-y-1">
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block font-semibold">Purpose &amp; Intention</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{req.purpose}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-outline-variant/20">
                  <div className="flex justify-between items-center text-label-sm text-outline">
                    <span>Submitted: {req.dateSubmitted}</span>
                    <span className="text-secondary">{req.notes}</span>
                  </div>

                  {/* Leader Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleStatusChange(req.id, 'Approved')}
                      disabled={req.status === 'Approved'}
                      className={`py-2 px-3 rounded-xl font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        req.status === 'Approved' 
                          ? 'bg-emerald-950/30 text-emerald-500 opacity-60 cursor-not-allowed border border-emerald-800/30' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Approve Pass
                    </button>

                    <button
                      onClick={() => handleStatusChange(req.id, 'Rejected')}
                      disabled={req.status === 'Rejected'}
                      className={`py-2 px-3 rounded-xl font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        req.status === 'Rejected' 
                          ? 'bg-red-950/30 text-red-400 opacity-60 cursor-not-allowed border border-red-800/30' 
                          : 'bg-red-900/60 hover:bg-red-800 text-red-100 border border-red-500/40 shadow-md'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">block</span>
                      Restrict Pass
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Level Policy Reference */}
        <div className="space-y-4 pt-4">
          <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">card_membership</span>
            Community Access Level Policies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visaTiers.map((t) => (
              <div key={t.level} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-3 hover:bg-surface-container transition-all shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <strong className="font-title-lg text-title-lg text-tertiary">{t.level} Access Pass</strong>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.auto ? 'bg-emerald-500/20 text-emerald-400' : 'bg-tertiary/20 text-tertiary'}`}>
                      {t.auto ? 'Instant Public Access' : 'Leader Review Required'}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
