document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");
  const act1Divider = document.getElementById("act1-divider");
  const nextActBtn = document.querySelector(".next-act-btn");

  /* ================= INTRO ENTER ================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && introScreen && !introScreen.classList.contains("hidden")) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");
      document.body.style.overflowY = "auto";
    }
  });

  /* ================= FADE IN OBSERVER ================= */
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

  /* ================= ACT DIVIDER SOUND ================= */
  const actSound = new Audio("assets/sounds/transition.mp3");
  actSound.volume = 0.25;

  function goToNextAct() {
    actSound.play().catch(() => {});
    const next = act1Divider?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }

  /* Click support */
  nextActBtn?.addEventListener("click", goToNextAct);

  /* → key support */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && act1Divider) {
      const rect = act1Divider.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight + 150) {
        goToNextAct();
      }
    }
  });
});
