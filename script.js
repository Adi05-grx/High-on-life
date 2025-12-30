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

      // Jump directly to first story
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

  /* ================= SCROLL LOCK CORE ================= */

  function lockScroll() {
    if (scrollLocked) return;
    scrollLocked = true;
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    scrollLocked = false;
    document.body.style.overflow = "auto";
  }

  /* ================= ACT DIVIDER OBSERVER ================= */

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

  /* ================= GO TO NEXT ACT ================= */

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

  /* ================= BUTTON SUPPORT ================= */
  document.querySelectorAll(".next-act-btn").forEach((btn) => {
    btn.addEventListener("click", goNextAct);
  });

  /* ================= KEYBOARD → SUPPORT ================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && scrollLocked) {
      goNextAct();
    }
  });
});
