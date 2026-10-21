const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navList.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
