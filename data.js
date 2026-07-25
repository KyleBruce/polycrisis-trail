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
