const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const id = entry.target.id;
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (link) link.classList.add("active");
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));