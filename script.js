document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  const act1Divider = document.getElementById("act1-divider");
  const act2Start = document.getElementById("act-2-start");

  let act2Unlocked = false;

  /* ================= INTRO : ENTER ================= */
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      introScreen &&
      !introScreen.classList.contains("hidden")
    ) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");

      // Force top so it doesn't jump
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.style.overflowY = "auto";
    }
  });

  /* ================= FADE-IN OBSERVER ================= */
  const fadeElements = document.querySelectorAll(
    ".story-screen, .song-screen, .act-divider"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));

  /* ================= ACT 1 → ACT 2 LOGIC ================= */

  // Heartbeat sound (subtle)
  const heartbeat = new Audio("assets/sounds/heartbeat.mp3");
  heartbeat.volume = 0.18;

  function unlockAct2() {
    if (act2Unlocked) return;
    act2Unlocked = true;

    heartbeat.play().catch(() => {});

    act2Start.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Click → button
  const nextButtons = document.querySelectorAll(
    "#act1-divider .next-act-btn"
  );
  nextButtons.forEach((btn) =>
    btn.addEventListener("click", unlockAct2)
  );

  // Keyboard →
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "ArrowRight" &&
      act1Divider &&
      isElementInViewport(act1Divider)
    ) {
      unlockAct2();
    }
  });

  // Lock scroll into ACT 2
  window.addEventListener("scroll", () => {
    if (!act2Unlocked && act2Start) {
      const rect = act2Start.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        act1Divider.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });

  /* ================= HELPERS ================= */
  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight * 0.7;
  }
});

/* ================= ACT DIVIDER SCROLL LOCK ================= */

const actDividers = document.querySelectorAll(".act-divider");
let scrollLocked = false;

// Lock scroll
function lockScroll() {
  if (scrollLocked) return;
  scrollLocked = true;
  document.body.classList.add("lock-scroll");
}

// Unlock scroll
function unlockScroll() {
  scrollLocked = false;
  document.body.classList.remove("lock-scroll");
}

// Observe dividers
const dividerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lockScroll();
      }
    });
  },
  { threshold: 0.6 }
);

actDividers.forEach(divider => dividerObserver.observe(divider));

// Click → unlock + move forward
document.querySelectorAll(".next-act-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    unlockScroll();

    const nextSection = btn.closest(".act-divider")?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth" });
  });
});

// Keyboard → support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && scrollLocked) {
    unlockScroll();

    const visibleDivider = [...actDividers].find(isElementInViewport);
    const nextSection = visibleDivider?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth" });
  }
});

// Helper
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
}
