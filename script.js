document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  const actDividers = document.querySelectorAll(".act-divider");
  let activeDivider = null;
  let scrollLocked = false;

/* ================= INTRO : ENTER ================= */
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    introScreen &&
    !introScreen.classList.contains("hidden")
  ) {
    // Hide intro completely
    introScreen.classList.add("hidden");

    // Show songs
    songsWrapper.classList.remove("hidden");

    // Enable scrolling
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";

    // Jump to first story AFTER render
    setTimeout(() => {
      const firstStory = document.querySelector(".story-screen");
      if (firstStory) {
        firstStory.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }
});


  /* ================= FADE-IN ================= */
  const fadeElements = document.querySelectorAll(
    ".story-screen, .song-screen, .act-divider"
  );

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* ================= SCROLL LOCK LOGIC ================= */

  function lockScroll() {
    scrollLocked = true;
  }

  function unlockScroll() {
    scrollLocked = false;
  }

  // Prevent ONLY downward scroll when locked
  window.addEventListener("wheel", (e) => {
    if (scrollLocked && e.deltaY > 0) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener("touchmove", (e) => {
    // Basic touch direction detection could be added, 
    // but preventDefault is standard for the 'hard stop' feel
    if (scrollLocked) {
        e.preventDefault();
    }
  }, { passive: false });

  /* ================= ACT DIVIDER DETECTION ================= */

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Only lock if we haven't "passed" this divider yet
        if (entry.isIntersecting && !entry.target.classList.contains("passed")) {
          activeDivider = entry.target;
          lockScroll();
        } else {
          unlockScroll();
        }
      });
    },
    { threshold: 0.8 }
  );

  actDividers.forEach((divider) => dividerObserver.observe(divider));

  /* ================= NEXT ACT (SCROLL) ================= */

  function goNextAct() {
    if (!activeDivider) return;

    const nextSection = activeDivider.nextElementSibling;
    
    // Mark this divider as passed so the observer ignores it when scrolling back up
    activeDivider.classList.add("passed");
    
    unlockScroll();

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    activeDivider = null;
  }

  document.querySelectorAll(".next-act-btn").forEach((btn) => {
    btn.addEventListener("click", goNextAct);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && scrollLocked) {
      goNextAct();
    }
  });

  /* ================= CHAPTER TRANSITION : ACT 3 → ACT 4 ================= */

  if (document.body.classList.contains("chapter-page")) {
  const chapter1 = document.getElementById("chapter-1");
  const chapter2 = document.getElementById("chapter-2");
  const nextChapterBtn = document.querySelector(".next-chapter-btn");

  const chapterSound = new Audio("assets/sounds/ambient-swell.mp3");
  chapterSound.volume = 0.25;

  function goToNextChapter() {
    if (!chapter1 || !chapter2) return;

    chapterSound.play().catch(() => {});
    document.body.classList.add("lock-scroll");

    chapter1.classList.add("exit-left");
    chapter2.classList.add("active");

    setTimeout(() => {
      chapter2.scrollTop = 0;
      document.body.classList.remove("lock-scroll");
    }, 1200);
  }

  nextChapterBtn?.addEventListener("click", goToNextChapter);
}
});
