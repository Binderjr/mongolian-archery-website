// ---- Theme (Light/Dark) ----
const THEME_KEY = "theme"; // "light" | "dark"
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = document.getElementById("themeToggleText");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Toggle light mode" : "Toggle dark mode",
    );
    if (themeToggleText)
      themeToggleText.textContent = isDark ? "Dark" : "Light";
  }
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const initialTheme = getInitialTheme();

// Disable transitions during initial load
document.documentElement.classList.add("no-theme-transition");
applyTheme(initialTheme);

// Re-enable transitions after theme is applied
requestAnimationFrame(() => {
  document.documentElement.classList.remove("no-theme-transition");
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

// Smooth filtering with FLIP animation
function filterGridWithAnimation(gridEl, category) {
  const cards = Array.from(gridEl.querySelectorAll(".card"));

  // 1) Record first positions (FLIP)
  const first = new Map();
  cards.forEach((c) => {
    if (c.style.display !== "none") first.set(c, c.getBoundingClientRect());
  });

  // 2) Decide which cards should be visible
  const shouldShow = (card) => {
    const cardCategory = card.dataset.category;
    return category === "all" || category === cardCategory;
  };

  // 3) Hide cards with fade, then display:none after animation
  cards.forEach((card) => {
    if (!shouldShow(card) && card.style.display !== "none") {
      card.classList.add("is-hiding");
      window.setTimeout(() => {
        card.style.display = "none";
        card.classList.remove("is-hiding");
      }, 180);
    }
  });

  // 4) Show cards immediately (for layout), but start transparent for fade-in
  cards.forEach((card) => {
    if (shouldShow(card) && card.style.display === "none") {
      card.style.display = "";
      card.style.opacity = "0";
      card.style.transform = "scale(0.98)";
      // next frame -> animate in
      requestAnimationFrame(() => {
        card.style.opacity = "";
        card.style.transform = "";
      });
    }
  });

  // 5) After layout settles, do FLIP slide for remaining cards
  requestAnimationFrame(() => {
    const visible = cards.filter((c) => c.style.display !== "none");
    visible.forEach((card) => {
      const last = card.getBoundingClientRect();
      const firstRect = first.get(card);
      if (!firstRect) return;

      const dx = firstRect.left - last.left;
      const dy = firstRect.top - last.top;

      if (dx || dy) {
        card.style.transition = "none";
        card.style.transform = `translate(${dx}px, ${dy}px)`;
        card.getBoundingClientRect(); // force reflow
        card.style.transition = "";
        card.style.transform = "";
      }
    });
  });
}

// Category filtering (front-end only)
const homeGrid = document.getElementById("productGrid");
const chips = document.querySelectorAll(".chip");

if (homeGrid && chips.length) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      filterGridWithAnimation(homeGrid, chip.dataset.category);
    });
  });
}

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
