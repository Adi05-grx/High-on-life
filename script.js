document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  // ENTER to start
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !introScreen.classList.contains("hidden")) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");
      document.body.style.overflowY = "auto";
    }
  });

  // Fade-in observer
  const elements = document.querySelectorAll(".story-screen, .song-screen");

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
});
// ================= AMBIENT TRANSITION SOUND =================
let ambientPlayed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !ambientPlayed) {
    const audio = new Audio("assets/audio/ambient.mp3");
    audio.volume = 0.25;
    audio.play().catch(() => {});
    ambientPlayed = true;
  }
// ================= ACT DIVIDER LOGIC =================

const act1Divider = document.getElementById("act1-divider");
const nextActBtn = document.querySelector(".next-act-btn");

// Ambient click sound
const actSound = new Audio("assets/sounds/transition.mp3");
actSound.volume = 0.25;

function goToNextAct() {
  actSound.play();
  act1Divider.scrollIntoView({
    behavior: "smooth",
    block: "end"
  });

  // Scroll to next section after divider
  setTimeout(() => {
    act1Divider.nextElementSibling?.scrollIntoView({
      behavior: "smooth"
    });
  }, 700);
}

// Click support
nextActBtn?.addEventListener("click", goToNextAct);

// Keyboard → support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (act1Divider && isElementInViewport(act1Divider)) {
      goToNextAct();
    }
    });
function goToAct2() {
  const act2Start = document.querySelector("#act-2-start");
  if (act2Start) {
    act2Start.scrollIntoView({ behavior: "smooth" });
  }
// ================= ACT DIVIDER LOGIC =================

const act1Divider = document.getElementById("act1-divider");
const nextActBtn = document.querySelector(".next-act-btn");

// Ambient click sound
const actSound = new Audio("assets/sounds/transition.mp3");
actSound.volume = 0.25;

function goToNextAct() {
  actSound.play();
  act1Divider.scrollIntoView({
    behavior: "smooth",
    block: "end"
  });

  // Scroll to next section after divider
  setTimeout(() => {
    act1Divider.nextElementSibling?.scrollIntoView({
      behavior: "smooth"
    });
  }, 700);
}

// Click support
nextActBtn?.addEventListener("click", goToNextAct);

// Keyboard → support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (act1Divider && isElementInViewport(act1Divider)) {
      goToNextAct();
    }
  }
});

// Helper
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight + 100;
}




