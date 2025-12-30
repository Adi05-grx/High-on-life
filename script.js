document.addEventListener("DOMContentLoaded", () => {

  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  const firstStory = document.querySelector(".story-screen");

  const actDividers = document.querySelectorAll(".act-divider");

  let scrollLocked = false;

  /* ================= INTRO → SONG 1 ================= */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !introScreen.classList.contains("hidden")) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");

      // Hard jump to first story
      setTimeout(() => {
        firstStory.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      document.body.style.overflowY = "auto";
    }
  });

  /* ================= FADE IN ================= */

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll(".story-screen, .song-screen, .act-divider")
    .forEach(el => fadeObserver.observe(el));

  /* ================= SCROLL LOCK CORE ================= */

  function lockScroll() {
    if (scrollLocked) return;
    scrollLocked = true;
    document.body.style.overflowY = "hidden";
  }

  function unlockScroll() {
    scrollLocked = false;
    document.body.style.overflowY = "auto";
  }

  /* ================= ACT DIVIDER BEHAVIOR ================= */

  actDividers.forEach(divider => {

    const nextBtn = divider.querySelector(".next-act-btn");

    // Lock scroll when divider enters view
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

    dividerObserver.observe(divider);

    function goNext() {
      unlockScroll();

      const nextSection = divider.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Click →
    nextBtn.addEventListener("click", goNext);

    // Keyboard →
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" && scrollLocked) {
        goNext();
      }
    });
  });

});
