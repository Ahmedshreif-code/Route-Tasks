
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
let selectedFont = localStorage.getItem("selectedFont") || "tajawal";

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
  localStorage.setItem("selectedFont", "tajawal");
  applyThemeColor(themeColors[0]);
  handleActiveFont(tajawalOption);
  handelCloseSettings();
}
function handelApplySavedFont() {
  const savedFontOption = document.querySelector(
    `[data-font="${selectedFont}"]`
  );

  document.body.classList.remove(
    "font-cairo",
    "font-tajawal",
    "font-alexandria"
  );
  document.body.classList.add(`font-${selectedFont}`);
  if (savedFontOption) {
    handleActiveFont(savedFontOption);
  }
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
  localStorage.setItem("selectedFont", selectedFont);
}
handelApplySavedFont();


// theme Color Change


// load saved color
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

  document.querySelectorAll(".theme-color").forEach((button) => {
    button.classList.remove("active");
  });

  const selectedButton = document.querySelector(
    `.theme-color[data-color="${color}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}

// create color buttons
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


// apply saved color or default color
if (savedThemeColor) {
  applyThemeColor(savedThemeColor);
} else {
  applyThemeColor(themeColors[0]);
}



// my projects filter 
let categories = document.querySelectorAll(".portfolio-filter");
// select category and activate it and filter projects based on category
categories.forEach((category) => {
  category.addEventListener("click", () => {
    let filter = category.getAttribute("data-filter");
    handleActiveCategory(filter);
    categories.forEach((cat) => {
      cat.classList = "portfolio-filter px-8 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700"
    });
    category.classList = "portfolio-filter active px-8 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
  })

})
// filter projects based on category
function handleActiveCategory(category) {
  let projects = document.querySelectorAll(".portfolio-item");
  projects.forEach((project) => {
    if (project.getAttribute("data-category") === category || category === "all") {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}


// Testimonials Carousel
let carousel = document.querySelector("#testimonials-carousel");
let cards = carousel.querySelectorAll(".testimonial-card");
let currentIndex = 0;

handleCarouselIndicators()
// handle carousel show based on screen size
function handleVisibleCards() {
  if (window.innerWidth >= 1024) { return 3; }
  else if (window.innerWidth >= 768) { return 2; }
  else { return 1; }
}
// handle carousel update
function handleUpdateCarousel() {
  let visibleCards = handleVisibleCards();
  let cardWidth = 100 / visibleCards;
  carousel.style.transform = `translateX(${currentIndex * cardWidth}%)`;

}
// handle next button click
function handleNext() {
  let visibleCards = handleVisibleCards();
  if (currentIndex < cards.length - visibleCards) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  handleUpdateCarousel();
  handelUpdateActiveIndicator();


}
// handle previous button click
function handlePrev() {
  let visibleCards = handleVisibleCards();
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = cards.length - visibleCards;
  }
  handleUpdateCarousel();
  handelUpdateActiveIndicator();

}

// handle carousel indicators
function handleCarouselIndicators() {
  let indecators = document.querySelectorAll(".carousel-indicator");
  indecators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index;

      handleUpdateCarousel();
      handelUpdateActiveIndicator();
    });
  });
}
// handel active indicator
function handelUpdateActiveIndicator() {
  let indicators = document.querySelectorAll(".carousel-indicator");

  indicators.forEach((indicator, index) => {
    indicator.classList.remove("bg-primary", "scale-125");
    indicator.classList.add("bg-slate-400", "dark:bg-slate-600");

    if (index === currentIndex) {
      indicator.classList.remove(
        "bg-slate-400",
        "dark:bg-slate-600"
      );

      indicator.classList.add("bg-primary", "scale-125");
    }
  });
}

