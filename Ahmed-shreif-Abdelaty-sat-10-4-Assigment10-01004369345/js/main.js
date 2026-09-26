
// navs toggle
let navLinks = document.querySelectorAll(".nav-links a");
let sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// theme toggle
let themeToggle = document.getElementById("theme-toggle-button");
let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.classList.toggle("dark", savedTheme === "dark");
}
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  let isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// nav toggle
let navToggle = document.getElementById("nav-toggle-button");
let navLinksContainer = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  let isOpen = navLinksContainer.classList.toggle("active");
});


// scroll to top button
let scrollToTopButton = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.classList.add("opacity-1", "visible");
    scrollToTopButton.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTopButton.classList.remove("opacity-1", "visible");
    scrollToTopButton.classList.add("opacity-0", "invisible");
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});




// settings toggle
let settingsToggleBtn = document.getElementById("settings-toggle");
let settingsSidebar = document.getElementById("settings-sidebar");
let settingsCloseBtn = document.getElementById("close-settings");
let setlang = document.querySelectorAll(".font-option");
let resetBtn = document.getElementById("reset-settings");
let selectedFont = "tajawal";

// open settings sidebar
settingsToggleBtn.addEventListener("click", () => {
  handelOpenSettings();
});

// font change
setlang.forEach((option) => {
  option.addEventListener("click", () => {
    handleFontChange(option);
  });
});

// close settings sidebar
settingsCloseBtn.addEventListener("click", () => {
  handelCloseSettings();
});
// reset settings
resetBtn.addEventListener("click", () => {
  handelResetSettings();
})


function handelOpenSettings() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsSidebar.classList.add("translate-x-0");
  settingsToggleBtn.style = "transform: translateY(-50%); right: 20rem;"
}
function handelCloseSettings() {
  settingsSidebar.classList.remove("translate-x-0");
  settingsSidebar.classList.add("translate-x-full");
  settingsToggleBtn.style = "transform: translateY(-50%); right: 0;"
}
function handelResetSettings() {
  const tajawalOption = document.querySelector('[data-font="tajawal"]');
  document.body.classList.remove("font-cairo", "font-tajawal", "font-alexandria");
  document.body.classList.add("font-tajawal");
  applyThemeColor(themeColors[0]);
  handleActiveFont(tajawalOption);
  handelCloseSettings();
}
function handleActiveFont(option) {
  setlang.forEach((opt) => {
    opt.classList.remove(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800",

    );
    opt.classList.add(
      "border-slate-200",
      "dark:border-slate-700",
      "border-slate-200"
    );
  });

  option.classList.add(
    "active",
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800"
  );
  option.classList.remove("border-slate-200", "dark:border-slate-700");

}
function handleFontChange(option) {
  handleActiveFont(option);

  selectedFont = option.getAttribute("data-font");

  document.body.classList.remove(
    "font-cairo",
    "font-tajawal",
    "font-alexandria"
  );

  document.body.classList.add("font-" + selectedFont);
}


// Theme Color Change


// Load saved color
const savedThemeColor = localStorage.getItem("themeColor");
const themeColorsGrid = document.getElementById("theme-colors-grid");

const themeColors = [
  "#6366f1",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#ec4899",
  "#a855f7",
  "#8b5cf6",
  "#14b8a6",
];

function applyThemeColor(color) {
  document.documentElement.style.setProperty("--color-primary", color);
  document.documentElement.style.setProperty("--color-secondary", color);
  document.documentElement.style.setProperty("--color-accent", color);

  localStorage.setItem("themeColor", color);

  // Remove active class from all colors
  document.querySelectorAll(".theme-color").forEach((button) => {
    button.classList.remove("active");
  });

  // Add active class to selected color
  const selectedButton = document.querySelector(
    `.theme-color[data-color="${color}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}

// Create color buttons
themeColors.forEach((color) => {
  const button = document.createElement("button");

  button.type = "button";

  button.className =
    "theme-color w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-all duration-300";

  button.style.backgroundColor = color;

  button.setAttribute("data-color", color);

  themeColorsGrid.appendChild(button);

  button.addEventListener("click", () => {
    applyThemeColor(color);
  });
});



if (savedThemeColor) {
  applyThemeColor(savedThemeColor);
} else {
  applyThemeColor(themeColors[0]);
}

