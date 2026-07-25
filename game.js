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
