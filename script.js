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

  // ================= ACT NAVIGATION & SCROLL LOCK =================

const heartbeat = new Audio("assets/sounds/heartbeat.mp3");
heartbeat.volume = 0.25;

// Lock scroll initially after ACT 1
let scrollLocked = true;
document.body.style.overflowY = "hidden";

// Unlock + move to ACT 2
const act1Divider = document.getElementById("act1-divider");
const act2Start = document.getElementById("act-2-start");
const act1Btn = act1Divider?.querySelector(".next-act-btn");

function unlockAndGoToAct2() {
  heartbeat.currentTime = 0;
  heartbeat.play().catch(() => {});
  scrollLocked = false;
  document.body.style.overflowY = "auto";

  act2Start.classList.remove("hidden");
  act2Start.scrollIntoView({ behavior: "smooth" });
}

act1Btn?.addEventListener("click", unlockAndGoToAct2);

// Keyboard →
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && scrollLocked) {
    unlockAndGoToAct2();
  }
});
