"use strict";

const ORIGINAL_TITLE = document.title;
const COMEBACK_TITLE = "Come back to " + ORIGINAL_TITLE + "!";

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("visibilitychange", handleVisibilityChange);

  window.addEventListener("scroll", handleWindowScroll);

  const navbarToggle = document.querySelector(".navbar-toggler-icon");
  const navbar = document.querySelector("nav");
  // Toggle the navbar when the toggle button is clicked, if it exists (for mobile).
  if (navbarToggle && navbar) {
    navbarToggle.addEventListener("click", function () {
      navbar.classList.toggle("open");
    });
  }
});

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    document.title = COMEBACK_TITLE;
  } else {
    document.title = ORIGINAL_TITLE;
  }
}

function debounce(func, delay) {
  let timeoutId;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(null, args);
    }, delay);
  };
}

const scrollDebounceTime = 15;

const handleWindowScroll = debounce(function () {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  // Use scrollTop as fallback for scrollY in IE11
  const scrollY =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  const scrollPercentage = (scrollY / maxScroll) * 100;
  if (scrollIndicator) {
    scrollIndicator.style.backgroundPosition = 100 - scrollPercentage + "% 0";
    console.debug("Scroll indicator set to " + scrollPercentage + "%");
  }
  console.debug("Window scrolled");
}, scrollDebounceTime);
