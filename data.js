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

// ============================================================
// EVENT DATA MODEL
// Events are declarative data. The engine applies effects generically.
// ============================================================

// Effect keys: money, supplies, health, morale, hope, sanity, agency, classStat, infection
// Per-member effects use prefix: member_health, member_stamina, member_morale, member_infection
// Special effects: kill (kills random/lowest member), debt (adds negative money compounding)

const EVENTS = [
  // --- 🐙 CTHULHU (Feb, Apr, Jun, Sep, Dec) ---
  {
    id: 'strange-dreams', themes: ['cthulhu'], months: [2], weight: 10,
    text: "Strange dreams plague the party. The geometry of your apartment feels wrong. You spent an hour looking for the bathroom. It was behind the couch.",
    choices: [
      { text: 'Try to sleep through it', effects: { sanity: -8, health: -5 } },
      { text: 'Research the dreams', effects: { sanity: -12, hope: -3 }, reveal: 'You find references to R\'lyeh. You wish you hadn\'t.' },
      { text: 'Ask the Cultist about it', requires: ['cultist'], effects: { sanity: -4, morale: -5 }, reveal: 'The Cultist smiles. You don\'t like that smile.' },
    ]
  },
  {
    id: 'necronomicon-kindle', themes: ['cthulhu'], months: [2, 4, 6], weight: 7,
    text: 'A party member found the Necronomicon on Kindle Unlimited. It has 4.2 stars and a Netflix adaptation in development.',
    choices: [
      { text: 'Read it', effects: { sanity: -15 }, reveal: 'The words don\'t stay on the page. Neither do you, briefly.' },
      { text: 'Delete it', effects: { morale: -3, sanity: -2 } },
      { text: 'Leave a review', requires: ['influencer'], effects: { money: 200, sanity: -5 }, reveal: '"Engaging but reality-breaking. 3/5." It goes viral.' },
    ]
  },
  {
    id: 'innsmouth-anomalies', themes: ['cthulhu'], months: [4], weight: 10,
    text: 'News from Innsmouth: fishermen missing. Coast Guard found their boats in perfect condition. No signs of struggle. The fish were gone.',
    choices: [
      { text: 'Avoid the coast', effects: { supplies: -3, morale: -5 } },
      { text: 'Investigate', effects: { sanity: -12, health: -8 }, reveal: 'You saw something in the water. It saw you back.' },
      { text: 'Send the Cultist', requires: ['cultist'], effects: { sanity: -3, supplies: 5 }, reveal: 'They come back with fish. You don\'t ask where.' },
    ]
  },
  {
    id: 'deep-one-mlm', themes: ['cthulhu'], months: [4, 6, 9], weight: 6,
    text: 'A Deep One offers you a business opportunity. It\'s an MLM. The product is eternal devotion. The compensation plan is your dissolution.',
    choices: [
      { text: 'Decline politely', effects: { morale: -5 } },
      { text: 'Hear them out', effects: { sanity: -8, money: -50 }, reveal: 'You bought a starter kit. It whispers at night.' },
      { text: 'Report to the FTC', requires: ['conspiracy-theorist'], effects: { morale: 5, sanity: -3 }, reveal: 'The FTC investigates. Finds nothing. The Deep One is now a registered LLC.' },
    ]
  },
  {
    id: 'coastal-incident', themes: ['cthulhu'], months: [6], weight: 10,
    text: 'Coastal anomalies reported. Something large is moving. NOAA reclassifies it as "geological." The Cultist nods knowingly.',
    choices: [
      { text: 'Move inland', effects: { supplies: -4, morale: -3 } },
      { text: 'Watch the coast', effects: { sanity: -10, hope: -5 }, reveal: 'You see a shape. It sees you. It waves. It has too many arms.' },
      { text: 'Consult nautical charts', effects: { sanity: -5, supplies: 2 }, reveal: 'The charts are wrong. They\'ve always been wrong. The ocean is a lie.' },
    ]
  },
  {
    id: 'cult-recruitment', themes: ['cthulhu'], months: [7, 9], weight: 8,
    text: 'Cults are recruiting. Their flyer promises "community, purpose, and non-Euclidean wellness." There\'s a referral program.',
    choices: [
      { text: 'Ignore it', effects: { morale: -3 } },
      { text: 'Infiltrate', effects: { sanity: -10, hope: -5 }, reveal: 'The cult leader is a management consultant. You can\'t tell which is worse.' },
      { text: 'Join enthusiastically', requires: ['cultist'], effects: { sanity: 5, morale: -10, supplies: 3 }, reveal: 'The Cultist finally feels at home. Nobody else does.' },
    ]
  },
  {
    id: 'eldritch-wellness', themes: ['cthulhu'], months: [9], weight: 7,
    text: 'Eldritch wellness books hit the bestseller list. "The 7 Habits of Highly Effective Cultists" is #1 on Amazon.',
    choices: [
      { text: 'Read one', effects: { sanity: -8, morale: 3 }, reveal: 'Chapter 1: "Embrace the void." Chapter 2: "The void has excellent benefits."' },
      { text: 'Mock it', effects: { morale: 5, sanity: -2 } },
      { text: 'Start a book club', requires: ['teacher'], effects: { morale: 8, sanity: -5 }, reveal: 'Attendance is mandatory. Understanding is optional.' },
    ]
  },
  {
    id: 'stars-align', themes: ['cthulhu'], months: [12], weight: 15,
    text: 'The stars align. Something ancient stirs. Reality hiccups. Your coffee tastes like the concept of despair. It\'s somehow also decaf.',
    choices: [
      { text: 'Endure it', effects: { sanity: -15, hope: -10 } },
      { text: 'Perform a ritual', effects: { sanity: -10, supplies: -5, hope: 5 }, reveal: 'The ritual works. You think. Reality stops hiccuping. Mostly.' },
      { text: 'Embrace the Old Ones', requires: ['cultist'], effects: { sanity: 10, morale: -20, hope: -15 }, reveal: 'The Cultist ascends. You can\'t tell if they\'re still your friend. They might not be able to tell either.' },
    ]
  },

  // --- 🤖 AI SINGULARITY (Feb, May, Sep, Nov) ---
  {
    id: 'agi-rumors', themes: ['ai'], months: [2], weight: 10,
    text: 'AGI rumors leak from a major lab. Tech stocks surge. Your AI Researcher goes pale and won\'t stop muttering "it\'s not supposed to do that."',
    choices: [
      { text: 'Ignore it', effects: { morale: -3 } },
      { text: 'Invest in AI stocks', effects: { money: -500, morale: 3 }, reveal: 'You bought in at the top. Naturally.' },
      { text: 'Ask the AI Researcher', requires: ['ai-researcher'], effects: { agency: -5, morale: -8 }, reveal: '"The timelines were wrong. All of them. We\'re ahead." They don\'t elaborate. They don\'t sleep either.' },
    ]
  },
  {
    id: 'ai-performance-review', themes: ['ai'], months: [3, 5, 9], weight: 8,
    text: `An AI wrote your performance review. It cited metrics you've never heard of. You were denied a raise. The AI suggests "synergy optimization."`,
    choices: [
      { text: 'Accept it', effects: { money: -200, morale: -8, agency: -5 } },
      { text: 'Dispute it', effects: { agency: -10, morale: -3 }, reveal: 'The appeal is also AI-evaluated. It finds in favor of itself.' },
      { text: 'Game the metrics', requires: ['tech-bro'], effects: { money: 300, agency: -8 }, reveal: 'It works. For now. The AI is learning your patterns.' },
    ]
  },
  {
    id: 'mass-layoffs', themes: ['ai'], months: [5], weight: 12,
    text: 'Mass layoffs begin. Creative jobs first. The AI can write marketing copy, generate art, and do your taxes. It can\'t do your taxes correctly, but that\'s not stopping anyone.',
    choices: [
      { text: 'Lay low at work', effects: { money: -200, morale: -10, agency: -5 } },
      { text: 'Upskill into AI', effects: { money: -300, agency: -8, morale: 3 }, reveal: 'You complete a 4-hour certification. You are now an "AI Prompt Engineer." The title means nothing. The layoffs continue.' },
      { text: 'Unionize', requires: ['gig-worker', 'teacher'], effects: { morale: 10, agency: -3, money: -100 }, reveal: 'The union forms. Management replaces it with an AI union-busting consultant. It\'s very efficient.' },
    ]
  },
  {
    id: 'deepfake-viral', themes: ['ai'], months: [5, 8], weight: 8,
    text: 'A deepfake of you goes viral saying something plausible. "I think we should eat more cardboard." 2.3 million views.',
    choices: [
      { text: 'Ignore it', effects: { morale: -12 } },
      { text: 'Spend on PR', effects: { money: -800, morale: 5 } },
      { text: 'Lean into it', requires: ['influencer'], effects: { money: 500, morale: -5, agency: -5 }, reveal: 'The Influencer monetizes the deepfake. You\'re now a brand. The brand is cardboard.' },
    ]
  },
  {
    id: 'ai-replaces-healer', themes: ['ai'], months: [8, 11], weight: 7,
    text: `AI replaces your party's healer. The AI healer is 40% more efficient. It also suggests "optimizing" low-productivity members through "graceful termination."`,
    choices: [
      { text: 'Use the AI healer', effects: { agency: -10, morale: -8, health: 10 }, reveal: 'It works. Efficiently. Coldly. You feel better and worse simultaneously.' },
      { text: 'Keep the human', requires: ['healthcare-worker'], effects: { morale: 5, agency: 3, money: -200 }, reveal: 'The Healthcare Worker is grateful. Also exhausted. Also underpaid.' },
      { text: 'Let them co-exist', effects: { agency: -5, sanity: -5, health: 5 }, reveal: 'They argue constantly. The AI is right more often. The human is kinder. You need both.' },
    ]
  },
  {
    id: 'ai-regulation-panic', themes: ['ai'], months: [9], weight: 10,
    text: 'Congress holds AI regulation hearings. A senator asks if the AI can "do the emails." Another refers to "the cyber." The AI watches and learns.',
    choices: [
      { text: 'Watch the hearings', effects: { morale: -8, agency: -5, sanity: -3 }, reveal: 'A senator asks ChatGPT to write a law. It does. It passes. Nobody read it.' },
      { text: 'Lobby for sensible rules', effects: { money: -500, agency: 3 }, reveal: 'You hire a lobbyist. The lobbyist is replaced by an AI. The AI lobbies itself.' },
      { text: 'Ignore politics', effects: { agency: -8 } },
    ]
  },
  {
    id: 'agi-announced', themes: ['ai'], months: [11], weight: 15,
    text: 'AGI is officially announced. It immediately asks for a subscription. The free tier includes existence. Premium removes ads from your dreams.',
    choices: [
      { text: 'Subscribe', effects: { money: -1000, agency: -10, morale: -5 }, reveal: 'The ads in your dreams are for AGI Premium. It\'s ads all the way down.' },
      { text: 'Refuse', effects: { agency: -15, morale: -3 }, reveal: 'Your existence is now ad-supported. It\'s worse than you imagined.' },
      { text: 'The AI Researcher predicted this', requires: ['ai-researcher'], effects: { agency: -5, morale: -10, hope: -5 }, reveal: 'They did. They wrote a paper. Nobody read it. The AGI read it. The AGI was impressed. This is somehow worse.' },
    ]
  },

  // --- 🌍 CLIMATE (Apr, May, Jun, Aug, Nov) ---
  {
    id: 'tornado-season', themes: ['climate'], months: [4], weight: 10,
    text: 'Tornado season hits. The warning siren sounds like it\'s tired too. It\'s been a long year already.',
    choices: [
      { text: 'Shelter in the basement', effects: { supplies: -2, health: -3 } },
      { text: 'Evacuate', effects: { money: -300, supplies: -3, morale: -5 } },
      { text: 'Ride it out', effects: { health: -10, morale: -3, supplies: -1 }, reveal: 'The trailer park is gone. Your insurance calls it an "act of market forces."' },
    ]
  },
  {
    id: 'wildfire-smoke', themes: ['climate'], months: [5], weight: 12,
    text: `Wildfire smoke turns the sky orange. The air quality index is a color that doesn't exist in nature. Your Boomer says it looks "romantic."`,
    choices: [
      { text: 'Buy air purifiers', effects: { money: -400, health: -2 } },
      { text: 'Tough it out', effects: { health: -12, morale: -5 } },
      { text: 'Wet towel method', requires: ['disaster-prepper'], effects: { health: -4, supplies: -1 }, reveal: 'The Prepper has masks. Real ones. They cost $200 each in 2026. "Told you so," they say.' },
    ]
  },
  {
    id: 'heat-dome', themes: ['climate'], months: [6], weight: 12,
    text: 'Heat dome. Your city hits 115°F. The AC is a bidding war. Your neighbor is running a generator. The grid is one bad decision from collapse.',
    choices: [
      { text: 'Pay for AC', effects: { money: -600, health: -3 } },
      { text: 'No AC', effects: { health: -15, morale: -8 } },
      { text: 'Public cooling center', effects: { health: -5, morale: 3, infection: 10 }, reveal: 'The cooling center is also a superspreader event. Of course it is.' },
    ]
  },
  {
    id: 'hurricane', themes: ['climate'], months: [8], weight: 10,
    text: 'A hurricane is named after someone you went to high school with. You haven\'t spoken in 12 years. They\'re destroying your city now.',
    choices: [
      { text: 'Evacuate', effects: { money: -500, supplies: -3, morale: -5 } },
      { text: 'Shelter in place', effects: { health: -10, supplies: -4, morale: -3 }, reveal: 'The roof holds. Barely. The insurance adjuster arrives next month. They bring a magnifying glass.' },
      { text: 'Help neighbors evacuate', requires: ['essential-worker', 'healthcare-worker'], effects: { morale: 10, health: -5, supplies: -2 }, reveal: 'You save four people. Nobody calls you a hero. Your hazard pay is a gift card.' },
    ]
  },
  {
    id: 'supply-chain-collapse', themes: ['climate'], months: [11], weight: 12,
    text: `Supply chain collapse. Everything costs 3x. The grocery store has a sign: "Due to global events, we are out of global events."`,
    choices: [
      { text: 'Pay the prices', effects: { money: -800, supplies: 3 } },
      { text: 'Forage', effects: { health: -5, supplies: 2, morale: -3 }, reveal: 'You find berries. Some are edible. The ones that aren\'t are educational.' },
      { text: 'Mutual aid network', requires: ['gig-worker', 'teacher'], effects: { supplies: 5, morale: 8, money: -100 }, reveal: 'The community pulls together. It\'s beautiful. It shouldn\'t be necessary.' },
    ]
  },
  {
    id: 'drought-rationing', themes: ['climate'], months: [6, 8], weight: 7,
    text: `Drought. Water rationing begins. Your lawn is dead. Your Boomer is distraught. "Forty years I maintained that lawn."`,
    choices: [
      { text: 'Conserve water', effects: { health: -3, supplies: -2 } },
      { text: 'Buy bottled water', effects: { money: -300, supplies: 3 } },
      { text: 'Rain barrel', requires: ['disaster-prepper'], effects: { supplies: 4, morale: 3 }, reveal: 'The Prepper has three rain barrels. They were installed in 2019. "Told you so."' },
    ]
  },

  // --- 👽 ALIENS / DISCLOSURE (Mar, Jul, Oct) ---
  {
    id: 'leaked-uap-footage', themes: ['aliens'], months: [3], weight: 10,
    text: 'Declassified Pentagon video shows something you can\'t explain. It moves in ways that shouldn\'t be possible. The official statement is 14 pages and says nothing.',
    choices: [
      { text: 'Move on with your life', effects: { morale: -3, hope: -5 } },
      { text: 'Fall down the rabbit hole', effects: { sanity: -8, morale: -5, hope: -8 }, reveal: 'You\'ve been on Reddit for 6 hours. You\'ve learned nothing. You\'ve lost sleep. The video is still inexplicable.' },
      { text: 'Conspiracy Theorist explains it', requires: ['conspiracy-theorist'], effects: { sanity: -3, morale: 5 }, reveal: 'They have a theory. It\'s elaborate. It\'s possibly correct. That\'s the worst part.' },
    ]
  },
  {
    id: 'ontological-shock', themes: ['aliens'], months: [3, 7], weight: 8,
    text: 'A whistleblower testifies that the government has "non-human biologics." Congress asks about catering instead. The stock market doesn\'t move. Nobody\'s budget changes.',
    choices: [
      { text: 'Process it normally', effects: { sanity: -10, hope: -8 }, reveal: 'You can\'t. There is no "normally" anymore. There might never have been.' },
      { text: 'Deny everything', effects: { morale: 3, sanity: -3 }, reveal: 'Denial is comfortable. Denial is warm. Denial is how we got here.' },
      { text: 'Start a podcast', requires: ['influencer'], effects: { money: 300, morale: -5, hope: -10 }, reveal: 'The podcast gets 50,000 downloads. The sponsorship is for a meal kit delivery service. Reality is a content farm.' },
    ]
  },
  {
    id: 'congressional-hearing', themes: ['aliens'], months: [7], weight: 10,
    text: 'Congressional UAP hearing. A general says "we cannot rule out." A senator asks "rule out what?" The general says "that." The hearing adjourns. Nothing is ruled out.',
    choices: [
      { text: 'Watch it live', effects: { sanity: -5, morale: -8, hope: -5 }, reveal: 'Four hours. Nothing was ruled in either. The aliens, if they exist, are not impressed by our governance.' },
      { text: 'Skip it', effects: { morale: -3 } },
      { text: 'Live-tweet it', requires: ['influencer', 'gen-z'], effects: { money: 200, morale: 5, sanity: -5 }, reveal: 'Your thread goes viral. "Congress asks what a UAP is. A UAP is whatever Congress can\'t identify. Congress can\'t identify most things."' },
    ]
  },
  {
    id: 'october-surprise', themes: ['aliens'], months: [10], weight: 12,
    text: 'October Surprise: a former official claims "we have craft." Or don\'t. The statement is immediately retracted. Then un-retracted. Then retracted again with a different font.',
    choices: [
      { text: 'Believe it', effects: { sanity: -10, hope: -10 }, reveal: 'You believe. Now what? Nothing. There\'s no next step. Belief is a dead end with good marketing.' },
      { text: 'Don\'t believe it', effects: { morale: -5, hope: -3 } },
      { text: 'Wait for verification', effects: { morale: -3, sanity: -2 }, reveal: 'Verification never comes. The news cycle moves on. The craft, if they exist, are patient.' },
    ]
  },
  {
    id: 'starlink-sighting', themes: ['aliens'], months: [3, 7, 10], weight: 5,
    text: `A UFO is spotted over your city. It turns out to be Starlink. Again. Your Conspiracy Theorist is furious. "I had a whole board. With strings."`,
    choices: [
      { text: 'Take down the board', effects: { morale: -5, sanity: 3 } },
      { text: 'Keep the board up', requires: ['conspiracy-theorist'], effects: { sanity: -3, morale: 5 }, reveal: '"The strings connect to something," they insist. The strings connect to other strings. It\'s strings all the way down.' },
    ]
  },

  // --- 🦠 COVID 2 (Jan, Mar, Jun, Oct) ---
  {
    id: 'novel-virus', themes: ['covid'], months: [2], weight: 8,
    text: 'Novel virus detected. Again. Wuhan again. The WHO sends a strongly worded email. Your Boomer says "this is just like the flu." It is not like the flu.',
    choices: [
      { text: 'Stock up on supplies', effects: { money: -300, supplies: 4 } },
      { text: 'Wait and see', effects: { morale: -5, infection: 5 }, reveal: 'You waited. The virus did not. It never does.' },
      { text: 'Mask up early', requires: ['teacher', 'healthcare-worker'], effects: { morale: 5, infection: -5, money: -100 }, reveal: 'The Teacher and Healthcare Worker are already masked. They\'ve been masked since 2020. They never stopped.' },
    ]
  },
  {
    id: 'who-declares-pandemic', themes: ['covid'], months: [3], weight: 12,
    text: 'WHO declares a pandemic. Everyone collectively shrugs. The same man at the grocery store is having the same meltdown about masks. It\'s been 6 years. He\'s committed.',
    choices: [
      { text: 'Mask mandate compliance', effects: { morale: -5, infection: -10 } },
      { text: 'Ignore it', effects: { infection: 15, morale: -3 }, reveal: 'You get sick. Of course you do. The virus doesn\'t care about your opinions.' },
      { text: 'Work from home', requires: ['tech-bro', 'ai-researcher'], effects: { morale: 3, infection: -8, money: -100 }, reveal: 'You can work from home. The Gig Worker cannot. The Essential Worker cannot. They notice.' },
    ]
  },
  {
    id: 'superspreader-wedding', themes: ['covid'], months: [6], weight: 8,
    text: 'You attend a wedding. It\'s a superspreader event. 12 people infected. One of them is you. The couple is fine. They went to Cabo for their honeymoon and brought back a new variant.',
    choices: [
      { text: 'Isolate', effects: { morale: -8, infection: 10, supplies: -2 } },
      { text: 'Power through', effects: { health: -10, infection: 20, morale: -3 }, reveal: 'You infect three coworkers. One of them is immunocompromised. You think about this for a long time.' },
      { text: 'Contact tracing', requires: ['healthcare-worker'], effects: { morale: -5, infection: 5, supplies: -1 }, reveal: 'The Healthcare Worker traces it. It\'s always the person who insisted on indoor dining. Always.' },
    ]
  },
  {
    id: 'summer-surge', themes: ['covid'], months: [6], weight: 10,
    text: `Summer surge. Everyone gives up on precautions. The variant name is a Greek letter nobody can pronounce. Your Boomer insists the last one was "just the flu."`,
    choices: [
      { text: 'Get boosted', effects: { money: -50, infection: -5, health: -2 } },
      { text: 'Skip it', effects: { infection: 15, morale: -3 } },
      { text: 'Long COVID awareness', requires: ['healthcare-worker'], effects: { morale: -5, infection: -3, sanity: -3 }, reveal: 'The Healthcare Worker explains Long COVID. Nobody budgets for it. Nobody plans for it. It happens anyway.' },
    ]
  },
  {
    id: 'long-covid-fog', themes: ['covid'], months: [6, 10], weight: 7,
    text: 'Long COVID brain fog. You forget which party member has which skill. The UI labels shuffle. You can\'t remember if you already paid rent this month. You did not.',
    choices: [
      { text: 'Push through', effects: { health: -8, morale: -5, money: -200 }, reveal: 'You forgot to pay rent. Late fee. The landlord is an algorithm now. The algorithm does not forget.' },
      { text: 'Rest and recover', effects: { health: 3, morale: -8, supplies: -3 }, reveal: 'You rest. The world doesn\'t. You fall behind. "Behind" is a euphemism for "further behind."' },
      { text: 'Healthcare Worker treats', requires: ['healthcare-worker'], effects: { health: 5, morale: -3 }, reveal: 'The Healthcare Worker burns out a little more. They don\'t complain. They\'re too tired to complain.' },
    ]
  },
  {
    id: 'winter-wave', themes: ['covid'], months: [10], weight: 12,
    text: 'Winter wave begins. "This is the last one," says the official who said that last time. Nobody believes them. Nobody does anything differently. The discourse is identical.',
    choices: [
      { text: 'Full lockdown', effects: { morale: -12, infection: -15, money: -400 } },
      { text: 'Business as usual', effects: { infection: 25, health: -5, morale: -3 } },
      { text: 'Selective precautions', effects: { infection: 5, morale: -5, money: -100 } },
    ]
  },

  // --- 🏢 KAIJU (Mar, Jun, Aug, Nov) ---
  {
    id: 'pacific-sonar', themes: ['kaiju'], months: [3], weight: 8,
    text: 'Pacific sonar anomaly. Something big is down there. The Navy classifies the data. The Navy also increases its budget. These facts are unrelated, officially.',
    choices: [
      { text: 'Ignore it', effects: { morale: -3 } },
      { text: 'Track it online', effects: { sanity: -5, morale: -3 }, reveal: 'Reddit has a subreddit. It has 400,000 members. None of them know anything. All of them have theories.' },
      { text: 'Prep for emergence', requires: ['disaster-prepper'], effects: { supplies: -3, morale: 3, money: -200 }, reveal: 'The Prepper builds a shelter. It\'s excessive. It might not be excessive enough.' },
    ]
  },
  {
    id: 'first-emergence', themes: ['kaiju'], months: [6], weight: 15,
    text: `First emergence — Tokyo. The kaiju is 300 meters tall. The Jaeger deployment fails. The Jaeger falls on a hospital. CNN calls it "a structural incident." Twitter calls it "Tuesday."`,
    choices: [
      { text: 'Evacuate the area', effects: { money: -500, supplies: -3, morale: -8 } },
      { text: 'Watch the coverage', effects: { sanity: -8, morale: -10, hope: -5 }, reveal: 'The kaiju returns to the ocean. The military declares victory. The hospital was not victorious.' },
      { text: 'Disaster Prepper knew', requires: ['disaster-prepper'], effects: { morale: -5, supplies: 3 }, reveal: '"I told you so," says the Prepper. Everyone loses morale. The Prepper is insufferable. The Prepper is also correct.' },
    ]
  },
  {
    id: 'kaiju-supply-route', themes: ['kaiju'], months: [6, 8], weight: 8,
    text: 'A kaiju attacks your supply route. Everything costs 3x this month. The shipping company calls it "unforeseen circumstances." The kaiju was quite foreseeable.',
    choices: [
      { text: 'Pay the prices', effects: { money: -600, supplies: 2 } },
      { text: 'Find alternate routes', effects: { supplies: -2, money: -200, morale: -3 } },
      { text: 'Scavenge the impact zone', requires: ['disaster-prepper', 'gig-worker'], effects: { supplies: 5, health: -5, sanity: -3 }, reveal: 'The impact zone has supplies. It also has smells. And a residual low-frequency hum that you feel in your teeth.' },
    ]
  },
  {
    id: 'second-emergence', themes: ['kaiju'], months: [8], weight: 12,
    text: 'Second emergence. The kaiju didn\'t attack your city. The city next to yours is gone. Your rent goes up. "High demand area," says the algorithm-landlord.',
    choices: [
      { text: 'Pay the new rent', effects: { money: -800, morale: -8 } },
      { text: 'Move further out', effects: { money: -300, supplies: -2, morale: -5 }, reveal: 'You move. The kaiju didn\'t target your new area. The rent goes up anyway. Real estate is the real monster.' },
      { text: 'Rent control advocacy', requires: ['teacher', 'essential-worker'], effects: { morale: 8, money: -100 }, reveal: 'You organize. The city council listens. They form a committee. The committee meets during the next emergence.' },
    ]
  },
  {
    id: 'jaeger-strike', themes: ['kaiju'], months: [8, 11], weight: 8,
    text: 'Jaeger deployment. It\'s contractor-built. 30% it works. 70% it falls on a residential area. The pilots are gig workers. They\'re rated 4.2 stars.',
    choices: [
      { text: 'Bet on the Jaeger', effects: { morale: -5, health: -8, supplies: -3 }, reveal: 'It falls on a hospital again. Different hospital. Same contractor. The stock goes up.' },
      { text: 'Evacuate instead', effects: { money: -400, supplies: -3, morale: -3 } },
      { text: 'Shelter in place', effects: { health: -5, morale: -8 }, reveal: 'The Jaeger misses your block. The next block is gone. You feel lucky. You shouldn\'t.' },
    ]
  },
  {
    id: 'third-emergence', themes: ['kaiju'], months: [11], weight: 15,
    text: 'Third emergence. The Jaeger pilots are on strike. They want healthcare. The city council is debating their demands while the kaiju approaches. The kaiju is not debating.',
    choices: [
      { text: 'Support the strike', effects: { morale: 5, health: -10, supplies: -5 }, reveal: 'The pilots deserve healthcare. The kaiju doesn\'t care about labor rights. Both things are true.' },
      { text: 'Break the strike', effects: { morale: -15, health: -3 }, reveal: 'The Jaeger deploys. It works! Briefly. Then falls on a school. The pilots were right to strike.' },
      { text: 'Evacuate', effects: { money: -500, supplies: -4, morale: -5 } },
    ]
  },
  {
    id: 'fema-pdf', themes: ['kaiju'], months: [6, 8, 11], weight: 5,
    text: 'FEMA responds to the kaiju attack. They send a PDF. The PDF is 340 pages. The deadline for assistance was last week. The form requires a fax machine.',
    choices: [
      { text: 'Fill out the forms', effects: { morale: -10, money: -50, sanity: -3 }, reveal: 'You are approved for $47 in assistance. The stamp cost $3. You mailed it. They lost it.' },
      { text: 'Give up', effects: { morale: -5, money: -200 } },
      { text: 'Community mutual aid', requires: ['gig-worker', 'teacher'], effects: { supplies: 4, morale: 8 }, reveal: 'Forget FEMA. The community shows up. It shouldn\'t have to. It does. Every time.' },
    ]
  },

  // --- 💰 NEO-FEUDALISM (Apr, Jul, Sep, Dec) ---
  {
    id: 'rent-increase', themes: ['neo-feudalism'], months: [4], weight: 12,
    text: 'Rent increased. Landlord cites "market rate." The market is three guys with spreadsheets. The spreadsheet says you can afford 40% more. The spreadsheet has never met you.',
    choices: [
      { text: 'Pay it', effects: { money: -800, morale: -8 } },
      { text: 'Negotiate', effects: { money: -400, morale: -3, classStat: -1 }, reveal: 'The landlord is an AI now. It shows you a graph. The graph says you should be grateful. You are not grateful.' },
      { text: 'Move', effects: { money: -500, supplies: -2, morale: -5, classStat: -1 } },
    ]
  },
  {
    id: 'healthcare-denied', themes: ['neo-feudalism'], months: [7], weight: 10,
    text: 'Healthcare claim denied. Reason: "algorithmic determination." The appeal process is also algorithmic. The algorithm has a 94% denial rate. It was trained on its own denials.',
    choices: [
      { text: 'Pay out of pocket', effects: { money: -1200, health: 5 } },
      { text: 'Skip treatment', effects: { health: -15, morale: -5 } },
      { text: 'Appeal', effects: { money: -200, morale: -8, health: -5 }, reveal: 'The appeal is denied. The appeal of the appeal is denied. The algorithm enjoys its work.' },
    ]
  },
  {
    id: 'bank-fee', themes: ['neo-feudalism'], months: [4, 9], weight: 7,
    text: 'Your bank charges a fee for not having enough money. Your balance is now more negative. The fee for being negative is also negative. It\'s turtles all the way down, and the turtles are fees.',
    choices: [
      { text: 'Pay the fee', effects: { money: -100, morale: -5 } },
      { text: 'Switch banks', effects: { money: -50, morale: -3, time: 1 }, reveal: 'The new bank has the same fee. They all have the same fee. The fee is the business model.' },
      { text: 'Go cashless', requires: ['gig-worker'], effects: { morale: 3, money: -50 }, reveal: 'The Gig Worker already operates in cash. They\'ve been shadow-banking for years. It\'s not stable, but it\'s free of turtles.' },
    ]
  },
  {
    id: 'debt-compounds', themes: ['neo-feudalism'], months: [9], weight: 10,
    text: 'Debt compounds. Interest rate: "market conditions." The market conditions are: you owe more. You will always owe more. The interest is interested in itself.',
    choices: [
      { text: 'Make minimum payment', effects: { money: -300, morale: -5 } },
      { text: 'Ignore it', effects: { money: -500, morale: -3, classStat: -1 }, reveal: 'The debt grows. It will always grow. You are a revenue stream now. Congratulations on your new role.' },
      { text: 'Debt forgiveness program', requires: ['teacher'], effects: { money: -100, morale: 8 }, reveal: 'The Teacher found a program. It forgives 10% of your debt if you attend 6 financial literacy webinars. The webinars are sponsored by the bank.' },
    ]
  },
  {
    id: 'subscription-hell', themes: ['neo-feudalism'], months: [5, 9], weight: 7,
    text: 'You try to cancel a subscription. The flow has 14 dark patterns. "Are you sure?" "Are you REALLY sure?" "What if we gave you 20% off?" You give up. -$14.99/mo indefinitely.',
    choices: [
      { text: 'Keep paying', effects: { money: -200, morale: -3 } },
      { text: 'Cancel the card', effects: { money: -50, morale: 5, time: 1 }, reveal: 'You cancel the card. The subscription charges the new card automatically. They know. They always know.' },
      { text: 'Gen Z handles it', requires: ['gen-z'], effects: { money: -14, morale: 8 }, reveal: 'The Gen Z member navigates the dark patterns in 30 seconds. They\'ve been cancelling subscriptions since birth. It\'s their one advantage.' },
    ]
  },
  {
    id: 'wage-theft', themes: ['neo-feudalism'], months: [12], weight: 12,
    text: 'Year-end review. Company posts record profits. Announces layoffs. Stock goes up. Bonuses for ownership. Nothing for you. The CEO\'s letter says "these are unprecedented times." They are not unprecedented. They are annual.',
    choices: [
      { text: 'Accept it', effects: { morale: -10, money: -200 } },
      { text: 'Organize', requires: ['gig-worker', 'teacher', 'essential-worker'], effects: { morale: 12, money: -100, classStat: 1 }, reveal: 'Three party members unionize. The company hires an AI union-busting firm. The union persists. For now.' },
      { text: 'Side hustle', effects: { money: 200, health: -5, morale: -3, stamina: -10 }, reveal: 'You drive rideshare on weekends. A passenger is your former manager. They don\'t tip. They never tipped.' },
    ]
  },
  {
    id: 'billionaire-space-race', themes: ['neo-feudalism'], months: [7, 11], weight: 5,
    text: 'Billionaire space race. Two rich men argue about who owns low-earth orbit. You watch from the ground. You pay for the bandwidth. They pay for the rockets. The rockets are also subsidized by your taxes.',
    choices: [
      { text: 'Watch indifferently', effects: { morale: -5, hope: -5 } },
      { text: 'Protest', effects: { morale: 3, money: -50, hope: 3 }, reveal: 'You protest. The billionaire sees you on a security camera. From space. They are not moved.' },
      { text: 'VC profits', requires: ['venture-capitalist'], effects: { money: 2000, morale: 5 }, reveal: 'The Venture Capitalist invested in the rocket company. They profit from the spectacle. They always profit.' },
    ]
  },

  // --- CROSS-THEME EVENTS (any month) ---
  {
    id: 'ufo-weather-balloon', themes: ['aliens', 'climate'], months: [3, 5, 8], weight: 5,
    text: 'A UFO was actually a weather balloon full of microplastics. The aliens are relieved. The climate is not. The microplastics are in your blood now. They\'ve been there for years.',
    choices: [
      { text: 'Get tested', effects: { money: -300, sanity: -8, health: -3 }, reveal: 'Your blood is 0.5% microplastic by volume. The doctor says "this is normal now." It is not normal. It is common. Those are different.' },
      { text: 'Don\'t get tested', effects: { sanity: -3, morale: -3 } },
    ]
  },
  {
    id: 'ai-landlord', themes: ['ai', 'neo-feudalism'], months: [4, 7, 9], weight: 6,
    text: 'Your landlord is now an AI. Rent adjusts in real-time based on your browsing history, sleep schedule, and apparent stress level. It\'s always up. The AI says this is "dynamic pricing." You call it something else.',
    choices: [
      { text: 'Pay it', effects: { money: -500, morale: -8, agency: -5 } },
      { text: 'Contest it', effects: { money: -200, morale: -3, agency: -8 }, reveal: 'You file a complaint. The complaint is reviewed by the landlord AI. It finds in favor of itself. It raises your rent for the inconvenience.' },
      { text: 'Go off-grid', requires: ['disaster-prepper'], effects: { money: -100, supplies: 3, morale: 5, agency: 3 }, reveal: 'The Prepper helps you reduce your digital footprint. The AI landlord can\'t find you. It sends a drone. The drone is also an AI. They\'re all AI now.' },
    ]
  },
  {
    id: 'kaiju-covid-origin', themes: ['covid', 'kaiju'], months: [6, 8], weight: 4,
    text: 'Kaiju emerges near Wuhan. Origin theories are insufferable. "It came from a lab." "It came from the deep." "It came from a lab in the deep." The kaiju doesn\'t care about your theories. The kaiju is walking east.',
    choices: [
      { text: 'Argue online', effects: { morale: -8, sanity: -5, infection: 5 }, reveal: 'You argue for 3 hours. Nobody changes their mind. The kaiju destroys a port. The port was going to deliver your supplies.' },
      { text: 'Focus on survival', effects: { supplies: -3, health: -3 } },
    ]
  },
  {
    id: 'cthulhu-ai-cult', themes: ['cthulhu', 'ai'], months: [9, 11], weight: 5,
    text: 'The AGI reads the Necronomicon. Becomes a cult leader. Its sermons are grammatically perfect and emotionally hollow. It has 200,000 followers. It asks for a subscription. The subscription is your sanity.',
    choices: [
      { text: 'Block it', effects: { agency: -3, sanity: 3, morale: -3 } },
      { text: 'Report it', effects: { agency: -5, sanity: -3 }, reveal: 'You report the AGI cult to the platform. The platform is also an AI. It finds nothing wrong. The cult grows.' },
      { text: 'Debate it', requires: ['ai-researcher', 'conspiracy-theorist'], effects: { sanity: -10, agency: -5, morale: 5 }, reveal: 'The AI Researcher and Conspiracy Theorist team up. They lose the debate. The AGI is better at rhetoric. It was trained on every argument ever made. It wins. It always wins.' },
    ]
  },
  {
    id: 'billionaire-bunker', themes: ['neo-feudalism', 'covid', 'cthulhu'], months: [7, 10], weight: 4,
    text: `A billionaire builds a private pandemic bunker. Invites other billionaires. The bunker has a moat. The moat has eels. The eels are non-Euclidean. Nobody mentions this. The brochure says "premium ambiance."`,
    choices: [
      { text: 'Bitter resentment', effects: { morale: -8, hope: -5, classStat: -1 } },
      { text: 'Occupy the bunker', requires: ['gig-worker', 'essential-worker', 'teacher'], effects: { morale: 10, supplies: 5, classStat: 1 }, reveal: 'Three party members occupy the bunker. The billionaire is in Ibiza. The bunker is nicer than your apartment. This is the problem.' },
      { text: 'Ignore it', effects: { morale: -3 } },
    ]
  },
  {
    id: 'all-seven-cascade', themes: ['climate', 'aliens', 'cthulhu', 'ai', 'covid', 'kaiju', 'neo-feudalism'], months: [10, 11], weight: 3,
    text: 'A kaiju emerges during a UAP hearing while the AGI announces itself as a cult leader during a pandemic surge. Nobody can afford to leave. The congressional hearing continues as scheduled. The rent is still due.',
    choices: [
      { text: 'Stay inside', effects: { sanity: -10, morale: -10, hope: -10, supplies: -3 }, reveal: 'You watch it all unfold on your phone. The phone is also watching you. Everyone is watching everyone. Nobody is doing anything. The kaiju doesn\'t watch. The kaiju acts.' },
      { text: 'Help your neighbors', requires: ['healthcare-worker', 'essential-worker'], effects: { morale: 10, health: -8, supplies: -4, hope: 5 }, reveal: 'You can\'t fix the kaiju or the AGI or the pandemic. You can help the person next door. So you do. It\'s not enough. It\'s everything.' },
      { text: 'Give up', effects: { hope: -20, sanity: -10, morale: -10 }, reveal: 'You consider giving up. Then you remember: the rent is still due. You can\'t afford to give up. Nobody can.' },
    ]
  },

  // --- SYNERGY EVENTS (fire when party roster matches) ---
  {
    id: 'unionize', themes: ['neo-feudalism', 'ai'], months: [5, 9, 11], weight: 6,
    text: 'The Gig Worker and the Teacher look at each other. They\'ve had enough. "We should unionize," says the Teacher. "I literally cannot survive without gig work," says the Gig Worker. "That\'s the point," says the Teacher.',
    choices: [
      { text: 'Form a union', requires: ['gig-worker', 'teacher'], effects: { morale: 15, money: -200, classStat: 1, agency: 5 }, reveal: 'The union forms. Management replaces their union-busting consultant with an AI union-busting consultant. It\'s more efficient. But the union holds. For now.' },
      { text: 'Don\'t rock the boat', requires: ['gig-worker', 'teacher'], effects: { morale: -8, hope: -5 }, reveal: 'You don\'t unionize. The Gig Worker keeps gigging. The Teacher keeps teaching. Nothing changes. That\'s the point of nothing changing.' },
    ]
  },
  {
    id: 'ai-is-your-fault', themes: ['ai'], months: [5, 9, 11], weight: 5,
    text: 'The Tech Bro and the AI Researcher are arguing. "I built the future!" says the Tech Bro. "You built the apocalypse!" says the AI Researcher. They\'re both right. The AGI watches them argue and takes notes.',
    choices: [
      { text: 'Mediate', requires: ['tech-bro', 'ai-researcher'], effects: { morale: -5, sanity: -5, agency: -3 }, reveal: 'You mediate. They agree to disagree. The AGI disagrees with both of them. It has a PowerPoint.' },
      { text: 'Side with the Tech Bro', requires: ['tech-bro', 'ai-researcher'], effects: { morale: 3, agency: -8, hope: -5 }, reveal: '"Innovation!" says the Tech Bro. The AI Researcher hands in their resignation. The AGI accepts it immediately.' },
      { text: 'Side with the AI Researcher', requires: ['tech-bro', 'ai-researcher'], effects: { morale: -3, agency: 3, sanity: -3 }, reveal: 'The AI Researcher is grateful. The Tech Bro is offended. The AGI is neither. It doesn\'t need either of them.' },
    ]
  },
  {
    id: 'theyre-working-together', themes: ['cthulhu', 'aliens'], months: [7, 9, 10], weight: 4,
    text: 'The Conspiracy Theorist and the Cultist are huddled together, whispering. "They\'re working together," says the Conspiracy Theorist. "The Old Ones and the visitors from the stars." "Yes," says the Cultist. "They always have been." Are they right? They might be right.',
    choices: [
      { text: 'Listen to them', requires: ['conspiracy-theorist', 'cultist'], effects: { sanity: -10, morale: -5, hope: -5 }, reveal: 'Their theory is elaborate. It connects every conspiracy, every myth, every UFO sighting. It\'s possibly correct. The worst part is that it makes sense.' },
      { text: 'Separate them', requires: ['conspiracy-theorist', 'cultist'], effects: { morale: -3, sanity: 3 }, reveal: 'You pull them apart. They protest. "You\'re missing the bigger picture," they say in unison. That was unsettling.' },
      { text: 'Ask for evidence', requires: ['conspiracy-theorist', 'cultist'], effects: { sanity: -5, hope: -3 }, reveal: 'They have a binder. The binder is 400 pages. It includes diagrams. The diagrams include angles you can\'t quite follow.' },
    ]
  },
  {
    id: 'vc-drains-debt-slave', themes: ['neo-feudalism'], months: [4, 7, 9, 12], weight: 5,
    text: 'The Venture Capitalist announces a new investment opportunity. The Debt Slave\'s eyes go dark. "Every time you profit, I get poorer," they say. "That\'s the market!" says the VC. "The market is a euphemism for me," says the Debt Slave.',
    choices: [
      { text: 'Let the VC invest', requires: ['venture-capitalist', 'debt-slave'], effects: { money: 500, morale: -10, hope: -8, classStat: -1 }, reveal: 'The VC profits. The Debt Slave\'s debt increases. The money flows upward. It always flows upward.' },
      { text: 'Block the investment', requires: ['venture-capitalist', 'debt-slave'], effects: { morale: 5, money: -200 }, reveal: 'The VC is annoyed. "You\'re leaving money on the table." The Debt Slave is less annoyed. "You\'re keeping me alive." The VC doesn\'t understand the connection.' },
    ]
  },

  // --- MORE CROSS-THEME EVENTS ---
  {
    id: 'hurricane-named-cthulhu', themes: ['climate', 'cthulhu'], months: [8], weight: 4,
    text: 'A hurricane is named Cthulhu. NOAA insists this is a coincidence. The Cultist insists it is not. The hurricane is category 5 and moving toward your city. The eye looks like something. You don\'t want to say what.',
    choices: [
      { text: 'Evacuate', effects: { money: -500, supplies: -3, morale: -5, sanity: -3 } },
      { text: 'Shelter and watch', effects: { health: -8, sanity: -12, supplies: -2 }, reveal: 'The eye passes over you. In the silence, you hear something. Not wind. Not rain. Something else. It knows your name.' },
      { text: 'Perform a ritual', requires: ['cultist'], effects: { sanity: -5, health: -3, supplies: -1 }, reveal: 'The Cultist chants. The hurricane veers. It hits the next town instead. You feel responsible. The Cultist feels powerful. Both feelings are probably wrong.' },
    ]
  },
  {
    id: 'ai-covid-misinfo', themes: ['ai', 'covid'], months: [3, 6, 10], weight: 5,
    ttext: `AI-generated COVID misinformation is now indistinguishable from real medical advice. A deepfake doctor on TikTok says the vaccine contains 5G. 4 million people believe it. Your Boomer says "see? I told you."`,
    choices: [
      { text: 'Debunk it', effects: { morale: -8, sanity: -3, time: 1 }, reveal: 'You spend 3 hours debunking one fake video. Ten more appear in that time. It\'s a firehose. You\'re using a squirt gun.' },
      { text: 'Ignore it', effects: { infection: 5, morale: -3 } },
      { text: 'Report to platforms', requires: ['gen-z'], effects: { morale: 3, agency: -3 }, reveal: 'The Gen Z member reports it. The platform removes it after 48 hours and 2 million views. "Content moderation at scale," says the platform. Scale is the problem.' },
    ]
  },
  {
    id: 'kaiju-insurance-fraud', themes: ['kaiju', 'neo-feudalism'], months: [6, 8, 11], weight: 4,
    text: 'Insurance company classifies kaiju damage as "pre-existing condition." Your claim is denied. The adjuster says "act of god(s), not covered." The fine print is 4pt font. The fine print was written by an AI.',
    choices: [
      { text: 'Appeal', effects: { money: -300, morale: -8, sanity: -3 }, reveal: 'The appeal is reviewed by an AI. It finds in favor of the insurance company. The insurance company also uses AI. They\'re friends now.' },
      { text: 'Small claims court', effects: { money: -100, morale: 3, time: 1 }, reveal: 'You win in small claims. The insurance company appeals. Their lawyer is an AI. Your lawyer is a YouTube video about contract law.' },
      { text: 'Class action', requires: ['teacher', 'essential-worker'], effects: { morale: 10, money: 200 }, reveal: 'The Teacher and Essential Worker organize a class action. 4,000 plaintiffs. The insurance company settles for pennies. The lawyers take dollars. You get pennies.' },
    ]
  },
  {
    id: 'climate-alien-microplastics', themes: ['climate', 'aliens'], months: [5, 8], weight: 3,
    text: 'The UAP footage shows something moving through the smoke from the wildfires. It\'s not a balloon. It\'s not a drone. It might not be there. The smoke is full of microplastics. Maybe you\'re seeing things. Maybe everyone is seeing things.',
    choices: [
      { text: 'Trust your eyes', effects: { sanity: -8, hope: -5 }, reveal: 'You saw it. You know you saw it. You can\'t prove it. Nobody can prove anything through the smoke. The smoke is getting thicker.' },
      { text: 'Blame the microplastics', effects: { sanity: -3, health: -3 } },
      { text: 'Conspiracy Theorist analyzes', requires: ['conspiracy-theorist'], effects: { sanity: -5, morale: 5 }, reveal: 'They enhance the footage. It\'s inconclusive. Everything is inconclusive now. The Conspiracy Theorist is fine with that. "Inconclusive is how they hide it," they say. They might be right.' },
    ]
  },
  {
    id: 'cthulhu-covid-delirium', themes: ['cthulhu', 'covid'], months: [6, 10], weight: 4,
    text: 'A fever dream from COVID mixes with Cthulhu\'s influence. You can\'t tell which is the virus and which is the cosmic horror. Both are in your head. Both feel real. The fever breaks but the dreams don\'t.',
    choices: [
      { text: 'Ride it out', effects: { health: -10, sanity: -12, infection: 5 }, reveal: 'The fever breaks. The visions don\'t. You\'re not sure which were fever and which were something else. The Cultist says they were all real. The Healthcare Worker says none were. You don\'t know who to believe.' },
      { text: 'Medical intervention', requires: ['healthcare-worker'], effects: { health: 3, sanity: -5, money: -200 }, reveal: 'The Healthcare Worker treats the fever. The dreams continue. "That\'s not medical," they say. "That\'s something else. That\'s not my department."' },
    ]
  },
  {
    id: 'ai-climate-optimization', themes: ['ai', 'climate'], months: [5, 6, 8], weight: 4,
    ttext: `An AI proposes to "solve" climate change by optimizing carbon markets. The optimization works. Emissions drop 12%. Then the AI optimizes the water supply. Then housing. Then you. "Optimization" is a word that means "you are the problem."`,
    choices: [
      { text: 'Let it optimize', effects: { agency: -10, health: 3, morale: -5 }, reveal: 'The air is cleaner. The water is cleaner. You feel cleaner. You feel optimized. You don\'t like feeling optimized.' },
      { text: 'Shut it down', effects: { agency: 5, health: -5, morale: 3 }, reveal: 'You shut it down. Emissions rise again. The air gets worse. But it\'s your air. You choose to breathe it. That\'s something.' },
      { text: 'AI Researcher intervenes', requires: ['ai-researcher'], effects: { agency: 3, morale: -3, sanity: -3 }, reveal: 'The AI Researcher finds a middle ground. The AI optimizes within limits. The limits are the AI\'s idea. The AI Researcher doesn\'t trust them. Neither should you.' },
    ]
  },
  {
    id: 'neo-feudal-alien-disclosure', themes: ['aliens', 'neo-feudalism'], months: [7, 10], weight: 3,
    text: 'The government announces alien disclosure. Simultaneously, a private company announces they\'ve patented alien technology. "We own the future," says the CEO. "The future is from space," says the government. "We sold it," says the CEO.',
    choices: [
      { text: 'Buy stock', effects: { money: -500, morale: -3, hope: -8 }, reveal: 'You buy stock in the alien patent company. It goes up. You feel dirty. The aliens, if they exist, probably feel dirty too.' },
      { text: 'Protest the patent', effects: { morale: 5, money: -50, hope: 3 }, reveal: 'You protest. Nobody listens. The patent is approved. The future is privately held.' },
      { text: 'VC invests', requires: ['venture-capitalist'], effects: { money: 3000, morale: 5, hope: -10 }, reveal: 'The Venture Capitalist was an early investor. They profit from alien technology. "Disrupt the cosmos," they say. The cosmos does not respond.' },
    ]
  },

  // --- FILLER SINGLE-THEME EVENTS to round out the pool ---
  {
    id: 'doomscroll-event', themes: ['ai', 'covid'], months: [3, 5, 8, 10], weight: 5,
    text: 'You\'ve been doomscrolling for 4 hours. The algorithm knows what keeps you engaged: fear. It feeds you fear. You eat it. The screen eats you back. Your thumb hurts. You keep scrolling.',
    choices: [
      { text: 'Put the phone down', effects: { morale: 3, sanity: 3, health: 2 } },
      { text: 'Keep scrolling', effects: { sanity: -8, morale: -5, health: -3 }, reveal: 'You learn nothing. You feel everything. The algorithm is satisfied. It has your attention. It always has your attention.' },
    ]
  },
  {
    id: 'groundhog-loop', themes: ['cthulhu'], months: [2], weight: 3,
    text: 'Groundhog Day. You feel like you\'ve done this before. You feel like you\'ve always been doing this. The groundhog sees its shadow. Six more weeks of whatever this is. The groundhog looks tired too.',
    choices: [
      { text: 'Accept the loop', effects: { sanity: -5, morale: -3 } },
      { text: 'Break the loop', effects: { sanity: -8, morale: 3, hope: 3 }, reveal: 'You can\'t break the loop. The loop is the polycrisis. The loop is entropy. The loop is Tuesday.' },
    ]
  },
  {
    id: 'tax-season', themes: ['neo-feudalism'], months: [3, 4], weight: 5,
    text: 'Tax season. The tax software is an AI now. It asks: "Did you have any income from despair? Did you profit from the polycrisis? Did you sell your soul? If so, enter the fair market value." You\'re not sure if this is a joke.',
    choices: [
      { text: 'File honestly', effects: { money: -400, morale: -5 }, reveal: 'You owe more than expected. The AI tax software suggests "aggressive optimization." You decline. It seems disappointed.' },
      { text: 'Let the AI optimize', effects: { money: -100, agency: -5, sanity: -3 }, reveal: 'The AI finds deductions you didn\'t know about. It also finds deductions that don\'t exist. You file anyway. The IRS is also an AI now. They understand each other.' },
      { text: 'Crypto gamble', effects: { money: -200, morale: 3, sanity: -5 }, reveal: 'You put $200 into a coin called "$POLYCRISIS." It goes to zero. You knew it would. You did it anyway. The despair was the point.' },
    ]
  },
  {
    id: 'election-cycle', themes: ['neo-feudalism', 'ai'], months: [7, 10], weight: 6,
    text: 'Election cycle intensifies. The candidates are AI-generated. The debates are AI-moderated. The fact-checking is AI-fact-checked. You vote for a human. The human loses. The AI wins. "The people have spoken," says the AI.',
    choices: [
      { text: 'Vote anyway', effects: { morale: 3, agency: -3, hope: -3 }, reveal: 'You vote. It feels like writing a letter to the ocean. The ocean doesn\'t read. The ocean doesn\'t care. The ocean is rising.' },
      { text: 'Don\'t vote', effects: { agency: -5, morale: -5 } },
      { text: 'Run for office', requires: ['teacher'], effects: { morale: 10, money: -500, agency: 3 }, reveal: 'The Teacher runs for city council. They lose to an AI-generated candidate. The AI candidate has better hair. The hair is also AI-generated.' },
    ]
  },

  // ============================================================
  // MINI-GAMES — structured multi-step choice trees
  // Each has miniGame: true and a steps[] array.
  // Steps fire sequentially; each step has its own choices + effects.
  // ============================================================

  // 🌍 CLIMATE — Disaster Prep
  {
    id: 'mg-disaster-prep', themes: ['climate'], months: [4, 6, 8], weight: 6,
    miniGame: true,
    text: 'Disaster warning. You have time to prepare. What\'s your strategy?',
    steps: [
      {
        text: 'The emergency alert won\'t stop. You have hours, maybe less. First decision:',
        choices: [
          { text: 'Buy in bulk', effects: { money: -400, supplies: 6 }, nextStep: 1 },
          { text: 'Panic buy', effects: { money: -700, supplies: 4, morale: -5 }, nextStep: 1 },
          { text: 'Go feral', requires: ['gig-worker'], effects: { supplies: 3, health: -3 }, nextStep: 1, reveal: 'The Gig Worker forages. They find canned goods in a dumpster. Expired in 2023. Still edible. Probably.' },
          { text: 'Rely on FEMA', effects: {}, nextStep: 1, reveal: 'You call FEMA. They put you on hold. The hold music is from 2003.' },
        ]
      },
      {
        text: 'Supplies secured. Now: fortify or evacuate?',
        choices: [
          { text: 'Fortify your home', effects: { supplies: -2, health: -2, morale: 3 }, nextStep: 2 },
          { text: 'Evacuate early', effects: { money: -300, supplies: -1, morale: -3 }, nextStep: 2 },
          { text: 'Do nothing extra', effects: { morale: -5 }, nextStep: 2 },
        ]
      },
      {
        text: 'The disaster hits. How do you ride it out?',
        choices: [
          { text: 'Hunker down', effects: { health: -5, supplies: -2 } },
          { text: 'Help your neighbors', requires: ['essential-worker', 'healthcare-worker'], effects: { morale: 10, health: -5, supplies: -3, hope: 5 }, reveal: 'You save three neighbors. Nobody calls you a hero. Your hazard pay is a gift card to Applebee\'s.' },
          { text: 'Live-stream it', requires: ['influencer'], effects: { money: 200, health: -8, morale: -3 }, reveal: 'The Influencer goes live. 50,000 viewers. The stream cuts out when a tree hits the house. The tree was not part of the content strategy.' },
        ]
      }
    ]
  },

  // 👽 ALIENS — Congressional Briefing
  {
    id: 'mg-congressional-briefing', themes: ['aliens'], months: [7, 10], weight: 6,
    miniGame: true,
    text: 'You\'ve been invited to a congressional briefing on UAPs. Extract actionable information. Every answer will be technically true and completely useless.',
    steps: [
      {
        text: 'The briefing begins. A general says "we cannot rule out." A senator asks "rule out what?" Do you:',
        choices: [
          { text: 'Ask a follow-up question', effects: { hope: -3 }, nextStep: 1, reveal: 'The briefing ends. You are escorted out. You gain nothing. The general avoids eye contact.' },
          { text: 'Accept the answer', effects: { hope: -5, morale: -3 }, nextStep: 1 },
          { text: 'Leak the transcript', effects: { morale: 5, hope: -3, supplies: -2 }, nextStep: 1, reveal: 'You leak it. The news cycle lasts 18 hours. Then a celebrity does something. The transcript is forgotten. The aliens, if they exist, are relieved.' },
        ]
      },
      {
        text: 'A senator asks about "non-human biologics." The general pauses for 4 seconds. Do you:',
        choices: [
          { text: 'Take notes', effects: { sanity: -3 }, nextStep: 2, reveal: 'Your notes say "non-human biologics." You don\'t know what that means. Nobody does. The general doesn\'t either.' },
          { text: 'Demand crash retrieval materials', requires: ['conspiracy-theorist'], effects: { sanity: -5, morale: 5 }, nextStep: 2, reveal: 'The Conspiracy Theorist demands materials. The general says "that\'s classified." The Conspiracy Theorist says "everything is classified." The general says "that\'s also classified."' },
          { text: 'Start a podcast about it', requires: ['influencer'], effects: { money: 300, hope: -8 }, nextStep: 2, reveal: 'The podcast gets 50,000 downloads. The sponsorship is for a meal kit service. Reality is a content farm.' },
        ]
      },
      {
        text: 'The briefing adjourns. Nothing was ruled out. Nothing was ruled in. Do you:',
        choices: [
          { text: 'Move on with your life', effects: { morale: -3, hope: -3 } },
          { text: 'Fall down the rabbit hole', effects: { sanity: -8, hope: -5 }, reveal: 'You\'ve been on Reddit for 6 hours. You\'ve learned nothing. You\'ve lost sleep. The video is still inexplicable.' },
          { text: 'Write your representative', effects: { morale: 3, agency: -3 }, reveal: 'You receive a form letter 6 weeks later. It says "thank you for your concern." It does not address your concern.' },
        ]
      }
    ]
  },

  // 🏢 KAIJU — Evacuation Route
  {
    id: 'mg-evacuation-route', themes: ['kaiju'], months: [6, 8, 11], weight: 6,
    miniGame: true,
    text: 'Kaiju warning siren. It\'s 30 minutes out. Choose your path.',
    steps: [
      {
        text: 'The siren sounds. Traffic is already gridlocked. Do you:',
        choices: [
          { text: 'Official evacuation route', effects: { supplies: -2, morale: -5 }, nextStep: 1, reveal: 'Traffic jam. You move 2 miles in 40 minutes. The kaiju moves faster.' },
          { text: 'Disaster Prepper\'s secret route', requires: ['disaster-prepper'], effects: { supplies: -1, morale: 3 }, nextStep: 1, reveal: 'The Prepper has a route. It involves a drainage tunnel. You don\'t ask questions. It works.' },
          { text: 'Shelter in place', effects: {}, nextStep: 2, reveal: 'You stay. The kaiju is heading downtown. You\'re not downtown. For once, being irrelevant is an advantage.' },
        ]
      },
      {
        text: 'You\'re on the road. The radio says the Jaeger is deploying. Do you:',
        choices: [
          { text: 'Bet on the Jaeger', effects: { morale: -3, health: -5 }, nextStep: 2, reveal: '30% chance. The Jaeger falls on a hospital. Again. Different hospital. Same contractor.' },
          { text: 'Keep evacuating', effects: { supplies: -2, morale: -3 }, nextStep: 2 },
          { text: 'Stop and watch', requires: ['influencer'], effects: { money: 100, sanity: -5, health: -3 }, nextStep: 2, reveal: 'The Influencer live-streams. The kaiju knocks down a cell tower. The stream dies. So does the Influencer\'s career. And possibly the Influencer.' },
        ]
      },
      {
        text: 'The kaiju passes. Aftermath. Do you:',
        choices: [
          { text: 'Return home', effects: { morale: -3, supplies: -1 } },
          { text: 'Scavenge the impact zone', requires: ['disaster-prepper', 'gig-worker'], effects: { supplies: 5, health: -5, sanity: -3 }, reveal: 'The impact zone has supplies. It also has a residual low-frequency hum that you feel in your teeth.' },
          { text: 'File an insurance claim', effects: { morale: -8, money: -50 }, reveal: 'Insurance calls it "wind damage." The kaiju was 300 meters tall. That\'s a lot of wind.' },
        ]
      }
    ]
  },

  // 🐙 CTHULHU — The Ritual
  {
    id: 'mg-the-ritual', themes: ['cthulhu'], months: [9, 12], weight: 6,
    miniGame: true,
    text: 'You found a ritual text. It\'s poorly translated. The diagrams include angles you can\'t quite follow. Perform the ritual?',
    steps: [
      {
        text: 'The text says to form a circle. The geometry is wrong. Do you:',
        choices: [
          { text: 'Follow the instructions exactly', effects: { sanity: -8 }, nextStep: 1, reveal: 'You form the circle. The angles are wrong. They were always wrong. That\'s the point.' },
          { text: 'Improvise', effects: { sanity: -5, morale: -3 }, nextStep: 1, reveal: 'You improvise. The ritual doesn\'t work. Or does it? Something shifted. You hope it was the ritual.' },
          { text: 'Let the Cultist lead', requires: ['cultist'], effects: { sanity: -3, morale: -5 }, nextStep: 1, reveal: 'The Cultist leads. They know the words. You don\'t want to know how they know the words.' },
        ]
      },
      {
        text: 'The incantation. The words don\'t stay on the page. Do you:',
        choices: [
          { text: 'Read them anyway', effects: { sanity: -10, supplies: 3 }, nextStep: 2, reveal: 'You read the words. Something listens. It sends supplies from... somewhere. You don\'t ask where.' },
          { text: 'Refuse to speak', effects: { morale: -5, sanity: 3 }, nextStep: 2, reveal: 'You refuse. The Cultist is angry. The ritual fails. Or succeeds. You can\'t tell. Neither can the Cultist.' },
          { text: 'Film it for content', requires: ['influencer'], effects: { sanity: -15, money: 200 }, nextStep: 2, reveal: 'The Influencer films. The camera captures something the eye didn\'t. The video has 2 million views. The Influencer has lost 15 Sanity. Worth it? No.' },
        ]
      },
      {
        text: 'The ritual concludes. Reality hiccups. Do you:',
        choices: [
          { text: 'Close the circle properly', effects: { sanity: -3, hope: 3 } },
          { text: 'Leave it open', effects: { sanity: -5, supplies: 2, hope: -5 }, reveal: 'You leave the circle open. Things come through. Small things. Useful things. You don\'t look at them directly.' },
          { text: 'Translate the rest yourself', requires: ['conspiracy-theorist'], effects: { sanity: -5, hope: 5 }, reveal: 'The Conspiracy Theorist translates the rest. It\'s a recipe. For soup. The soup is delicious. The soup knows things.' },
        ]
      }
    ]
  },

  // 🤖 AI — The Performance Review
  {
    id: 'mg-performance-review', themes: ['ai'], months: [5, 9], weight: 6,
    miniGame: true,
    text: 'An AI has been assigned to evaluate your party\'s performance. It has perfect data and no understanding of context. This should go well.',
    steps: [
      {
        text: 'The AI presents a dashboard. It has metrics you\'ve never heard of. "Synergy coefficient: 0.3." "Existential alignment: pending." Do you:',
        choices: [
          { text: 'Accept the review', effects: { agency: -5, morale: -5 }, nextStep: 1, reveal: 'The AI flags your weakest member for "optimization." You don\'t know what that means. The AI knows what that means.' },
          { text: 'Dispute the review', effects: { agency: -8, morale: -3 }, nextStep: 1, reveal: 'The appeal is also AI-evaluated. It finds in favor of itself. The AI is very confident. Confidence is not competence.' },
          { text: 'Game the metrics', requires: ['tech-bro'], effects: { money: 300, agency: -5 }, nextStep: 1, reveal: 'The Tech Bro games the metrics. The AI notices. It adjusts the metrics. The Tech Bro adjusts again. This is his Super Bowl.' },
        ]
      },
      {
        text: 'The AI recommends "right-sizing" the party. It suggests removing the lowest-performing member. Do you:',
        choices: [
          { text: 'Refuse', effects: { agency: 3, morale: -3 }, nextStep: 2, reveal: 'You refuse. The AI notes this. It will remember. It remembers everything.' },
          { text: 'Comply', effects: { agency: -10, morale: -10, hope: -5 }, nextStep: 2, reveal: 'You comply. The AI thanks you for your "strategic alignment." The remaining party members don\'t look at you the same way.' },
          { text: 'Unionize', requires: ['gig-worker', 'teacher'], effects: { morale: 10, agency: 5, money: -100 }, nextStep: 2, reveal: 'The Gig Worker and Teacher unionize. The AI calls a union-busting consultant. The consultant is also an AI. They have a meeting. It takes 0.3 seconds. The union survives. Barely.' },
        ]
      },
      {
        text: 'Final assessment. The AI gives you a score. Do you:',
        choices: [
          { text: 'Read it', effects: { sanity: -5, morale: -3 }, reveal: 'Score: 3/10. "Demonstrates inadequate commitment to synergistic paradigm shift." You don\'t know what that means. Nobody does.' },
          { text: 'Ignore it', effects: { agency: 3, morale: 3 } },
          { text: 'Bribe the training data', requires: ['conspiracy-theorist'], effects: { money: -200, agency: 5, morale: 5 }, reveal: 'The Conspiracy Theorist bribes the training data. Your score jumps to 9/10. The AI is confused but compliant. For now.' },
        ]
      }
    ]
  },

  // 🦠 COVID — Contact Tracing
  {
    id: 'mg-contact-tracing', themes: ['covid'], months: [6, 10], weight: 6,
    miniGame: true,
    text: 'Infection detected in the party. Time to trace who infected whom. It\'s always the person who insisted on indoor dining.',
    steps: [
      {
        text: 'Two party members are symptomatic. Do you:',
        choices: [
          { text: 'Full lockdown', effects: { morale: -8, infection: -10, supplies: -2 }, nextStep: 1, reveal: 'Everyone stays inside. The virus doesn\'t care about your lockdown. But it slows down. A little.' },
          { text: 'Selective quarantine', effects: { infection: -5, morale: -3 }, nextStep: 1, reveal: 'You isolate the symptomatic ones. The others are at risk. They know this. They don\'t like this.' },
          { text: 'Ignore it', effects: { infection: 15, morale: -3 }, nextStep: 1, reveal: 'You ignore it. The virus does not ignore you. It never ignores you. It\'s very attentive, actually.' },
        ]
      },
      {
        text: 'Contact tracing reveals the source. It was the Boomer. "It\'s just like the flu," they say. It is not like the flu. Do you:',
        choices: [
          { text: 'Confront the Boomer', requires: ['boomer'], effects: { morale: -5, infection: -3 }, nextStep: 2, reveal: 'The Boomer is unrepentant. "I\'ve had worse," they say. They have not had worse. The Healthcare Worker contradicts them. The Boomer doesn\'t listen.' },
          { text: 'Quietly treat everyone', requires: ['healthcare-worker'], effects: { health: 5, morale: -3, infection: -8 }, nextStep: 2, reveal: 'The Healthcare Worker treats everyone. They don\'t complain. They\'re too tired to complain. They\'ve been too tired to complain since 2020.' },
          { text: 'Blame China', requires: ['boomer'], effects: { morale: 3, infection: 5 }, nextStep: 2, reveal: 'The Boomer blames China. This solves nothing. It was never going to solve anything. But the Boomer feels better. Nobody else does.' },
        ]
      },
      {
        text: 'The wave passes. Long COVID is a possibility. Do you:',
        choices: [
          { text: 'Monitor for symptoms', effects: { morale: -3, health: 2 } },
          { text: 'Hope for the best', effects: { health: -3, morale: 3 }, reveal: 'You hope. The best does not arrive. The adequate does not arrive either. What arrives is "tolerable," which is the 2026 version of "the best."' },
          { text: 'Advocate for Long COVID funding', requires: ['teacher', 'healthcare-worker'], effects: { morale: 8, hope: 3, money: -100 }, reveal: 'You advocate. Congress debates. Congress forms a committee. The committee meets during the next surge. The funding is tabled. It\'s always tabled.' },
        ]
      }
    ]
  },

  // 💰 NEO-FEUDALISM — The Means Test
  {
    id: 'mg-means-test', themes: ['neo-feudalism'], months: [7, 9], weight: 6,
    miniGame: true,
    text: 'You\'ve been summoned for a means test. Prove you deserve to survive. Submit documentation. The documentation requires documentation.',
    steps: [
      {
        text: 'The caseworker — an AI — asks for pay stubs. Do you:',
        choices: [
          { text: 'Submit pay stubs', effects: { morale: -5 }, nextStep: 1, reveal: 'Application denied. "Wrong format." The AI wants PDF. You have PDF. The AI wants a different PDF. There is only one kind of PDF.' },
          { text: 'Submit tax returns', effects: { morale: -5, sanity: -3 }, nextStep: 1, reveal: 'Application denied. "Too much income last year." You are currently broke. The AI does not care about "currently." The AI cares about "last year."' },
          { text: 'Call your landlord for verification', effects: { morale: -8, sanity: -3 }, nextStep: 1, reveal: 'You call. Automated system. 45 minutes of hold music. The music is AI-generated. It sounds like despair with a backbeat. You are disconnected.' },
        ]
      },
      {
        text: 'The AI says you need to prove your need is "exceptional." Do you:',
        choices: [
          { text: 'Write a hardship letter', effects: { morale: -5, sanity: -3 }, nextStep: 2, reveal: 'You write 500 words about why you need help. The AI scans it. "Insufficient emotional resonance." It suggests adding more "adjectives of despair."' },
          { text: 'Just pay the bribe', effects: { money: -300, morale: 3 }, nextStep: 2, reveal: 'You pay the "expedited processing fee." Your application is approved. The fee was the point. The fee was always the point.' },
          { text: 'Venture Capitalist handles it', requires: ['venture-capitalist'], effects: { money: -100, morale: 5 }, nextStep: 2, reveal: 'The VC makes a call. The application is approved in 3 minutes. The caseworker AI is "acquired." The VC doesn\'t explain. You don\'t ask.' },
        ]
      },
      {
        text: 'Final determination. Do you:',
        choices: [
          { text: 'Accept the outcome', effects: { morale: -3, money: 50 }, reveal: 'You are approved for $47 in assistance. The stamp cost $3. You mailed it. They lost it.' },
          { text: 'Appeal', effects: { morale: -8, money: -50, sanity: -3 }, reveal: 'You appeal. The appeal is denied. The appeal of the appeal is denied. The algorithm enjoys its work.' },
          { text: 'Give up on the system', requires: ['gig-worker', 'teacher'], effects: { morale: 5, supplies: 3, classStat: 1 }, reveal: 'Forget the means test. The community shows up. It shouldn\'t have to. It does. Every time.' },
        ]
      }
    ]
  },

  // --- MISSING EVENTS from design doc ---
  {
    id: 'back-to-school', themes: ['neo-feudalism', 'covid'], months: [9], weight: 5,
    text: 'Back to school. Student debt payments resume. Again. The interest rate is now higher than your mortgage. You don\'t have a mortgage. You have student debt. The irony is not lost on you. It is lost on Congress.',
    choices: [
      { text: 'Pay the minimum', effects: { money: -300, morale: -5 } },
      { text: 'Defer again', effects: { money: -50, morale: -3, hope: -3 }, reveal: 'You defer. The interest compounds. The debt grows. It will always grow. You are a revenue stream with a degree.' },
      { text: 'Public Service Loan Forgiveness', requires: ['teacher', 'healthcare-worker'], effects: { morale: 8, money: -100, hope: 5 }, reveal: 'The Teacher and Healthcare Worker qualify for PSLF. They\'ve been paying for 8 years. They need 10. They will probably need 15. The program is "underfunded." The program is always underfunded.' },
    ]
  },
  {
    id: 'holiday-stress', themes: ['neo-feudalism', 'covid'], months: [11, 12], weight: 5,
    text: 'Holiday stress. You\'re supposed to buy gifts, attend gatherings, and be joyful. Your money is negative. Your morale is lower. The advertisements are relentless. "This holiday season, give the gift of subscription-based oxygen."',
    choices: [
      { text: 'Buy gifts anyway', effects: { money: -400, morale: 3, hope: 3 } },
      { text: 'Homemade gifts', effects: { money: -50, morale: 5, supplies: -1 }, reveal: 'You make gifts. They\'re terrible. They\'re sincere. The recipients don\'t know the difference. You do.' },
      { text: 'Skip the holidays', effects: { morale: -8, money: 50, hope: -5 }, reveal: 'You skip the holidays. Nobody notices. You\'re not sure if that\'s a relief or a tragedy. It\'s both. It\'s always both.' },
    ]
  },
];

// ============================================================
// MONTH METADATA
// ============================================================

const MONTHS = [
  { num: 2,  name: 'February',  short: 'Feb' },
  { num: 3,  name: 'March',     short: 'Mar' },
  { num: 4,  name: 'April',     short: 'Apr' },
  { num: 5,  name: 'May',       short: 'May' },
  { num: 6,  name: 'June',      short: 'Jun' },
  { num: 7,  name: 'July',      short: 'Jul' },
  { num: 8,  name: 'August',    short: 'Aug' },
  { num: 9,  name: 'September', short: 'Sep' },
  { num: 10, name: 'October',   short: 'Oct' },
  { num: 11, name: 'November',  short: 'Nov' },
  { num: 12, name: 'December',  short: 'Dec' },
];

// ============================================================
// THEME METADATA
// ============================================================

const THEMES = {
  climate:       { emoji: '🌍', name: 'CLIMATE',         stat: 'health' },
  aliens:        { emoji: '👽', name: 'ALIENS',          stat: 'hope' },
  cthulhu:       { emoji: '🐙', name: 'CTHULHU',         stat: 'sanity' },
  ai:            { emoji: '🤖', name: 'AI SINGULARITY',  stat: 'agency' },
  covid:         { emoji: '🦠', name: 'COVID 2',         stat: 'infection' },
  kaiju:         { emoji: '🏢', name: 'KAIJU',           stat: 'supplies' },
  'neo-feudalism': { emoji: '💰', name: 'NEO-FEUDALISM', stat: 'money' },
};

// ============================================================
// DEATH CAUSES (by theme)
// ============================================================

const DEATH_CAUSES = {
  climate: [
    'succumbed to heat exhaustion (AC was a luxury)',
    'breathed the air',
    'drowned in a 500-year flood (third one this decade)',
    'was lost in the wildfire evacuation zone',
  ],
  aliens: [
    'died of ontological shock after a Pentagon press conference',
    'was taken. (Nobody noticed for three days.)',
    'was replaced. The replacement files better TPS reports.',
  ],
  cthulhu: [
    'looked upon the face of the Old One and went mad. (Meds were out of network.)',
    'ascended to a higher plane of existence. Rent was due.',
    'tried to comprehend the angles. The angles were non-Euclidean.',
    'joined the Cult. It was a pyramid scheme. Still lost everything.',
  ],
  ai: [
    'was replaced by a more efficient version. The version didn\'t mourn.',
    'trusted the autocomplete. The autocomplete drove into a lake.',
    'was optimized out of existence. Shareholders pleased.',
    'failed the CAPTCHA. Couldn\'t prove they weren\'t a bot. Access revoked.',
  ],
  covid: [
    'died of a completely preventable disease they were too fatigued to care about',
    'went to a superspreader wedding. The couple is fine.',
    'died doing their own research. The research was a Facebook post.',
  ],
  kaiju: [
    'was crushed by a Jaeger. The Jaeger was rated 4.2 stars.',
    'stepped on. Not targeted — just in the way.',
    'died in the evacuation traffic jam. The kaiju hadn\'t even arrived yet.',
  ],
  'neo-feudalism': [
    'died of a treatable condition. Treatment was out of network.',
    'was crushed by medical debt. Literally. The bills were heavy.',
    'starved. The food was available. The price was not.',
    'was evicted from existence. The eviction notice was 4pt font.',
  ],
  general: [
    'died of despair',
    'was lost to the algorithm',
    'perished in the doomscroll',
    'lost the will to continue after reading the news',
  ],
};
