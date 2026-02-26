const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("nav-scroll");
  } else {
    navbar.classList.remove("nav-scroll");
  }
});