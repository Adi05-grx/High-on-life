const contents = document.querySelectorAll(".song-content");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

contents.forEach(content => {
  observer.observe(content);
});
