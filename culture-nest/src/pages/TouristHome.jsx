import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { discoverCommunities } from '../data/mockData';

export default function TouristHome() {
  const navigate = useNavigate();
  const [user] = useState(() => {
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

  const [activeTab, setActiveTab] = useState('home-feed');
  const [likedPosts, setLikedPosts] = useState({});
  const [followedArtisans, setFollowedArtisans] = useState({});
  const [bookedWorkshops, setBookedWorkshops] = useState({});
  const [joinedCommunities, setJoinedCommunities] = useState({ 'varanasi-zari': true });

  // Apply to Visit State
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [visitDate, setVisitDate] = useState('2026-09-25');
  const [visitPurpose, setVisitPurpose] = useState('Academic research & observing heritage craft techniques.');
  const [selectedPublicExps, setSelectedPublicExps] = useState({});
  const [selectedRestrictedExps, setSelectedRestrictedExps] = useState({});
  const [submittedApplications, setSubmittedApplications] = useState([
    {
      id: 'APP-101',
      communityName: 'Konkani Heritage Circle',
      communityId: 'konkani-circle',
      date: '2026-09-22',
      status: 'Pending Review',
      leader: 'Joshua N Dsouza',
      purpose: 'Academic research on elder audio chants, temple weaving traditions, and seasonal Dohas.',
      publicSelected: ['Courtyard Spice Reduction Demonstration', 'Public Handloom Walkthrough & Display'],
      restrictedSelected: ['Sacred Temple Chant Audio Archives', 'Ancestral Handloom Warp Setup Shed'],
      dateSubmitted: 'Today, 5:10 PM'
    }
  ]);

  const openApplyModal = (comm, e) => {
    if (e) e.stopPropagation();
    setSelectedCommunity(comm);
    setVisitDate('2026-09-25');
    setVisitPurpose('Academic research & observing heritage craft techniques.');
    const pubObj = {};
    (comm.publicExperiences || []).forEach(exp => pubObj[exp] = true);
    setSelectedPublicExps(pubObj);
    const resObj = {};
    (comm.restrictedExperiences || []).forEach(exp => resObj[exp] = true);
    setSelectedRestrictedExps(resObj);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!selectedCommunity) return;

    const pubList = Object.keys(selectedPublicExps).filter(k => selectedPublicExps[k]);
    const resList = Object.keys(selectedRestrictedExps).filter(k => selectedRestrictedExps[k]);

    const newApp = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      communityName: selectedCommunity.name,
      communityId: selectedCommunity.id,
      date: visitDate,
      status: resList.length > 0 ? 'Pending Leader Review' : 'Approved (Instant Access)',
      leader: selectedCommunity.leader,
      purpose: visitPurpose || 'Cultural immersion & heritage study',
      publicSelected: pubList,
      restrictedSelected: resList,
      dateSubmitted: 'Just now'
    };

    setSubmittedApplications(prev => [newApp, ...prev]);
    setSelectedCommunity(null);
    setActiveTab('my-application');
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleFollow = (artisanId) => {
    setFollowedArtisans(prev => ({ ...prev, [artisanId]: !prev[artisanId] }));
  };

  const bookWorkshop = (workshopId) => {
    setBookedWorkshops(prev => ({ ...prev, [workshopId]: true }));
  };

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between p-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/10">
        <div className="flex flex-col gap-space-lg">
          {/* Brand Header */}
          <Link to="/tourist" className="flex items-center gap-space-sm px-space-sm py-space-xs hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center p-1.5 shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-tertiary text-[22px]">travel_explore</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface tracking-tight leading-none">CultureNest</span>
              <span className="font-label-sm text-label-sm text-tertiary tracking-wider uppercase mt-0.5">Tourist Sanctuary</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-space-xs">
            <button 
              onClick={() => setActiveTab('home-feed')}
              className={`flex items-center gap-space-md px-space-md py-space-sm transition-all group rounded-lg text-left cursor-pointer ${
                activeTab === 'home-feed' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-105">auto_stories</span>
              <span className="font-title-md text-title-md">Home Feed</span>
            </button>

            <button 
              onClick={() => setActiveTab('discover-culture')}
              className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all group text-left cursor-pointer ${
                activeTab === 'discover-culture' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-105">explore</span>
              <span className="font-title-md text-title-md">Discover Culture</span>
            </button>

            <button 
              onClick={() => setActiveTab('my-application')}
              className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all group cursor-pointer ${
                activeTab === 'my-application' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-space-md">
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-105">confirmation_number</span>
                <span className="font-title-md text-title-md">My Application</span>
              </div>
              <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-bold uppercase">Active</span>
            </button>
          </nav>
        </div>

        {/* Active Mohalla Card */}
        <div className="flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Active Sanctuary</span>
            <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Kadaura
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Weaving sanctuary active now: 14 Master Ustads at pit-looms.</p>
          <button className="flex items-center justify-center gap-space-xs w-full py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container-highest hover:text-on-surface text-on-surface transition-colors font-label-md text-label-md cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">map</span>Locate Loom Walk
          </button>
        </div>
      </aside>

      {/* Main View Container */}
      <div className="pl-72">
        {/* Header Bar */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-desktop border-b border-outline-variant/10">
          <div className="flex items-center gap-space-md flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input 
                className="w-full bg-surface-container-low pl-10 pr-space-md py-2 rounded-xl text-on-surface placeholder-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-all border border-outline-variant/20" 
                placeholder="Search zari patterns, master weavers, Madanpura alleys..." 
                type="text" 
              />
            </div>
          </div>

          <div className="flex items-center gap-space-lg">
            <div className="hidden xl:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Pass: <strong className="text-on-surface font-semibold">Madanpura Circuit (Active)</strong>
              </span>
            </div>

            <div className="flex items-center gap-space-sm">
              <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">camera_enhance</span>
              </button>
            </div>

            {/* Profile Badge & Log Out Button */}
            <div className="flex items-center gap-space-sm pl-space-xs border-l border-outline-variant/20">
              <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary font-bold flex items-center justify-center text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="font-title-md text-title-md text-on-surface leading-none font-semibold">{user.name}</span>
                <span className="font-label-sm text-label-sm text-tertiary mt-0.5">{user.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-2 px-3 py-1 rounded-xl bg-surface-container-high hover:bg-red-950/40 text-on-surface-variant hover:text-red-300 transition-all font-label-md text-label-md font-bold flex items-center gap-1 border border-outline-variant/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                Log Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Feed Content */}
        <main className="relative pt-16 w-full px-gutter-desktop min-h-screen bg-background">
          <div className="flex flex-col w-full">
            {/* Subtle Ambient Glow Orbs */}
            <div className="relative w-full max-w-7xl mx-auto pb-space-xl">
              <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
              <div className="absolute top-96 right-10 w-80 h-80 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>



              {/* 2-Column Desktop Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                {/* CENTRAL FEED COLUMN */}
                <div className="lg:col-span-8 flex flex-col gap-space-xl max-w-2xl mx-auto w-full">
                  {/* TAB 1: HOME FEED */}
                  {activeTab === 'home-feed' && (
                    <>
                      {/* Feed Notice */}
                      <div className="bg-gradient-to-r from-surface-container to-surface-container-high p-space-md rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/20">
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-tertiary text-[22px]">volume_off</span>
                          <div>
                            <p className="font-title-md text-title-md text-on-surface leading-tight font-semibold">Quiet Weaving Interval</p>
                            <p className="font-body-sm text-body-sm text-outline">1:00 PM – 2:30 PM: Pit looms rest. Courtyard visits continue silently.</p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-1 rounded-full bg-surface-container-highest text-tertiary uppercase font-bold">Active Now</span>
                      </div>

                  {/* POST CARD 1: Tariq Ansari (Zari Pit Loom) */}
                  <article className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20">
                    <div className="flex items-center justify-between px-space-md py-1.5 bg-surface-container-lowest/90 border-b border-surface-container-highest/60">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="font-label-sm text-[11px] text-tertiary font-semibold tracking-wide uppercase">Community Approved</span>
                        <span className="text-outline text-[11px]">•</span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">Samiti Verified Fair Craft</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-secondary uppercase px-1.5 py-0.2 rounded bg-surface-container font-semibold">GI #34 Certified</span>
                    </div>

                    <div className="flex items-center justify-between p-space-md bg-surface-container">
                      <div className="flex items-center gap-space-sm">
                        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-tertiary to-primary-container">
                          <img className="w-10 h-10 rounded-full object-cover" alt="Tariq Ansari" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7R2tB-AtB4j0wqkvq03LVzkkMWLTEq-pKwR8DlrGC74Q-YGY9_5bkEwaj47MDsDnJcVC5x9ZdCXo8plI6WFhJyddYidf630ISVl8reN1mSGCV9cRV69bVL8JhqoyS93VAmT3TqmYTN5TeMWjcIe3P-ZGJ3yKzt5yt9FviynSWBHKzMQilq5OW-lo2ttnf07mF4Glg5ZDLC28wVik52fiJj9Nk5PoDcWT5osl4rdC3ZLYYt9JgWjJz" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-semibold">Tariq Ansari</span>
                            <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                            <span className="text-outline">•</span>
                            <button 
                              onClick={() => toggleFollow('tariq')}
                              className={`font-label-md text-label-md transition-colors cursor-pointer ${
                                followedArtisans['tariq'] ? 'text-tertiary font-bold' : 'text-primary hover:text-primary-fixed-dim'
                              }`}
                            >
                              {followedArtisans['tariq'] ? 'Following' : 'Follow'}
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-body-sm font-body-sm text-on-surface-variant">
                            <span>@tariq_kadwa_silk</span>
                            <span>•</span>
                            <span className="flex items-center text-outline"><span class="material-symbols-outlined text-[13px] mr-0.5">location_on</span>Madanpura Loom Shed</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-outline hover:text-on-surface rounded-lg transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                      </button>
                    </div>

                    <div className="relative w-full aspect-square bg-surface-container-lowest overflow-hidden group">
                      <img alt="Close-up of golden zari silk thread" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClowEJMStkcDQb-PSw7jHmo_pw6BkMYX3eReRSPGuf9sDp05zI23OQtMnAzCxpYz93I66tpIhKBOCGoAPamRlDuddjME2VNt0nX9o5fRzjzSLjbJewNYKGs603f402Cveh5RKpNn4uVf5V3Qw_24k31WaNVE_WF2oSylABq_sFT50EUfnLqlnSi5B6qWJ8uDfupz2uEWsTuIfXw-_RRN8PwNOvBbT_LYRlwxmV3Ixssjuai45xRsXK" />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface shadow-md border border-outline-variant/30">
                        <span className="material-symbols-outlined text-tertiary text-[14px]">auto_awesome</span>
                        <span className="font-label-sm text-label-sm text-secondary-fixed">Pure Silver Gilded Zari • 90-Yr Pit Loom</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button 
                          onClick={() => bookWorkshop('tariq-studio')}
                          className={`flex items-center gap-space-xs px-space-md py-2.5 rounded-full font-label-md text-label-md font-semibold transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer ${
                            bookedWorkshops['tariq-studio']
                              ? 'bg-emerald-600 text-white'
                              : 'bg-primary text-on-primary hover:bg-primary-fixed-dim'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {bookedWorkshops['tariq-studio'] ? 'check_circle' : 'calendar_add_on'}
                          </span>
                          {bookedWorkshops['tariq-studio'] ? 'Studio Visit Reserved!' : 'Book Studio Visit • ₹500'}
                        </button>
                      </div>
                    </div>

                    <div className="p-space-md flex flex-col gap-space-sm bg-surface-container-low">
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-space-md">
                          <button 
                            onClick={() => toggleLike('post1')}
                            className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                          >
                            <span className={`material-symbols-outlined text-[24px] ${likedPosts['post1'] ? 'text-error' : ''}`} style={{ fontVariationSettings: likedPosts['post1'] ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                            <span className="font-title-md text-title-md font-semibold text-on-surface">{248 + (likedPosts['post1'] ? 1 : 0)}</span>
                          </button>
                          <button className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
                            <span className="font-title-md text-title-md font-semibold text-on-surface">18</span>
                          </button>
                          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">send</span>
                          </button>
                        </div>
                        <button className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                        </button>
                      </div>

                      <div className="pt-1">
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                          <strong className="font-title-md text-title-md text-on-surface mr-1.5">tariq_kadwa_silk</strong> 
                          Morning gold zari warp completed on the 90-year-old pit loom. Preserving the imperial Shikargah motif with 4,000 hand-punched Naksha cards. Open for 3 visitor spots this afternoon.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#VaranasiHandloom</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#KadhwaSilk</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#PitLoomHeritage</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#EthicalCraft</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col gap-1">
                        <button className="font-label-sm text-label-sm text-outline text-left hover:text-on-surface transition-colors cursor-pointer">View all 18 comments</button>
                        <div className="flex items-start gap-1 font-body-sm text-body-sm">
                          <span className="font-semibold text-on-surface">nathan_visitor</span>
                          <span className="text-on-surface-variant">The density of the warp tension looks breathtaking Tariq Ji! Visiting at 3!</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-space-sm border-t border-outline-variant/10">
                        <input className="bg-surface-container px-3 py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface placeholder-outline focus:outline-none flex-1 border border-outline-variant/20" placeholder="Add a comment or send respect..." type="text" />
                        <button className="font-label-md text-label-md text-primary hover:text-primary-fixed-dim px-2 py-1 font-bold cursor-pointer">Post</button>
                      </div>
                    </div>
                  </article>

                  {/* POST CARD 2: Devendra Verma (Indigo Vats) */}
                  <article className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20">
                    <div className="flex items-center justify-between px-space-md py-1.5 bg-surface-container-lowest/90 border-b border-surface-container-highest/60">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="font-label-sm text-[11px] text-tertiary font-semibold tracking-wide uppercase">Community Approved</span>
                        <span className="text-outline text-[11px]">•</span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">Samiti Verified Natural Dye Batch</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-secondary uppercase px-1.5 py-0.2 rounded bg-surface-container font-semibold">Bio-Enzyme Verified</span>
                    </div>

                    <div className="flex items-center justify-between p-space-md bg-surface-container">
                      <div className="flex items-center gap-space-sm">
                        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-tertiary to-primary-container">
                          <img className="w-10 h-10 rounded-full object-cover" alt="Devendra Verma" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgmkZQSOiEXj-kyCiD54vOhoyU8ydfoZNqRt2ecmUrMSCOT1z1NWUmgnF8F9jbc6_R8VmHklsWASIdzHz5c1pyFxCozekIWekFLvuyc7FCvSJ8ocL_mBqUwv2enXgDDITib1t7GNpcSP46wLCSMKIUnTMNjaqj2lOpULLNRsFdvexbG97SQfhNAYfrJkm_mRowyhWhTFx0ZeF4VGhNsX--Jj9wnVG8ELF26suDnQD3FjboWDOneuYY" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-semibold">Devendra Verma</span>
                            <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                            <span className="text-outline">•</span>
                            <span className="font-body-sm text-body-sm text-outline">3h ago</span>
                          </div>
                          <div className="flex items-center gap-1 text-body-sm font-body-sm text-on-surface-variant">
                            <span>@devendra_rangrez</span>
                            <span>•</span>
                            <span className="flex items-center text-outline"><span class="material-symbols-outlined text-[13px] mr-0.5">palette</span>Ramnagar Vat Courtyard</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-outline hover:text-on-surface rounded-lg transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                      </button>
                    </div>

                    <div className="relative w-full aspect-[4/3] bg-surface-container-lowest overflow-hidden group">
                      <img alt="Member hands dipping indigo yarn" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv4BH9Gj7_I_Pnjc-l3aqywccy-3idowxVTMsvCZFEh5XZSbeT3ceOyf5RAc1OZBWmtgWniZoZg_fHnDcicK7Jg2QU9nyisBK-zE2E_nHafClFlTm_tXYzjbXtwLTTE93FFwaIJGps1VcVe6mrSoFCgz22C3X-xZmB8u3g_tnAuIe3dRCFxnoKnCoKdoIrEo3JbTf9xzaSBNQRs5SFp5zM1ThyGmJrM5bD13wXkqKQ_S8On5-6F24n" />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface shadow-md border border-outline-variant/30">
                        <span className="material-symbols-outlined text-primary text-[14px]">water_drop</span>
                        <span className="font-label-sm text-label-sm text-secondary-fixed">Wild Indigofera Tinctoria • 100% Bio-Enzyme</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button 
                          onClick={() => bookWorkshop('indigo-workshop')}
                          className={`flex items-center gap-space-xs px-space-md py-2.5 rounded-full font-label-md text-label-md font-semibold transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer ${
                            bookedWorkshops['indigo-workshop']
                              ? 'bg-emerald-600 text-white'
                              : 'bg-tertiary text-on-tertiary hover:bg-tertiary-fixed'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {bookedWorkshops['indigo-workshop'] ? 'check_circle' : 'brush'}
                          </span>
                          {bookedWorkshops['indigo-workshop'] ? 'Indigo Workshop Reserved!' : 'Join 4 PM Indigo Workshop • ₹750'}
                        </button>
                      </div>
                    </div>

                    <div className="p-space-md flex flex-col gap-space-sm bg-surface-container-low">
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-space-md">
                          <button 
                            onClick={() => toggleLike('post2')}
                            className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[24px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            <span className="font-title-md text-title-md font-semibold text-on-surface">{412 + (likedPosts['post2'] ? 1 : 0)}</span>
                          </button>
                          <button className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
                            <span className="font-title-md text-title-md font-semibold text-on-surface">34</span>
                          </button>
                          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">send</span>
                          </button>
                        </div>
                        <button className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
                        </button>
                      </div>

                      <div className="pt-1">
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                          <strong className="font-title-md text-title-md text-on-surface mr-1.5">devendra_rangrez</strong> 
                          Second dip of pure wild Indigofera tinctoria from today's batch. Steaming earthen pots keep the fermentation active. Visitors who attended today got to dye their own mulberry silk scarves!
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#NaturalDyes</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#IndigoWorkshop</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#RamnagarVats</span>
                        </div>
                      </div>

                      <div className="pt-2 bg-surface-container/60 p-space-sm rounded-lg flex flex-col gap-1 border border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-primary font-semibold">shanti_margdarshak</span>
                          <span className="font-label-sm text-label-sm text-outline">1h ago</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant italic">“Vat shade is deep and balanced today, shabash! Keep the cover closed before evening cool.”</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-space-sm border-t border-outline-variant/10">
                        <input className="bg-surface-container px-3 py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface placeholder-outline focus:outline-none flex-1 border border-outline-variant/20" placeholder="Reserve a stool or ask dye questions..." type="text" />
                        <button className="font-label-md text-label-md text-primary hover:text-primary-fixed-dim px-2 py-1 font-bold cursor-pointer">Post</button>
                      </div>
                    </div>
                  </article>

                  {/* POST CARD 3: Smt. Shanti Devi */}
                  <article className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20">
                    <div className="flex items-center justify-between px-space-md py-1.5 bg-surface-container-lowest/90 border-b border-surface-container-highest/60">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="font-label-sm text-[11px] text-tertiary font-semibold tracking-wide uppercase">Community Approved</span>
                        <span className="text-outline text-[11px]">•</span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">Elder Karigar Guild Trust</span>
                      </div>
                      <span className="font-label-sm text-[10px] text-secondary uppercase px-1.5 py-0.2 rounded bg-surface-container font-semibold">Master Living Archive</span>
                    </div>

                    <div className="flex items-center justify-between p-space-md bg-surface-container">
                      <div className="flex items-center gap-space-sm">
                        <div className="relative p-0.5 rounded-full bg-gradient-to-br from-tertiary via-secondary to-primary-container">
                          <img className="w-10 h-10 rounded-full object-cover" alt="Smt. Shanti Devi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuTsdHFqah0ADL0r9eYmEQpT_bXpKF0k5k4I64ZjduxTIe3LsmfpIDMhfxQkif8X1xApFm-MbVXvfricUijUQqVrknVFKq7pKSw0MLsm-mTNSj_LvE6WxMKDzYn_fRv6m2YXQmtMZB7ZdDrkwC4omNKlzROExyQdedDL7qweOHa9Jt6brFgqnR7MqPlHtBhz8ILJjEjKKNvjP6kr7t_UMnF3m-5v5bUKC3ZTGlgiEzGxvNSkvKyhxw" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-title-md text-on-surface font-semibold">Smt. Shanti Devi</span>
                            <span className="material-symbols-outlined text-tertiary text-[16px]">verified</span>
                            <span className="text-outline">•</span>
                            <span className="font-body-sm text-body-sm text-outline">5h ago</span>
                          </div>
                          <div className="flex items-center gap-1 text-body-sm font-body-sm text-on-surface-variant">
                            <span>@shanti_margdarshak</span>
                            <span>•</span>
                            <span className="flex items-center text-outline"><span class="material-symbols-outlined text-[13px] mr-0.5">location_on</span>Chowk Kendra Guild</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-outline hover:text-on-surface rounded-lg transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                      </button>
                    </div>

                    <div className="relative w-full aspect-[4/3] bg-surface-container-lowest overflow-hidden group">
                      <img alt="Smt. Shanti Devi spinning wheel" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMS3TdwFGp3SyDiqolm-byTqhbgvgkxKW9ewlQyPGVckFKb88YD3-D3BFFQQKCB9G0qMUSis4vraIXO2bRxYWf-7jLQt1y9GukHmKu2ZMsy915l9--O0kKVlbgtMs_KOjnpTNI2rpjEqMz8OCEwlgSNBombhQ-JjmULZ_DjOByO038dlduUWYXHiAGZAhnes7dpSOCpI_jh5bkuOhPMeycPfGfKJcb1VIQ0LsVjLS__-7il7vJv1i-" />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface shadow-md border border-outline-variant/30">
                        <span className="material-symbols-outlined text-tertiary text-[14px]">psychology</span>
                        <span className="font-label-sm text-label-sm text-secondary-fixed">64 Years of Living Heritage</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button className="flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-bright text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer border border-outline-variant/30">
                          <span className="material-symbols-outlined text-tertiary text-[18px]">volunteer_activism</span>
                          Support Elder Karigar Guild
                        </button>
                      </div>
                    </div>

                    <div className="p-space-md flex flex-col gap-space-sm bg-surface-container-low">
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-space-md">
                          <button 
                            onClick={() => toggleLike('post3')}
                            className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[24px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            <span className="font-title-md text-title-md font-semibold text-on-surface">{580 + (likedPosts['post3'] ? 1 : 0)}</span>
                          </button>
                          <button className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
                            <span className="font-title-md text-title-md font-semibold text-on-surface">42</span>
                          </button>
                          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">send</span>
                          </button>
                        </div>
                        <button className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
                        </button>
                      </div>

                      <div className="pt-1">
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                          <strong className="font-title-md text-title-md text-on-surface mr-1.5">shanti_margdarshak</strong> 
                          Spun over 120 meters of raw Mulberry thread before the noon bells. Hand spinning teaches patience before the shuttle ever flies across the warp. Blessed to guide our young apprentices today.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#CharkhaLegacy</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#MulberrySilk</span>
                          <span className="font-label-sm text-label-sm text-tertiary font-medium">#VaranasiElders</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-space-sm border-t border-outline-variant/10">
                        <input className="bg-surface-container px-3 py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface placeholder-outline focus:outline-none flex-1 border border-outline-variant/20" placeholder="Write a blessing or note of gratitude..." type="text" />
                        <button className="font-label-md text-label-md text-primary hover:text-primary-fixed-dim px-2 py-1 font-bold cursor-pointer">Post</button>
                      </div>
                    </div>
                  </article>
                </>
              )}

              {/* TAB 2: DISCOVER CULTURE */}
              {activeTab === 'discover-culture' && (
                <div className="flex flex-col gap-space-xl">
                  {/* Header Banner */}
                  <div className="bg-surface-container-low p-space-lg rounded-2xl border border-outline-variant/20 flex flex-col gap-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[24px]">travel_explore</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Discover Cultural Sanctuaries</h2>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Explore living heritage circles, GI-certified craft hubs, and traditional artisan sanctuaries preserved across India.
                    </p>
                  </div>

                  {/* Culture Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {discoverCommunities.map(comm => {
                      const hasApplied = submittedApplications.some(a => a.communityId === comm.id);
                      return (
                        <div 
                          key={comm.id} 
                          onClick={(e) => openApplyModal(comm, e)}
                          className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 shadow-md flex flex-col justify-between group cursor-pointer hover:border-tertiary/50 transition-all"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img src={comm.img} alt={comm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-outline-variant/30 flex items-center gap-1">
                              <span className="material-symbols-outlined text-tertiary text-[14px]">verified</span>
                              <span className="font-label-sm text-[11px] text-on-surface font-semibold">{comm.craft}</span>
                            </div>
                          </div>

                          <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                            <div>
                              <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-tertiary transition-colors">{comm.name}</h3>
                              <p className="font-body-sm text-body-sm text-outline mt-0.5"><span className="material-symbols-outlined text-[13px] align-middle mr-1">location_on</span>{comm.location}</p>
                              
                              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
                                {comm.description}
                              </p>

                              <div className="mt-2 flex items-center gap-3 font-label-sm text-label-sm text-tertiary">
                                <span><strong>{comm.members}</strong></span>
                                <span>•</span>
                                <span><strong>{comm.activeCount}</strong></span>
                              </div>
                              <p className="font-label-sm text-[11px] text-outline mt-1">Leader: <strong className="text-on-surface">{comm.leader}</strong></p>
                            </div>

                            <button 
                              onClick={(e) => openApplyModal(comm, e)}
                              className={`mt-4 w-full py-2.5 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                hasApplied
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-primary text-on-primary hover:bg-primary-fixed-dim shadow-md'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {hasApplied ? 'assignment_turned_in' : 'edit_calendar'}
                              </span>
                              {hasApplied ? 'Application Pending ⏳' : 'Apply to Visit'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: MY APPLICATION */}
              {activeTab === 'my-application' && (
                <div className="flex flex-col gap-space-xl">
                  {/* Status Banner */}
                  <div className="bg-surface-container-low p-space-lg rounded-2xl border border-outline-variant/20 flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-[24px]">assignment_turned_in</span>
                        <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">My Access Applications</h2>
                      </div>
                      <span className="font-label-md text-label-md px-3 py-1 rounded-full bg-tertiary/20 text-tertiary font-bold border border-tertiary/30">
                        {submittedApplications.length} Application{submittedApplications.length === 1 ? '' : 's'} Active
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Track your submitted cultural sanctuary visit requests, leader review approvals, and permission details.
                    </p>
                  </div>

                  {/* Submitted Applications List */}
                  <div className="flex flex-col gap-space-md">
                    {submittedApplications.map(app => (
                      <div key={app.id} className="bg-surface-container p-space-md rounded-2xl border border-outline-variant/20 flex flex-col gap-space-md">
                        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-space-sm">
                          <div>
                            <span className="font-label-sm text-[11px] text-tertiary font-mono">APPLICATION #{app.id}</span>
                            <h3 className="font-title-md text-title-md text-on-surface font-semibold mt-0.5">{app.communityName}</h3>
                          </div>
                          <span className={`font-label-md text-label-md px-3 py-1 rounded-full font-bold border ${
                            app.status.includes('Approved')
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            {app.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md font-body-sm text-body-sm">
                          <div className="flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/10">
                            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Requested Visit Date</span>
                            <span className="font-title-md text-title-md text-primary font-bold">{app.date}</span>
                          </div>
                          <div className="flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/10">
                            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Reviewing Custodian</span>
                            <span className="font-title-md text-title-md text-on-surface font-bold">{app.leader}</span>
                          </div>
                          <div className="flex flex-col gap-1 bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/10">
                            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Date Submitted</span>
                            <span className="font-title-md text-title-md text-outline font-medium">{app.dateSubmitted}</span>
                          </div>
                        </div>

                        <div className="bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/10 flex flex-col gap-1">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">Declared Visit Purpose</span>
                          <p className="font-body-md text-body-md text-on-surface">
                            "{app.purpose}"
                          </p>
                        </div>

                        {/* Selected Experiences breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-1">
                          {app.publicSelected && app.publicSelected.length > 0 && (
                            <div className="bg-emerald-950/30 p-space-sm rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                              <span className="font-label-sm text-[11px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Public Access (No Permission Needed)
                              </span>
                              <ul className="list-disc list-inside text-body-sm text-emerald-200">
                                {app.publicSelected.map((exp, i) => (
                                  <li key={i}>{exp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {app.restrictedSelected && app.restrictedSelected.length > 0 && (
                            <div className="bg-amber-950/30 p-space-sm rounded-xl border border-amber-500/30 flex flex-col gap-1">
                              <span className="font-label-sm text-[11px] text-amber-400 font-bold uppercase flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">lock</span>
                                Leader Permission Requested ({app.leader})
                              </span>
                              <ul className="list-disc list-inside text-body-sm text-amber-200">
                                {app.restrictedSelected.map((exp, i) => (
                                  <li key={i}>{exp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

                {/* RIGHT-HAND WIDGET COLUMN */}
                <aside className="hidden lg:flex lg:col-span-4 flex-col gap-space-lg sticky top-20">
                  {/* Active Tourist Card */}
                  <div className="bg-surface-container-low p-space-md rounded-2xl shadow-sm border border-outline-variant/20">
                    <div className="flex items-center justify-between pb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary font-bold flex items-center justify-center text-lg shadow-md">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-on-surface font-semibold">{user.name}</span>
                          <span className="font-label-sm text-label-sm text-outline">Pass #VAR-2026-88</span>
                          <span className="font-label-sm text-[11px] text-tertiary font-medium">Day 2 of 3 Heritage Immersion</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="font-label-sm text-label-sm text-red-400 hover:text-red-300 transition-colors font-semibold cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>

                    <div className="bg-surface-container p-space-xs rounded-xl flex items-center justify-between text-center mt-2 border border-outline-variant/20">
                      <div className="flex-1 py-1">
                        <div className="font-title-md text-title-md font-bold text-on-surface">3</div>
                        <div className="font-label-sm text-[10px] text-outline uppercase tracking-wider">Passes Left</div>
                      </div>
                      <div className="w-px h-6 bg-surface-container-highest"></div>
                      <div className="flex-1 py-1">
                        <div className="font-title-md text-title-md font-bold text-tertiary">2</div>
                        <div className="font-label-sm text-[10px] text-outline uppercase tracking-wider">Workshops</div>
                      </div>
                      <div className="w-px h-6 bg-surface-container-highest"></div>
                      <div className="flex-1 py-1">
                        <div className="font-title-md text-title-md font-bold text-primary">12</div>
                        <div className="font-label-sm text-[10px] text-outline uppercase tracking-wider">Members Met</div>
                      </div>
                    </div>
                  </div>

                  {/* DISCOVER COMMUNITIES WIDGET */}
                  <div className="bg-surface-container-low p-space-md rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-[20px]">groups</span>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold tracking-tight">Discover Communities</h3>
                      </div>
                      <button className="font-label-sm text-[12px] text-primary hover:text-primary-fixed-dim transition-colors font-semibold cursor-pointer">
                        See All
                      </button>
                    </div>

                    <div className="flex flex-col gap-space-sm">
                      {discoverCommunities.map(comm => {
                        const isJoined = joinedCommunities[comm.id];
                        return (
                          <div 
                            key={comm.id} 
                            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all border border-outline-variant/15 group"
                          >
                            <div className="flex items-center gap-space-sm min-w-0 flex-1">
                              <div className="relative flex-shrink-0">
                                <img 
                                  src={comm.img} 
                                  alt={comm.name} 
                                  className="w-10 h-10 rounded-xl object-cover border border-outline-variant/30" 
                                />
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-surface-container"></span>
                              </div>
                              <div className="flex flex-col min-w-0 pr-1">
                                <div className="flex items-center gap-1">
                                  <span className="font-title-md text-[13px] text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">{comm.name}</span>
                                  {comm.verified && (
                                    <span className="material-symbols-outlined text-tertiary text-[14px] flex-shrink-0">verified</span>
                                  )}
                                </div>
                                <span className="font-body-sm text-[11px] text-on-surface-variant truncate">{comm.craft}</span>
                                <div className="flex items-center gap-1.5 font-label-sm text-[10px] text-outline mt-0.5">
                                  <span className="truncate">{comm.location}</span>
                                  <span>•</span>
                                  <span className="text-tertiary font-medium flex-shrink-0">{comm.members}</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={(e) => openApplyModal(comm, e)}
                              className={`ml-2 px-3 py-1.5 rounded-lg font-label-sm text-[12px] font-bold transition-all flex-shrink-0 cursor-pointer ${
                                submittedApplications.some(a => a.communityId === comm.id)
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-primary text-on-primary hover:bg-primary-fixed-dim shadow-sm'
                              }`}
                            >
                              {submittedApplications.some(a => a.communityId === comm.id) ? 'Pending ⏳' : 'Apply to Visit'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sanctuary Etiquette Links */}
                  <div className="px-space-xs flex flex-col gap-space-sm">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 font-label-sm text-[11px] text-outline">
                      <a className="hover:text-on-surface transition-colors" href="#">Quiet Hours Etiquette</a>
                      <span>•</span>
                      <a className="hover:text-on-surface transition-colors" href="#">100% Direct Fair Trade</a>
                    </div>
                    <p className="font-body-sm text-[11px] text-outline">© 2026 CultureNest Living Archives. Sovereign Craft Preservation.</p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>

        {/* APPLY TO VISIT & COMMUNITY INFO MODAL */}
        {selectedCommunity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-space-md overflow-y-auto">
            <div className="bg-surface-container-low max-w-2xl w-full rounded-2xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img src={selectedCommunity.img} alt={selectedCommunity.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/50 to-transparent"></div>
                <button 
                  onClick={() => setSelectedCommunity(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container-highest flex items-center justify-center cursor-pointer transition-colors border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-bold border border-tertiary/30 uppercase">
                      {selectedCommunity.craft}
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">{selectedCommunity.name}</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 mt-0.5">
                    <span><span className="material-symbols-outlined text-[14px] align-middle mr-0.5">location_on</span>{selectedCommunity.location}</span>
                    <span>•</span>
                    <span>Leader: <strong className="text-on-surface font-semibold">{selectedCommunity.leader}</strong></span>
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleApplicationSubmit} className="p-space-lg flex flex-col gap-space-lg overflow-y-auto">
                {/* Community Description */}
                <div className="bg-surface-container/60 p-space-md rounded-xl border border-outline-variant/20 flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">Sanctuary Overview &amp; Description</span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {selectedCommunity.description}
                  </p>
                </div>

                {/* Preference Section: What do you want to observe & visit? */}
                <div className="flex flex-col gap-space-md">
                  <div className="flex flex-col">
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold">Select What You Want to Observe &amp; Visit</h3>
                    <p className="font-body-sm text-body-sm text-outline">Items are grouped by public access versus those requiring leader authorization.</p>
                  </div>

                  {/* Public Experiences (No Permission Needed) */}
                  <div className="bg-surface-container-low p-space-md rounded-xl border border-emerald-500/30 flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between pb-1 border-b border-emerald-500/20">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span className="font-label-md text-label-md font-bold uppercase tracking-wide">No Permission Required (Public Access)</span>
                      </div>
                      <span className="font-label-sm text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Instant Entry</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-1">
                      {(selectedCommunity.publicExperiences || []).map((exp, idx) => (
                        <label key={idx} className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface cursor-pointer hover:text-emerald-300 transition-colors">
                          <input 
                            type="checkbox"
                            checked={!!selectedPublicExps[exp]}
                            onChange={(e) => setSelectedPublicExps(prev => ({ ...prev, [exp]: e.target.checked }))}
                            className="rounded bg-surface-container border-outline-variant text-emerald-500 focus:ring-0 cursor-pointer"
                          />
                          <span>{exp}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Restricted Experiences (Requires Permission) */}
                  <div className="bg-surface-container-low p-space-md rounded-xl border border-amber-500/30 flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between pb-1 border-b border-amber-500/20">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        <span className="font-label-md text-label-md font-bold uppercase tracking-wide">Requires Community Leader Permission</span>
                      </div>
                      <span className="font-label-sm text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">Leader Approval ({selectedCommunity.leader})</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-1">
                      {(selectedCommunity.restrictedExperiences || []).map((exp, idx) => (
                        <label key={idx} className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface cursor-pointer hover:text-amber-300 transition-colors">
                          <input 
                            type="checkbox"
                            checked={!!selectedRestrictedExps[exp]}
                            onChange={(e) => setSelectedRestrictedExps(prev => ({ ...prev, [exp]: e.target.checked }))}
                            className="rounded bg-surface-container border-outline-variant text-amber-500 focus:ring-0 cursor-pointer"
                          />
                          <span>{exp}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Application Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-semibold">When do you want to visit?</label>
                    <input 
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="bg-surface-container px-3 py-2 rounded-xl text-on-surface border border-outline-variant/30 font-body-md focus:outline-none focus:border-tertiary"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-on-surface font-semibold">What do you want to observe &amp; visit?</label>
                    <input 
                      type="text"
                      required
                      value={visitPurpose}
                      onChange={(e) => setVisitPurpose(e.target.value)}
                      placeholder="e.g. Research, heritage observation, filming..."
                      className="bg-surface-container px-3 py-2 rounded-xl text-on-surface border border-outline-variant/30 font-body-md focus:outline-none focus:border-tertiary"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-space-sm pt-2 border-t border-outline-variant/10">
                  <button 
                    type="button"
                    onClick={() => setSelectedCommunity(null)}
                    className="px-4 py-2 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-fixed-dim text-on-primary font-title-md text-title-md font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Submit Visit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
