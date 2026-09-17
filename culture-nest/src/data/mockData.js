export const community = {
  name: "Konkani Heritage Circle",
  visibility: "Public",
  status: "Verified",
  members: [
    {
      name: "Joshua N Dsouza",
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
    custodian: 'Joshua N Dsouza',
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

export const initialTouristRequests = [
  {
    id: 'REQ-101',
    applicantName: 'Nathan (Tourist User)',
    requestedTier: 'Full Pass',
    purpose: 'Academic research on elder audio chants & temple rituals.',
    dateSubmitted: 'Today, 5:10 PM',
    status: 'Pending Review',
    notes: 'Agreed to sanctuary etiquette guidelines.'
  },
  {
    id: 'REQ-102',
    applicantName: 'Aarav Sharma',
    requestedTier: 'Limited Pass',
    purpose: 'Visiting traditional handloom weaving workshops for cultural documentary.',
    dateSubmitted: 'Yesterday',
    status: 'Approved',
    notes: 'Approved by Leader Joshua N Dsouza.'
  },
  {
    id: 'REQ-103',
    applicantName: 'Elena Rostova',
    requestedTier: 'Full Pass',
    purpose: 'Photography of restricted sacred festival ceremonies.',
    dateSubmitted: '3 days ago',
    status: 'Rejected',
    notes: 'Restricted under Elder protection authority.'
  }
];

export const discoverCommunities = [
  {
    id: 'konkani-circle',
    name: 'Konkani Heritage Circle',
    craft: 'Temple Weaves & Culinary Heritage',
    location: 'Gokarna & Honnavar, KA',
    members: '1,840 Members',
    activeCount: '9 Looms Active',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7R2tB-AtB4j0wqkvq03LVzkkMWLTEq-pKwR8DlrGC74Q-YGY9_5bkEwaj47MDsDnJcVC5x9ZdCXo8plI6WFhJyddYidf630ISVl8reN1mSGCV9cRV69bVL8JhqoyS93VAmT3TqmYTN5TeMWjcIe3P-ZGJ3yKzt5yt9FviynSWBHKzMQilq5OW-lo2ttnf07mF4Glg5ZDLC28wVik52fiJj9Nk5PoDcWT5osl4rdC3ZLYYt9JgWjJz',
    verified: true,
    leader: 'Joshua N Dsouza',
    description: 'A sovereign coastal guild preserving 16th-century Konkani handloom weaves, gold zari border motifs, and generational culinary spice reductions under Community Leader Joshua N Dsouza.',
    publicExperiences: [
      'Courtyard Spice Reduction Demonstration (No Permission Needed)',
      'Public Handloom Walkthrough & Display (No Permission Needed)',
      'Open Folk Storytelling Circle (No Permission Needed)'
    ],
    restrictedExperiences: [
      'Sacred Temple Chant Audio Archives (Requires Leader Permission)',
      'Ancestral Handloom Warp Setup Shed (Requires Leader Permission)',
      'Private Master Spice Recipe Vault (Requires Leader Permission)'
    ]
  },
  {
    id: 'varanasi-zari',
    name: 'Varanasi Handloom Guild',
    craft: 'Kadhwa Silk & Silver Zari',
    location: 'Chowk & Madanpura, UP',
    members: '2,420 Members',
    activeCount: '14 Pit Looms',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv4BH9Gj7_I_Pnjc-l3aqywccy-3idowxVTMsvCZFEh5XZSbeT3ceOyf5RAc1OZBWmtgWniZoZg_fHnDcicK7Jg2QU9nyisBK-zE2E_nHafClFlTm_tXYzjbXtwLTTE93FFwaIJGps1VcVe6mrSoFCgz22C3X-xZmB8u3g_tnAuIe3dRCFxnoKnCoKdoIrEo3JbTf9xzaSBNQRs5SFp5zM1ThyGmJrM5bD13wXkqKQ_S8On5-6F24n',
    verified: true,
    leader: 'Meera Devi',
    description: 'Master weavers preserving imperial GI-tagged Kadhwa silk brocades using 90-year-old pit looms and hand-punched Jacquard Naksha cards.',
    publicExperiences: [
      'Madanpura Alley Silk Walk (No Permission Needed)',
      'Finished Brocade Gallery & Exhibition (No Permission Needed)'
    ],
    restrictedExperiences: [
      'Active Pit-Loom Studio Observation (Requires Leader Permission)',
      'Silver Gilded Zari Drawing Workshop (Requires Leader Permission)',
      'Elder Naksha Card Design Vault (Requires Leader Permission)'
    ]
  },
  {
    id: 'kutch-ajrakh',
    name: 'Kutch Block Printers Collective',
    craft: '16-Step Natural Indigo Dyeing',
    location: 'Ajrakhpur, Gujarat',
    members: '980 Members',
    activeCount: '8 Bio Vats',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTsdHFqah0ADL0r9eYmEQpT_bXpKF0k5k4I64ZjduxTIe3LsmfpIDMhfxQkif8X1xApFm-MbVXvfricUijUQqVrknVFKq7pKSw0MLsm-mTNSj_LvE6WxMKDzYn_fRv6m2YXQmtMZB7ZdDrkwC4omNKlzROExyQdedDL7qweOHa9Jt6brFgqnR7MqPlHtBhz8ILJjEjKKNvjP6kr7t_UMnF3m-5v5bUKC3ZTGlgiEzGxvNSkvKyhxw',
    verified: true,
    leader: 'Ismail Khatri',
    description: 'Ancestral block printing collective specializing in 16-stage bio-enzyme natural indigo vat dyeing and hand-carved teak block motifs.',
    publicExperiences: [
      'Drying Ground Textile Viewing (No Permission Needed)',
      'Teak Woodblock Carving Display (No Permission Needed)'
    ],
    restrictedExperiences: [
      'Live Indigo Fermentation Vat Chamber (Requires Leader Permission)',
      'Hands-on Dyeing Master Class (Requires Leader Permission)',
      'Herbal Mordant Recipe Formulation (Requires Leader Permission)'
    ]
  },
  {
    id: 'tanjore-arts',
    name: 'Tanjore Sacred Arts Circle',
    craft: '22k Gold Leaf & Relief Carvings',
    location: 'Thanjavur, Tamil Nadu',
    members: '510 Members',
    activeCount: '4 Master Studios',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMS3TdwFGp3SyDiqolm-byTqhbgvgkxKW9ewlQyPGVckFKb88YD3-D3BFFQQKCB9G0qMUSis4vraIXO2bRxYWf-7jLQt1y9GukHmKu2ZMsy915l9--O0kKVlbgtMs_KOjnpTNI2rpjEqMz8OCEwlgSNBombhQ-JjmULZ_DjOByO038dlduUWYXHiAGZAhnes7dpSOCpI_jh5bkuOhPMeycPfGfKJcb1VIQ0LsVjLS__-7il7vJv1i-',
    verified: true,
    leader: 'Ramanathan Sthapati',
    description: 'Heritage guild of sacred icon painters crafting gold-foil gilded teak paintings and traditional gesso relief art.',
    publicExperiences: [
      'Public Gallery of Sacred Iconography (No Permission Needed)',
      'Teakwood Surface Preparation Demo (No Permission Needed)'
    ],
    restrictedExperiences: [
      '22k Pure Gold Foil Gilded Application (Requires Leader Permission)',
      'Sacred Icon Consecration Archives (Requires Leader Permission)',
      'Master Sthapati Private Studio Access (Requires Leader Permission)'
    ]
  }
];

