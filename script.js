document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const songsWrapper = document.getElementById("songs-wrapper");

  // ENTER key to start experience
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !introScreen.classList.contains("hidden")) {
      introScreen.classList.add("hidden");
      songsWrapper.classList.remove("hidden");
      document.body.style.overflow = "auto";
    }
  });

  // Fade-in animation for story + song screens
  const fadeElements = document.querySelectorAll(
    ".story-screen, .song-screen"
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
});
/* SONG SCREENS */
.song-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

/* SONG CONTENT */
.song-content {
  display: flex;
  gap: 40px;
  max-width: 900px;
  align-items: center;
}

.song-content img {
  width: 280px;
  border-radius: 12px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
}

.song-text h2 {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  margin-bottom: 20px;
}

.song-text p {
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.9;
}

/* STORY SCREENS */
.story-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

/* COLOR MOODS */
.mood-rose {
  background: radial-gradient(circle at top, #402030, #0b0508);
}

.mood-blue {
  background: radial-gradient(circle at top, #1e2a44, #05070d);
}

/* HIDDEN */
.hidden {
  display: none;
}
