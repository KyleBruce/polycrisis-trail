// ⚰️ POLYCRISIS TRAIL — Phase 1: Opening Sequence
// Vanilla JS. No deps. No build step. Just suffering.


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
        <div class="section-title">The Trail Awaits — 11 Months, 7 Crises</div>
        <div class="event-card">
          <div class="event-theme">🐙 CTHULHU</div>
          <div class="event-text">Strange dreams. The geometry of your apartment is wrong. Sanity check incoming.</div>
        </div>
        <div class="event-card">
          <div class="event-theme">🤖 AI SINGULARITY</div>
          <div class="event-text">AGI rumors leak. Tech stocks surge. Your AI Researcher is not sleeping.</div>
        </div>
      </div>

      <div class="cta">
        <button class="cta-button" onclick="beginTrail()">BEGIN THE TRAIL →</button>
      </div>
    </div>
  `);
  showScreen('game');
}

function beginTrail() {
  initRun();
  renderMonthScreen();
}

// ============================================================
// PHASE 2: THE TRAIL LOOP
// ============================================================

// --- Run state (separate from setup state) ---
let run = null;

// Events per month from the design doc's 12-month table.
// More themes active = more events = the polycrisis.
const EVENTS_PER_MONTH = {
  2: 2,   // Feb: Cthulhu dreams + AGI rumors
  3: 3,   // Mar: UAP footage + WHO pandemic + Pacific sonar
  4: 3,   // Apr: Tornadoes + Innsmouth + Rent increase
  5: 2,   // May: Wildfires + Mass layoffs
  6: 4,   // Jun: Heat dome + Coastal anomalies + Summer surge + First emergence
  7: 3,   // Jul: Congressional hearing + Healthcare denied + Cult recruitment
  8: 3,   // Aug: Hurricane + AI content + Second emergence
  9: 3,   // Sep: AI regulation + Debt compounds + Eldritch wellness
  10: 2,  // Oct: October Surprise + Winter wave
  11: 3,  // Nov: Supply chain + AGI announced + Third emergence
  12: 2,  // Dec: Stars align + Wage theft
};

function initRun() {
  const cls = state.startingClass;
  const staminaMod = cls.staminaMod || 0;
  const moraleMod = cls.moraleMod || 0;
  const healthBonus = (state.resolutions['get-in-shape'] || 0) * 5;
  const sanityBonus = (state.resolutions['therapy'] || 0) * 10;
  const supplies = (state.resolutions['supplies'] || 0) * 4;
  const moneyBonus = (state.resolutions['emergency-fund'] || 0) * 1000;
  const baseMoney = cls.money - (cls.debt || 0) + moneyBonus;

  // Find weakest member for health bonus
  const minHealthIdx = state.party.reduce((mi, m, i, a) => m.health < a[mi].health ? i : mi, 0);

  const members = state.party.map((m, i) => ({
    id: m.id, name: m.name, emoji: m.emoji,
    customName: state.partyNames[m.id] || m.name,
    health: m.health + (i === minHealthIdx ? healthBonus : 0),
    stamina: m.stamina + staminaMod,
    morale: m.morale + moraleMod,
    infection: 0,
    classStat: cls.classStat,
    alive: true,
    buffs: [],
  }));

  // Special class locks
  if (cls.id === 'drowning') members.forEach(m => { if (m.id === 'debt-slave') m.classStat = 1; });
  if (cls.id === 'trust-fund') members.forEach(m => { if (m.id === 'venture-capitalist') m.classStat = 10; });

  run = {
    monthIdx: 0,
    members,
    money: baseMoney,
    supplies: supplies,
    hope: 100,
    sanity: 100 + sanityBonus,
    agency: 100,
    morale: Math.round(members.reduce((s, m) => s + m.morale, 0) / members.length),
    classStat: cls.classStat,
    log: [],
    deadThisRun: [],
    doomscrollPeeked: [],
    resolutionFlags: {
      doomscroll: state.resolutions['doomscroll'] > 0,
      community: state.resolutions['community-organizing'] > 0,
      handy: state.resolutions['learn-trade'] > 0,
      guns: state.resolutions['buy-gun'] || 0,
    },
    eventQueue: [],       // multi-event per month
    currentEvent: null,
    currentChoices: null,
    eventsThisMonth: 0,
    totalEventsThisMonth: 0,
    gameOver: false,
  };

  // Apply doomscroll morale penalty
  if (run.resolutionFlags.doomscroll) {
    run.morale = Math.max(0, run.morale - 15);
  }
}

// --- Stat application ---
function applyEffects(effects) {
  if (!effects) return;
  for (const [key, val] of Object.entries(effects)) {
    switch (key) {
      case 'money': run.money += val; break;
      case 'supplies': run.supplies += val; break;
      case 'hope': run.hope = Math.max(0, Math.min(100, run.hope + val)); break;
      case 'sanity': run.sanity = Math.max(0, Math.min(100, run.sanity + val)); break;
      case 'agency': run.agency = Math.max(0, Math.min(100, run.agency + val)); break;
      case 'morale': run.morale = Math.max(0, Math.min(100, run.morale + val)); break;
      case 'classStat': run.classStat = Math.max(1, Math.min(10, run.classStat + val)); break;
      case 'infection':
        // Party-wide infection bump
        run.members.filter(m => m.alive).forEach(m => {
          m.infection = Math.max(0, Math.min(100, m.infection + val));
        });
        break;
      case 'health':
        // Party-wide health
        run.members.filter(m => m.alive).forEach(m => {
          m.health = Math.max(0, Math.min(100, m.health + val));
        });
        break;
      default:
        // Unknown effect keys silently ignored for now
        break;
    }
  }
}

// --- Event drawing ---
function drawEvent(monthNum, excludeIds) {
  const excluded = new Set(excludeIds || []);
  const eligible = EVENTS.filter(e => {
    if (excluded.has(e.id)) return false;
    if (e.months && !e.months.includes(monthNum)) return false;
    return true;
  });

  if (eligible.length === 0) return null;

  // Weighted random
  const totalWeight = eligible.reduce((s, e) => s + (e.weight || 5), 0);
  let roll = Math.random() * totalWeight;
  for (const e of eligible) {
    roll -= (e.weight || 5);
    if (roll <= 0) return e;
  }
  return eligible[eligible.length - 1];
}

function drawMonthEvents(monthNum) {
  const count = EVENTS_PER_MONTH[monthNum] || 1;
  const drawn = [];
  for (let i = 0; i < count; i++) {
    const evt = drawEvent(monthNum, drawn.map(e => e.id));
    if (evt) drawn.push(evt);
  }
  return drawn;
}

// --- Check if choice is available (party member requires) ---
function isChoiceAvailable(choice) {
  if (!choice.requires) return true;
  return choice.requires.every(id => run.members.some(m => m.alive && m.id === id));
}

// --- THEME MECHANICS ---

// Sanity < 20: corrupt choice text
function corruptText(text) {
  if (run.sanity >= 20) return text;
  // Subtle wrongness
  const corruptions = [
    [/you/gi, 'Y̸o̵u'],
    [/the/gi, 't̷h̷e'],
    [/is/gi, '̶i̸s'],
    [/not/gi, 'n̵o̵t'],
    [/are/gi, '̷a̷r̷e'],
    [/will/gi, 'w̷i̴l̸l'],
  ];
  let result = text;
  for (const [pattern, replacement] of corruptions) {
    if (Math.random() < 0.3) {
      result = result.replace(pattern, replacement);
    }
  }
  // Occasionally append something unsettling
  if (Math.random() < 0.2) {
    const suffixes = ['', '', '', ' .', ' ..?', ' ...', ' ̷d̷o̵ ̶y̸o̷u̴?'];
    result += suffixes[Math.floor(Math.random() * suffixes.length)];
  }
  return result;
}

// Sanity < 20: reorder choices
function maybeShuffleChoices(choices) {
  if (run.sanity >= 20) return choices.map((c, i) => ({ ...c, origIdx: i }));
  // Shuffle a copy, keep track of original indices
  const indexed = choices.map((c, i) => ({ ...c, origIdx: i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    if (Math.random() < 0.5) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
  }
  return indexed;
}

// Agency < 50: some choices auto-resolve. Below 30: one choice auto-selected.
function getAgencyAutoChoice(choices) {
  if (run.agency >= 50) return null;
  // AI auto-selects the "most efficient" (first available) choice
  const available = choices.filter(c => isChoiceAvailable(c));
  if (available.length === 0) return null;
  // Below 30, force the AI's pick
  if (run.agency < 30) return available[0];
  // 50-30: 40% chance AI picks for you
  if (Math.random() < 0.4) return available[0];
  return null;
}

// Class < 3: some choices locked. Below 1: only one choice visible.
function isChoiceClassLocked(choice) {
  if (run.classStat >= 3) return false;
  // Lock choices that cost money (the expensive ones)
  if (choice.effects && choice.effects.money && choice.effects.money < -200) {
    if (run.classStat < 3) return true;
  }
  if (run.classStat < 1) {
    // Below class 1: only the first available choice is unlocked
    return true; // Caller handles picking which one stays unlocked
  }
  return false;
}

// Apply theme mechanics to choices and return processed list
function processChoices(rawChoices) {
  let choices = rawChoices.map((c, i) => ({ ...c, origIdx: i }));
  
  // Agency: AI may pre-select
  const autoChoice = getAgencyAutoChoice(choices);
  
  // Sanity: shuffle and corrupt text
  choices = maybeShuffleChoices(choices);
  
  // Class: lock expensive options
  choices = choices.map(c => {
    let locked = !isChoiceAvailable(c);
    if (!locked && isChoiceClassLocked(c)) {
      locked = true;
    }
    return {
      ...c,
      text: corruptText(c.text),
      locked,
      autoSelected: autoChoice && autoChoice.origIdx === c.origIdx,
    };
  });
  
  // If class < 1, unlock only the first available choice
  if (run.classStat < 1) {
    let foundUnlocked = false;
    choices = choices.map(c => {
      if (!c.locked && !foundUnlocked) {
        foundUnlocked = true;
        return c;
      }
      return { ...c, locked: true };
    });
  }
  
  return { choices, autoChoice };
}

// --- Death checks ---
function checkDeaths() {
  const newlyDead = [];

  // Health-based deaths
  run.members.forEach(m => {
    if (m.alive && m.health <= 0) {
      m.alive = false;
      m.deathCause = pickDeathCause('general');
      m.deathMonth = MONTHS[run.monthIdx].name;
      newlyDead.push(m);
    }
  });

  // Hope-based game over
  if (run.hope <= 0 && run.members.some(m => m.alive)) {
    // Hope 0 kills a random member
    const alive = run.members.filter(m => m.alive);
    if (alive.length > 0) {
 const victim = alive[Math.floor(Math.random() * alive.length)];
      victim.alive = false;
      victim.health = 0;
      victim.deathCause = 'died of despair';
      victim.deathMonth = MONTHS[run.monthIdx].name;
      newlyDead.push(victim);
      run.hope = 20; // Partial reset so game continues
    }
  }

  // Infection deaths (high infection + low health)
  run.members.forEach(m => {
    if (m.alive && m.infection >= 80 && Math.random() < 0.3) {
      m.alive = false;
      m.health = 0;
      m.deathCause = pickDeathCause('covid');
      m.deathMonth = MONTHS[run.monthIdx].name;
      newlyDead.push(m);
    }
  });

  run.deadThisRun.push(...newlyDead);
  return newlyDead;
}

function pickDeathCause(theme) {
  const pool = DEATH_CAUSES[theme] || DEATH_CAUSES.general;
  return pool[Math.floor(Math.random() * pool.length)];
}

function isGameOver() {
  return !run.members.some(m => m.alive);
}

// --- Endings ---
function getEnding() {
  const survivors = run.members.filter(m => m.alive);
  const survivorCount = survivors.length;

  if (survivorCount === 0) {
    return { id: 'total-wipe', name: 'Total Party Wipe', emoji: '💀',
      text: 'Everyone is dead. The polycrisis didn\'t even notice. Standard Oregon Trail experience.' };
  }

  if (survivorCount === 4 && run.hope > 80 && run.sanity > 80 && run.agency > 80) {
    return { id: 'perfect-run', name: 'Perfect Run', emoji: '🏆',
      text: 'All four survivors. All stats above 80. Statistically impossible. Somebody cheated.' };
  }

  if (run.sanity <= 0 && run.hope > 0) {
    return { id: 'ascension', name: 'Ascension', emoji: '🌀',
      text: 'Sanity hit 0, but Hope survived. You didn\'t die. You became something else. The save file is corrupted.' };
  }

  if (run.hope > 50 && run.sanity > 50 && run.agency > 50 && survivorCount >= 3) {
    return { id: 'good-timeline', name: 'The Good Timeline', emoji: '🌟',
      text: 'You\'re not okay but you\'re okay-er than most. 3+ survivors, stats holding. Take the win.' };
  }

  // Default survival
  return { id: 'you-made-it', name: 'You Made It', emoji: '⚔️',
    text: 'At least one survivor. It\'s 2027. The bar is on the floor and you cleared it.' };
}

// ============================================================
// TRAIL UI RENDERING (Phase 3: multi-event months + theme mechanics)
// ============================================================

function renderMonthScreen() {
  const month = MONTHS[run.monthIdx];

  // Draw all events for this month
  if (run.eventQueue.length === 0) {
    run.eventQueue = drawMonthEvents(month.num);
    run.eventsThisMonth = 0;
    run.totalEventsThisMonth = run.eventQueue.length;
  }

  // Pop next event from queue
  const event = run.eventQueue.shift();
  run.currentEvent = event;
  run.eventsThisMonth++;

  // Build status bar with theme warnings
  const aliveMembers = run.members.filter(m => m.alive);
  const avgHealth = Math.round(aliveMembers.reduce((s, m) => s + m.health, 0) / aliveMembers.length);

  const themeWarnings = [];
  if (run.sanity < 20) themeWarnings.push('<span class="theme-warning sanity-warn">⚠ SANITY CRITICAL</span>');
  if (run.agency < 30) themeWarnings.push('<span class="theme-warning agency-warn">⚠ AI OVERRIDE ACTIVE</span>');
  else if (run.agency < 50) themeWarnings.push('<span class="theme-warning agency-warn">⚠ AGENCY ERODING</span>');
  if (run.classStat < 3) themeWarnings.push('<span class="theme-warning class-warn">⚠ CLASS ' + run.classStat + ' — OPTIONS LIMITED</span>');
  if (run.hope < 30) themeWarnings.push('<span class="theme-warning hope-warn">⚠ HOPE FAILING</span>');

  const statusBar = `
    <div class="status-bar">
      <div class="status-item"><span class="stat-icon">💰</span> $${run.money.toLocaleString()}</div>
      <div class="status-item"><span class="stat-icon">📦</span> ${run.supplies}</div>
      <div class="status-item"><span class="stat-icon">❤️</span> ${avgHealth}</div>
      <div class="status-item"><span class="stat-icon">😊</span> ${run.morale}</div>
      <div class="status-item"><span class="stat-icon">🕯️</span> ${run.hope}</div>
      <div class="status-item ${run.sanity < 20 ? 'stat-critical' : ''}"><span class="stat-icon">🧠</span> ${run.sanity}</div>
      <div class="status-item ${run.agency < 30 ? 'stat-critical' : ''}"><span class="stat-icon">🤖</span> ${run.agency}</div>
    </div>
    ${themeWarnings.length ? '<div class="theme-warnings">' + themeWarnings.join(' ') + '</div>' : ''}
  `;

  const memberRow = aliveMembers.map(m => {
    const infBadge = m.infection > 0 ? ` <span class="chip-inf">🦠${m.infection}</span>` : '';
    return `
      <div class="member-chip" title="${esc(m.customName)} — HP:${m.health} STA:${m.stamina} MOR:${m.morale} INF:${m.infection}">
        <span class="chip-emoji">${m.emoji}</span>
        <span class="chip-name">${esc(m.customName)}</span>
        <span class="chip-hp">${m.health}</span>${infBadge}
      </div>
    `;
  }).join('');

  // Event display with theme mechanics
  let eventHTML = '';
  if (event) {
    const themeBadges = event.themes.map(t => {
      const tm = THEMES[t];
      return tm ? `<span class="theme-badge">${tm.emoji} ${tm.name}</span>` : '';
    }).join(' ');

    const { choices, autoChoice } = processChoices(event.choices);
    run.currentChoices = choices;
    run.currentAutoChoice = autoChoice;

    const eventText = run.sanity < 20 ? corruptText(event.text) : event.text;

    const choicesHTML = choices.map((c, i) => {
      const reqText = c.requires ? ` <span class="choice-req">(${c.requires.map(id => {
        const pm = PARTY_MEMBERS.find(p => p.id === id);
        return pm ? pm.name : id;
      }).join(' + ')})</span>` : '';
      const lockedIcon = c.locked ? '🔒 ' : '';
      const autoIcon = c.autoSelected ? '🤖 ' : '';
      return `
        <button class="choice-btn ${c.autoSelected ? 'auto-selected' : ''}" ${c.locked ? 'disabled' : ''} onclick="makeChoice(${i})">
          ${lockedIcon}${autoIcon}${esc(c.text)}${reqText}
        </button>
      `;
    }).join('');

    const eventCounter = run.totalEventsThisMonth > 1
      ? `<div class="event-counter">Event ${run.eventsThisMonth} of ${run.totalEventsThisMonth} this month</div>`
      : '';

    eventHTML = `
      <div class="event-box">
        ${eventCounter}
        <div class="event-themes">${themeBadges}</div>
        <div class="event-text">${esc(eventText)}</div>
        <div class="choices">${choicesHTML}</div>
      </div>
    `;
  } else {
    eventHTML = `<div class="event-box"><div class="event-text">A quiet month. Nothing happens. You don\'t trust it.</div></div>`;
  }

  setGameHTML(`
    <div class="game-screen screen-content ${run.sanity < 20 ? 'insane' : ''} ${run.agency < 30 ? 'automated' : ''}">
      <div class="game-header">
        <h2>${month.name} 2026</h2>
        <p class="game-subtitle">Month ${run.monthIdx + 1} of 11 · The trail continues</p>
      </div>
      ${statusBar}
      <div class="member-row">${memberRow}</div>
      ${eventHTML}
      <div class="month-progress">
        ${MONTHS.map((m, i) => `<div class="progress-dot ${i < run.monthIdx ? 'done' : ''} ${i === run.monthIdx ? 'current' : ''}"></div>`).join('')}
      </div>
    </div>
  `);
  showScreen('game');

  // If agency auto-selected a choice, highlight it after a delay
  if (autoChoice) {
    setTimeout(() => {
      const btns = document.querySelectorAll('.choice-btn.auto-selected');
      btns.forEach(b => b.classList.add('auto-flash'));
    }, 800);
  }
}

function makeChoice(idx) {
  const event = run.currentEvent;
  if (!event) return;
  const choice = run.currentChoices[idx];
  if (!choice || choice.locked) return;

  // Use origIdx to get the original choice data (before shuffling/corruption)
  const originalChoice = event.choices[choice.origIdx];

  // Apply effects
  applyEffects(originalChoice.effects);

  // Log it
  run.log.push({
    month: MONTHS[run.monthIdx].name,
    event: event.text,
    choice: originalChoice.text,
    effects: originalChoice.effects,
    reveal: originalChoice.reveal || null,
  });

  // Check deaths
  const dead = checkDeaths();

  // Show outcome
  renderOutcome(originalChoice, dead, choice.autoSelected);
}

function renderOutcome(choice, dead, wasAutoSelected) {
  const month = MONTHS[run.monthIdx];

  // Build effect summary
  const effectParts = [];
  if (choice.effects) {
    for (const [key, val] of Object.entries(choice.effects)) {
      const labels = {
        money: val >= 0 ? `+$${val}` : `-$${Math.abs(val)}`,
        supplies: val >= 0 ? `+${val} supplies` : `-${Math.abs(val)} supplies`,
        health: val >= 0 ? `+${val} HP` : `-${Math.abs(val)} HP`,
        morale: val >= 0 ? `+${val} morale` : `-${Math.abs(val)} morale`,
        hope: val >= 0 ? `+${val} hope` : `-${Math.abs(val)} hope`,
        sanity: val >= 0 ? `+${val} sanity` : `-${Math.abs(val)} sanity`,
        agency: val >= 0 ? `+${val} agency` : `-${Math.abs(val)} agency`,
        classStat: val >= 0 ? `+${val} class` : `-${Math.abs(val)} class`,
        infection: val >= 0 ? `+${val} infection` : `${val} infection`,
      };
      if (labels[key]) effectParts.push(`<span class="effect-tag ${val >= 0 ? 'positive' : 'negative'}">${labels[key]}</span>`);
    }
  }

  const autoNote = wasAutoSelected ? '<div class="auto-note">🤖 This choice was auto-selected by the AI. You could have overridden it. Did you?</div>' : '';
  const revealHTML = choice.reveal ? `<div class="outcome-reveal">${esc(choice.reveal)}</div>` : '';
  const effectsHTML = effectParts.length ? `<div class="effect-list">${effectParts.join('')}</div>` : '';

  // Death display
  let deathHTML = '';
  if (dead.length > 0) {
    deathHTML = dead.map(d => `
      <div class="death-notice">
        <span class="death-emoji">⚰️</span>
        <span class="death-name">${esc(d.customName)}</span>
        <span class="death-cause">${esc(d.deathCause)}</span>
        <span class="death-month">${esc(d.deathMonth)}</span>
      </div>
    `).join('');
  }

  // Check game over
  const over = isGameOver();

  // Check if more events this month
  const hasMoreEvents = run.eventQueue.length > 0;

  let continueBtn;
  if (over) {
    continueBtn = `<button class="nav-btn nav-continue" onclick="renderGameOver()">View Final Results →</button>`;
  } else if (hasMoreEvents) {
    continueBtn = `<button class="nav-btn nav-continue" onclick="renderMonthScreen()">Next event →</button>`;
  } else {
    const nextMonthName = run.monthIdx + 1 < MONTHS.length ? MONTHS[run.monthIdx + 1].name : '2027';
    const isLastMonth = run.monthIdx + 1 >= MONTHS.length;
    continueBtn = `<button class="nav-btn nav-continue" onclick="nextMonth()">Continue to ${nextMonthName} →</button>`;
  }

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>${month.name} — Outcome</h2>
      </div>
      <div class="outcome-box">
        <div class="outcome-choice">${wasAutoSelected ? '🤖 AI chose:' : 'You chose:'} ${esc(choice.text)}</div>
        ${effectsHTML}
        ${revealHTML}
        ${autoNote}
      </div>
      ${deathHTML}
      <div class="game-nav">
        <span></span>
        ${continueBtn}
      </div>
    </div>
  `);
  showScreen('game');
}

function nextMonth() {
  run.monthIdx++;
  if (run.monthIdx >= MONTHS.length) {
    renderGameOver();
  } else {
    // Clear event queue for new month
    run.eventQueue = [];
    // Monthly upkeep: infection spread, supply drain
    monthlyUpkeep();
    renderMonthScreen();
  }
}

function monthlyUpkeep() {
  // Supplies drain
  run.supplies = Math.max(0, run.supplies - 1);

  // If no supplies, health drains
  if (run.supplies === 0) {
    run.members.filter(m => m.alive).forEach(m => {
      m.health = Math.max(0, m.health - 5);
    });
  }

  // Infection spread: infected members can spread to others
  const infected = run.members.filter(m => m.alive && m.infection > 20);
  if (infected.length > 0) {
    run.members.filter(m => m.alive && m.infection < 20).forEach(m => {
      if (Math.random() < 0.3) {
        m.infection = Math.min(100, m.infection + 10);
      }
    });
  }

  // Healthcare Worker reduces infection
  const hcw = run.members.find(m => m.alive && m.id === 'healthcare-worker');
  if (hcw) {
    run.members.filter(m => m.alive).forEach(m => {
      m.infection = Math.max(0, m.infection - 5);
    });
  }

  // Negative money compounds as debt (neo-feudalism)
  if (run.money < 0) {
    run.money = Math.round(run.money * 1.05); // 5% interest on debt
  }

  // Cultist periodic morale drain
  const cultist = run.members.find(m => m.alive && m.id === 'cultist');
  if (cultist && Math.random() < 0.3) {
    run.morale = Math.max(0, run.morale - 3);
  }
}

function renderGameOver() {
  run.gameOver = true;
  const ending = getEnding();
  const survivors = run.members.filter(m => m.alive);
  const dead = run.deadThisRun;

  const survivorHTML = survivors.length ? survivors.map(m => `
    <div class="summary-member">
      <span class="summary-emoji">${m.emoji}</span>
      <div class="summary-member-info">
        <div class="summary-name">${esc(m.customName)}</div>
        <div class="summary-job">${m.name} · HP:${m.health} · INF:${m.infection}</div>
      </div>
      <span class="mini-stat">✓ SURVIVED</span>
    </div>
  `).join('') : '<div class="buff-item dim">No survivors.</div>';

  const deadHTML = dead.length ? dead.map(m => `
    <div class="summary-member dead-member">
      <span class="summary-emoji">⚰️</span>
      <div class="summary-member-info">
        <div class="summary-name">${esc(m.customName)}</div>
        <div class="summary-job">${m.name} — ${esc(m.deathCause)}</div>
      </div>
      <span class="mini-stat">${esc(m.deathMonth || '?')}</span>
    </div>
  `).join('') : '';

  const finalStats = `
    <div class="resource-item"><span class="res-icon">💰</span> <span class="res-label">Money</span> <span class="res-val">$${run.money.toLocaleString()}</span></div>
    <div class="resource-item"><span class="res-icon">📦</span> <span class="res-label">Supplies</span> <span class="res-val">${run.supplies}</span></div>
    <div class="resource-item"><span class="res-icon">🕯️</span> <span class="res-label">Hope</span> <span class="res-val">${run.hope}</span></div>
    <div class="resource-item"><span class="res-icon">🧠</span> <span class="res-label">Sanity</span> <span class="res-val">${run.sanity}</span></div>
    <div class="resource-item"><span class="res-icon">🤖</span> <span class="res-label">Agency</span> <span class="res-val">${run.agency}</span></div>
    <div class="resource-item"><span class="res-icon">😊</span> <span class="res-label">Morale</span> <span class="res-val">${run.morale}</span></div>
  `;

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>${ending.emoji} ${ending.name}</h2>
        <p class="game-subtitle">${esc(ending.text)}</p>
      </div>

      <div class="summary-section">
        <div class="section-title">Survivors (${survivors.length}/4)</div>
        <div class="summary-party">${survivorHTML}</div>
      </div>

      ${deadHTML ? `<div class="summary-section"><div class="section-title">The Fallen</div><div class="summary-party">${deadHTML}</div></div>` : ''}

      <div class="summary-section">
        <div class="section-title">Final Stats</div>
        <div class="summary-resources">${finalStats}</div>
      </div>

      <div class="summary-section">
        <div class="section-title">Run Summary</div>
        <div class="run-summary">
          ${survivors.length}/4 survived. ${dead.length} fallen. Money: $${run.money.toLocaleString()}. ${run.log.length} events endured.
        </div>
      </div>

      <div class="phase-end">
        <div class="tombstone">⚰️ ${ending.emoji}</div>
        <button class="nav-btn nav-continue" onclick="restartGame()">↻ Play Again</button>
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
  run = null;
  renderClassSelection();
}

function restartGame() {
  startGame();
}

// ============================================================
// INIT
// ============================================================

function init() {
  console.log('[Polycrisis Trail] init() called, readyState:', document.readyState);
  const btn = document.getElementById('begin-trail-btn');
  console.log('[Polycrisis Trail] button found:', !!btn);
  if (btn) {
    btn.addEventListener('click', startGame);
    console.log('[Polycrisis Trail] click listener attached');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
