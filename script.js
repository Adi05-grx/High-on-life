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

  /* ================= ACT DIVIDER SOUND & NAVIGATION ================= */
  const actSound = new Audio("assets/sounds/transition.mp3");
  actSound.volume = 0.25;

  function goToNextAct() {
    actSound.play().catch(() => {});
    
    // If you have a second page for Act 2, uncomment the line below:
    // window.location.href = "act2.html"; 

    // Otherwise, scroll to next element if it exists
    const next = act1Divider?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }

  /* Click support */
  nextActBtn?.addEventListener("click", goToNextAct);

  /* → key support */
  document.addEventListener("keydown", (e) => {
    // Only trigger if the divider is actually visible on screen
    if (e.key === "ArrowRight" && act1Divider) {
      const rect = act1Divider.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible) {
        goToNextAct();
      }
    }
  });
});
