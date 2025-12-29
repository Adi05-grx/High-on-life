document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");
  const act1Divider = document.getElementById("act1-divider");
  const nextActBtn = document.querySelector(".next-act-btn");

  /* ================= INTRO ENTER ================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && introScreen && !introScreen.classList.contains("hidden")) {
      // Hide intro and show songs
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");
      
      // CRITICAL FIX: Force scroll to top so it doesn't jump to the divider
      window.scrollTo(0, 0);
      
      // Enable scrolling
      document.body.style.overflowY = "auto";
    }
  });

  /* ================= FADE IN OBSERVER ================= */
  // We select elements again after wrapper is shown to ensure they are tracked
  const elements = document.querySelectorAll(".story-screen, .song-screen, .act-divider");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(el => observer.observe(el));

  // ================= ACT 2 LOCK & NAVIGATION =================

const act2Start = document.getElementById("act-2-start");
const act1Divider = document.getElementById("act1-divider");
const act2Divider = document.getElementById("act2-divider");

let act2Unlocked = false;

// Heartbeat sound
const heartbeat = new Audio("assets/sounds/heartbeat.mp3");
heartbeat.volume = 0.18;

// Unlock ACT 2
function unlockAct2() {
  if (act2Unlocked) return;
  act2Unlocked = true;

  heartbeat.play().catch(() => {});

  act2Start.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Button click
document.querySelectorAll("#act1-divider .next-act-btn").forEach(btn => {
  btn.addEventListener("click", unlockAct2);
});

// Keyboard →
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && isElementInViewport(act1Divider)) {
    unlockAct2();
  }
});

// Prevent scroll into ACT 2 until unlocked
window.addEventListener("scroll", () => {
  if (!act2Unlocked && act2Start) {
    const rect = act2Start.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      act1Divider.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Helper
function isElementInViewport(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight + 150;
}
