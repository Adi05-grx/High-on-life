document.addEventListener("DOMContentLoaded", () => {
  // Handles the slide to the new HTML file
  document.querySelectorAll(".next-chapter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Lock scroll
      document.body.style.overflow = "hidden";

      // Slide current page left
      document.body.classList.add("page-exit-left");

      setTimeout(() => {
        // This will redirect to your Chapter 2 file
        window.location.href = "chapter2.html";
      }, 900);
    });
  });

  // Basic Next Act scrolling support
  document.querySelectorAll(".next-act-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target) {
        const el = document.getElementById(target);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
