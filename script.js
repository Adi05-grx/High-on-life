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
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");

      // Jump to first story
      const firstStory = document.querySelector(".story-screen");
      firstStory?.scrollIntoView({ behavior: "smooth" });

      document.body.style.overflowY = "auto";
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
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    scrollLocked = false;
    document.body.style.overflow = "auto";
  }

  /* ================= ACT DIVIDER DETECTION ================= */

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeDivider = entry.target;
          lockScroll();
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && nextChapterBtn) {
      goToNextChapter();
    }
  });
});
