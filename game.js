// ⚰️ POLYCRISIS TRAIL — Phase 1: Opening Sequence
// Vanilla JS. No deps. No build step. Just suffering.

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
// GAME STATE
// ============================================================

const state = {
  startingClass: null,
  party: [],
  partyNames: {},
  resolutions: {},
  tokensRemaining: 10,
};

// ============================================================
// DOM HELPERS
// ============================================================

function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ============================================================
// SCREEN MANAGEMENT
// ============================================================

function showScreen(name) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setGameHTML(html) {
  $('#game-root').innerHTML = html;
}

// ============================================================
// SCREEN 1: CLASS SELECTION
// ============================================================

function renderClassSelection() {
  const cards = STARTING_CLASSES.map(c => `
    <div class="game-card class-card" data-id="${c.id}" onclick="selectClass('${c.id}')">
      <div class="card-header">
        <span class="card-emoji">${c.emoji}</span>
        <span class="card-title">${c.name}</span>
      </div>
      <div class="card-stats">
        <div class="stat-row"><span class="stat-label">Money</span><span class="stat-val">$${c.money.toLocaleString()}</span></div>
        <div class="stat-row"><span class="stat-label">Class</span><span class="stat-val">${c.classStat}/10</span></div>
        ${c.debt ? `<div class="stat-row stat-bad"><span class="stat-label">Debt</span><span class="stat-val">-$${c.debt.toLocaleString()}</span></div>` : ''}
      </div>
      <div class="card-perk">✦ ${esc(c.perk)}</div>
      <div class="card-penalty">✗ ${esc(c.penalty)}</div>
      <div class="card-vibe">${esc(c.vibe)}</div>
    </div>
  `).join('');

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>CHOOSE YOUR STARTING POSITION</h2>
        <p class="game-subtitle">Your economic reality. No refunds. No transfers.</p>
      </div>
      <div class="card-grid">${cards}</div>
      <div class="game-nav">
        <button class="nav-btn nav-back" onclick="showScreen('landing')">← Back</button>
        <button class="nav-btn nav-continue" id="btn-class-continue" disabled onclick="renderPartySelection()">Continue →</button>
      </div>
    </div>
  `);
  showScreen('game');
}

function selectClass(id) {
  state.startingClass = STARTING_CLASSES.find(c => c.id === id);
  $$('.class-card').forEach(c => c.classList.remove('selected'));
  $(`.class-card[data-id="${id}"]`).classList.add('selected');
  $('#btn-class-continue').disabled = false;
}

// ============================================================
// SCREEN 2: PARTY SELECTION
// ============================================================

function renderPartySelection() {
  if (!state.startingClass) { renderClassSelection(); return; }

  const cls = state.startingClass;
  const cards = PARTY_MEMBERS.map(m => {
    const unlocked = !m.locked || cls.unlocks.includes(m.id);
    const selected = state.party.some(p => p.id === m.id);
    const classes = ['game-card', 'member-card'];
    if (!unlocked) classes.push('locked');
    if (selected) classes.push('selected');

    return `
      <div class="${classes.join(' ')}" data-id="${m.id}" ${unlocked ? `onclick="togglePartyMember('${m.id}')"` : ''}>
        <div class="card-header">
          <span class="card-emoji">${m.emoji}</span>
          <span class="card-title">${m.name}</span>
          ${!unlocked ? '<span class="lock-icon">🔒</span>' : ''}
        </div>
        <div class="card-stats">
          <div class="stat-row"><span class="stat-label">HP</span><span class="stat-val">${m.health}</span></div>
          <div class="stat-row"><span class="stat-label">STA</span><span class="stat-val">${m.stamina}</span></div>
          <div class="stat-row"><span class="stat-label">MOR</span><span class="stat-val">${m.morale}</span></div>
        </div>
        <div class="card-trait">${esc(m.trait)}</div>
        <div class="card-details">${esc(m.details)}</div>
      </div>
    `;
  }).join('');

  // Show active synergies
  const activeSynergies = SYNERGIES.filter(s =>
    s.members.every(id => state.party.some(p => p.id === id))
  );
  const synergyHTML = activeSynergies.length
    ? `<div class="synergy-box"><div class="section-title">Active Synergies</div>${activeSynergies.map(s => `<div class="synergy-hint">${s.hint}</div>`).join('')}</div>`
    : '';

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>ASSEMBLE YOUR PARTY</h2>
        <p class="game-subtitle">Pick 4. Choose wisely — no party handles all seven crises equally.</p>
        <div class="class-summary">${cls.emoji} ${cls.name} · $${cls.money.toLocaleString()} · Class ${cls.classStat}</div>
      </div>
      <div class="party-counter">Selected: <span id="party-count">${state.party.length}</span>/4</div>
      <div class="card-grid member-grid">${cards}</div>
      ${synergyHTML}
      <div class="game-nav">
        <button class="nav-btn nav-back" onclick="renderClassSelection()">← Back</button>
        <button class="nav-btn nav-continue" id="btn-party-continue" ${state.party.length !== 4 ? 'disabled' : ''} onclick="renderNameParty()">Continue →</button>
      </div>
    </div>
  `);
  showScreen('game');
}

function togglePartyMember(id) {
  const member = PARTY_MEMBERS.find(m => m.id === id);
  if (!member) return;
  const idx = state.party.findIndex(p => p.id === id);
  if (idx >= 0) {
    state.party.splice(idx, 1);
  } else {
    if (state.party.length >= 4) return;
    state.party.push(member);
  }
  renderPartySelection();
}

// ============================================================
// SCREEN 3: NAME YOUR PARTY
// ============================================================

function renderNameParty() {
  if (state.party.length !== 4) { renderPartySelection(); return; }

  const inputs = state.party.map((m, i) => `
    <div class="name-row">
      <div class="name-emoji">${m.emoji}</div>
      <div class="name-info">
        <div class="name-job">${m.name}</div>
        <div class="name-trait">${esc(m.trait)}</div>
      </div>
      <input type="text" class="name-input" data-idx="${i}" data-id="${m.id}"
        value="${esc(state.partyNames[m.id] || m.name)}"
        placeholder="${esc(m.name)}"
        maxlength="20" />
    </div>
  `).join('');

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>NAME YOUR PARTY</h2>
        <p class="game-subtitle">When they die, the tombstone remembers.</p>
      </div>
      <div class="name-list">${inputs}</div>
      <div class="game-nav">
        <button class="nav-btn nav-back" onclick="renderPartySelection()">← Back</button>
        <button class="nav-btn nav-continue" onclick="saveNames()">Continue →</button>
      </div>
    </div>
  `);

  // Wire up input listeners
  $$('.name-input').forEach(inp => {
    inp.addEventListener('input', () => {
      const id = inp.dataset.id;
      state.partyNames[id] = inp.value.trim() || PARTY_MEMBERS.find(m => m.id === id).name;
    });
  });

  showScreen('game');
}

function saveNames() {
  $$('.name-input').forEach(inp => {
    const id = inp.dataset.id;
    state.partyNames[id] = inp.value.trim() || PARTY_MEMBERS.find(m => m.id === id).name;
  });
  renderResolutions();
}

// ============================================================
// SCREEN 4: NEW YEAR'S RESOLUTIONS
// ============================================================

function renderResolutions() {
  if (Object.keys(state.resolutions).length === 0) {
    state.tokensRemaining = 10;
    state.resolutions = {};
  }

  const rows = RESOLUTIONS.map(r => {
    const allocated = state.resolutions[r.id] || 0;
    const available = isResolutionAvailable(r);
    const canAdd = available && allocated < r.max && state.tokensRemaining > 0;
    const canSub = allocated > 0;

    return `
      <div class="resolution-row ${!available ? 'unavailable' : ''}" data-id="${r.id}">
        <div class="res-info">
          <span class="res-emoji">${r.emoji}</span>
          <div class="res-text">
            <div class="res-name">${r.name} <span class="res-cost">(${r.min}-${r.max} tokens)</span></div>
            <div class="res-effect">${esc(r.effect)}</div>
          </div>
        </div>
        <div class="res-controls">
          <button class="res-btn res-sub" ${!canSub ? 'disabled' : ''} onclick="adjustResolution('${r.id}', -1)">−</button>
          <span class="res-allocated">${allocated}</span>
          <button class="res-btn res-add" ${!canAdd ? 'disabled' : ''} onclick="adjustResolution('${r.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  const spent = 10 - state.tokensRemaining;

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>NEW YEAR'S RESOLUTIONS</h2>
        <p class="game-subtitle">January. 10 Time tokens. Allocate before the polycrisis activates. Indecision costs you.</p>
      </div>
      <div class="token-counter">
        <span class="token-label">TIME TOKENS</span>
        <div class="token-bar">
          ${Array.from({length: 10}, (_, i) =>
            `<div class="token ${i < spent ? 'token-spent' : ''}"></div>`
          ).join('')}
        </div>
        <span class="token-remaining">${state.tokensRemaining} remaining</span>
      </div>
      <div class="resolution-list">${rows}</div>
      <div class="resolution-warning" id="res-warning" style="${state.tokensRemaining > 0 ? '' : 'display:none'}">
        ⚠ Unspent tokens are lost. The deadline is January 31st.
      </div>
      <div class="game-nav">
        <button class="nav-btn nav-back" onclick="renderNameParty()">← Back</button>
        <button class="nav-btn nav-continue" onclick="renderSummary()">Confirm Resolutions →</button>
      </div>
    </div>
  `);
  showScreen('game');
}

function isResolutionAvailable(r) {
  if (r.requires && !r.requires(state.party)) return false;
  return true;
}

function adjustResolution(id, delta) {
  const r = RESOLUTIONS.find(x => x.id === id);
  if (!r) return;
  if (!isResolutionAvailable(r)) return;

  const current = state.resolutions[id] || 0;
  const next = current + delta;

  if (delta > 0) {
    if (next > r.max) return;
    if (state.tokensRemaining <= 0) return;
    state.tokensRemaining--;
  } else {
    if (next < 0) return;
    state.tokensRemaining++;
  }

  state.resolutions[id] = next;
  if (next === 0) delete state.resolutions[id];
  renderResolutions();
}

// ============================================================
// SCREEN 5: SUMMARY / TRAIL BEGINS
// ============================================================

function renderSummary() {
  const cls = state.startingClass;

  // Compute final stats
  const baseMoney = cls.money - (cls.debt || 0);
  const staminaMod = cls.staminaMod || 0;
  const moraleMod = cls.moraleMod || 0;

  let supplies = 0, moneyBonus = 0, healthBonus = 0, sanityBonus = 0;
  let doomscrollActive = false, communityActive = false, gunCount = 0, tradeLearned = false;

  if (state.resolutions['supplies']) supplies += state.resolutions['supplies'] * 4;
  if (state.resolutions['emergency-fund']) moneyBonus += state.resolutions['emergency-fund'] * 1000;
  if (state.resolutions['get-in-shape']) healthBonus += state.resolutions['get-in-shape'] * 5;
  if (state.resolutions['therapy']) sanityBonus += state.resolutions['therapy'] * 10;
  if (state.resolutions['doomscroll']) doomscrollActive = true;
  if (state.resolutions['community-organizing']) communityActive = true;
  if (state.resolutions['buy-gun']) gunCount = state.resolutions['buy-gun'];
  if (state.resolutions['learn-trade']) tradeLearned = true;

  const finalMoney = baseMoney + moneyBonus;
  const finalSanity = 100 + sanityBonus;
  const partyMorale = Math.round(state.party.reduce((s, m) => s + m.morale, 0) / 4 + moraleMod);
  const partyHealth = Math.round(state.party.reduce((s, m) => s + m.health, 0) / 4);
  const minHealthIdx = state.party.reduce((minIdx, m, i, arr) => m.health < arr[minIdx].health ? i : minIdx, 0);

  const partyCards = state.party.map((m, i) => {
    const name = state.partyNames[m.id] || m.name;
    const health = m.health + (i === minHealthIdx ? healthBonus : 0);
    const stamina = m.stamina + staminaMod;
    return `
      <div class="summary-member">
        <span class="summary-emoji">${m.emoji}</span>
        <div class="summary-member-info">
          <div class="summary-name">${esc(name)}</div>
          <div class="summary-job">${m.name}</div>
        </div>
        <div class="summary-stats">
          <span class="mini-stat" title="Health">❤ ${health}</span>
          <span class="mini-stat" title="Stamina">⚡ ${stamina}</span>
          <span class="mini-stat" title="Morale">😊 ${m.morale + moraleMod}</span>
        </div>
      </div>
    `;
  }).join('');

  const buffList = [];
  if (supplies) buffList.push(`📦 ${supplies} Supplies`);
  if (gunCount) buffList.push(`🔫 ${gunCount} Gun${gunCount > 1 ? 's' : ''}`);
  if (doomscrollActive) buffList.push(`📱 Doomscroll (see 3 future events, -15 Morale)`);
  if (communityActive) buffList.push(`✊ Community Organizing (mutual aid unlocked)`);
  if (tradeLearned) buffList.push(`🔧 Handy buff (repair events 50% cheaper)`);
  if (healthBonus) buffList.push(`💪 +${healthBonus} Health to weakest member`);
  if (sanityBonus) buffList.push(`🛋️ +${sanityBonus} Sanity`);

  const buffsHTML = buffList.length
    ? buffList.map(b => `<div class="buff-item">${b}</div>`).join('')
    : '<div class="buff-item dim">No resolutions completed. Bold choice.</div>';

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>THE TRAIL BEGINS</h2>
        <p class="game-subtitle">February 2026. The polycrisis doesn't wait for you to be ready.</p>
      </div>

      <div class="summary-section">
        <div class="section-title">Your Party</div>
        <div class="summary-party">${partyCards}</div>
      </div>

      <div class="summary-section">
        <div class="section-title">Starting Resources</div>
        <div class="summary-resources">
          <div class="resource-item"><span class="res-icon">💰</span> <span class="res-label">Money</span> <span class="res-val">$${finalMoney.toLocaleString()}</span></div>
          <div class="resource-item"><span class="res-icon">📦</span> <span class="res-label">Supplies</span> <span class="res-val">${supplies}</span></div>
          <div class="resource-item"><span class="res-icon">❤️</span> <span class="res-label">Avg Health</span> <span class="res-val">${partyHealth}</span></div>
          <div class="resource-item"><span class="res-icon">😊</span> <span class="res-label">Morale</span> <span class="res-val">${partyMorale}</span></div>
          <div class="resource-item"><span class="res-icon">🧠</span> <span class="res-label">Sanity</span> <span class="res-val">${finalSanity}</span></div>
          <div class="resource-item"><span class="res-icon">🤖</span> <span class="res-label">Agency</span> <span class="res-val">100</span></div>
          <div class="resource-item"><span class="res-icon">🕯️</span> <span class="res-label">Hope</span> <span class="res-val">100</span></div>
        </div>
      </div>

      <div class="summary-section">
        <div class="section-title">Resolutions Completed</div>
        <div class="buff-list">${buffsHTML}</div>
      </div>

      <div class="summary-section">
        <div class="section-title">Active Synergies</div>
        ${(() => {
          const active = SYNERGIES.filter(s => s.members.every(id => state.party.some(p => p.id === id)));
          return active.length
            ? active.map(s => `<div class="synergy-hint">${s.hint}</div>`).join('')
            : '<div class="buff-item dim">No synergies detected. Good luck out there.</div>';
        })()}
      </div>

      <div class="event-teaser">
        <div class="section-title">First Events — February 2026</div>
        <div class="event-card">
          <div class="event-theme">🐙 CTHULHU</div>
          <div class="event-text">Strange dreams plague the party. The geometry of your apartment feels wrong. Sanity check incoming.</div>
        </div>
        <div class="event-card">
          <div class="event-theme">🤖 AI SINGULARITY</div>
          <div class="event-text">AGI rumors leak. Tech stocks surge. Your Tech Bro is excited. Your AI Researcher is not.</div>
        </div>
      </div>

      <div class="phase-end">
        <div class="tombstone">⚰️ The trail continues...</div>
        <div class="phase-msg">Phase 1 complete. The 12-month journey is under development.</div>
        <button class="nav-btn nav-continue" onclick="restartGame()">↻ Start Over</button>
      </div>
    </div>
  `);
  showScreen('game');
}

// ============================================================
// GAME FLOW
// ============================================================

function startGame() {
  // Reset state
  state.startingClass = null;
  state.party = [];
  state.partyNames = {};
  state.resolutions = {};
  state.tokensRemaining = 10;
  renderClassSelection();
}

function restartGame() {
  startGame();
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const btn = $('#begin-trail-btn');
  if (btn) {
    btn.addEventListener('click', startGame);
  }
});
