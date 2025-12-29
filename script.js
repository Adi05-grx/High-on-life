document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  const firstStory = document.querySelector(".story-screen"); // SONG 1 message
  const actDividers = document.querySelectorAll(".act-divider");

  let scrollLocked = false;

  /* ================= INTRO → SONG 1 ================= */
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      introScreen &&
      !introScreen.classList.contains("hidden")
    ) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");

      document.body.style.overflowY = "auto";

      // 🔥 DIRECT JUMP TO SONG 1 MESSAGE
      setTimeout(() => {
        firstStory.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
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
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => observer.observe(el));

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

  /* ================= ACT DIVIDER LOGIC ================= */

  // Ambient / heartbeat sound
  const heartbeat = new Audio("assets/sounds/heartbeat.mp3");
  heartbeat.volume = 0.2;

  actDividers.forEach((divider) => {
    const nextBtn = divider.querySelector(".next-act-btn");
    const nextSection = divider.nextElementSibling;

    // Lock scroll when divider is visible
    const dividerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lockScroll();
        }
      },
      { threshold: 0.6 }
    );

    dividerObserver.observe(divider);

    function goNext() {
      heartbeat.play().catch(() => {});
      unlockScroll();

      // 🔥 DIRECT JUMP TO NEXT ACT
      nextSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Click →
    nextBtn?.addEventListener("click", goNext);

    // Keyboard →
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "ArrowRight" &&
        scrollLocked &&
        isElementInViewport(divider)
      ) {
        goNext();
      }
    });
  });

  /* ================= HELPER ================= */
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.6 &&
           rect.bottom > window.innerHeight * 0.4;
  }
});
