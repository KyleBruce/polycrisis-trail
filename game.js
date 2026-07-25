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

function showScreen(name, preserveScroll) {
  const screen = document.getElementById('screen-' + name);
  if (!screen) return;
  
  // If already active, don't re-toggle (avoids flash on re-renders)
  if (!screen.classList.contains('active')) {
    $$('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }
  
  if (!preserveScroll) {
    // Use instant scroll for outcome/month transitions to avoid double-scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function setGameHTML(html, opts) {
  const root = $('#game-root');
  if (!root) return;
  
  // If transitioning (not first render), fade out then in
  if (root.children.length > 0 && (!opts || !opts.instant)) {
    root.style.opacity = '0';
    root.style.transform = 'translateY(4px)';
    setTimeout(() => {
      root.innerHTML = html;
      root.style.opacity = '1';
      root.style.transform = 'translateY(0)';
      // Restore scroll position if requested
      if (opts && opts.scrollTop !== undefined) {
        window.scrollTo({ top: opts.scrollTop, behavior: 'instant' });
      }
    }, 150);
  } else {
    root.innerHTML = html;
    root.style.opacity = '1';
    root.style.transform = 'translateY(0)';
  }
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
  showScreen('game', true); // preserve scroll on re-render
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
        <p class="game-subtitle">${(() => { const m = new Date().getMonth()+1; return m < 2 ? 'February' : MONTHS.find(mo => mo.num === m)?.name || 'February'; })()} 2026. The polycrisis doesn't wait for you to be ready.</p>
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
        <div class="section-title">The Trail Awaits — ${MONTHS.slice(Math.max(0, MONTHS.findIndex(mo => mo.num === (new Date().getMonth()+1 < 2 ? 2 : new Date().getMonth()+1)))).length} Months, 7 Crises</div>
        ${(() => {
          const realMonth = new Date().getMonth()+1 < 2 ? 2 : new Date().getMonth()+1;
          const eligible = EVENTS.filter(e => e.months && e.months.includes(realMonth)).slice(0, 2);
          if (eligible.length === 0) return '<div class="event-card"><div class="event-text">The polycrisis is preparing. It will find you.</div></div>';
          return eligible.map(e => {
            const tm = THEMES[e.themes[0]];
            return `<div class="event-card"><div class="event-theme">${tm ? tm.emoji + ' ' + tm.name : ''}</div><div class="event-text">${esc(e.text.substring(0, 100))}${e.text.length > 100 ? '...' : ''}</div></div>`;
          }).join('');
        })()}
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

  // Start at the current real-world month (Jan = resolutions phase, so start at Feb minimum)
  const realMonth = new Date().getMonth() + 1; // 1-12
  const startMonthNum = realMonth < 2 ? 2 : realMonth; // Never start before Feb
  const startMonthIdx = MONTHS.findIndex(m => m.num === startMonthNum);
  const totalMonths = MONTHS.length - Math.max(0, startMonthIdx); // remaining months from start

  run = {
    monthIdx: Math.max(0, startMonthIdx),
    startMonthIdx: Math.max(0, startMonthIdx),
    totalMonths,
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
    let locked = !isChoiceAvailable(c); // locked if requires unavailable
    if (!locked && run.classStat < 3 && c.effects && c.effects.money && c.effects.money < -200) {
      locked = true; // expensive choices locked below class 3
    }
    return {
      ...c,
      text: corruptText(c.text),
      locked,
      autoSelected: autoChoice && autoChoice.origIdx === c.origIdx,
    };
  });
  
  // If class < 1, unlock only the first available choice, lock the rest
  if (run.classStat < 1) {
    let foundUnlocked = false;
    choices = choices.map(c => {
      if (!c.locked && !foundUnlocked) {
        foundUnlocked = true;
        return c; // keep this one unlocked
      }
      return { ...c, locked: true };
    });
  }
  
  // SAFETY: if ALL choices are locked (e.g. all require dead members),
  // add a fallback "do nothing" option
  if (!choices.some(c => !c.locked)) {
    if (choices.length > 0) {
      choices[0] = {
        ...choices[0],
        locked: false,
        text: 'Do nothing. What else can you do?',
        origIdx: -1, // sentinel: no original choice
        isFallback: true,
      };
    }
  }
  
  return { choices, autoChoice };
}

// --- Death checks ---
function checkDeaths() {
  const newlyDead = [];

  // Track what damaged each member most this run for context-aware death cause
  run.members.forEach(m => {
    if (!m.alive) return;
    
    // Health-based deaths
    if (m.health <= 0) {
      m.alive = false;
      m.deathCause = pickDeathCause(m.deathTheme || 'general');
      m.deathMonth = MONTHS[run.monthIdx].name;
      newlyDead.push(m);
      return;
    }
    
    // Infection deaths (high infection + chance)
    if (m.infection >= 80 && Math.random() < 0.3) {
      m.alive = false;
      m.health = 0;
      m.deathCause = pickDeathCause('covid');
      m.deathMonth = MONTHS[run.monthIdx].name;
      newlyDead.push(m);
      return;
    }
    
    // Sanity-based deaths (very low sanity + chance)
    if (run.sanity <= 5 && Math.random() < 0.2) {
      m.alive = false;
      m.health = 0;
      m.deathCause = pickDeathCause('cthulhu');
      m.deathMonth = MONTHS[run.monthIdx].name;
      newlyDead.push(m);
      return;
    }
  });

  // Hope-based death: when hope hits 0, someone gives up
  if (run.hope <= 0 && run.members.some(m => m.alive)) {
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

  // Show tombstone screen for first death
  if (newlyDead.length > 0) {
    run.pendingTombstone = newlyDead[0];
  }

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

// --- Track damage by theme for context-aware death causes ---
function trackDamageTheme(themes, damage) {
  if (!themes || !damage) return;
  // Track which theme is doing the most damage to the party
  if (!run.themeDamage) run.themeDamage = {};
  themes.forEach(t => {
    run.themeDamage[t] = (run.themeDamage[t] || 0) + Math.abs(damage);
  });
}

function getDominantTheme() {
  if (!run.themeDamage) return null;
  let max = 0, dominant = null;
  for (const [theme, dmg] of Object.entries(run.themeDamage)) {
    if (dmg > max) { max = dmg; dominant = theme; }
  }
  return dominant;
}

// --- All 12 endings from DESIGN.md ---
function getEnding() {
  const survivors = run.members.filter(m => m.alive);
  const survivorCount = survivors.length;
  const dominant = getDominantTheme();
  
  // Track damage by theme for ending determination
  const themeDamage = run.themeDamage || {};
  let maxDmg = 0, maxTheme = null;
  for (const [t, d] of Object.entries(themeDamage)) {
    if (d > maxDmg) { maxDmg = d; maxTheme = t; }
  }

  // Total party wipe
  if (survivorCount === 0) {
    return { id: 'total-wipe', name: 'Total Party Wipe', emoji: '💀',
      text: 'Everyone is dead. The polycrisis didn\'t even notice. Standard Oregon Trail experience.' };
  }

  // Perfect run
  if (survivorCount === 4 && run.hope > 80 && run.sanity > 80 && run.agency > 80) {
    return { id: 'perfect-run', name: 'Perfect Run', emoji: '🏆',
      text: 'All four survivors. All stats above 80. Statistically impossible. Somebody cheated.' };
  }

  // Ascension (sanity 0 but hope survived)
  if (run.sanity <= 0 && run.hope > 0) {
    return { id: 'ascension', name: 'Ascension', emoji: '🌀',
      text: 'Sanity hit 0, but Hope survived. You didn\'t die. You became something else. The save file is corrupted.' };
  }

  // Good timeline
  if (run.hope > 50 && run.sanity > 50 && run.agency > 50 && survivorCount >= 3) {
    return { id: 'good-timeline', name: 'The Good Timeline', emoji: '🌟',
      text: 'You\'re not okay but you\'re okay-er than most. 3+ survivors, stats holding. Take the win.' };
  }

  // Themed endings based on dominant damage
  if (maxTheme === 'climate') {
    return { id: 'climate-victory', name: 'Climate Victory', emoji: '🌍',
      text: 'Climate events were the biggest drain. Planet\'s still dying but YOU lived. Lucky? Yes. Hero? No.' };
  }
  if (maxTheme === 'aliens') {
    return { id: 'disclosure', name: 'Disclosure', emoji: '👽',
      text: 'Alien events dominated. You know the truth. So does everyone else. Nobody cares.' };
  }
  if (maxTheme === 'cthulhu') {
    return { id: 'dreamer', name: 'The Dreamer', emoji: '🐙',
      text: 'Cthulhu events dominated. You\'re not sure you survived. The stars are still singing. You listen.' };
  }
  if (maxTheme === 'ai') {
    return { id: 'automated', name: 'Automated', emoji: '🤖',
      text: 'AI events dominated. You survived. The AGI wrote this ending for you. It\'s more efficient than what you would have written.' };
  }
  if (maxTheme === 'covid') {
    return { id: 'herd-immunity', name: 'Herd Immunity', emoji: '🦠',
      text: 'COVID events dominated. Most of your party is dead or disabled. On the bright side, the discourse ended.' };
  }
  if (maxTheme === 'kaiju') {
    return { id: 'collateral', name: 'Collateral Damage', emoji: '🏢',
      text: 'Kaiju events dominated. You lived. Your city didn\'t. Rebuilding begins. Same contractors.' };
  }
  if (maxTheme === 'neo-feudalism') {
    return { id: 'barely-surviving', name: 'Barely Surviving', emoji: '💰',
      text: 'Neo-Feudalism dominated. You made it to 2027 with negative money, Class 1, and no healthcare. Congratulations on your survival. Your bill is in the mail.' };
  }

  // Default survival
  return { id: 'you-made-it', name: 'You Made It', emoji: '⚔️',
    text: 'At least one survivor. It\'s 2027. The bar is on the floor and you cleared it.' };
}

// --- Tombstone persistence (localStorage) ---
const TOMBSTONE_KEY = 'polycrisis-tombstones';

function loadTombstones() {
  try {
    const data = localStorage.getItem(TOMBSTONE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveTombstone(name, cause, month, epitaph) {
  try {
    const tombs = loadTombstones();
    tombs.push({ name, cause, month, epitaph, timestamp: Date.now() });
    // Keep max 50 tombstones
    if (tombs.length > 50) tombs.shift();
    localStorage.setItem(TOMBSTONE_KEY, JSON.stringify(tombs));
  } catch {}
}

function getRandomTombstone() {
  const tombs = loadTombstones();
  if (tombs.length === 0) return null;
  return tombs[Math.floor(Math.random() * tombs.length)];
}

// Apply effects and track which theme caused the damage
const _originalApplyEffects = applyEffects;
function applyEffectsWithTracking(effects, themes) {
  if (!effects) return;
  for (const [key, val] of Object.entries(effects)) {
    const dmgKeys = ['health', 'sanity', 'hope', 'agency', 'morale', 'money', 'supplies'];
    if (dmgKeys.includes(key) && val < 0 && themes) {
      trackDamageTheme(themes, val);
    }
  }
  _originalApplyEffects(effects);
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
  run.mgStep = undefined; // reset mini-game step

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
    const shockedClass = m.shocked ? ' shocked' : '';
    return `
      <div class="member-chip${shockedClass}" title="${esc(m.customName)} — HP:${m.health} STA:${m.stamina} MOR:${m.morale} INF:${m.infection}${m.shocked ? ' · ONTOLOGICAL SHOCK' : ''}">
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

    if (event.miniGame) {
      // MINI-GAME: render current step
      if (run.mgStep === undefined) run.mgStep = 0;
      const step = event.steps[run.mgStep];
      
      if (step) {
        const { choices, autoChoice } = processChoices(step.choices);
        run.currentChoices = choices;
        run.currentAutoChoice = autoChoice;
        run.currentIsMiniGameStep = true;
        
        const stepText = run.sanity < 20 ? corruptText(step.text) : step.text;
        const introText = run.mgStep === 0 ? `<div class="mg-intro">${esc(event.text)}</div>` : '';
        
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
        const stepIndicator = `<div class="mg-step-indicator">Step ${run.mgStep + 1} of ${event.steps.length}</div>`;

        eventHTML = `
          <div class="event-box mini-game-box">
            ${eventCounter}
            <div class="event-themes">${themeBadges}</div>
            ${introText}
            ${stepIndicator}
            <div class="event-text">${esc(stepText)}</div>
            <div class="choices">${choicesHTML}</div>
          </div>
        `;
      }
    } else {
      // REGULAR EVENT
      const { choices, autoChoice } = processChoices(event.choices);
      run.currentChoices = choices;
      run.currentAutoChoice = autoChoice;
      run.currentIsMiniGameStep = false;

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
    }
  } else {
    eventHTML = `<div class="event-box"><div class="event-text">A quiet month. Nothing happens. You don\'t trust it.</div></div>`;
  }

  // Determine visual mode classes for Phase 5 weirdness
  const avgPartyHealth = Math.round(aliveMembers.reduce((s, m) => s + m.health, 0) / aliveMembers.length);
  const hasAlienEvent = event && event.themes.includes('aliens');
  const hasKaijuEvent = event && event.themes.includes('kaiju');
  const visualClasses = [
    run.sanity < 20 ? 'insane' : '',
    run.agency < 30 ? 'automated' : '',
    avgPartyHealth < 30 ? 'fever-haze' : '',
    hasAlienEvent ? 'alien-redact' : '',
    hasKaijuEvent ? 'kaiju-shake' : '',
    run.classStat < 1 ? 'paywall-mode' : '',
  ].filter(Boolean).join(' ');

  // Paywall banner for Class < 1
  const paywallBanner = run.classStat < 1
    ? '<div class="paywall-banner">🔒 PREMIUM CONTENT LOCKED · UPGRADE YOUR CLASS TO ACCESS MORE OPTIONS</div>'
    : '';

  // Update WebAudio based on visual mode
  updateAudioForVisualMode(visualClasses);

  setGameHTML(`
    <div class="game-screen screen-content ${visualClasses}">
      ${paywallBanner}
      <div class="game-header">
        <h2>${month.name} 2026</h2>
        <p class="game-subtitle">Month ${run.monthIdx - run.startMonthIdx + 1} of ${run.totalMonths} · The trail continues</p>
      </div>
      ${statusBar}
      <div class="member-row">${memberRow}</div>
      ${eventHTML}
      <div class="month-progress">
        ${MONTHS.slice(run.startMonthIdx).map((m, i) => {
          const realIdx = run.startMonthIdx + i;
          return `<div class="progress-dot ${realIdx < run.monthIdx ? 'done' : ''} ${realIdx === run.monthIdx ? 'current' : ''}"></div>`;
        }).join('')}
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

  // Handle fallback choice (no original to map to)
  if (choice.isFallback) {
    const fallbackChoice = { text: 'Do nothing. What else can you do?', effects: {}, reveal: 'You do nothing. The polycrisis continues without your input. It was going to anyway.' };
    
    run.log.push({
      month: MONTHS[run.monthIdx].name,
      event: event.text,
      choice: fallbackChoice.text,
      effects: {},
      reveal: fallbackChoice.reveal,
      themes: event.themes,
    });

    const dead = checkDeaths();
    if (dead.length > 0 && !isGameOver()) {
      renderTombstone(dead[0], fallbackChoice);
    } else {
      renderOutcome(fallbackChoice, dead, false);
    }
    return;
  }

  // For mini-game steps, the choice is from step.choices, not event.choices
  const originalChoice = run.currentIsMiniGameStep
    ? event.steps[run.mgStep].choices[choice.origIdx]
    : event.choices[choice.origIdx];

  // Apply effects with theme tracking
  applyEffectsWithTracking(originalChoice.effects, event.themes);

  // Log it
  run.log.push({
    month: MONTHS[run.monthIdx].name,
    event: event.text,
    choice: originalChoice.text,
    effects: originalChoice.effects,
    reveal: originalChoice.reveal || null,
    themes: event.themes,
  });

  // Check deaths
  const dead = checkDeaths();

  // Mini-game: advance to next step or show outcome
  if (run.currentIsMiniGameStep && originalChoice.nextStep !== undefined) {
    const nextStepIdx = originalChoice.nextStep;
    const isLastStep = nextStepIdx >= event.steps.length;
    
    // Show intermediate outcome
    renderMiniGameOutcome(originalChoice, dead, () => {
      if (!isGameOver()) {
        if (isLastStep) {
          // Mini-game complete — continue to next event or month
          run.mgStep = undefined;
          if (run.eventQueue.length > 0) {
            renderMonthScreen();
          } else {
            // Check if more events or advance month
            const hasMoreEvents = run.eventQueue.length > 0;
            if (hasMoreEvents) {
              renderMonthScreen();
            } else {
              const nextMonthName = run.monthIdx + 1 < MONTHS.length ? MONTHS[run.monthIdx + 1].name : '2027';
              // Show continue button
              renderOutcome(originalChoice, dead, choice.autoSelected);
            }
          }
        } else {
          // Advance to next step
          run.mgStep = nextStepIdx;
          renderMonthScreen();
        }
      }
    });
    return;
  }

  // If someone died, show tombstone screen first
  if (dead.length > 0 && !isGameOver()) {
    renderTombstone(dead[0], originalChoice);
  } else {
    renderOutcome(originalChoice, dead, choice.autoSelected);
  }
}

function renderMiniGameOutcome(choice, dead, onContinue) {
  const month = MONTHS[run.monthIdx];

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

  const revealHTML = choice.reveal ? `<div class="outcome-reveal">${esc(choice.reveal)}</div>` : '';
  const effectsHTML = effectParts.length ? `<div class="effect-list">${effectParts.join('')}</div>` : '';

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

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="game-header">
        <h2>${month.name} — Outcome</h2>
      </div>
      <div class="outcome-box">
        <div class="outcome-choice">You chose: ${esc(choice.text)}</div>
        ${effectsHTML}
        ${revealHTML}
      </div>
      ${deathHTML}
      <div class="game-nav">
        <span></span>
        <button class="nav-btn nav-continue" id="mg-continue-btn">Continue →</button>
      </div>
    </div>
  `);
  showScreen('game');
  
  const btn = document.getElementById('mg-continue-btn');
  if (btn) btn.addEventListener('click', onContinue);
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
    // Random tombstone encounter (15% chance, requires existing tombstones)
    if (!maybeShowTombstoneEncounter()) {
      renderMonthScreen();
    }
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

  // Ontological shock: debuffed members are useless this month (no party-member bonuses)
  // Clear last month's shock, apply new ones from alien events
  run.members.forEach(m => {
    if (m.shocked) {
      m.shocked = false; // Clear previous month's shock
    }
  });
  // 20% chance per alive member to get ontological shock if sanity < 40
  if (run.sanity < 40) {
    run.members.filter(m => m.alive).forEach(m => {
      if (Math.random() < 0.15 && !m.id === 'conspiracy-theorist') {
        m.shocked = true; // Useless this month
      }
    });
  }
}

// --- Tombstone screen (shown when a party member dies) ---
function renderTombstone(member, choice) {
  const month = MONTHS[run.monthIdx];
  const revealHTML = choice.reveal ? `<div class="outcome-reveal">${esc(choice.reveal)}</div>` : '';

  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="tombstone-screen">
        <div class="tombstone-graphic">
          ⚰️
        </div>
        <div class="tombstone-name">${esc(member.customName)}</div>
        <div class="tombstone-job">${member.name}</div>
        <div class="tombstone-cause">${esc(member.deathCause)}</div>
        <div class="tombstone-month">${esc(member.deathMonth)} 2026</div>
        <div class="tombstone-epitaph-prompt">Write an epitaph:</div>
        <input type="text" class="epitaph-input" id="epitaph-input" 
          placeholder="Here lies ${esc(member.customName)}..." 
          maxlength="80" />
        <div class="tombstone-actions">
          <button class="nav-btn nav-continue" onclick="saveEpitaphAndContinue('${member.id}')">Continue →</button>
        </div>
      </div>
      ${revealHTML ? '<div class="outcome-box" style="margin-top:1rem">' + revealHTML + '</div>' : ''}
    </div>
  `);
  showScreen('game');

  // Focus the input
  setTimeout(() => {
    const inp = document.getElementById('epitaph-input');
    if (inp) inp.focus();
  }, 100);
}

function saveEpitaphAndContinue(memberId) {
  const member = run.members.find(m => m.id === memberId);
  if (!member) { renderOutcome({text:'',effects:{},reveal:''}, [], false); return; }
  
  const inp = document.getElementById('epitaph-input');
  const epitaph = inp ? inp.value.trim() : '';
  member.epitaph = epitaph || 'Here lies ' + member.customName;
  
  // Save to localStorage for future runs
  saveTombstone(member.customName, member.deathCause, member.deathMonth, member.epitaph);
  
  // Show outcome (with death notice)
  const fakeChoice = { text: 'Continue', effects: {}, reveal: null };
  renderOutcome(fakeChoice, [member], false);
}

// --- Tombstone encounter (random chance in future runs) ---
function maybeShowTombstoneEncounter() {
  const tomb = getRandomTombstone();
  if (!tomb) return false;
  if (Math.random() > 0.15) return false; // 15% chance
  
  // Sanity < 20: tombstone in languages that don't exist
  let epitaph = tomb.epitaph || 'Here lies ' + tomb.name;
  if (run.sanity < 20 && Math.random() < 0.3) {
    // Corrupt the epitaph
    epitaph = epitaph.split('').map(c => Math.random() < 0.3 ? String.fromCharCode(c.charCodeAt(0) + Math.floor(Math.random()*20)+300) : c).join('');
  }
  // High AI: grammatically perfect, emotionally hollow
  if (run.agency < 30 && Math.random() < 0.3) {
    epitaph = 'The aforementioned individual has ceased to be a going concern. Their KPIs were satisfactory.';
  }
  
  setGameHTML(`
    <div class="game-screen screen-content">
      <div class="tombstone-encounter">
        <div class="encounter-label">You pass a grave on the trail:</div>
        <div class="tombstone-graphic small">⚰️</div>
        <div class="tombstone-name">${esc(tomb.name)}</div>
        <div class="tombstone-cause">${esc(tomb.cause)}</div>
        <div class="tombstone-epitaph">"${esc(epitaph)}"</div>
        <div class="tombstone-month">${esc(tomb.month || '')}</div>
      </div>
      <div class="game-nav">
        <span></span>
        <button class="nav-btn nav-continue" onclick="renderMonthScreen()">Continue on the trail →</button>
      </div>
    </div>
  `);
  showScreen('game');
  return true;
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
        ${m.epitaph ? '<div class="epitaph-display">"' + esc(m.epitaph) + '"</div>' : ''}
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

  // Damage by theme pie (text-based)
  const themeDamage = run.themeDamage || {};
  const totalDamage = Object.values(themeDamage).reduce((s, v) => s + v, 0);
  const themeBreakdown = totalDamage > 0 ? Object.entries(themeDamage)
    .sort((a, b) => b[1] - a[1])
    .map(([t, d]) => {
      const tm = THEMES[t];
      const pct = Math.round(d / totalDamage * 100);
      return `<div class="theme-damage-row"><span class="theme-dmg-emoji">${tm ? tm.emoji : '❓'}</span> <span class="theme-dmg-name">${tm ? tm.name : t}</span> <span class="theme-dmg-bar"><span class="theme-dmg-fill" style="width:${pct}%"></span></span> <span class="theme-dmg-pct">${pct}%</span></div>`;
    }).join('') : '<div class="buff-item dim">No damage recorded.</div>';

  // Share card
  const survivorNames = survivors.map(m => m.customName).join(', ') || 'None';
  const deadNames = dead.map(m => m.customName).join(', ') || 'None';
  const shareText = `⚰️ POLYCRISIS TRAIL — ${ending.emoji} ${ending.name}\n\n${survivors.length}/4 survived. ${dead.length} fallen.\nSurvivors: ${survivorNames}\nFallen: ${deadNames}\nMoney: $${run.money.toLocaleString()} · Hope: ${run.hope} · Sanity: ${run.sanity} · Agency: ${run.agency}\n${run.log.length} events endured across 11 months.\n\n"${ending.text}"`;

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

      ${deadHTML ? '<div class="summary-section"><div class="section-title">The Fallen</div><div class="summary-party">' + deadHTML + '</div></div>' : ''}

      <div class="summary-section">
        <div class="section-title">Final Stats</div>
        <div class="summary-resources">${finalStats}</div>
      </div>

      <div class="summary-section">
        <div class="section-title">Damage by Crisis</div>
        <div class="theme-damage-list">${themeBreakdown}</div>
      </div>

      <div class="summary-section">
        <div class="section-title">Share Card</div>
        <div class="share-card">
          <pre class="share-text">${esc(shareText)}</pre>
          <button class="nav-btn" onclick="copyShareCard()">📋 Copy to clipboard</button>
        </div>
      </div>

      <div class="phase-end">
        <div class="tombstone">⚰️ ${ending.emoji}</div>
        <div class="tombstone-count">${loadTombstones().length} tombstones on the trail</div>
        <button class="nav-btn nav-continue" onclick="restartGame()">↻ Play Again</button>
      </div>
    </div>
  `);
  showScreen('game');
}

function copyShareCard() {
  const pre = document.querySelector('.share-text');
  if (!pre) return;
  const text = pre.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Share card copied! Paste it anywhere.');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); alert('Share card copied!'); } catch {}
  document.body.removeChild(ta);
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
  stopAllAudio();
  startGame();
}

// ============================================================
// WEB AUDIO — bass rumble (kaiju), drone (cthulhu)
// Off by default, toggleable via button
// ============================================================

let audioCtx = null;
let audioEnabled = false;
let activeOscs = [];

function toggleAudio() {
  audioEnabled = !audioEnabled;
  const btn = document.getElementById('audio-toggle-btn');
  if (btn) btn.textContent = audioEnabled ? '🔊 Sound: ON' : '🔊 Sound: OFF';
  
  if (audioEnabled) {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        audioEnabled = false;
        if (btn) btn.textContent = '🔊 Sound: UNAVAILABLE';
        return;
      }
    }
    // Resume context (browsers suspend until user interaction)
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } else {
    stopAllAudio();
  }
}

function playDrone(freq, type, gainVal) {
  if (!audioEnabled || !audioCtx) return null;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = 0;
  gain.gain.setTargetAtTime(gainVal, audioCtx.currentTime, 0.5);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  return { osc, gain };
}

function stopAllAudio() {
  activeOscs.forEach(({ osc, gain }) => {
    try {
      gain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);
      setTimeout(() => { try { osc.stop(); } catch {} }, 500);
    } catch {}
  });
  activeOscs = [];
}

function updateAudioForVisualMode(visualClasses) {
  if (!audioEnabled) return;
  
  // Stop current audio
  stopAllAudio();
  
  // Kaiju: bass rumble
  if (visualClasses.includes('kaiju-shake')) {
    const rumble = playDrone(35, 'sine', 0.08);
    const rumble2 = playDrone(52, 'sine', 0.04);
    if (rumble) activeOscs.push(rumble);
    if (rumble2) activeOscs.push(rumble2);
  }
  
  // Cthulhu (insanity): dissonant drone
  if (visualClasses.includes('insane')) {
    const drone = playDrone(55, 'sawtooth', 0.03);
    const drone2 = playDrone(58, 'sawtooth', 0.02); // slight detune for dissonance
    if (drone) activeOscs.push(drone);
    if (drone2) activeOscs.push(drone2);
  }
  
  // Fever haze: low heartbeat
  if (visualClasses.includes('fever-haze')) {
    const heartbeat = playDrone(40, 'triangle', 0.05);
    if (heartbeat) activeOscs.push(heartbeat);
  }
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
