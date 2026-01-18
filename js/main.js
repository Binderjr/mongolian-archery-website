// ---- Theme (Light/Dark) ----
const THEME_KEY = "theme"; // "light" | "dark"
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = document.getElementById("themeToggleText");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Toggle light mode" : "Toggle dark mode");
    if (themeToggleText) themeToggleText.textContent = isDark ? "Dark" : "Light";
  }
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}


// Category filtering (front-end only)
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll("#productGrid .card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const category = chip.dataset.category;

    cards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const show = category === "all" || category === cardCategory;
      card.style.display = show ? "" : "none";
    });
  });
});

// Booking form (front-end only)
const bookingForm = document.getElementById("bookingForm");
const formHint = document.getElementById("formHint");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formHint.textContent =
      "Request saved locally (demo). Next step: connect to email or backend.";
    bookingForm.reset();
  });
}
