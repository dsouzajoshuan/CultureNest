import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { community, visaTiers, archiveItems as initialArchiveItems } from '../data/mockData';

export default function Home() {
  const [filterRank, setFilterRank] = useState('ALL');
  const [filterArchiveCategory, setFilterArchiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingArchiveId, setPlayingArchiveId] = useState(null);
  const [vetoActive, setVetoActive] = useState(false);
  const [supportCount, setSupportCount] = useState(38);
  const [hasSupported, setHasSupported] = useState(false);

  // Dynamic Archive State
  const [archiveList, setArchiveList] = useState(initialArchiveItems);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Handloom & Textiles');
  const [newCustodian, setNewCustodian] = useState(community.members[0]?.name || 'Prabhakar Shenoy');
  const [newDescription, setNewDescription] = useState('');
  const [newIsSacred, setNewIsSacred] = useState(false);

  const filteredMembers = community.members.filter((member) => {
    if (filterRank !== 'ALL' && member.rank.toLowerCase() !== filterRank.toLowerCase()) {
      return false;
    }
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const filteredArchive = archiveList.filter((item) => {
    if (filterArchiveCategory !== 'ALL' && item.category !== filterArchiveCategory) {
      return false;
    }
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
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

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newItem = {
      id: `ARCH-0${archiveList.length + 1}`,
      title: newTitle,
      category: newCategory,
      custodian: newCustodian,
      date: 'Newly Preserved',
      description: newDescription,
      isSacred: newIsSacred,
      audioFile: null
    };

    setArchiveList([newItem, ...archiveList]);
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  return (
    <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <div className="flex flex-col w-full pb-16 space-y-8 pt-4">
        {/* Hero Banner */}
        <section className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xl">
          <div className="w-full h-72 bg-cover bg-center relative flex items-end p-space-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHrM8164aCo4rJDVm7JmlqeyOY3dAF6pJ_xS3qpTZmN-RRSHIOluJSFty9cDVIop7YC-5rY95ZEafGmVLWtNaLItIWx88jKchw23fX0FZdN8a7IOayAwp3ZODQZ8cBtMR2kQcjRQlk-tc0rysHIx_aeteOGsAgJoYb8qXTD-YvZQK9bZH8lmd9AAhN4wwcQHIE_IXoADrcYXetXl1dG0XmbsSb06WY4yS0rfegWDT2c4Vpf97Arve-')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6">
              <div className="flex items-end gap-5">
                <div className="relative flex-shrink-0 w-24 h-24 rounded-2xl bg-surface-container-high shadow-2xl flex items-center justify-center text-primary font-headline-xl text-headline-xl overflow-hidden">
                  <span className="relative font-headline-xl text-primary">{community.name.charAt(0)}</span>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{community.name}</h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest/80 text-primary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      {community.status} Community
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm">
                      {community.visibility} Access
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-secondary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">group</span>
                    Managed by {community.members.length} Active Community Members
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-end">
                <Link to="/archive" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  Browse Archive ({archiveList.length})
                </Link>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-lg hover:bg-primary-fixed-dim transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Add Heritage Story
                </button>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="p-space-lg bg-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Community Focus</span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                Safeguarding authentic Konkani cultural heritage, oral traditions, and traditional practices under community consensus.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-3.5 py-2 rounded-xl bg-surface-container flex items-center gap-2.5 shadow-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">group</span>
                <div className="flex flex-col">
                  <span className="font-title-md text-body-md text-on-surface font-semibold">{community.members.length}</span>
                  <span className="font-label-sm text-label-sm text-outline">Members</span>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-surface-container flex items-center gap-2.5 shadow-sm">
                <span className="material-symbols-outlined text-tertiary text-[20px]">auto_awesome</span>
                <div className="flex flex-col">
                  <span className="font-title-md text-body-md text-on-surface font-semibold">{archiveList.length}</span>
                  <span className="font-label-sm text-label-sm text-outline">Archive Records</span>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-surface-container flex items-center gap-2.5 shadow-sm">
                <span className="material-symbols-outlined text-tertiary text-[20px]">how_to_vote</span>
                <div className="flex flex-col">
                  <span className="font-title-md text-body-md text-on-surface font-semibold">{community.proposal.approval}%</span>
                  <span className="font-label-sm text-label-sm text-outline">Approval Rate</span>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-tertiary/10 text-tertiary flex items-center gap-2.5 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-title-md text-body-md text-tertiary font-semibold">{community.status}</span>
                  <span className="font-label-sm text-label-sm text-tertiary/80">Status</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Feed */}
          <div className="lg:col-span-8 space-y-8">
            {/* Proposal Decision Vote */}
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/20">
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">how_to_vote</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm tracking-wider uppercase text-tertiary block font-semibold">Active Community Decision Vote</span>
                    <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">
                      {community.proposal.title}
                    </h2>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary flex-shrink-0">
                  Voting Active
                </span>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
                A proposed update to the shared community heritage description is open for voting by active members.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-body-sm text-on-surface-variant">
                  <span>Community Member Approval</span>
                  <span className="font-bold text-tertiary">{community.proposal.approval}% Agree</span>
                </div>
                <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: `${community.proposal.approval}%` }}></div>
                </div>
              </div>

              <div className="mt-5 pt-4 flex items-center justify-between text-outline border-t border-outline-variant/20">
                <button 
                  onClick={() => {
                    setSupportCount(c => hasSupported ? c - 1 : c + 1);
                    setHasSupported(!hasSupported);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-colors cursor-pointer ${
                    hasSupported ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span>👍</span> <span>I Support This ({supportCount})</span>
                </button>

                <Link to="/community" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-1 font-semibold">
                  View Member Votes <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* HERITAGE ARCHIVE SECTION (Inline & Navigable) */}
            <section id="heritage-archive" className="space-y-5 rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                    Heritage Archive &amp; Living Traditions
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline mt-0.5">Curated craft knowledge vaults, oral histories, and festival traditions maintained under Elder protection.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-fixed-dim transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    Add Record
                  </button>
                  <Link 
                    to="/archive" 
                    className="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md font-bold transition-all flex items-center gap-1 border border-primary/20"
                  >
                    Full Archive Page ({archiveList.length})
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-on-surface-variant select-none">
                <button 
                  onClick={() => setFilterArchiveCategory('ALL')}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterArchiveCategory === 'ALL' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  All Records ({archiveList.length})
                </button>
                <button 
                  onClick={() => setFilterArchiveCategory('Handloom & Textiles')}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterArchiveCategory === 'Handloom & Textiles' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  Handloom &amp; Textiles
                </button>
                <button 
                  onClick={() => setFilterArchiveCategory('Culinary Traditions')}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterArchiveCategory === 'Culinary Traditions' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  Culinary Traditions
                </button>
                <button 
                  onClick={() => setFilterArchiveCategory('Oral History & Audio Chants')}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterArchiveCategory === 'Oral History & Audio Chants' ? 'bg-primary text-on-primary font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  Oral History &amp; Chants
                </button>
              </div>

              {/* Archive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {filteredArchive.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between space-y-3 hover:bg-surface-container-high transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-medium">
                          {item.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.isSacred ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                          {item.isSacred ? 'Sacred Record' : 'Elder Approved'}
                        </span>
                      </div>

                      <h4 className="font-title-lg text-title-lg text-on-surface font-semibold">{item.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    {item.audioFile && (
                      <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-3 border border-outline-variant/20">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setPlayingArchiveId(playingArchiveId === item.id ? null : item.id)}
                            className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {playingArchiveId === item.id ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                          <span className="font-body-sm text-body-sm text-on-surface truncate">
                            {playingArchiveId === item.id ? 'Playing Audio...' : item.audioFile}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-label-sm text-outline">
                      <span>By {item.custodian}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Elder Content Protection Feed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <h3 className="font-title-lg text-title-lg text-on-surface">Community Activity Feed</h3>
                </div>
                <span className="font-label-sm text-label-sm text-outline">Recent Updates</span>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 flex items-start gap-4 border border-outline-variant/20">
                <div className="w-11 h-11 rounded-xl bg-surface-container-high text-tertiary font-bold flex items-center justify-center flex-shrink-0 shadow-md">
                  {community.members[2]?.name.charAt(0) || 'P'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-title-md text-title-md text-on-surface">{community.members[2]?.name || "Pandit Ramdas Kamath"}</span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-label-sm">Elder</span>
                    </div>

                    <button 
                      onClick={() => setVetoActive(!vetoActive)}
                      className={`px-2.5 py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1 cursor-pointer transition-colors ${
                        vetoActive ? 'bg-red-900/40 text-red-300 border border-red-500/40' : 'bg-surface-container-high text-outline hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">shield</span>
                      {vetoActive ? 'Content Restricted' : 'Elder Approved'}
                    </button>
                  </div>

                  {vetoActive ? (
                    <div className="mt-2 p-3 rounded-lg bg-red-950/30 border border-red-800/30 text-red-200 text-body-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-400 text-[18px]">lock</span>
                      <span>Content restricted by Elder protection authority ({community.members[2]?.name}).</span>
                    </div>
                  ) : (
                    <>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        Shared an audio recording of <span className="text-on-surface font-medium">"Ancestral Konkani Chants &amp; Festival Stories"</span>.
                      </p>

                      <div className="mt-3 p-3 rounded-lg bg-surface-container flex items-center justify-between gap-4 border border-outline-variant/20">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform shadow-md cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {isPlayingAudio ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                          <div>
                            <span className="font-title-md text-body-md text-on-surface block truncate">Konkani_Festival_Stories.mp3</span>
                            <span className="font-label-sm text-label-sm text-outline">
                              {isPlayingAudio ? 'Playing Audio...' : '5:40 · Audio Story'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Visitor Access Passes Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Visitor Access Passes</h3>
                  <p className="font-body-sm text-body-sm text-outline">Consent-based access levels set by community members.</p>
                </div>
                <Link to="/visa" className="font-label-md text-label-md text-primary hover:underline font-semibold">Manage Requests →</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visaTiers.map((tier) => (
                  <div key={tier.level} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-3 hover:bg-surface-container transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-title-lg text-title-lg text-tertiary font-bold">{tier.level} Pass</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tier.auto ? 'bg-emerald-500/20 text-emerald-400' : 'bg-tertiary/20 text-tertiary'}`}>
                          {tier.auto ? 'Instant Access' : 'Leader Approval'}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{tier.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Column: Member Roster */}
          <aside className="lg:col-span-4 rounded-2xl bg-surface-container-low p-5 space-y-5 shadow-lg border border-outline-variant/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-title-lg text-title-lg text-on-surface">Community Members</h3>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold">
                  {community.members.length} Members
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-on-surface-variant select-none">
                <button 
                  onClick={() => setFilterRank('ALL')}
                  className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterRank === 'ALL' ? 'bg-surface-container-high text-primary font-bold' : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  All ({community.members.length})
                </button>
                <button 
                  onClick={() => setFilterRank('Leader')}
                  className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterRank === 'Leader' ? 'bg-surface-container-high text-primary font-bold' : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  Leaders
                </button>
                <button 
                  onClick={() => setFilterRank('Elder')}
                  className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm whitespace-nowrap cursor-pointer transition-colors ${
                    filterRank === 'Elder' ? 'bg-surface-container-high text-primary font-bold' : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  Elders
                </button>
              </div>
            </div>

            {/* Roster Items */}
            <div className="space-y-3 pt-1">
              {filteredMembers.map((member) => (
                <div key={member.name} className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between gap-3 border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high text-primary font-bold flex items-center justify-center flex-shrink-0 text-base shadow-inner">
                      {member.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="font-title-md text-body-md text-on-surface block truncate font-semibold">{member.name}</span>
                      <span className="font-label-sm text-label-sm text-outline block mt-0.5">
                        Knowledge: {member.knowledge} | Activity: {member.engagement} | Care: {member.stewardship}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-label-sm font-label-sm flex-shrink-0 ${getRankBadgeStyle(member.rank)}`}>
                    {member.rank}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Add New Heritage Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Add Heritage Record</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-outline hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Title of Tradition / Craft</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Traditional Konkani Weaving Motifs"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary/60"
                  >
                    <option value="Handloom & Textiles">Handloom & Textiles</option>
                    <option value="Culinary Traditions">Culinary Traditions</option>
                    <option value="Oral History & Audio Chants">Oral History & Chants</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Custodian / Preserver</label>
                  <select
                    value={newCustodian}
                    onChange={(e) => setNewCustodian(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary/60"
                  >
                    {community.members.map((m) => (
                      <option key={m.name} value={m.name}>{m.name} ({m.rank})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">Cultural Knowledge Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the lineage, crafting steps, or ceremonial significance..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="sacredCheck"
                  checked={newIsSacred}
                  onChange={(e) => setNewIsSacred(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <label htmlFor="sacredCheck" className="font-body-sm text-body-sm text-on-surface-variant">
                  Mark as Sacred Record (Requires Elder authorization for full access)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-fixed-dim"
                >
                  Save to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
