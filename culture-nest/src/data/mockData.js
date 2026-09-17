export const community = {
  name: "Konkani Heritage Circle",
  visibility: "Public",
  status: "Verified",
  members: [
    {
      name: "Prabhakar Shenoy",
      rank: "Leader",
      knowledge: 95,
      engagement: 90,
      stewardship: 98
    },
    {
      name: "Smt. Shanti Devi",
      rank: "Co-leader",
      knowledge: 92,
      engagement: 88,
      stewardship: 90
    },
    {
      name: "Pandit Ramdas Kamath",
      rank: "Elder",
      knowledge: 99,
      engagement: 80,
      stewardship: 96
    },
    {
      name: "Anish D'Souza",
      rank: "Member",
      knowledge: 75,
      engagement: 70,
      stewardship: 68
    }
  ],
  proposal: {
    title: "Update Official Konkani Culinary & Festival Traditions Description",
    approval: 78
  }
};

export const visaTiers = [
  {
    level: "Public",
    desc: "Instant access to public cultural stories, history, and general community posts.",
    auto: true
  },
  {
    level: "Limited",
    desc: "Earned access to traditional craft workshops and heritage dye recipes after passing orientation quiz.",
    auto: false
  },
  {
    level: "Full",
    desc: "Restricted access to sacred rituals, elder audio archives, and direct elder interactions requiring custodian review.",
    auto: false
  }
];

export const archiveItems = [
  {
    id: 'ARCH-01',
    title: 'Traditional Konkani Handloom Weaves & Zari Motifs',
    category: 'Handloom & Textiles',
    custodian: 'Prabhakar Shenoy',
    date: '16th Century Lineage',
    description: 'Authentic handloom weaves, gold zari border patterns, and loom warp settings documented by community elders.',
    isSacred: false,
    audioFile: null
  },
  {
    id: 'ARCH-02',
    title: 'Ancestral Konkani Festive Spice Blends & Recipes',
    category: 'Culinary Traditions',
    custodian: 'Smt. Shanti Devi',
    date: 'Generational Craft',
    description: 'Traditional herbal mordanting, wild spice reduction recipes, and ceremonial feast preparation steps.',
    isSacred: false,
    audioFile: null
  },
  {
    id: 'ARCH-03',
    title: 'Festival Folklore & Sacred Temple Chants',
    category: 'Oral History & Audio Chants',
    custodian: 'Pandit Ramdas Kamath',
    date: 'Oral Preservation',
    description: 'Audio recordings of traditional Kajri and festival Dohas sung during seasonal harvest celebrations.',
    isSacred: true,
    audioFile: 'Konkani_Festival_Stories.mp3'
  }
];
