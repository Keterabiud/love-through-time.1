// State
let affection = 0;
let trust = 0;

// Scenes (expand this to your full story with 6+ paths/endings)
const scenes = {
  start: {
    text: "A soft glow fills your room. A man in Victorian attire appears, clutching a glowing pocket watch. 'I am Elias... from 1887. My watch has brought me to you.' He looks at you with wonder and uncertainty.<br><br>What do you say?",
    choices: [
      { text: "Who are you? This must be a trick!", affectionChange: -10, trustChange: +15, next: "suspicious" },
      { text: "You're... real? This is impossible.", affectionChange: +5, trustChange: +10, next: "curious" },
      { text: "I've been waiting for someone like you.", affectionChange: +20, trustChange: -5, next: "flirty" }
    ]
  },

  suspicious: {
    text: "Elias steps back, hurt. 'I swear on my honor, this is no deception.' The watch flickers weakly.<br><br>He seems vulnerable now.",
    choices: [
      { text: "Prove it. Show me something from your time.", affectionChange: 0, trustChange: +20, next: "prove" },
      { text: "Leave. I don't trust strangers.", affectionChange: -15, trustChange: -10, next: "end_bad" }
    ]
  },

  // Add more scenes: curious, flirty, prove, various middles...

  end_good: {
    text: "Elias takes your hand. 'In every era, my heart found its way to you.' The watch glows bright as time aligns.<br><br><strong>True Love Ending</strong>",
    choices: [], // Ending: no choices
    isEnd: true
  },

  end_bad: {
    text: "Elias fades into light. 'Perhaps love cannot bridge centuries after all...'<br><br><strong>Paradox Ending</strong>",
    choices: [],
    isEnd: true
  },

  // Add the other 4 endings (e.g. bittersweet, tragic, friendship, time-loop)
};

// DOM elements
const textEl = document.getElementById('scene-text');
const choicesEl = document.getElementById('choices');
const affectionEl = document.getElementById('affection');
const trustEl = document.getElementById('trust');
const restartBtn = document.getElementById('restart');

// Render current scene
function renderScene(sceneKey) {
  const scene = scenes[sceneKey];
  if (!scene) return;

  textEl.innerHTML = scene.text;
  choicesEl.innerHTML = '';

  affection += scene.affectionChange || 0;
  trust += scene.trustChange || 0;
  affectionEl.textContent = affection;
  trustEl.textContent = trust;

  if (scene.isEnd) {
    restartBtn.classList.remove('hidden');
    return;
  }

  scene.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'px-6 py-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl transition text-left';
    btn.textContent = choice.text;
    btn.onclick = () => {
      affection += choice.affectionChange;
      trust += choice.trustChange;
      renderScene(choice.next);
    };
    choicesEl.appendChild(btn);
  });
}

// Start / Restart
function startGame() {
  affection = 0;
  trust = 0;
  affectionEl.textContent = 0;
  trustEl.textContent = 0;
  restartBtn.classList.add('hidden');
  renderScene('start');
}

restartBtn.onclick = startGame;

// Begin!
startGame();
