import React, { useState } from 'react';
import Layout from '../components/Layout';
import { archiveItems as initialArchiveItems, community } from '../data/mockData';

export default function Archive() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [archiveList, setArchiveList] = useState(initialArchiveItems);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Handloom & Textiles');
  const [newCustodian, setNewCustodian] = useState(community.members[0]?.name || 'Prabhakar Shenoy');
  const [newDescription, setNewDescription] = useState('');
  const [newIsSacred, setNewIsSacred] = useState(false);

  const categories = ['ALL', 'Handloom & Textiles', 'Culinary Traditions', 'Oral History & Audio Chants'];

  const filteredItems = archiveList.filter((item) => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

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
      <div className="flex flex-col w-full pb-16 space-y-6 pt-4">
        {/* Header Banner */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 shadow-md">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                Cultural Vault &amp; Traditions
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">{community.name} Heritage Archive</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-tertiary-container/30 text-tertiary text-label-sm font-bold border border-tertiary/20">
                {archiveList.length} Elder Protected Records
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-fixed-dim transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add Heritage Record
              </button>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            Curated craft knowledge vaults, oral traditions, and ancestral records maintained under direct Elder protection and community consent.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-label-md font-label-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/20'
              }`}
            >
              {cat === 'ALL' ? `All Archives (${archiveList.length})` : cat}
            </button>
          ))}
        </div>

        {/* Archive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-4 hover:bg-surface-container transition-all shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-medium">
                    {item.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.isSacred ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {item.isSacred ? 'Sacred Record' : 'Elder Approved'}
                  </span>
                </div>

                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">{item.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{item.description}</p>
              </div>

              {item.audioFile && (
                <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between gap-3 border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setPlayingId(playingId === item.id ? null : item.id)}
                      className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {playingId === item.id ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-body-sm text-body-sm text-on-surface truncate">
                      {playingId === item.id ? 'Playing Audio...' : item.audioFile}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-label-sm text-outline">
                <span>Custodian: {item.custodian}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Heritage Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
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
                  id="sacredCheckArchive"
                  checked={newIsSacred}
                  onChange={(e) => setNewIsSacred(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <label htmlFor="sacredCheckArchive" className="font-body-sm text-body-sm text-on-surface-variant">
                  Mark as Sacred Record (Requires Elder authorization)
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
