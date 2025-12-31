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

    // CRITICAL FIX: Ensure body allows scrolling and reset position
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

  /* ================= SCROLL LOCK ================= */

  function lockScroll() {
    if (scrollLocked) return;
    scrollLocked = true;
    // Removed overflow:hidden to allow scroll-up logic below
  }

  function unlockScroll() {
    scrollLocked = false;
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
  }

  // FIX: ONLY block downward scrolling when locked
  window.addEventListener("wheel", (e) => {
    if (scrollLocked && e.deltaY > 0) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener("touchmove", (e) => {
    if (scrollLocked) {
      // On mobile, we block touch move at the divider for the 'hard stop'
      e.preventDefault();
    }
  }, { passive: false });

  /* ================= ACT DIVIDER DETECTION ================= */

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only lock if we are entering the divider from the top (scrolling down)
          if (entry.boundingClientRect.top > 0) {
            activeDivider = entry.target;
            lockScroll();
          }
        } else {
          // If the divider leaves the screen, ensure we aren't locked anymore
          unlockScroll();
        }
      });
    },
    { threshold: 0.6 }
  );

  actDividers.forEach((divider) => dividerObserver.observe(divider));

  /* ================= NEXT ACT (SCROLL) ================= */

  function goNextAct() {
    if (!activeDivider) return;

    const nextSection = activeDivider.nextElementSibling;
    if (!nextSection) return;

    unlockScroll();

    nextSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

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

    /* ================= CHAPTER TRANSITION : ACT 6 → ACT 7 ================= */

if (document.body.classList.contains("chapter-page")) {
  const nextChapterBtn = document.querySelector(".next-chapter-btn");

  if (nextChapterBtn) {
    nextChapterBtn.addEventListener("click", () => {
      document.body.classList.add("page-exit-left");

      setTimeout(() => {
        window.location.href = "chapter3.html";
      }, 900);
    });
  }
}


  nextChapterBtn?.addEventListener("click", goToNextChapter);
}
});
