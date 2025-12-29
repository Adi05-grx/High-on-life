document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  /* ================= INTRO : ENTER ================= */
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      introScreen &&
      !introScreen.classList.contains("hidden")
    ) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");

      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.style.overflowY = "auto";
    }
  });

  /* ================= FADE-IN ================= */
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

  /* ================= ACT DIVIDER SYSTEM ================= */

  const heartbeat = new Audio("assets/sounds/heartbeat.mp3");
  heartbeat.volume = 0.18;

  let scrollLocked = false;
  let activeDivider = null;

  function lockScroll(divider) {
    if (scrollLocked) return;
    scrollLocked = true;
    activeDivider = divider;
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    if (!scrollLocked || !activeDivider) return;

    heartbeat.play().catch(() => {});
    scrollLocked = false;
    document.body.style.overflow = "auto";

    const nextSection = activeDivider.nextElementSibling;
    activeDivider = null;

    setTimeout(() => {
      nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  /* ================= OBSERVE ACT DIVIDERS ================= */
  const actDividers = document.querySelectorAll(".act-divider");

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !scrollLocked) {
          lockScroll(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  actDividers.forEach((divider) => dividerObserver.observe(divider));

  /* ================= BUTTON CLICK ================= */
  document.querySelectorAll(".next-act-btn").forEach((btn) => {
    btn.addEventListener("click", unlockScroll);
  });

  /* ================= KEYBOARD → ================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && scrollLocked) {
      unlockScroll();
    }
  });
});
