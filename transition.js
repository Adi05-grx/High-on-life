document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".next-chapter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextPage = btn.dataset.next;
      if (!nextPage) return;

      // Lock scroll
      document.body.style.overflow = "hidden";

      // Slide current page left
      document.body.classList.add("page-exit-left");

      setTimeout(() => {
        window.location.href = nextPage;
      }, 900);
    });
  });
});
