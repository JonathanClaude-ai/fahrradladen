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

// Contact form validation
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

const errorMessages = {
  name: "Bitte gib deinen Namen an (mind. 2 Zeichen).",
  email: "Bitte gib eine gültige E-Mail-Adresse an.",
  message: "Bitte schreib uns mind. 10 Zeichen.",
  privacy: "Bitte bestätige die Datenschutzerklärung.",
};

function validateField(field) {
  const error = form.querySelector(`[data-error-for="${field.name}"]`);
  const valid = field.checkValidity() && (field.type === "checkbox" || field.value.trim() !== "");
  field.setAttribute("aria-invalid", !valid);
  error.textContent = valid ? "" : errorMessages[field.name];
  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const results = [...form.elements].filter((el) => el.name).map(validateField);
  if (results.every(Boolean)) {
    form.reset();
    successMsg.hidden = false;
  } else {
    successMsg.hidden = true;
    form.querySelector('[aria-invalid="true"]').focus();
  }
});

form.addEventListener("blur", (e) => {
  if (e.target.name) validateField(e.target);
}, true);

// Load Google Maps only after consent
const map = document.getElementById("map");
document.getElementById("map-consent").addEventListener("click", () => {
  const iframe = document.createElement("iframe");
  iframe.src = map.dataset.src;
  iframe.title = "Karte: Standort Radlwerk München";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  map.replaceChildren(iframe);
});
