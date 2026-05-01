/* ─────────────────────────────────────────────────
   script.js  —  Hey You 🌻
───────────────────────────────────────────────── */

// ═══ CONFIG ═══════════════════════════════════════
const MESSAGE =
  "I understand how overwhelming month ends can be, I wish I could have made it easier for you. " +
  "I can't do your work but I have something for you. ";

const TYPE_SPEED_MS  = 90;   // ms per character
const START_DELAY_MS = 1200; // delay before typing begins
// ══════════════════════════════════════════════════

// ─── Elements ───────────────────────────────────
const typedEl    = document.getElementById("typed-text");
const cursorEl   = document.getElementById("cursor");
const heartBox   = document.getElementById("heart-container");
const heartBtn   = document.getElementById("heart-btn");
const heartIcon  = document.getElementById("heart-icon");
const videoScreen = document.getElementById("video-screen");
const loveVideo  = document.getElementById("love-video");
const closeHint  = document.getElementById("video-close-hint");
const startScreen = document.getElementById("start-screen");
const startBtn   = document.getElementById("start-btn");

// ─── Floating Petals ────────────────────────────
const petalEmojis     = ["🌸", "✨", "🌼", "🍃", "💛", "🌻"];
const petalsContainer = document.getElementById("petals");

function spawnPetal() {
  const el = document.createElement("span");
  el.className = "petal";
  el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

  const leftPct  = Math.random() * 100;
  const duration = 10 + Math.random() * 13;
  const delay    = Math.random() * 14;

  el.style.left              = `${leftPct}%`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay    = `${delay}s`;
  el.style.fontSize          = `${0.8 + Math.random() * 0.65}rem`;

  petalsContainer.appendChild(el);
}

for (let i = 0; i < 22; i++) spawnPetal();

// ─── Typewriter ─────────────────────────────────
let charIndex = 0;

function typeNextChar() {
  if (charIndex < MESSAGE.length) {
    typedEl.textContent += MESSAGE[charIndex];
    charIndex++;
    
    setTimeout(typeNextChar, TYPE_SPEED_MS);
  } else {
    // Done typing: hide cursor, show heart
    setTimeout(() => {
      cursorEl.style.display = "none";
      heartBox.classList.add("visible");
    }, 600);
  }
}

// ─── Start Screen Logic ─────────────────────────
startBtn.addEventListener("click", () => {
  // Fade out the start screen
  startScreen.classList.add("hidden");
  
  // Start the typing animation after the screen fades out
  setTimeout(typeNextChar, 1000);
});

// ─── Heart fill on hover ─────────────────────────
heartBtn.addEventListener("mouseenter", () => { heartIcon.textContent = "♥"; });
heartBtn.addEventListener("mouseleave", () => { heartIcon.textContent = "♡"; });

// ─── Open fullscreen video ───────────────────────
heartBtn.addEventListener("click", () => {
  videoScreen.classList.add("open");

  // Re-trigger the hint fade animation each open
  closeHint.style.animation = "none";
  void closeHint.offsetWidth; // reflow
  closeHint.style.animation = "";

  loveVideo.currentTime = 0;
  loveVideo.play().catch(() => {
    // Autoplay blocked on some browsers — user interaction already happened so it should be fine
  });
});

// ─── Close: tap anywhere on video screen ─────────
videoScreen.addEventListener("click", () => {
  videoScreen.classList.remove("open");
  loveVideo.pause();
  loveVideo.currentTime = 0;
});

// ─── ESC to close ─────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    videoScreen.classList.remove("open");
    loveVideo.pause();
    loveVideo.currentTime = 0;
  }
});
