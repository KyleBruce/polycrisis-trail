// ⚰️ POLYCRISIS TRAIL — Game Data
// Classes, party members, synergies, resolutions. Pure data, no logic.

// ============================================================
// GAME DATA
// ============================================================

const STARTING_CLASSES = [
  {
    id: 'trust-fund', name: 'Trust Fund', emoji: '🎩',
    money: 50000, classStat: 8, debt: 0,
    perk: 'Venture Capitalist unlocked',
    penalty: 'Morale penalty for everyone else',
    vibe: 'Easy mode. Boring.',
    unlocks: ['venture-capitalist'], moraleMod: -10, staminaMod: 0,
  },
  {
    id: 'upper-middle', name: 'Upper Middle', emoji: '🏡',
    money: 12000, classStat: 6, debt: 0,
    perk: 'Tech Bro unlocked. Starts with "AI-insulated" buff.',
    penalty: 'Comfortable start, fragile.',
    vibe: 'Comfortable start, fragile.',
    unlocks: ['tech-bro'], moraleMod: 0, staminaMod: 0,
  },
  {
    id: 'working-class', name: 'Working Class', emoji: '🔨',
    money: 3000, classStat: 4, debt: 0,
    perk: 'Gig Worker + Essential Worker unlocked. Stamina bonus.',
    penalty: 'The standard polycrisis experience.',
    vibe: 'The standard polycrisis experience.',
    unlocks: ['gig-worker', 'essential-worker'], moraleMod: 0, staminaMod: 5,
  },
  {
    id: 'drowning', name: 'Drowning', emoji: '🌊',
    money: 500, classStat: 2, debt: 5000,
    perk: 'Debt Slave unlocked. All party members start with +10 Stamina.',
    penalty: 'Also -$5,000 debt.',
    vibe: 'Hard mode. Probably the most realistic.',
    unlocks: ['debt-slave'], moraleMod: 0, staminaMod: 10,
  },
];

const PARTY_MEMBERS = [
  {
    id: 'gig-worker', name: 'Gig Worker', emoji: '🛵',
    health: 70, stamina: 80, morale: 40,
    trait: 'Hustles extra supplies. Fragile morale.',
    details: 'Climate: resistant to supply chain events. AI: job auto-replaced, adapts fastest. Neo-Feudalism: already poor, immune to downward class shocks.',
    locked: true,
  },
  {
    id: 'tech-bro', name: 'Tech Bro', emoji: '💻',
    health: 60, stamina: 50, morale: 60,
    trait: 'Starts with more money, randomly loses skills to AI.',
    details: 'AI: can "align" with AI (risky buff). Kaiju: "we can disrupt the kaiju space." Fails.',
    locked: true,
  },
  {
    id: 'teacher', name: 'Teacher', emoji: '📚',
    health: 65, stamina: 60, morale: 70,
    trait: 'High morale boost for others, paid in peanuts.',
    details: 'COVID: masks up first, teaches remote (sanity buff). Neo-Feudalism: chronically underpaid, class erodes.',
    locked: false,
  },
  {
    id: 'boomer', name: 'Boomer', emoji: '📰',
    health: 70, stamina: 40, morale: 55,
    trait: "Resistant to misinformation, can't use technology.",
    details: 'AI: completely immune ("I don\'t use apps"). COVID: "this is just like the flu" (options hidden from others).',
    locked: false,
  },
  {
    id: 'gen-z', name: 'Gen Z', emoji: '📱',
    health: 75, stamina: 85, morale: 35,
    trait: 'High stamina, low budget, communicates in slang.',
    details: 'AI: already uses AI for everything, gains productivity. Neo-Feudalism: "we\'re all gonna die broke anyway."',
    locked: false,
  },
  {
    id: 'healthcare-worker', name: 'Healthcare Worker', emoji: '🩺',
    health: 60, stamina: 55, morale: 50,
    trait: 'Heals party members, burned out.',
    details: 'COVID: essential, never gets hazard pay, burnout accelerates. Cthulhu: sanity drains faster.',
    locked: false,
  },
  {
    id: 'influencer', name: 'Influencer', emoji: '📸',
    health: 65, stamina: 60, morale: 45,
    trait: 'Can "manifest" supplies (unreliable), high drama.',
    details: 'Aliens: claims contact, gets book deal. Kaiju: livestreams the attack, dies.',
    locked: false,
  },
  {
    id: 'conspiracy-theorist', name: 'Conspiracy Theorist', emoji: '🧢',
    health: 65, stamina: 65, morale: 40,
    trait: 'Immune to alien ambiguity, fragile sanity.',
    details: 'AI: "the algorithm is GIVING you these choices for a reason." Sometimes right.',
    locked: false,
  },
  {
    id: 'cultist', name: 'Cultist', emoji: '🔯',
    health: 70, stamina: 60, morale: 35,
    trait: 'High sanity resistance, periodically drains party morale to "share the truth."',
    details: 'Cthulhu events buff this character.',
    locked: false,
  },
  {
    id: 'ai-researcher', name: 'AI Researcher', emoji: '🧠',
    health: 55, stamina: 50, morale: 45,
    trait: 'Can predict AI events, fragile morale ("I created this?").',
    details: 'AI: sees hidden AI choices before they fire. Tragic arc.',
    locked: false,
  },
  {
    id: 'essential-worker', name: 'Essential Worker', emoji: '🏗️',
    health: 75, stamina: 70, morale: 45,
    trait: 'Resistant to plague, gets no hazard pay, high burnout.',
    details: 'COVID: immune to infection, morale drains from being called a "hero" while denied a raise.',
    locked: true,
  },
  {
    id: 'disaster-prepper', name: 'Disaster Prepper', emoji: '🎽',
    health: 70, stamina: 65, morale: 50,
    trait: 'Resistant to kaiju/climate events, insufferable about it.',
    details: 'Kaiju: "told you so" buff (other party members lose morale).',
    locked: false,
  },
  {
    id: 'debt-slave', name: 'Debt Slave', emoji: '💳',
    health: 80, stamina: 85, morale: 30,
    trait: 'Starts with negative money, high stamina, Class locked at bottom.',
    details: 'Neo-Feudalism: debt compounds. Can never escape. Best stamina in the game.',
    locked: true,
  },
  {
    id: 'venture-capitalist', name: 'Venture Capitalist', emoji: '💰',
    health: 65, stamina: 40, morale: 70,
    trait: 'Enormous money, zero empathy.',
    details: 'Neo-Feudalism: Class locked at top. Profits from disasters. Morale never drops.',
    locked: true,
  },
];

const SYNERGIES = [
  { members: ['gig-worker', 'teacher'], hint: '⚡ "Unionize" event available' },
  { members: ['tech-bro', 'ai-researcher'], hint: '⚠️ "The AI is your fault" — debuff to both' },
  { members: ['conspiracy-theorist', 'cultist'], hint: '🔮 "They\'re working together." (They\'re not. Or are they?)' },
  { members: ['venture-capitalist', 'debt-slave'], hint: '💸 VC events drain Debt Slave\'s Hope faster' },
];

const RESOLUTIONS = [
  { id: 'supplies', name: 'Stockpile Supplies', emoji: '📦', min: 1, max: 4,
    effect: '+4 Supplies per token. Boring. Necessary.' },
  { id: 'emergency-fund', name: 'Build Emergency Fund', emoji: '🏦', min: 1, max: 3,
    effect: '+$1,000 per token. Money is armor.' },
  { id: 'get-in-shape', name: 'Get in Shape', emoji: '💪', min: 1, max: 3,
    effect: '+5 max Health per token to weakest party member.' },
  { id: 'therapy', name: 'Go to Therapy', emoji: '🛋️', min: 1, max: 2,
    effect: '+10 starting Sanity per token. Not covered by insurance after month 1.' },
  { id: 'doomscroll', name: 'Doomscroll Prep', emoji: '📱', min: 1, max: 2,
    effect: 'See 3 random future events before they happen. -15 Morale. You can\'t unsee it.' },
  { id: 'community-organizing', name: 'Community Organizing', emoji: '✊', min: 2, max: 2,
    effect: 'Unlocks "mutual aid" during supply chain events. Requires Teacher or Gig Worker.',
    requires: (party) => party.some(m => m.id === 'teacher' || m.id === 'gig-worker') },
  { id: 'learn-trade', name: 'Learn a Trade', emoji: '🔧', min: 2, max: 2,
    effect: 'Party member gains "Handy" buff. Repair events 50% cheaper.' },
  { id: 'buy-gun', name: 'Buy a Gun', emoji: '🔫', min: 1, max: 3,
    effect: 'Survive one "hostile encounter" per token. Makes some crisis events worse. American difficulty modifier.' },
];
