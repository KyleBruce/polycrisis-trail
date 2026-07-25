// Polycrisis Trail — Automated Playtest Simulator
// Simulates full runs without a browser, catching runtime errors and balance issues

const fs = require('fs');
const path = require('path');

// Load data.js
const dataCode = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');
const dataFn = new Function(dataCode + '; return { EVENTS, PARTY_MEMBERS, MONTHS, DEATH_CAUSES };');
const { EVENTS, PARTY_MEMBERS, MONTHS, DEATH_CAUSES } = dataFn();

// Load game.js and extract the functions we need by evaling in a mock context
const gameCode = fs.readFileSync(path.join(__dirname, 'game.js'), 'utf8');

// We can't run game.js directly (needs DOM), but we can re-implement the core logic
// by extracting the functions and running them with a mock `run` object

// --- Core game state ---
const STARTING_CLASSES = [
  { id: 'trust-fund', money: 50000, classStat: 8, debt: 0 },
  { id: 'upper-middle', money: 12000, classStat: 6, debt: 0 },
  { id: 'working', money: 3000, classStat: 4, debt: 0 },
  { id: 'drowning', money: 500, classStat: 2, debt: 5000 },
];

const EVENTS_PER_MONTH = { 2:2, 3:3, 4:3, 5:3, 6:4, 7:3, 8:4, 9:4, 10:3, 11:4, 12:2 };

// Member base stats
const MEMBER_STATS = {};
PARTY_MEMBERS.forEach(m => {
  MEMBER_STATS[m.id] = { health: m.health || 70, stamina: m.stamina || 50, morale: m.morale || 50 };
});

function createRun(classId, partyIds, names) {
  const cls = STARTING_CLASSES.find(c => c.id === classId);
  const members = partyIds.map(id => {
    const pm = PARTY_MEMBERS.find(p => p.id === id);
    const stats = MEMBER_STATS[id] || { health: 70, stamina: 50, morale: 50 };
    return {
      id, name: pm.name, emoji: pm.emoji,
      customName: names[id] || pm.name,
      health: stats.health, stamina: stats.stamina, morale: stats.morale,
      infection: 0, classStat: cls.classStat, alive: true,
      buffs: [], shocked: false, automated: false, longCovid: false,
      deathCause: null, deathMonth: null, deathTheme: null,
    };
  });

  // Special class locks
  if (cls.id === 'drowning') members.forEach(m => { if (m.id === 'debt-slave') m.classStat = 1; });
  if (cls.id === 'trust-fund') members.forEach(m => { if (m.id === 'venture-capitalist') m.classStat = 10; });

  return {
    class: cls.id,
    money: cls.money - (cls.debt || 0),
    supplies: 8,
    hope: 100,
    sanity: 100,
    agency: 100,
    morale: Math.round(members.reduce((s, m) => s + m.morale, 0) / members.length),
    classStat: cls.classStat,
    members,
    monthIdx: 0,
    startMonthIdx: 0,
    log: [],
    deadThisRun: [],
    damageByTheme: {},
    eventQueue: [],
    currentEvent: null,
    gameOver: false,
    mgStep: undefined,
  };
}

// --- Replicated game logic ---
function applyEffects(run, effects) {
  if (!effects) return;
  for (const [key, val] of Object.entries(effects)) {
    switch (key) {
      case 'money': run.money += val; break;
      case 'supplies': run.supplies = Math.max(0, run.supplies + val); break;
      case 'hope': run.hope = Math.max(0, Math.min(100, run.hope + val)); break;
      case 'sanity': run.sanity = Math.max(0, Math.min(100, run.sanity + val)); break;
      case 'agency': run.agency = Math.max(0, Math.min(100, run.agency + val)); break;
      case 'morale': run.morale = Math.max(0, Math.min(100, run.morale + val)); break;
      case 'classStat': run.classStat = Math.max(1, Math.min(10, run.classStat + val)); break;
      case 'infection':
        run.members.filter(m => m.alive).forEach(m => { m.infection = Math.max(0, Math.min(100, m.infection + val)); });
        break;
      case 'health':
        run.members.filter(m => m.alive).forEach(m => { m.health = Math.max(0, Math.min(100, m.health + val)); });
        break;
      case 'longCovid':
        const targets = run.members.filter(m => m.alive && !m.longCovid);
        if (targets.length > 0) targets[Math.floor(Math.random() * targets.length)].longCovid = true;
        break;
      case 'automated':
        const autoTargets = run.members.filter(m => m.alive && !m.automated);
        if (autoTargets.length > 0) autoTargets[Math.floor(Math.random() * autoTargets.length)].automated = true;
        break;
    }
  }
}

function applyEffectsWithTracking(run, effects, themes) {
  applyEffects(run, effects);
  if (effects && themes) {
    themes.forEach(t => {
      run.damageByTheme[t] = run.damageByTheme[t] || { health: 0, hope: 0, sanity: 0, agency: 0, money: 0, supplies: 0, morale: 0 };
      if (effects.health) run.damageByTheme[t].health += Math.abs(effects.health);
      if (effects.hope) run.damageByTheme[t].hope += Math.abs(effects.hope);
      if (effects.sanity) run.damageByTheme[t].sanity += Math.abs(effects.sanity);
      if (effects.agency) run.damageByTheme[t].agency += Math.abs(effects.agency);
      if (effects.money) run.damageByTheme[t].money += Math.abs(effects.money);
      if (effects.supplies) run.damageByTheme[t].supplies += Math.abs(effects.supplies);
      if (effects.morale) run.damageByTheme[t].morale += Math.abs(effects.morale);
    });
  }
}

function isChoiceAvailable(run, choice) {
  if (!choice.requires) return true;
  return choice.requires.every(id => run.members.some(m => m.alive && m.id === id && !m.shocked && !m.automated));
}

function isChoiceClassLocked(run, choice) {
  if (run.classStat >= 3) return false;
  if (choice.effects && choice.effects.money && choice.effects.money < -200) return true;
  if (run.classStat < 1) return true;
  return false;
}

function processChoices(run, rawChoices) {
  let choices = rawChoices.map((c, i) => ({ ...c, origIdx: i }));
  
  // Agency auto-select
  let autoChoice = null;
  if (run.agency < 50) {
    const conspiracy = run.members.find(m => m.alive && m.id === 'conspiracy-theorist');
    if (!conspiracy) {
      const available = choices.filter(c => isChoiceAvailable(run, c));
      if (available.length > 0) {
        if (run.agency < 30) autoChoice = available[0];
        else if (Math.random() < 0.4) autoChoice = available[0];
      }
    }
  }

  // Class locking
  choices = choices.map(c => {
    let locked = !isChoiceAvailable(run, c);
    if (!locked && run.classStat < 3 && c.effects && c.effects.money && c.effects.money < -200) locked = true;
    return { ...c, locked, autoSelected: autoChoice && autoChoice.origIdx === c.origIdx };
  });

  // Class < 1: only first available unlocked
  if (run.classStat < 1) {
    let foundUnlocked = false;
    choices = choices.map(c => {
      if (!c.locked && !foundUnlocked) { foundUnlocked = true; return c; }
      return { ...c, locked: true };
    });
  }

  // Fallback if all locked
  if (!choices.some(c => !c.locked)) {
    if (choices.length > 0) {
      choices[0] = { ...choices[0], locked: false, text: 'Do nothing', origIdx: -1, isFallback: true };
    }
  }

  return { choices, autoChoice };
}

function pickDeathCause(run, theme) {
  const causes = DEATH_CAUSES[theme] || DEATH_CAUSES.general;
  return causes[Math.floor(Math.random() * causes.length)];
}

function checkDeaths(run) {
  const newlyDead = [];
  run.members.forEach(m => {
    if (!m.alive) return;
    if (m.health <= 0) {
      m.alive = false;
      m.deathCause = pickDeathCause(run, m.deathTheme || 'general');
      m.deathMonth = MONTHS[run.monthIdx]?.name || 'Unknown';
      newlyDead.push(m);
      return;
    }
    if (m.infection >= 80 && Math.random() < 0.3) {
      m.alive = false;
      m.health = 0;
      m.deathCause = pickDeathCause(run, 'covid');
      m.deathMonth = MONTHS[run.monthIdx]?.name || 'Unknown';
      newlyDead.push(m);
      return;
    }
    if (run.hope <= 0) {
      m.alive = false;
      m.deathCause = pickDeathCause(run, 'general');
      m.deathMonth = MONTHS[run.monthIdx]?.name || 'Unknown';
      newlyDead.push(m);
    }
  });
  return newlyDead;
}

function monthlyUpkeep(run) {
  run.supplies = Math.max(0, run.supplies - 1);
  if (run.supplies === 0) {
    run.members.filter(m => m.alive).forEach(m => { m.health = Math.max(0, m.health - 8); });
  }

  // Low morale drains sanity (despair feeds madness)
  if (run.morale < 20) {
    run.sanity = Math.max(0, run.sanity - 2);
  }

  // Infection spread
  const infected = run.members.filter(m => m.alive && m.infection > 20);
  if (infected.length > 0) {
    run.members.filter(m => m.alive && m.infection < 20).forEach(m => {
      if (Math.random() < 0.3) m.infection = Math.min(100, m.infection + 10);
    });
  }

  // Healthcare Worker reduces infection
  const hcw = run.members.find(m => m.alive && m.id === 'healthcare-worker');
  if (hcw) {
    run.members.filter(m => m.alive).forEach(m => { m.infection = Math.max(0, m.infection - 5); });
  }

  // Debt compounds
  if (run.money < 0) run.money = Math.round(run.money * 1.05);

  // Cultist morale drain
  const cultist = run.members.find(m => m.alive && m.id === 'cultist');
  if (cultist && Math.random() < 0.3) run.morale = Math.max(0, run.morale - 3);

  // Ontological shock
  run.members.forEach(m => { if (m.shocked) m.shocked = false; });
  if (run.sanity < 40) {
    run.members.filter(m => m.alive).forEach(m => {
      if (Math.random() < 0.15 && m.id !== 'conspiracy-theorist') m.shocked = true;
    });
  }

  // Member traits
  const gigWorker = run.members.find(m => m.alive && m.id === 'gig-worker');
  if (gigWorker && run.supplies < 5 && Math.random() < 0.3) run.supplies += 1;

  const teacher = run.members.find(m => m.alive && m.id === 'teacher');
  if (teacher && Math.random() < 0.15) teacher.classStat = Math.max(1, teacher.classStat - 0.1);

  if (hcw) {
    const infCount = run.members.filter(m => m.alive && m.infection > 20).length;
    if (infCount > 0) hcw.morale = Math.max(0, hcw.morale - infCount * 0.5);
  }

  const essWorker = run.members.find(m => m.alive && m.id === 'essential-worker');
  if (essWorker) {
    essWorker.infection = 0;
    if (Math.random() < 0.2) essWorker.morale = Math.max(0, essWorker.morale - 2);
  }

  const prepper = run.members.find(m => m.alive && m.id === 'disaster-prepper');
  if (prepper && run.money > 100 && Math.random() < 0.25) {
    run.money = Math.max(0, run.money - 50);
    run.supplies += 2;
  }

  const debtSlave = run.members.find(m => m.alive && m.id === 'debt-slave');
  if (debtSlave && run.money < 0) debtSlave.morale = Math.max(0, debtSlave.morale - 2);

  const vc = run.members.find(m => m.alive && m.id === 'venture-capitalist');
  if (vc) { vc.morale = Math.max(80, vc.morale); vc.classStat = Math.max(9, vc.classStat); }

  const genZ = run.members.find(m => m.alive && m.id === 'gen-z');
  if (genZ) {
    if (genZ.morale > 50) genZ.morale = Math.max(50, genZ.morale - 0.5);
    if (genZ.morale < 50) genZ.morale = Math.min(50, genZ.morale + 0.5);
    if (run.agency < 80) genZ.stamina = Math.min(100, genZ.stamina + 0.5);
  }

  // Long COVID
  run.members.filter(m => m.alive && m.longCovid).forEach(m => {
    m.health = Math.max(0, m.health - 2);
    m.stamina = Math.max(0, m.stamina - 1);
  });

  // Automation
  run.members.filter(m => m.alive && m.automated).forEach(m => {
    m.health = Math.min(100, m.health + 2);
    m.stamina = Math.min(100, m.stamina + 2);
    if (Math.random() < 0.1) {
      const weakest = run.members.filter(x => x.alive && x.id !== m.id)
        .sort((a, b) => (a.health + a.stamina) - (b.health + b.stamina))[0];
      if (weakest && weakest.health < 30) run.morale = Math.max(0, run.morale - 10);
    }
  });
}

function drawEvent(run, monthNum, excludeIds) {
  const excluded = new Set(excludeIds || []);
  const eligible = EVENTS.filter(e => {
    if (excluded.has(e.id)) return false;
    if (e.months && !e.months.includes(monthNum)) return false;
    return true;
  });
  if (eligible.length === 0) return null;

  // AI Researcher: 40% chance to draw AI events
  const aiResearcher = run.members.find(m => m.alive && m.id === 'ai-researcher');
  if (aiResearcher) {
    const aiEvents = eligible.filter(e => e.themes.includes('ai'));
    if (aiEvents.length > 0 && Math.random() < 0.4) {
      return aiEvents[Math.floor(Math.random() * aiEvents.length)];
    }
  }

  const totalWeight = eligible.reduce((s, e) => s + (e.weight || 5), 0);
  let roll = Math.random() * totalWeight;
  for (const e of eligible) {
    roll -= (e.weight || 5);
    if (roll <= 0) return e;
  }
  return eligible[eligible.length - 1];
}

function drawMonthEvents(run, monthNum) {
  const count = EVENTS_PER_MONTH[monthNum] || 1;
  const drawn = [];
  for (let i = 0; i < count; i++) {
    const evt = drawEvent(run, monthNum, drawn.map(e => e.id));
    if (evt) drawn.push(evt);
  }
  return drawn;
}

function pickChoice(run, event) {
  // For mini-games, use current step
  let choices;
  if (event.miniGame) {
    if (run.mgStep === undefined) run.mgStep = 0;
    const step = event.steps[run.mgStep];
    if (!step) return null;
    choices = step.choices;
  } else {
    choices = event.choices;
  }

  const { choices: processed } = processChoices(run, choices);
  const available = processed.filter(c => !c.locked);
  if (available.length === 0) return null;

  // Pick randomly (weighted toward less damaging choices for "smart" AI)
  // For playtesting, pick randomly
  const pick = available[Math.floor(Math.random() * available.length)];
  return pick;
}

function simulateRun(classId, partyIds, names) {
  const run = createRun(classId, partyIds, names);
  const errors = [];
  const stats = {
    eventsProcessed: 0,
    miniGamesPlayed: 0,
    choicesMade: 0,
    deaths: [],
    monthsSurvived: 0,
    finalStats: null,
  };

  try {
    while (run.monthIdx < MONTHS.length && !run.gameOver) {
      const month = MONTHS[run.monthIdx];
      const monthNum = month.num;
      
      // Draw events
      const events = drawMonthEvents(run, monthNum);
      
      for (const event of events) {
        if (run.gameOver) break;
        
        run.currentEvent = event;
        stats.eventsProcessed++;
        
        if (event.miniGame) {
          stats.miniGamesPlayed++;
          run.mgStep = 0;
          
          // Process mini-game steps
          let maxSteps = 20; // safety limit
          while (run.mgStep !== undefined && run.mgStep < event.steps.length && maxSteps-- > 0) {
            const step = event.steps[run.mgStep];
            if (!step) { errors.push(event.id + ': missing step ' + run.mgStep); break; }
            
            const choice = pickChoice(run, event);
            if (!choice) { errors.push(event.id + ' step ' + run.mgStep + ': no available choice'); break; }
            stats.choicesMade++;
            
            const originalChoice = step.choices[choice.origIdx] || choice;
            applyEffectsWithTracking(run, originalChoice.effects, event.themes);
            
            // Track death theme
            if (originalChoice.effects) {
              event.themes.forEach(t => {
                run.members.forEach(m => { if (m.alive) m.deathTheme = t; });
              });
            }
            
            // Check deaths
            const dead = checkDeaths(run);
            if (dead.length > 0) {
              stats.deaths.push(...dead.map(d => ({ name: d.customName, cause: d.deathCause, month: month.name })));
              run.deadThisRun.push(...dead);
            }
            
            if (run.members.every(m => !m.alive)) { run.gameOver = true; break; }
            if (run.hope <= 0) { run.gameOver = true; break; }
            
            // Advance step
            if (originalChoice.nextStep !== undefined) {
              if (originalChoice.nextStep >= event.steps.length) {
                run.mgStep = undefined; // mini-game complete
              } else {
                run.mgStep = originalChoice.nextStep;
              }
            } else {
              run.mgStep = undefined; // no nextStep = end of mini-game
            }
          }
        } else {
          // Regular event
          const choice = pickChoice(run, event);
          if (!choice) { errors.push(event.id + ': no available choice'); continue; }
          stats.choicesMade++;
          
          const originalChoice = event.choices[choice.origIdx] || choice;
          applyEffectsWithTracking(run, originalChoice.effects, event.themes);
          
          if (originalChoice.effects) {
            event.themes.forEach(t => {
              run.members.forEach(m => { if (m.alive) m.deathTheme = t; });
            });
          }
          
          const dead = checkDeaths(run);
          if (dead.length > 0) {
            stats.deaths.push(...dead.map(d => ({ name: d.customName, cause: d.deathCause, month: month.name })));
            run.deadThisRun.push(...dead);
          }
          
          if (run.members.every(m => !m.alive)) { run.gameOver = true; break; }
          if (run.hope <= 0) { run.gameOver = true; break; }
        }
      }
      
      if (run.gameOver) break;
      stats.monthsSurvived++;
      
      // Monthly upkeep
      monthlyUpkeep(run);
      
      // Check deaths from upkeep
      const dead = checkDeaths(run);
      if (dead.length > 0) {
        stats.deaths.push(...dead.map(d => ({ name: d.customName, cause: d.deathCause, month: month.name })));
        run.deadThisRun.push(...dead);
      }
      
      if (run.members.every(m => !m.alive)) { run.gameOver = true; break; }
      if (run.hope <= 0) { run.gameOver = true; break; }
      
      run.monthIdx++;
    }
  } catch (e) {
    errors.push('RUNTIME ERROR: ' + e.message + ' (stack: ' + e.stack.split('\n').slice(0,3).join(' | ') + ')');
  }

  stats.finalStats = {
    money: run.money,
    supplies: run.supplies,
    hope: run.hope,
    sanity: run.sanity,
    agency: run.agency,
    morale: run.morale,
    classStat: run.classStat,
    alive: run.members.filter(m => m.alive).length,
    total: run.members.length,
    survived: !run.gameOver,
    damageByTheme: run.damageByTheme,
  };

  return { run, errors, stats };
}

// --- Run simulations ---
const PARTY_COMPS = [
  { class: 'working', party: ['gig-worker', 'teacher', 'healthcare-worker', 'essential-worker'], name: 'Working Class Standard' },
  { class: 'trust-fund', party: ['venture-capitalist', 'tech-bro', 'ai-researcher', 'influencer'], name: 'Trust Fund Tech' },
  { class: 'drowning', party: ['debt-slave', 'gig-worker', 'conspiracy-theorist', 'cultist'], name: 'Drowning Chaos' },
  { class: 'upper-middle', party: ['tech-bro', 'teacher', 'healthcare-worker', 'disaster-prepper'], name: 'Upper Middle Pragmatic' },
  { class: 'working', party: ['essential-worker', 'gen-z', 'boomer', 'disaster-prepper'], name: 'Working Class Resilient' },
];

const NUM_RUNS_PER_COMP = 20;
const allResults = [];
const allErrors = [];
const balanceData = {};

console.log('Running ' + PARTY_COMPS.length + ' party compositions × ' + NUM_RUNS_PER_COMP + ' runs each = ' + (PARTY_COMPS.length * NUM_RUNS_PER_COMP) + ' total runs\n');

for (const comp of PARTY_COMPS) {
  let survived = 0, totalPartyWipes = 0, totalDeaths = 0;
  const statRanges = { hope: [], sanity: [], agency: [], money: [], morale: [], alive: [] };
  const themeDamage = {};
  
  for (let i = 0; i < NUM_RUNS_PER_COMP; i++) {
    const names = {};
    comp.party.forEach(id => { names[id] = id; });
    
    const { errors, stats } = simulateRun(comp.class, comp.party, names);
    allErrors.push(...errors.map(e => comp.name + ' run ' + i + ': ' + e));
    
    if (stats.finalStats.survived) survived++;
    if (stats.finalStats.alive === 0) totalPartyWipes++;
    totalDeaths += stats.deaths.length;
    
    statRanges.hope.push(stats.finalStats.hope);
    statRanges.sanity.push(stats.finalStats.sanity);
    statRanges.agency.push(stats.finalStats.agency);
    statRanges.money.push(stats.finalStats.money);
    statRanges.morale.push(stats.finalStats.morale);
    statRanges.alive.push(stats.finalStats.alive);
    
    Object.entries(stats.finalStats.damageByTheme || {}).forEach(([theme, dmg]) => {
      if (!themeDamage[theme]) themeDamage[theme] = { health: 0, hope: 0, sanity: 0, agency: 0, money: 0, supplies: 0, morale: 0 };
      for (const [k, v] of Object.entries(dmg)) themeDamage[theme][k] += v;
    });
    
    allResults.push({ comp: comp.name, ...stats });
  }

  const avg = arr => arr.length ? (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1) : 'N/A';
  const min = arr => arr.length ? Math.min(...arr) : 'N/A';
  const max = arr => arr.length ? Math.max(...arr) : 'N/A';

  balanceData[comp.name] = {
    survivalRate: (survived / NUM_RUNS_PER_COMP * 100).toFixed(0) + '%',
    partyWipes: totalPartyWipes,
    avgDeaths: (totalDeaths / NUM_RUNS_PER_COMP).toFixed(1),
    hope: `${avg(statRanges.hope)} (min ${min(statRanges.hope)}, max ${max(statRanges.hope)})`,
    sanity: `${avg(statRanges.sanity)} (min ${min(statRanges.sanity)}, max ${max(statRanges.sanity)})`,
    agency: `${avg(statRanges.agency)} (min ${min(statRanges.agency)}, max ${max(statRanges.agency)})`,
    money: `${avg(statRanges.money)} (min ${min(statRanges.money)}, max ${max(statRanges.money)})`,
    morale: `${avg(statRanges.morale)} (min ${min(statRanges.morale)}, max ${max(statRanges.morale)})`,
    alive: `${avg(statRanges.alive)} (min ${min(statRanges.alive)}, max ${max(statRanges.alive)})`,
    themeDamage,
  };
}

// --- Report ---
console.log('=== PLAYTEST RESULTS ===\n');
console.log('Total runs:', allResults.length);
console.log('Runtime errors:', allErrors.length);
if (allErrors.length > 0) {
  console.log('\n--- ERRORS ---');
  allErrors.slice(0, 20).forEach(e => console.log('  ' + e));
  if (allErrors.length > 20) console.log('  ... and ' + (allErrors.length - 20) + ' more');
}

console.log('\n=== BALANCE REPORT ===\n');
for (const [name, data] of Object.entries(balanceData)) {
  console.log('📊 ' + name);
  console.log('  Survival: ' + data.survivalRate + ' | Party wipes: ' + data.partyWipes + '/' + NUM_RUNS_PER_COMP + ' | Avg deaths: ' + data.avgDeaths);
  console.log('  Hope: ' + data.hope);
  console.log('  Sanity: ' + data.sanity);
  console.log('  Agency: ' + data.agency);
  console.log('  Money: ' + data.money);
  console.log('  Morale: ' + data.morale);
  console.log('  Survivors: ' + data.alive);
  console.log('  Theme damage:');
  for (const [theme, dmg] of Object.entries(data.themeDamage)) {
    const total = Object.values(dmg).reduce((s, v) => s + v, 0);
    console.log('    ' + theme + ': ' + total.toFixed(0) + ' total (' + Object.entries(dmg).filter(([k,v]) => v > 0).map(([k,v]) => k + ':' + v.toFixed(0)).join(', ') + ')');
  }
  console.log('');
}

// --- Death cause analysis ---
console.log('=== DEATH CAUSE ANALYSIS ===\n');
const deathCauses = {};
allResults.forEach(r => {
  r.deaths.forEach(d => {
    const cause = d.cause;
    deathCauses[cause] = (deathCauses[cause] || 0) + 1;
  });
});
const sortedCauses = Object.entries(deathCauses).sort((a, b) => b[1] - a[1]);
console.log('Total deaths across all runs:', sortedCauses.reduce((s, [, c]) => s + c, 0));
sortedCauses.forEach(([cause, count]) => console.log('  ' + count + 'x ' + cause));

// --- Event coverage ---
console.log('\n=== EVENT COVERAGE ===\n');
const eventCounts = {};
allResults.forEach(r => {
  // We didn't log individual events, but we can check which events were eligible
});
// Check which events never fired across all runs
const allEventIds = EVENTS.map(e => e.id);
console.log('Total events in pool:', allEventIds.length);
// Can't track without logging, skip

// --- Balance issues ---
console.log('\n=== BALANCE ISSUES ===\n');
const issues = [];

// Check survival rates
for (const [name, data] of Object.entries(balanceData)) {
  const rate = parseInt(data.survivalRate);
  if (rate === 0) issues.push('CRITICAL: ' + name + ' has 0% survival rate — likely too hard');
  if (rate > 80) issues.push('WARNING: ' + name + ' has ' + rate + '% survival — possibly too easy');
  if (data.partyWipes > NUM_RUNS_PER_COMP * 0.7) issues.push('CRITICAL: ' + name + ' has ' + data.partyWipes + '/' + NUM_RUNS_PER_COMP + ' party wipes — too lethal');
}

// Check stat floors
for (const [name, data] of Object.entries(balanceData)) {
  const hopeMin = parseInt(data.hope.match(/min (\d+)/)?.[1] || 0);
  const sanityMin = parseInt(data.sanity.match(/min (\d+)/)?.[1] || 0);
  const agencyMin = parseInt(data.agency.match(/min (\d+)/)?.[1] || 0);
  if (hopeMin === 0 && parseInt(data.survivalRate) < 30) issues.push('Hope regularly hits 0 in ' + name + ' — hope drain too aggressive');
  if (sanityMin === 0) issues.push('Sanity hits 0 in ' + name + ' — sanity drain too aggressive');
  if (agencyMin === 0) issues.push('Agency hits 0 in ' + name + ' — agency drain too aggressive');
}

if (issues.length === 0) {
  console.log('No major balance issues detected.');
} else {
  issues.forEach(i => console.log('  ' + i));
}
