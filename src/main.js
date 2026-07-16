import { storage } from './modules/storage.js';
import { prompterOptions, buildPrompt, pickRandomPromptTags } from './modules/prompter.js';
import { firebaseAuth } from './modules/firebase.js';

// --- State Management ---
let appState = storage.load();
let promptSelections = {
  style: '',
  palette: '',
  lighting: '',
  camera: '',
  atmosphere: ''
};

// --- Starfield Canvas Variables ---
let canvas = null;
let ctx = null;
let stars = [];
const numStars = 100;
let mouseX = 0;
let mouseY = 0;

// --- DOM References ---
const els = {
  // Screens
  screenPreloader: document.getElementById('screen-preloader'),
  preloaderBar: document.getElementById('preloader-progress-bar'),
  preloaderPercent: document.getElementById('preloader-percentage-lbl'),
  btnPreloaderProceed: document.getElementById('btn-preloader-proceed'),
  
  screenLogin: document.getElementById('screen-login'),
  btnLoginSubmit: document.getElementById('btn-login-submit'),
  inputLoginName: document.getElementById('input-login-name'),
  inputLoginEmail: document.getElementById('input-login-email'),
  selectLoginRole: document.getElementById('select-login-role'),
  
  screenMain: document.getElementById('screen-main'),
  headerProfileName: document.getElementById('header-profile-name'),
  headerProfileRole: document.getElementById('header-profile-role'),

  // Navigation
  navButtons: document.querySelectorAll('.nav-menu button'),
  tabPanels: document.querySelectorAll('.tab-content'),
  themeSelect: document.getElementById('theme-select'),
  sidebarThemeLabel: document.getElementById('sidebar-active-theme-label'),
  headerThemeTitle: document.getElementById('header-theme-title'),
  btnResetData: document.getElementById('btn-reset-data'),

  // 1. Gemini AI Ideation Copilot
  selectCopilotCategory: document.getElementById('select-copilot-category'),
  selectCopilotVibe: document.getElementById('select-copilot-vibe'),
  btnCopilotGenerate: document.getElementById('btn-copilot-generate'),
  copilotOutputDisplay: document.getElementById('copilot-output-display'),
  btnCopilotCopy: document.getElementById('btn-copilot-copy'),
  btnCopilotClear: document.getElementById('btn-copilot-clear'),

  // 2. Nano Banana Prompt Enhancer
  sliderPromptSubject: document.getElementById('slider-prompt-subject'),
  lblPromptSubject: document.getElementById('lbl-prompt-subject'),
  sliderPromptBackground: document.getElementById('slider-prompt-background'),
  lblPromptBackground: document.getElementById('lbl-prompt-background'),
  selectPromptStyle: document.getElementById('select-prompt-style'),
  selectPromptLighting: document.getElementById('select-prompt-lighting'),
  selectPromptCamera: document.getElementById('select-prompt-camera'),
  promptExclusionBtns: document.querySelectorAll('#panel-prompt-enhancer .tag-btn'),
  enhancedPromptOutput: document.getElementById('enhanced-prompt-output'),
  btnPromptRandom: document.getElementById('btn-prompt-random'),
  btnPromptCopy: document.getElementById('btn-prompt-copy'),

  // 3. Pitch Speech Coach
  coachScriptInput: document.getElementById('coach-script-input'),
  btnCoachAutogen: document.getElementById('btn-coach-autogen'),
  btnCoachInject: document.getElementById('btn-coach-inject'),
  coachPacingBadge: document.getElementById('coach-pacing-badge'),
  coachTeleprompterText: document.getElementById('coach-teleprompter-text'),
  coachTeleprompterScroll: document.getElementById('coach-teleprompter-scroll'),
  coachLblSpeed: document.getElementById('coach-lbl-speed'),
  coachSliderSpeed: document.getElementById('coach-slider-speed'),
  btnCoachStart: document.getElementById('btn-coach-start'),
  btnCoachReset: document.getElementById('btn-coach-reset'),

  // 4. Gemini Ideation Iteration Logger
  loggerTableTbody: document.getElementById('logger-table-tbody'),
  inputLogDesc: document.getElementById('input-log-desc'),
  inputLogScore: document.getElementById('input-log-score'),
  btnLoggerAdd: document.getElementById('btn-logger-add'),

  // 5. Fresher Audience Needs Analyzer
  analLblCse: document.getElementById('anal-lbl-cse'),
  analLblEce: document.getElementById('anal-lbl-ece'),
  analLblMech: document.getElementById('anal-lbl-mech'),
  analLblCivil: document.getElementById('anal-lbl-civil'),
  analProgSynth: document.getElementById('anal-prog-synth'),
  analProgEdm: document.getElementById('anal-prog-edm'),
  analBarSynth: document.getElementById('anal-bar-synth'),
  analBarEdm: document.getElementById('anal-bar-edm'),
  selectAnalDept: document.getElementById('select-anal-dept'),
  selectAnalTaste: document.getElementById('select-anal-taste'),
  btnAnalAdd: document.getElementById('btn-anal-add'),

  // 6. Google Meet Voting Simulator
  meetCircle: document.getElementById('meet-circle'),
  meetPercentLbl: document.getElementById('meet-percent-lbl'),
  meetLblAttend: document.getElementById('meet-lbl-attend'),
  meetLblSkip: document.getElementById('meet-lbl-skip'),
  btnMeetSimulate: document.getElementById('btn-meet-simulate'),
  meetChatLogs: document.getElementById('meet-chat-logs'),

  // 7. WhatsApp Group Hub
  hubQrCanvas: document.getElementById('hub-qr-canvas'),
  hubQrLink: document.getElementById('hub-qr-link'),
  btnHubQrDl: document.getElementById('btn-hub-qr-dl'),
  hubScheduleContainer: document.getElementById('hub-schedule-container'),

  // 8. Welcome Message Persona Adapter
  personaStyleBtns: document.querySelectorAll('#persona-style-group button'),
  selectPersonaTone: document.getElementById('select-persona-tone'),
  btnPersonaCompile: document.getElementById('btn-persona-compile'),
  personaSpeechOutput: document.getElementById('persona-speech-output'),
  btnPersonaCopy: document.getElementById('btn-persona-copy'),

  // 9. Activity XP Planner
  activityQuestsContainer: document.getElementById('activity-quests-container'),
  inputQuestTitle: document.getElementById('input-quest-title'),
  inputQuestDesc: document.getElementById('input-quest-desc'),
  btnQuestAdd: document.getElementById('btn-quest-add'),

  // 10. Speech Rate Analyzer
  speechAnalyzerText: document.getElementById('speech-analyzer-text'),
  sliderSpeechSpeed: document.getElementById('slider-speech-speed'),
  lblSpeechWpm: document.getElementById('lbl-speech-wpm'),
  speechLblEstTime: document.getElementById('speech-lbl-est-time'),
  speechLblHealth: document.getElementById('speech-lbl-health'),

  // 11. Cue Sheet Timeline
  cueTimelineContainer: document.getElementById('cue-timeline-container'),
  inputCueTime: document.getElementById('input-cue-time'),
  inputCueAct: document.getElementById('input-cue-act'),
  selectCueLight: document.getElementById('select-cue-light'),
  btnCueAdd: document.getElementById('btn-cue-add'),

  // 12. Budget & Proposals
  sliderBudgetDecor: document.getElementById('slider-budget-decor'),
  lblBudgetDecor: document.getElementById('lbl-budget-decor'),
  sliderBudgetAudio: document.getElementById('slider-budget-audio'),
  lblBudgetAudio: document.getElementById('lbl-budget-audio'),
  sliderBudgetPrizes: document.getElementById('slider-budget-prizes'),
  lblBudgetPrizes: document.getElementById('lbl-budget-prizes'),
  budgetLogisticsTotal: document.getElementById('budget-logistics-total'),
  deckLblSponsor: document.getElementById('deck-lbl-sponsor'),
  deckLblContrib: document.getElementById('deck-lbl-contrib'),
  deckLblThemeRef: document.getElementById('deck-lbl-theme-ref'),
  deckLblBenefitsList: document.getElementById('deck-lbl-benefits-list'),
  btnProposalPrint: document.getElementById('btn-proposal-print'),

  // 13. Submission Compiler
  btnSubmissionDownload: document.getElementById('btn-submission-download'),

  // 14. Swag Hoodie Designer
  inputSwagItem: document.getElementById('input-swag-item'),
  inputSwagCount: document.getElementById('input-swag-count'),
  inputSwagCost: document.getElementById('input-swag-cost'),
  btnSwagAdd: document.getElementById('btn-swag-add'),
  swagItemsList: document.getElementById('swag-items-list'),

  // 15. 3D Poster Simulator
  sim3dBox: document.getElementById('sim-3d-box'),
  simPosterImg: document.getElementById('sim-poster-img'),
  simPosterFallback: document.getElementById('sim-poster-fallback'),
  sliderSimGlow: document.getElementById('slider-sim-glow'),
  lblSimGlow: document.getElementById('lbl-sim-glow'),
  sliderSimFog: document.getElementById('slider-sim-fog'),
  lblSimFog: document.getElementById('lbl-sim-fog'),
  selectSimLight: document.getElementById('select-sim-light'),
  simPosterUpload: document.getElementById('sim-poster-upload')
};

// --- Teleprompter Timer State ---
let prompterInterval = null;
let prompterIsRunning = false;
let prompterTimeRemaining = 45;
let prompterScrollTop = 0;

// --- Mock Audience Votes State ---
let audienceVotes = { attend: 8, skip: 2 };
const audienceChatComments = [
  "This space theme looks absolutely incredible!",
  "Zero gravity dodgeball? Sounds like total chaos, sign me up!",
  "8-bit pizza party? Instant WOULD ATTEND from me.",
  "Cassette player music jams sound super chill.",
  "Are the laser spotlights eye safe? Looks cool though.",
  "Loved the health and mana potion recipes!",
  "Wait, can we bring friends? This is the best fresher concept."
];

// --- Initialization ---
function init() {
  setupPreloader();
  setupLoginPortal();
  setupNavigation();
  setupThemeSelection();
  setupResetButton();

  // Screen Background Animations
  setupPreloaderCanvas();
  setupLoginCanvas();
  setupStarfieldCanvas();

  // Dashboard Modules
  setupGeminiCopilot();
  setupPromptEnhancer();
  setupPitchCoach();
  setupIterationLogger();
  setupAudienceAnalyzer();
  setupVotingSimulator();
  setupWhatsAppHub();
  setupPersonaAdapter();
  setupActivityXPPlanner();
  setupSpeechAnalyzer();
  setupCueSheetTimeline();
  setupBudgetProposals();
  setupSubmissionCompiler();
  setupSwagDesigner();
  setupPosterSimulator();

  els.themeSelect.value = appState.activeThemeId;
  applyThemeAndRender();
}

// --- Screen 1: Preloader ---
function setupPreloader() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      els.btnPreloaderProceed.classList.remove('hidden');
    }
    els.preloaderBar.style.width = `${progress}%`;
    els.preloaderPercent.innerText = `${progress}%`;
  }, 40);

  els.btnPreloaderProceed.addEventListener('click', () => {
    els.screenPreloader.classList.add('hidden');
    
    // Check if organizer name exists
    if (appState.organizer && appState.organizer.name) {
      els.screenMain.classList.remove('hidden');
      syncOrganizerProfileHeader();
    } else {
      els.screenLogin.classList.remove('hidden');
    }
  });
}

// --- Screen 2: Login Portal ---
function setupLoginPortal() {
  els.btnLoginSubmit.addEventListener('click', () => {
    const name = els.inputLoginName.value.trim();
    const email = els.inputLoginEmail.value.trim();
    const role = els.selectLoginRole.value;

    if (!name || !email) {
      return alert('Organizer credentials are required to unlock!');
    }

    appState.organizer = { name, email, role };
    storage.save(appState);
    syncOrganizerProfileHeader();

    els.screenLogin.classList.add('hidden');
    els.screenMain.classList.remove('hidden');
  });

  const btnGoogle = document.getElementById('btn-google-signin');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      const selectedRole = els.selectLoginRole.value;

      firebaseAuth.signInWithGoogle()
        .then((result) => {
          appState.organizer = { 
            name: result.user.displayName, 
            email: result.user.email, 
            role: selectedRole,
            avatar: result.user.photoURL
          };
          
          storage.save(appState);
          syncOrganizerProfileHeader();
          
          els.screenLogin.classList.add('hidden');
          els.screenMain.classList.remove('hidden');
        })
        .catch((error) => {
          console.error("Google Auth error:", error);
        });
    });
  }

  const btnSignOut = document.getElementById('btn-sign-out');
  if (btnSignOut) {
    btnSignOut.addEventListener('click', () => {
      firebaseAuth.logout().then(() => {
        appState.organizer = null;
        storage.save(appState);
        
        els.inputLoginName.value = '';
        els.inputLoginEmail.value = '';
        
        els.screenMain.classList.add('hidden');
        els.screenLogin.classList.remove('hidden');
      }).catch((err) => {
        console.warn("Sign out failed, resetting UI states:", err);
        appState.organizer = null;
        storage.save(appState);
        els.screenMain.classList.add('hidden');
        els.screenLogin.classList.remove('hidden');
      });
    });
  }
}

function syncOrganizerProfileHeader() {
  if (appState.organizer && appState.organizer.name) {
    if (els.headerProfileName) els.headerProfileName.innerText = appState.organizer.name;
    if (els.headerProfileRole) els.headerProfileRole.innerText = appState.organizer.role;
  }
}

// --- Screen 3: Canvas Starfield Particle Renderer ---
function setupStarfieldCanvas() {
  canvas = els.canvasStarfield;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Initialize stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * canvas.width,
      px: 0,
      py: 0
    });
  }

  // Parallax cursor tracking
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - canvas.width / 2) * 0.08;
    mouseY = (e.clientY - canvas.height / 2) * 0.08;
  });

  requestAnimationFrame(starfieldLoop);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function starfieldLoop() {
  ctx.fillStyle = "rgba(2, 6, 23, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const activeTheme = getActiveTheme();
  const starColor = activeTheme ? activeTheme.accentColor : "#a855f7";

  for (let i = 0; i < numStars; i++) {
    const star = stars[i];
    star.z -= 2;

    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width - canvas.width / 2;
      star.y = Math.random() * canvas.height - canvas.height / 2;
    }

    const k = 128.0 / star.z;
    const sx = star.x * k + canvas.width / 2 + mouseX;
    const sy = star.y * k + canvas.height / 2 + mouseY;

    if (sx >= 0 && sx <= canvas.width && sy >= 0 && sy <= canvas.height) {
      const size = (1 - star.z / canvas.width) * 4;
      ctx.fillStyle = starColor;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  requestAnimationFrame(starfieldLoop);
}

// --- Navigation ---
function setupNavigation() {
  els.navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      els.navButtons.forEach(b => b.classList.remove('active'));
      els.tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// --- Themes Select ---
function setupThemeSelection() {
  els.themeSelect.addEventListener('change', (e) => {
    appState.activeThemeId = e.target.value;
    storage.save(appState);
    applyThemeAndRender();
  });
}

function getActiveTheme() {
  return appState.themes.find(t => t.id === appState.activeThemeId);
}

function applyThemeAndRender() {
  const activeTheme = getActiveTheme();
  if (!activeTheme) return;

  // CSS Glow dynamic variables updates
  document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
  document.documentElement.style.setProperty('--accent-glow', activeTheme.accentGlow);

  els.sidebarThemeLabel.innerText = activeTheme.name;
  els.headerThemeTitle.innerText = activeTheme.name;

  // Render sub modules
  renderPromptsEnhancer(activeTheme);
  renderPitchCoach(activeTheme);
  renderIterationHistory(activeTheme);
  renderAudienceStats(activeTheme);
  renderWhatsAppHub(activeTheme);
  renderXPPlanner(activeTheme);
  renderSpeechAnalyzer();
  renderCueSheetTimeline(activeTheme);
  renderBudgetProposals(activeTheme);
  renderSwagLedger(activeTheme);
  render3DPosterSimulator(activeTheme);
}

// ==============================================
// --- DASHBOARD 1: GEMINI AI COPILOT            --
// ==============================================
function setupGeminiCopilot() {
  els.btnCopilotGenerate.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const category = els.selectCopilotCategory.value;
    const vibe = els.selectCopilotVibe.value;

    let response = "";
    if (category === "Theme Name Ideas") {
      response = `Gemini AI Copilot Suggestion [${vibe}]:\n` +
                 `1. Aurora Cosmic Station\n` +
                 `2. retro Synth Grid-Room\n` +
                 `3. Neon Banana Odyssey\n` +
                 `Matches: "${activeTheme.name}" accent themes.`;
    } else if (category === "Tagline Options") {
      response = `Gemini AI Copilot Suggestion [${vibe}]:\n` +
                 `• "Warping past Level One into the cosmic grid."\n` +
                 `• "Casette Sunset horizons await Starship recruits."`;
    } else if (category === "Interactive Games rules") {
      response = `Gemini AI Copilot Suggestion [${vibe}]:\n` +
                 `Game: Interstellar Scavenger Scan\n` +
                 `Rules: Hide glowing QR codes around palm trees. Each scan yields +50 XP.`;
    } else {
      response = `Gemini AI Copilot Suggestion [${vibe}]:\n` +
                 `"${activeTheme.welcomeMessage}"`;
    }

    els.copilotOutputDisplay.innerText = response;
  });

  els.btnCopilotCopy.addEventListener('click', () => {
    const text = els.copilotOutputDisplay.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('Brainstorm text copied!');
    });
  });

  els.btnCopilotClear.addEventListener('click', () => {
    els.copilotOutputDisplay.innerText = "Select focus, vibe and trigger suggestions. Output appears here...";
  });
}

// ==============================================
// --- DASHBOARD 2: NANO BANANA PROMPT ENHANCER   --
// ==============================================
function setupPromptEnhancer() {
  const updatePrompt = () => {
    const activeTheme = getActiveTheme();
    if (!activeTheme) return;

    const subWeight = els.sliderPromptSubject.value;
    const bgWeight = els.sliderPromptBackground.value;
    const artStyle = els.selectPromptStyle.value;
    const lighting = els.selectPromptLighting.value;
    const camera = els.selectPromptCamera.value;

    els.lblPromptSubject.innerText = subWeight;
    els.lblPromptBackground.innerText = bgWeight;

    // Filter exclusions
    let exclusions = [];
    els.promptExclusionBtns.forEach(btn => {
      if (btn.classList.contains('selected')) {
        exclusions.push(btn.getAttribute('data-val'));
      }
    });

    const compiled = `Positive: (${activeTheme.nanoBananaPromptBase}):${subWeight}, artistic style in ${artStyle}, lit by ${lighting}, camera perspective ${camera}.\nNegative: ${exclusions.join(', ')}`;
    els.enhancedPromptOutput.innerText = compiled;
  };

  els.sliderPromptSubject.addEventListener('input', updatePrompt);
  els.sliderPromptBackground.addEventListener('input', updatePrompt);
  els.selectPromptStyle.addEventListener('change', updatePrompt);
  els.selectPromptLighting.addEventListener('change', updatePrompt);
  els.selectPromptCamera.addEventListener('change', updatePrompt);

  els.promptExclusionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      updatePrompt();
    });
  });

  els.btnPromptRandom.addEventListener('click', () => {
    const styles = ["Pixel Retro", "Futuristic Octane", "Cyberpunk Neon"];
    els.selectPromptStyle.value = styles[Math.floor(Math.random() * styles.length)];
    els.sliderPromptSubject.value = (Math.random() * 1.5 + 0.5).toFixed(1);
    updatePrompt();
  });

  els.btnPromptCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(els.enhancedPromptOutput.innerText).then(() => {
      alert('Banana Prompt Copied!');
    });
  });
}

function renderPromptsEnhancer(theme) {
  els.sliderPromptSubject.value = 1.0;
  els.sliderPromptBackground.value = 1.0;
  els.lblPromptSubject.innerText = "1.0";
  els.lblPromptBackground.innerText = "1.0";
  
  const compiled = `Positive: (${theme.nanoBananaPromptBase}):1.0, artistic style in Cinematic Octane 3D.\nNegative: blurry, low resolution`;
  els.enhancedPromptOutput.innerText = compiled;
}

// ==============================================
// --- DASHBOARD 3: PITCH SPEECH COACH           --
// ==============================================
function setupPitchCoach() {
  els.btnCoachAutogen.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    els.coachScriptInput.value = activeTheme.pitchScriptDraft;
    els.coachTeleprompterText.innerText = activeTheme.pitchScriptDraft;
  });

  els.btnCoachInject.addEventListener('click', () => {
    let script = els.coachScriptInput.value;
    script = script.replaceAll('. ', '. [breath] ');
    els.coachScriptInput.value = script;
    els.coachTeleprompterText.innerText = script;
  });

  els.coachSliderSpeed.addEventListener('input', (e) => {
    const speed = e.target.value;
    els.coachLblSpeed.innerText = `${speed}s`;
    prompterTimeRemaining = speed;
  });

  els.btnCoachStart.addEventListener('click', () => {
    if (prompterIsRunning) {
      clearInterval(prompterInterval);
      prompterIsRunning = false;
      els.btnCoachStart.innerText = '▶️ Start';
      els.coachPacingBadge.innerText = 'Paused';
    } else {
      prompterIsRunning = true;
      els.btnCoachStart.innerText = '⏸️ Stop';
      els.coachPacingBadge.innerText = 'Hype pitch active!';
      
      const speedSliderVal = parseInt(els.coachSliderSpeed.value);
      let scrolled = 0;
      prompterInterval = setInterval(() => {
        scrolled += 1.5;
        els.coachTeleprompterScroll.scrollTop = scrolled;
        if (scrolled >= els.coachTeleprompterScroll.scrollHeight) {
          clearInterval(prompterInterval);
          prompterIsRunning = false;
          els.btnCoachStart.innerText = '▶️ Start';
          els.coachPacingBadge.innerText = 'Pitch Completed!';
        }
      }, 100);
    }
  });

  els.btnCoachReset.addEventListener('click', () => {
    clearInterval(prompterInterval);
    prompterIsRunning = false;
    els.btnCoachStart.innerText = '▶️ Start';
    els.coachTeleprompterScroll.scrollTop = 0;
    els.coachPacingBadge.innerText = 'Waiting...';
  });
}

function renderPitchCoach(theme) {
  els.coachScriptInput.value = theme.pitchScriptDraft;
  els.coachTeleprompterText.innerText = theme.pitchScriptDraft;
  els.coachTeleprompterScroll.scrollTop = 0;
}

// ==============================================
// --- DASHBOARD 4: GEMINI ITERATION LOGGER      --
// ==============================================
function setupIterationLogger() {
  els.btnLoggerAdd.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const desc = els.inputLogDesc.value.trim();
    const score = parseInt(els.inputLogScore.value) || 95;

    if (!desc) return alert('Enter iteration notes!');

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    activeTheme.geminiIterations.push({
      version: `v${activeTheme.geminiIterations.length + 1} Polish`,
      timestamp,
      description: desc,
      score
    });

    els.inputLogDesc.value = '';
    storage.save(appState);
    applyThemeAndRender();
  });
}

function renderIterationHistory(theme) {
  els.loggerTableTbody.innerHTML = '';
  const history = theme.geminiIterations || [];

  history.forEach((log, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${log.version}</strong></td>
      <td>${log.timestamp}</td>
      <td>${log.description}</td>
      <td><span class="pace-badge success">${log.score}</span></td>
      <td><button class="btn-delete-log" data-index="${index}">❌</button></td>
    `;

    row.querySelector('.btn-delete-log').addEventListener('click', () => {
      theme.geminiIterations.splice(index, 1);
      storage.save(appState);
      applyThemeAndRender();
    });

    els.loggerTableTbody.appendChild(row);
  });
}

// ==============================================
// --- DASHBOARD 5: FRESHER AUDIENCE ANALYZER    --
// ==============================================
function setupAudienceAnalyzer() {
  els.btnAnalAdd.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const dept = els.selectAnalDept.value;
    const taste = els.selectAnalTaste.value;

    alert(`Survey sample registered: ${dept} student prefers ${taste} mixes.`);
    storage.save(appState);
    applyThemeAndRender();
  });
}

function renderAudienceStats(theme) {
  // Mock ratios based on active theme
  if (theme.id === 'galactic-carnival') {
    els.analLblCse.innerText = '45%';
    els.analLblEce.innerText = '25%';
    els.analLblMech.innerText = '20%';
    els.analLblCivil.innerText = '10%';
    els.analProgSynth.innerText = '70%';
    els.analProgEdm.innerText = '30%';
    els.analBarSynth.style.width = '70%';
    els.analBarEdm.style.width = '30%';
  } else {
    els.analLblCse.innerText = '30%';
    els.analLblEce.innerText = '35%';
    els.analLblMech.innerText = '15%';
    els.analLblCivil.innerText = '20%';
    els.analProgSynth.innerText = '40%';
    els.analProgEdm.innerText = '60%';
    els.analBarSynth.style.width = '40%';
    els.analBarEdm.style.width = '60%';
  }
}

// ==============================================
// --- DASHBOARD 6: GOOGLE MEET VOTING SIMULATOR --
// ==============================================
function setupVotingSimulator() {
  els.btnMeetSimulate.addEventListener('click', () => {
    const randomComment = audienceChatComments[Math.floor(Math.random() * audienceChatComments.length)];
    const isSkip = randomComment.includes("eye") || Math.random() < 0.15;
    
    if (isSkip) {
      audienceVotes.skip++;
    } else {
      audienceVotes.attend++;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = `
      <div class="chat-meta">
        <span>Audience Voter</span>
        <span>${timestamp}</span>
      </div>
      <p>${randomComment}</p>
    `;
    
    els.meetChatLogs.appendChild(bubble);
    els.meetChatLogs.scrollTop = els.meetChatLogs.scrollHeight;

    renderVotingDial();
  });
}

function renderVotingDial() {
  const total = audienceVotes.attend + audienceVotes.skip;
  const ratio = Math.round((audienceVotes.attend / total) * 100);

  els.meetPercentLbl.innerText = `${ratio}%`;
  els.meetLblAttend.innerText = audienceVotes.attend;
  els.meetLblSkip.innerText = audienceVotes.skip;

  const perimeter = 440;
  els.meetCircle.style.strokeDashoffset = perimeter - (ratio / 100) * perimeter;
}

// ==============================================
// --- DASHBOARD 7: WHATSAPP GROUP HUB           --
// ==============================================
function setupWhatsAppHub() {
  els.hubQrLink.addEventListener('input', drawHubQRCode);
  els.btnHubQrDl.addEventListener('click', () => {
    const dataUrl = els.hubQrCanvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = 'fresher_whatsapp_qr.png';
    link.href = dataUrl;
    link.click();
  });
}

function drawHubQRCode() {
  const canvas = els.hubQrCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const url = els.hubQrLink.value || 'https://chat.whatsapp.com/fresher';
  ctx.fillStyle = "#020617";

  // Draw square corners
  ctx.fillRect(6, 6, 24, 24);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(10, 10, 16, 16);
  ctx.fillStyle = "#020617";
  ctx.fillRect(13, 13, 10, 10);

  // Bottom corner
  ctx.fillRect(6, canvas.height - 30, 24, 24);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(10, canvas.height - 26, 16, 16);
  ctx.fillStyle = "#020617";
  ctx.fillRect(13, canvas.height - 23, 10, 10);

  // Top right corner
  ctx.fillRect(canvas.width - 30, 6, 24, 24);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(canvas.width - 26, 10, 16, 16);
  ctx.fillStyle = "#020617";
  ctx.fillRect(canvas.width - 23, 13, 10, 10);

  // Draw mock pixels
  const seed = url.length;
  for (let x = 6; x < canvas.width - 6; x += 4) {
    for (let y = 6; y < canvas.height - 6; y += 4) {
      if ((x < 32 && y < 32) || (x < 32 && y > canvas.height - 32) || (x > canvas.width - 32 && y < 32)) {
        continue;
      }
      const formulaVal = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
      if ((formulaVal - Math.floor(formulaVal)) > 0.48) {
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }
}

function renderWhatsAppHub(theme) {
  drawHubQRCode();
  els.hubScheduleContainer.innerHTML = '';
  const calendar = theme.socialCalendar || [];

  calendar.forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-time">${item.day}</div>
      <div class="timeline-content">${item.topic} [${item.status}]</div>
    `;
    els.hubScheduleContainer.appendChild(el);
  });
}

// ==============================================
// --- DASHBOARD 8: PERSONA ADAPTER              --
// ==============================================
function setupPersonaAdapter() {
  els.personaStyleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      els.personaStyleBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  els.btnPersonaCompile.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const activePersonaBtn = document.querySelector('#persona-style-group button.selected');
    const persona = activePersonaBtn ? activePersonaBtn.getAttribute('data-persona') : 'Hype DJ';
    const tone = els.selectPersonaTone.value;

    const hook = `Greeting Hook [Persona: ${persona}, Tone: ${tone}]:\n` +
                 `"Recruits of Starship College! Grab your neon glowing wristbands, select your character avatar and slide on onto the grid tonight!"`;
    els.personaSpeechOutput.innerText = hook;
  });

  els.btnPersonaCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(els.personaSpeechOutput.innerText).then(() => {
      alert('Persona speech hook copied!');
    });
  });
}

// ==============================================
// --- DASHBOARD 9: ACTIVITY XP PLANNER          --
// ==============================================
function setupActivityXPPlanner() {
  els.btnQuestAdd.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const title = els.inputQuestTitle.value.trim();
    const desc = els.inputQuestDesc.value.trim();

    if (!title || !desc) return alert('Fill quest details!');

    activeTheme.games.push({ title, desc });
    els.inputQuestTitle.value = '';
    els.inputQuestDesc.value = '';

    storage.save(appState);
    applyThemeAndRender();
  });
}

function renderXPPlanner(theme) {
  els.activityQuestsContainer.innerHTML = '';
  const list = theme.games || [];

  list.forEach((quest, index) => {
    const card = document.createElement('div');
    card.className = 'checklist-item';
    card.innerHTML = `
      <div class="checklist-left">
        <div class="checkbox-custom" style="background: var(--accent-color)"></div>
        <div class="checklist-text">
          <h4>${quest.title}</h4>
          <p>${quest.desc}</p>
        </div>
      </div>
      <button class="btn-delete-quest" data-index="${index}" style="background:none; border:none; cursor:pointer;">❌</button>
    `;

    card.querySelector('.btn-delete-quest').addEventListener('click', () => {
      theme.games.splice(index, 1);
      storage.save(appState);
      applyThemeAndRender();
    });

    els.activityQuestsContainer.appendChild(card);
  });
}

// ==============================================
// --- DASHBOARD 10: SPEECH RATE ANALYZER         --
// ==============================================
function setupSpeechAnalyzer() {
  const runAnalysis = () => {
    const script = els.speechAnalyzerText.value;
    const wpm = parseInt(els.sliderSpeechSpeed.value);
    els.lblSpeechWpm.innerText = wpm;

    if (!script) {
      els.speechLblEstTime.innerText = '0.00s';
      els.speechLblHealth.innerText = 'Waiting...';
      return;
    }

    const wordsCount = script.trim().split(/\s+/).length;
    const estTimeSecs = (wordsCount / wpm) * 60;
    els.speechLblEstTime.innerText = `${estTimeSecs.toFixed(2)}s`;

    if (estTimeSecs > 60) {
      els.speechLblHealth.innerText = 'Too Long (Limit 60s)';
      els.speechLblHealth.style.color = '#ef4444';
    } else {
      els.speechLblHealth.innerText = 'Perfect Pacing tempo!';
      els.speechLblHealth.style.color = '#10b981';
    }
  };

  els.speechAnalyzerText.addEventListener('input', runAnalysis);
  els.sliderSpeechSpeed.addEventListener('input', runAnalysis);
}

function renderSpeechAnalyzer() {
  const activeTheme = getActiveTheme();
  els.speechAnalyzerText.value = activeTheme.pitchScriptDraft;
  
  const wordsCount = activeTheme.pitchScriptDraft.trim().split(/\s+/).length;
  const estTimeSecs = (wordsCount / 130) * 60;
  els.speechLblEstTime.innerText = `${estTimeSecs.toFixed(2)}s`;
  els.speechLblHealth.innerText = 'Perfect Pacing tempo!';
  els.speechLblHealth.style.color = '#10b981';
}

// ==============================================
// --- DASHBOARD 11: CUE SHEET TIMELINE          --
// ==============================================
function setupCueSheetTimeline() {
  els.btnCueAdd.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const time = els.inputCueTime.value.trim();
    const act = els.inputCueAct.value.trim();
    const light = els.selectCueLight.value;

    if (!time || !act) return alert('Time and Activity cue details are required!');

    activeTheme.schedule.push({
      time,
      activity: `${act} [Lighting: ${light}]`,
      icon: '🕒'
    });

    els.inputCueAct.value = '';
    storage.save(appState);
    applyThemeAndRender();
  });
}

function renderCueSheetTimeline(theme) {
  els.cueTimelineContainer.innerHTML = '';
  const cues = theme.schedule || [];

  cues.forEach((cue, index) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-time">${cue.time}</div>
      <div class="timeline-content">${cue.activity}</div>
      <button class="btn-delete-cue" data-index="${index}" style="position: absolute; right: 10px; top: 10px; background:none; border:none; cursor:pointer;">❌</button>
    `;

    el.querySelector('.btn-delete-cue').addEventListener('click', () => {
      theme.schedule.splice(index, 1);
      storage.save(appState);
      applyThemeAndRender();
    });

    els.cueTimelineContainer.appendChild(el);
  });
}

// ==============================================
// --- DASHBOARD 12: BUDGET & PROPOSALS          --
// ==============================================
function setupBudgetProposals() {
  const updateBudgetTotals = () => {
    const activeTheme = getActiveTheme();
    if (!activeTheme) return;

    const decor = parseInt(els.sliderBudgetDecor.value);
    const audio = parseInt(els.sliderBudgetAudio.value);
    const prizes = parseInt(els.sliderBudgetPrizes.value);

    els.lblBudgetDecor.innerText = `$${decor}`;
    els.lblBudgetAudio.innerText = `$${audio}`;
    els.lblBudgetPrizes.innerText = `$${prizes}`;

    // Sync back
    activeTheme.budget.decor = decor;
    activeTheme.budget.audio = audio;
    activeTheme.budget.prizes = prizes;

    const total = decor + audio + prizes + (activeTheme.budget.food || 1500);
    els.budgetLogisticsTotal.innerText = `$${total.toLocaleString()}`;

    if (total > 5000) {
      els.budgetLogisticsTotal.style.color = '#ef4444';
    } else {
      els.budgetLogisticsTotal.style.color = 'white';
    }
  };

  els.sliderBudgetDecor.addEventListener('input', updateBudgetTotals);
  els.sliderBudgetAudio.addEventListener('input', updateBudgetTotals);
  els.sliderBudgetPrizes.addEventListener('input', updateBudgetTotals);

  els.btnProposalPrint.addEventListener('click', () => {
    window.print();
  });
}

function renderBudgetProposals(theme) {
  const budget = theme.budget || { decor: 800, audio: 1200, prizes: 500 };
  els.sliderBudgetDecor.value = budget.decor;
  els.sliderBudgetAudio.value = budget.audio;
  els.sliderBudgetPrizes.value = budget.prizes;

  els.lblBudgetDecor.innerText = `$${budget.decor}`;
  els.lblBudgetAudio.innerText = `$${budget.audio}`;
  els.lblBudgetPrizes.innerText = `$${budget.prizes}`;

  const foodCost = theme.cateringEstimate ? (theme.cateringEstimate.attendees * 6) : 1500;
  const total = budget.decor + budget.audio + budget.prizes + foodCost;
  els.budgetLogisticsTotal.innerText = `$${total.toLocaleString()}`;

  // Sponsor details render
  const sponsor = theme.sponsorship || { sponsorName: 'None', contribution: 0, tier: 'Bronze', benefits: [] };
  els.deckLblSponsor.innerText = sponsor.sponsorName;
  els.deckLblContrib.innerText = `$${sponsor.contribution.toLocaleString()}`;
  els.deckLblThemeRef.innerText = theme.name;
  els.deckLblBenefitsList.innerText = sponsor.benefits.join(', ');
}

// ==============================================
// --- DASHBOARD 13: SUBMISSION COMPILER         --
// ==============================================
function setupSubmissionCompiler() {
  els.btnSubmissionDownload.addEventListener('click', () => {
    alert('📦 Exporter Compiled! Final zip package containing concept, prompt file tags and script templates downloaded successfully!');
  });
}

// ==============================================
// --- DASHBOARD 14: SWAG HOODIE DESIGNER        --
// ==============================================
function setupSwagDesigner() {
  els.btnSwagAdd.addEventListener('click', () => {
    const activeTheme = getActiveTheme();
    const item = els.inputSwagItem.value.trim();
    const count = parseInt(els.inputSwagCount.value) || 50;
    const cost = parseInt(els.inputSwagCost.value) || 1000;

    if (!item) return alert('Swag category is required!');

    activeTheme.swagList.push({
      item,
      count,
      cost,
      vendor: 'Starship Procurement Shop'
    });

    els.inputSwagItem.value = '';
    storage.save(appState);
    applyThemeAndRender();
  });
}

function renderSwagLedger(theme) {
  els.swagItemsList.innerHTML = '';
  const list = theme.swagList || [];

  list.forEach((swag, index) => {
    const row = document.createElement('div');
    row.className = 'spotify-track-row';
    row.innerHTML = `
      <div class="track-meta">
        <span class="track-index">${index + 1}</span>
        <div class="track-details">
          <span class="track-title">📦 ${swag.item}</span>
          <span class="track-artist">Count: ${swag.count} | Cost: $${swag.cost}</span>
        </div>
      </div>
      <button class="track-delete-btn" data-index="${index}">&times;</button>
    `;

    row.querySelector('.track-delete-btn').addEventListener('click', () => {
      theme.swagList.splice(index, 1);
      storage.save(appState);
      applyThemeAndRender();
    });

    els.swagItemsList.appendChild(row);
  });
}

// ==============================================
// --- DASHBOARD 15: 3D POSTER SIMULATOR         --
// ==============================================
function setupPosterSimulator() {
  const update3DViewer = () => {
    const glowVal = els.sliderSimGlow.value;
    const fogVal = els.sliderSimFog.value;
    els.lblSimGlow.innerText = `${glowVal}%`;
    els.lblSimFog.innerText = `${fogVal}%`;

    // Apply mock 3D transform & filter styles
    els.sim3dBox.style.transform = `perspective(800px) rotateY(${glowVal / 5 - 10}deg) rotateX(${fogVal / 10}deg)`;
    els.sim3dBox.style.boxShadow = `0 10px 30px rgba(168, 85, 247, ${glowVal / 100})`;
  };

  els.sliderSimGlow.addEventListener('input', update3DViewer);
  els.sliderSimFog.addEventListener('input', update3DViewer);
  
  els.selectSimLight.addEventListener('change', (e) => {
    const ambient = e.target.value;
    if (ambient === 'Night') {
      els.sim3dBox.style.filter = 'brightness(0.65) contrast(1.2)';
    } else if (ambient === 'Twilight') {
      els.sim3dBox.style.filter = 'hue-rotate(60deg) brightness(0.85)';
    } else {
      els.sim3dBox.style.filter = 'none';
    }
  });

  els.simPosterUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      els.simPosterImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function render3DPosterSimulator(theme) {
  els.sliderSimGlow.value = 50;
  els.sliderSimFog.value = 20;
  els.lblSimGlow.innerText = '50%';
  els.lblSimFog.innerText = '20%';
  
  els.sim3dBox.style.transform = `perspective(800px) rotateY(0deg) rotateX(2deg)`;
  els.sim3dBox.style.boxShadow = `0 10px 30px rgba(168, 85, 247, 0.5)`;
  els.sim3dBox.style.filter = 'none';
}

// --- Reset Button ---
function setupResetButton() {
  els.btnResetData.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all customized configurations?')) {
      appState = storage.reset();
      els.themeSelect.value = appState.activeThemeId;
      applyThemeAndRender();
    }
  });
}

function setupPreloaderCanvas() {
  const canvasPre = document.getElementById('canvas-preloader');
  if (!canvasPre) return;
  const ctxPre = canvasPre.getContext('2d');
  
  let w = canvasPre.width = window.innerWidth;
  let h = canvasPre.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    if (canvasPre) {
      w = canvasPre.width = window.innerWidth;
      h = canvasPre.height = window.innerHeight;
    }
  });

  const particles = [];
  const maxParticles = 65;
  
  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1.5
    });
  }

  function animate() {
    if (!canvasPre || canvasPre.offsetParent === null) {
      requestAnimationFrame(animate);
      return;
    }
    ctxPre.fillStyle = "rgba(2, 6, 23, 0.25)";
    ctxPre.fillRect(0, 0, w, h);

    const activeTheme = getActiveTheme();
    const dotColor = activeTheme ? activeTheme.accentColor : "#a855f7";

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctxPre.beginPath();
      ctxPre.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctxPre.fillStyle = dotColor;
      ctxPre.shadowBlur = 10;
      ctxPre.shadowColor = dotColor;
      ctxPre.fill();
      ctxPre.shadowBlur = 0;
    });

    ctxPre.strokeStyle = dotColor;
    for (let i = 0; i < maxParticles; i++) {
      for (let j = i + 1; j < maxParticles; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctxPre.beginPath();
          ctxPre.moveTo(particles[i].x, particles[i].y);
          ctxPre.lineTo(particles[j].x, particles[j].y);
          ctxPre.lineWidth = (1 - dist / 110) * 0.8;
          ctxPre.globalAlpha = (1 - dist / 110) * 0.35;
          ctxPre.stroke();
          ctxPre.globalAlpha = 1.0;
        }
      }
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function setupLoginCanvas() {
  const canvasLog = document.getElementById('canvas-login');
  if (!canvasLog) return;
  const ctxLog = canvasLog.getContext('2d');

  let w = canvasLog.width = window.innerWidth;
  let h = canvasLog.height = window.innerHeight;

  window.addEventListener('resize', () => {
    if (canvasLog) {
      w = canvasLog.width = window.innerWidth;
      h = canvasLog.height = window.innerHeight;
    }
  });

  let speedOffset = 0;

  function animate() {
    if (!canvasLog || canvasLog.offsetParent === null) {
      requestAnimationFrame(animate);
      return;
    }
    ctxLog.fillStyle = "#030712";
    ctxLog.fillRect(0, 0, w, h);

    const activeTheme = getActiveTheme();
    const color = activeTheme ? activeTheme.accentColor : "#a855f7";

    ctxLog.strokeStyle = color;
    ctxLog.lineWidth = 1.0;

    const horizonY = h * 0.45;
    
    // Draw sky neon glow stars
    ctxLog.fillStyle = "rgba(255, 255, 255, 0.05)";
    for (let s = 0; s < 30; s++) {
      const sx = (Math.sin(s * 12.5) * 0.5 + 0.5) * w;
      const sy = (Math.cos(s * 45.8) * 0.5 + 0.5) * horizonY;
      ctxLog.fillRect(sx, sy, 2, 2);
    }

    speedOffset = (speedOffset + 1.2) % 60;

    for (let y = 0; y < 20; y++) {
      const z = (y * 30 + speedOffset);
      const ratio = z / 600;
      const gridY = horizonY + ratio * (h - horizonY);

      if (gridY > horizonY && gridY < h) {
        ctxLog.beginPath();
        ctxLog.moveTo(0, gridY);
        ctxLog.lineTo(w, gridY);
        ctxLog.globalAlpha = ratio * 0.35;
        ctxLog.stroke();
      }
    }

    const vanishingX = w / 2;
    const linesCount = 36;
    for (let x = -linesCount / 2; x <= linesCount / 2; x++) {
      const targetX = vanishingX + x * (w / 14);
      ctxLog.beginPath();
      ctxLog.moveTo(vanishingX, horizonY);
      ctxLog.lineTo(targetX, h);
      ctxLog.globalAlpha = 0.25;
      ctxLog.stroke();
    }
    
    ctxLog.globalAlpha = 1.0;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', init);
