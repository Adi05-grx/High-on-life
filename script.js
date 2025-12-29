document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  // ENTER to start
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !introScreen.classList.contains("hidden")) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");
      document.body.style.overflowY = "auto";
    }
  });

  // Fade-in observer
  const elements = document.querySelectorAll(".story-screen, .song-screen");

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
});
// ================= AMBIENT TRANSITION SOUND =================
let ambientPlayed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !ambientPlayed) {
    const audio = new Audio("assets/audio/ambient.mp3");
    audio.volume = 0.25;
    audio.play().catch(() => {});
    ambientPlayed = true;
  }
});
