document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  const firstStory = document.querySelector(".story-screen");

  const act1Divider = document.getElementById("act1-divider");
  const act2Start = document.getElementById("act-2-start");

  const act2Divider = document.getElementById("act2-divider");
  const act3Start = document.getElementById("act-3-start");

  /* ================= INTRO → SONG 1 (ENTER) ================= */

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Enter" &&
      introScreen &&
      !introScreen.classList.contains("hidden")
    ) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");

      document.body.style.overflowY = "auto";

      // 🚀 DIRECT JUMP TO SONG 1 MESSAGE
      setTimeout(() => {
        firstStory.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  });

  /* ================= FADE IN ================= */

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

  /* ================= ACT 1 → ACT 2 ================= */

  let act2Unlocked = false;

  const heartbeat = new Audio("assets/sounds/heartbeat.mp3");
  heartbeat.volume = 0.18;

  function goToAct2() {
    if (act2Unlocked) return;
    act2Unlocked = true;

    heartbeat.play().catch(() => {});

    act2Start.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  document
    .querySelectorAll("#act1-divider .next-act-btn")
    .forEach((btn) => btn.addEventListener("click", goToAct2));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && isVisible(act1Divider)) {
      goToAct2();
    }
  });

  /* ================= ACT 2 → ACT 3 ================= */

  let act3Unlocked = false;

  function goToAct3() {
    if (act3Unlocked) return;
    act3Unlocked = true;

    heartbeat.play().catch(() => {});

    act3Start.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  document
    .querySelectorAll("#act2-divider .next-act-btn")
    .forEach((btn) => btn.addEventListener("click", goToAct3));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && isVisible(act2Divider)) {
      goToAct3();
    }
  });

  /* ================= HELPERS ================= */

  function isVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
  }
});
