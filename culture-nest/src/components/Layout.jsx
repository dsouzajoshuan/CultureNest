import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { community, archiveItems } from '../data/mockData';

export default function Layout({ children, searchQuery, setSearchQuery }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('culture_user');
      if (!stored) {
        navigate('/login');
        return;
      }
      const parsed = JSON.parse(stored);
      if (parsed.type === 'tourist') {
        navigate('/tourist');
        return;
      }
      setCurrentUser(parsed);
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('culture_user');
    navigate('/login');
  };

  const isCurrent = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="fixed top-0 h-screen w-[240px] bg-surface-container-low z-40 flex flex-col justify-between select-none shadow-[0_1px_8px_rgba(0,0,0,0.04)] left-0 border-r border-outline-variant/10">
        <div className="flex flex-col h-full">
          {/* Active Community Banner */}
          <Link to="/" className="h-16 px-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="font-title-md text-title-md text-on-surface truncate">{community.name}</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {community.visibility} Community · {community.members.length} Members
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">keyboard_arrow_down</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-space-sm py-space-sm space-y-4">
            <div className="space-y-1">
              <div className="px-space-sm pt-2 pb-1 font-label-sm text-label-sm uppercase tracking-wider text-outline">Main Menu</div>
              
              <Link 
                to="/" 
                className={`flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors ${
                  isCurrent('/') ? 'bg-surface-container-high text-primary font-title-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span className="font-body-md text-body-md">Community Home</span>
                </div>
              </Link>

              <Link 
                to="/community" 
                className={`flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors ${
                  isCurrent('/community') ? 'bg-surface-container-high text-primary font-title-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  <span className="font-body-md text-body-md">Members &amp; Ranks</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-surface-variant font-label-sm text-label-sm text-primary font-bold">
                  {community.members.length}
                </span>
              </Link>

              <Link 
                to="/archive" 
                className={`flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors ${
                  isCurrent('/archive') ? 'bg-surface-container-high text-primary font-title-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span className="font-body-md text-body-md">Heritage Archive</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-tertiary-container/40 text-tertiary font-label-sm text-label-sm font-bold">
                  {archiveItems.length}
                </span>
              </Link>

              <Link 
                to="/visa" 
                className={`flex items-center justify-between px-space-sm py-2 rounded-lg transition-colors ${
                  isCurrent('/visa') ? 'bg-surface-container-high text-primary font-title-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">explore</span>
                  <span className="font-body-md text-body-md">Visitor Access Passes</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-full bg-surface-variant font-label-sm text-label-sm text-secondary font-bold">
                  3 Passes
                </span>
              </Link>
            </div>

            <div className="space-y-1">
              <div className="px-space-sm pt-2 pb-1 font-label-sm text-label-sm uppercase tracking-wider text-outline">Verification</div>
              <div className="px-space-sm py-1.5 flex items-center justify-between">
                <span className="font-body-md text-body-md text-on-surface-variant">Trust Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-label-sm text-label-sm font-semibold">
                  {community.status}
                </span>
              </div>
            </div>
          </nav>

          {/* Profile Badge & Log Out */}
          <div className="p-space-sm bg-surface-container border-t border-outline-variant/10">
            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary font-bold flex items-center justify-center text-xs">
                    {(currentUser?.name || community.members[0]?.name).charAt(0)}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-surface-container"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-md text-body-sm text-on-surface truncate leading-tight">{currentUser?.name || community.members[0]?.name}</span>
                  <span className="font-label-sm text-label-sm text-secondary truncate">{currentUser?.role || community.members[0]?.rank}</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                title="Log Out"
                className="text-on-surface-variant hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main View Container */}
      <div className="min-h-screen" style={{ paddingLeft: '240px' }}>
        {/* Header Bar */}
        <header className="fixed top-0 right-0 h-16 bg-surface/80 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-space-lg flex items-center justify-between border-b border-outline-variant/10" style={{ left: '240px' }}>
          <div className="flex items-center gap-space-sm">
            <Link to="/" className="font-headline-md text-headline-md text-on-surface hover:text-primary transition-colors">CultureNest</Link>
            <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-variant text-tertiary font-semibold">Community Sanctuary</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-body-md text-body-md transition-colors ${isCurrent('/') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Community Home
            </Link>
            <Link 
              to="/community" 
              className={`font-body-md text-body-md transition-colors ${isCurrent('/community') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Governance &amp; Ranks
            </Link>
            <Link 
              to="/archive" 
              className={`font-body-md text-body-md transition-colors ${isCurrent('/archive') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Heritage Archive
            </Link>
            <Link 
              to="/visa" 
              className={`font-body-md text-body-md transition-colors ${isCurrent('/visa') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Visitor Access Passes
            </Link>
          </nav>

          <div className="flex items-center gap-space-md">
            {setSearchQuery && (
              <div className="relative hidden sm:flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
                <input 
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 lg:w-80 pl-9 pr-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/30 text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60 transition-all" 
                  placeholder="Search community or archives..." 
                  type="text" 
                />
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-surface-container-high hover:bg-red-950/40 hover:text-red-300 text-on-surface-variant font-label-md text-label-md font-bold transition-all flex items-center gap-1.5 border border-outline-variant/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Log Out
            </button>
          </div>
        </header>

        <main className="w-full pt-16 bg-surface min-h-screen px-gutter-desktop">
          {children}
        </main>
      </div>
    </div>
  );
}
