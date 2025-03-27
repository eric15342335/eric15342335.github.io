"use strict";

/**
 * Original and comeback titles for document visibility changes.
 */
const ORIGINAL_TITLE = document.title;
const COMEBACK_TITLE = "Come back to " + ORIGINAL_TITLE + "!";

/**
 * Creates a debounced version of the provided function that delays its execution until
 * after a specified wait time has elapsed since the last time it was invoked.
 *
 * @param {Function} callbackFunction - The function to debounce.
 * @param {number} waitTimeInMilliseconds - The delay in milliseconds before invoking the callback.
 * @returns {Function} - A new debounced function.
 */
function debounce(callbackFunction, waitTimeInMilliseconds) {
  let timerId;

  return function () {
    const functionArguments = arguments;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callbackFunction.apply(this, functionArguments);
    }, waitTimeInMilliseconds);
  };
}

/**
 * Handles the visibility change of the document. When the page is hidden,
 * it updates the document title to encourage the user to return. When visible,
 * it restores the original title.
 */
function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    document.title = COMEBACK_TITLE;
  } else {
    document.title = ORIGINAL_TITLE;
  }
}

/**
 * Updates the scroll indicator's position based on the user's current scroll position.
 * This provides a visual representation of how much the user has scrolled through the page.
 */
function updateScrollIndicator() {
  const scrollIndicatorElement = document.querySelector(".scroll-indicator");
  const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Calculate the current scroll position using scrollY or fallbacks for IE11 compatibility
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollPercentage = (currentScrollPosition / totalScrollableHeight) * 100;

  if (scrollIndicatorElement) {
    // Update the background position to reflect the scroll percentage
    scrollIndicatorElement.style.backgroundPosition = `${100 - scrollPercentage}% 0`;
    console.debug(`Scroll indicator set to ${scrollPercentage.toFixed(2)}%`);
  }

  console.debug("Window scrolled");
}

/**
 * Toggles the navigation menu's visibility on mobile devices by adding or removing
 * the 'open' class from the <nav> element. This allows for responsive navigation menus.
 */
function toggleNavigationMenu() {
  const navigationElement = document.querySelector("nav");
  if (navigationElement) {
    navigationElement.classList.toggle("open");
  }
}

/**
 * Toggles between dark and light themes based on the state of the theme toggle checkbox.
 * It also updates the user's theme preference in localStorage to persist the choice across sessions.
 *
 * @param {Event} event - The change event triggered by interacting with the theme toggle checkbox.
 */
function toggleTheme(event) {
  const bodyElement = document.body;
  const isDarkModeEnabled = event.target.checked;
  const lightThemeLink = document.getElementById('light-highlight-theme');
  const darkThemeLink = document.getElementById('dark-highlight-theme');

  if (isDarkModeEnabled) {
    bodyElement.classList.add("dark");
    if (lightThemeLink && darkThemeLink) {
      lightThemeLink.disabled = true;
      darkThemeLink.disabled = false;
    }
    sessionStorage.setItem('prefersDark', 'true');
  } else {
    bodyElement.classList.remove("dark");
    if (lightThemeLink && darkThemeLink) {
      lightThemeLink.disabled = false;
      darkThemeLink.disabled = true;
    }
    sessionStorage.setItem('prefersDark', 'false');
  }

  console.log(`Dark mode is ${isDarkModeEnabled ? "enabled" : "disabled"}`);
}

/**
 * Initializes the theme based on the system's preferred color scheme.
 */
function initializeTheme() {
  const themeToggleCheckbox = document.getElementById("theme-toggle");
  const bodyElement = document.body;
  const lightThemeLink = document.getElementById('light-highlight-theme');
  const darkThemeLink = document.getElementById('dark-highlight-theme');

  // Check sessionStorage first, fall back to system preference
  const sessionPreference = sessionStorage.getItem('prefersDark');
  const prefersDarkScheme = sessionPreference !== null 
    ? sessionPreference === 'true'
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  themeToggleCheckbox.checked = prefersDarkScheme;
  
  if (prefersDarkScheme) {
    bodyElement.classList.add("dark");
    if (lightThemeLink && darkThemeLink) {
      lightThemeLink.disabled = true;
      darkThemeLink.disabled = false;
    }
  } else {
    bodyElement.classList.remove("dark");
    if (lightThemeLink && darkThemeLink) {
      lightThemeLink.disabled = false;
      darkThemeLink.disabled = true;
    }
  }
}

/**
 * Attaches all necessary event listeners to the document and its elements.
 * This includes visibility changes, scroll events, navigation menu toggling,
 * and theme toggling.
 */
function attachEventListeners() {
  // Listen for changes in document visibility to update the title accordingly
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Attach a debounced scroll event listener to update the scroll indicator
  window.addEventListener("scroll", debounce(updateScrollIndicator, 15));

  // Attach a click event listener to the navbar toggler icon for mobile navigation
  const navbarToggleButton = document.querySelector(".navbar-toggler-icon");
  if (navbarToggleButton) {
    navbarToggleButton.addEventListener("click", toggleNavigationMenu);
  }

  // Attach a change event listener to the theme toggle checkbox to switch themes
  const themeToggleCheckbox = document.getElementById("theme-toggle");
  if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener("change", toggleTheme);
  }

  // Initialize the theme based on the user's saved preference
  initializeTheme();
}

function displayVisitorCount() {
  let path = location.pathname === '/index.html' ? '/' : location.pathname;
  let request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    let response = JSON.parse(this.responseText);
    document.querySelector('#goatcounter-stats-number').innerText = response.count;
    document.querySelector('#goatcounter-stats').style.display = 'block';
  });
  request.open('GET', 'https://eric310.goatcounter.com/counter/' + encodeURIComponent(path) + '.json');
  request.send();
}

function setEvenOddDayFont() {
  // Get the current day of the month
  const today = new Date();
  const dayOfMonth = today.getDate();
  
  // Check if the day is divisible by 2 (even day)
  const isEvenDay = dayOfMonth % 2 === 0;
  
  // Get the HTML element
  const htmlElement = document.documentElement;
  
  // Add the appropriate class based on the day
  if (isEvenDay) {
    htmlElement.classList.add('even-day');
  } else {
    htmlElement.classList.add('odd-day');
  }
  
  // Optional: log to console for debugging
  console.log(`Today is day ${dayOfMonth}, which is an ${isEvenDay ? 'even' : 'odd'} day.`);
  console.log(`Font set to: ${isEvenDay ? 'Claude Sans' : 'Inter'}`);
}

/**
 * Ensures that all functionalities are initialized once the DOM is fully loaded.
 */
function initializeApp() {
  setEvenOddDayFont();
  attachEventListeners();
  displayVisitorCount();
}

// Attach the initialization function to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", initializeApp);
