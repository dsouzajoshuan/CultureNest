import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('custodian'); // 'custodian' | 'explorer'
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form state
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Registration Form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCluster, setRegCluster] = useState('');
  const [regRole, setRegRole] = useState('artisan');
  const [regLocation, setRegLocation] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regSubmitted, setRegSubmitted] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const idClean = loginId.trim().toLowerCase();
    const passClean = loginPass.trim();

    if (role === 'custodian') {
      if (idClean.includes('joshua') && passClean === '123456') {
        setSuccessMsg('Authentication Successful! Accessing Community Portal...');
        localStorage.setItem('culture_user', JSON.stringify({ name: "Joshua N Dsouza", role: "Leader Custodian", type: "community" }));
        setTimeout(() => navigate('/'), 1000);
      } else {
        setErrorMsg('Invalid Community Member credentials! Only authorized community accounts are permitted.');
      }
    } else {
      if (idClean.includes('nathan') && passClean === '123456') {
        setSuccessMsg('Authentication Successful! Accessing Tourist Explorer Sanctuary...');
        localStorage.setItem('culture_user', JSON.stringify({ name: "Nathan", role: "Cultural Visitor", type: "tourist" }));
        setTimeout(() => navigate('/tourist'), 1000);
      } else {
        setErrorMsg('Invalid Tourist / Visitor credentials! Please enter your registered tourist account.');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSubmitted(true);
    setTimeout(() => {
      setRegSubmitted(false);
      setActiveTab('login');
      setSuccessMsg('Registration request submitted! You can now sign in after Elder verification.');
    }, 1800);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-space-md">
      <main className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-stretch min-h-[780px]">
            {/* Left Pane: Atmospheric Storytelling & Indian Heritage Stewardship */}
            <div className="lg:col-span-5 flex flex-col justify-between p-space-xl rounded-xl bg-surface-container-low shadow-xl relative overflow-hidden border border-outline-variant/20">
              {/* Ambient Mineral Glows */}
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"></div>

              {/* Brand Header */}
              <div className="relative z-10 flex flex-col gap-space-lg">
                <div className="flex items-center gap-space-md">
                  <div className="flex flex-col">
                    <span className="font-headline-lg text-headline-lg text-secondary tracking-tight">CultureNest</span>
                    <span className="font-label-sm text-label-sm text-outline tracking-widest uppercase">Sacred Living Archives</span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-sm mt-space-md">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider uppercase">Living Chronicle No. 0184</span>
                  <p className="font-headline-md text-headline-md text-on-surface leading-snug">
                    Preserving indigenous memory, ancestral oralities, and living craft across sovereign sanctuaries.
                  </p>
                </div>
              </div>

              {/* Real-Time Hearth Presence & Archival Verification */}
              <div className="relative z-10 flex flex-col gap-space-sm pt-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-secondary">38 Artisan Clusters Active</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">Protected Heritage Archive</span>
                </div>
                <p className="font-body-sm text-body-sm text-outline leading-normal">
                  Encrypted with community-held cryptographic keys. Sovereign node verification strictly enforced.
                </p>
              </div>
            </div>

            {/* Right Pane: Interactive Access & Custodian Folio */}
            <div className="lg:col-span-7 flex flex-col p-space-xl rounded-xl bg-surface-container shadow-xl border border-outline-variant/20">
              {/* Role Selector */}
              <div className="flex flex-col gap-space-xs mb-space-lg">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">Select Your Role</span>
                <div className="grid grid-cols-2 p-1.5 rounded-lg bg-surface-container-lowest gap-space-xs border border-outline-variant/20">
                  <button 
                    type="button"
                    onClick={() => {
                      setRole('custodian');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className={`flex flex-col items-center justify-center text-center p-space-sm rounded-md transition-all ${
                      role === 'custodian' 
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm' 
                        : 'bg-transparent text-secondary hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      <span className="font-label-md text-label-md font-semibold">Community Member</span>
                    </div>
                    <span className="font-body-sm text-[11px] opacity-90 leading-tight mt-0.5">For artisans, elders &amp; residents</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      setRole('explorer');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className={`flex flex-col items-center justify-center text-center p-space-sm rounded-md transition-all ${
                      role === 'explorer' 
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm' 
                        : 'bg-transparent text-secondary hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                      <span className="font-label-md text-label-md font-semibold">Visitor / Tourist</span>
                    </div>
                    <span className="font-body-sm text-[11px] text-outline leading-tight mt-0.5">For cultural tourists &amp; researchers</span>
                  </button>
                </div>
              </div>

              {/* Portal Mode Navigation */}
              <div className="flex items-center justify-between mb-space-lg pb-space-sm border-b border-outline-variant/10">
                <div className="flex items-center gap-space-md">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`font-title-lg text-title-lg transition-colors flex items-center gap-space-xs ${
                      activeTab === 'login' ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    <span>Sign In</span>
                    {activeTab === 'login' && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`font-title-lg text-title-lg transition-colors flex items-center gap-space-xs ${
                      activeTab === 'register' ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'
                    }`}
                  >
                    <span>New Member Registration</span>
                    {activeTab === 'register' && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>}
                  </button>
                </div>

                <span className={`font-label-sm text-label-sm px-space-sm py-1 rounded font-semibold ${
                  role === 'custodian' ? 'bg-surface-container-highest text-secondary' : 'bg-tertiary-container/40 text-tertiary'
                }`}>
                  {role === 'custodian' ? 'Community Access' : 'Tourist Pass Access'}
                </span>
              </div>

              {/* Success / Error Messages */}
              {successMsg && (
                <div className="mb-4 p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-body-sm flex items-center gap-2 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-4 p-3.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-200 text-body-sm flex items-center gap-2 animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* VIEW 1: Sign In */}
              {activeTab === 'login' && (
                <div className="flex flex-col gap-space-lg transition-all duration-300">
                  <form className="flex flex-col gap-space-md" onSubmit={handleLoginSubmit}>
                    {/* Identifier Input */}
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex justify-between items-center">
                        <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="login-id">
                          {role === 'custodian' ? 'Mobile Number or Email' : 'Tourist ID or Email'}
                        </label>
                        <span className="font-body-sm text-body-sm text-outline">Registered identity</span>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">badge</span>
                        <input 
                          required
                          value={loginId}
                          onChange={(e) => setLoginId(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 pl-11 pr-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 transition-all" 
                          id="login-id" 
                          placeholder={role === 'custodian' ? "e.g. mobile number or email" : "e.g. tourist ID or email"} 
                          type="text"
                        />
                      </div>
                    </div>

                    {/* Passphrase / PIN Input */}
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex justify-between items-center">
                        <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="login-pass">Password / Security PIN</label>
                        <button className="font-body-sm text-body-sm text-primary hover:text-primary-fixed transition-colors" type="button">Forgot PIN / Password?</button>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">lock</span>
                        <input 
                          required
                          value={loginPass}
                          onChange={(e) => setLoginPass(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 pl-11 pr-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 transition-all" 
                          id="login-pass" 
                          placeholder="••••••••" 
                          type="password"
                        />
                      </div>
                    </div>

                    {/* Keep me signed in */}
                    <div className="flex items-center justify-between pt-space-xs">
                      <label className="flex items-center gap-space-sm cursor-pointer select-none">
                        <input defaultChecked className="w-4 h-4 rounded bg-surface-container-lowest accent-primary-container cursor-pointer" type="checkbox"/>
                        <span className="font-body-sm text-body-sm text-secondary">Keep me signed in</span>
                      </label>
                      <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">shield</span> Secure session
                      </span>
                    </div>

                    {/* Primary Submit CTA */}
                    <button 
                      className="w-full mt-space-sm py-space-md px-space-lg rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-space-sm shadow-md font-bold cursor-pointer" 
                      type="submit"
                    >
                      <span>{role === 'custodian' ? 'Sign In to Community' : 'Sign In as Tourist'}</span>
                      <span className="material-symbols-outlined text-[18px]">east</span>
                    </button>
                  </form>

                  {/* Sovereign Identity Guarantee Notice / Trust Info */}
                  <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-container-low border border-outline-variant/20 mt-space-sm">
                    <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">verified</span>
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-title-md text-title-md text-secondary font-semibold">Direct Community Platform • Safe &amp; Private (No third-party trackers)</span>
                      <p className="font-body-sm text-body-sm text-outline leading-relaxed">
                        No tracking cookies or venture ad-brokers. Session integrity validated exclusively through your community’s register and elder assembly protocol.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: First-Time Community Registration */}
              {activeTab === 'register' && (
                <div className="flex flex-col gap-space-md transition-all duration-300">
                  <div className="flex items-center gap-space-md p-space-md rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">account_balance</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-tertiary font-bold">Sovereign Intellectual Rights</span>
                      <span className="font-body-sm text-body-sm text-secondary">All knowledge remains the perpetual intellectual property of your community council.</span>
                    </div>
                  </div>

                  {regSubmitted && (
                    <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-body-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
                      <span><strong>Registration Submitted:</strong> Pending Elder Council verification.</span>
                    </div>
                  )}

                  <form className="flex flex-col gap-space-md" onSubmit={handleRegisterSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-md text-label-md text-on-surface font-semibold">Full Name</label>
                        <input 
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 transition-all" 
                          placeholder="e.g. Ramesh Kumar Verma" 
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-md text-label-md text-on-surface font-semibold">Mobile Number</label>
                        <input 
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 transition-all" 
                          placeholder="+91 98765 43210" 
                          type="tel"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-md text-label-md text-on-surface font-semibold">Artisan Cluster / Community Name</label>
                        <input 
                          required
                          value={regCluster}
                          onChange={(e) => setRegCluster(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 transition-all" 
                          placeholder="e.g. Varanasi Bunkar Samiti" 
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-md text-label-md text-on-surface font-semibold">Community Role</label>
                        <select 
                          value={regRole}
                          onChange={(e) => setRegRole(e.target.value)}
                          className="w-full bg-surface-container-lowest text-on-surface px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 transition-all"
                        >
                          <option value="artisan">Master Artisan / Weaver / Craftsman</option>
                          <option value="elder">Community Elder / Council Member</option>
                          <option value="storyteller">Folk Artist / Oral Storyteller</option>
                          <option value="apprentice">Apprentice / Youth Scribe</option>
                          <option value="resident">Local Community Resident</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-md text-label-md text-on-surface font-semibold">Location &amp; State (District, State)</label>
                      <input 
                        value={regLocation}
                        onChange={(e) => setRegLocation(e.target.value)}
                        className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 transition-all" 
                        placeholder="Varanasi District, Uttar Pradesh" 
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-md text-label-md text-on-surface font-semibold">Workshop or Residence Address</label>
                      <input 
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline/40 px-space-md py-space-sm rounded-lg font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-outline-variant/30 transition-all" 
                        placeholder="House / Workshop No., Mohalla or Village" 
                        type="text"
                      />
                    </div>

                    <button 
                      className="w-full mt-space-sm py-space-md px-space-lg rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md hover:bg-tertiary-container transition-all flex items-center justify-center gap-space-sm shadow-md font-bold cursor-pointer" 
                      type="submit"
                    >
                      <span>Submit for Community Verification</span>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </button>
                  </form>

                  <p className="font-body-sm text-body-sm text-outline text-center">
                    New member registrations require verification by community elders or guild leads.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
