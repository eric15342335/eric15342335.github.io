'use strict';

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const CONFIRM_MESSAGE = 'Are you sure you want to leave this page?';
const RICKROLL_BUTTON_ID = 'rickroll-button';
const BUTTON_REMOVED_KEY = 'rickrollButtonRemoved';

const ORIGINAL_TITLE = document.title;
const COMEBACK_TITLE = `Come back to ${ORIGINAL_TITLE}!`;

const NAVBAR_HTML_PATH = '/pages/common/navbar.html';
const NAVBAR_PLACEHOLDER_ID = 'nav-placeholder';

const FOOTER_HTML_PATH = '/pages/common/footer.html';
const FOOTER_PLACEHOLDER_ID = 'footer-placeholder';

const resizeDebounceTime = 100;

document.addEventListener('DOMContentLoaded', () => {
  console.debug('DOMContentLoaded event fired');
  document.addEventListener('visibilitychange', handleVisibilityChange);

  fetch(NAVBAR_HTML_PATH)
    .then(response => response.text())
    .then(data => {
      document.getElementById(NAVBAR_PLACEHOLDER_ID).innerHTML = data;
      
      const rickrollButton = document.getElementById(RICKROLL_BUTTON_ID);
      // Check if the button was previously removed
      if (buttonClickedBefore()) {
        removeRickrollButton();
      } else if (rickrollButton) {
        rickrollButton.addEventListener('click', redirectToYouTube);
      } else {
        console.warn(`Button with ID "${RICKROLL_BUTTON_ID}" not found.`);
      }
      
      /* JavaScript to update the scroll indicator */
      window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (window.scrollY / maxScroll) * 100;
        scrollIndicator.style.backgroundPosition = `${100 - scrollPercentage}% 0`;
        console.debug('Window scrolled');
      });

      window.addEventListener('resize', handleWindowResize);
    })
    .catch(error => console.error('Error loading navigation:', error));
  
  fetch(FOOTER_HTML_PATH)
    .then(response => response.text())
    .then(data => {
      document.getElementById(FOOTER_PLACEHOLDER_ID).innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});

/**
 * Redirects the user to the Rick Roll video if confirmed.
 * If not confirmed, removes the Rick Roll button.
 */
const redirectToYouTube = () => {
  if (confirm(CONFIRM_MESSAGE)) {
    window.location.href = RICKROLL_URL;
  } else {
    removeRickrollButton();
    // Cache the button removed state
    sessionStorage.setItem(BUTTON_REMOVED_KEY, 'true');
  }
};

const buttonClickedBefore = () => {
  return sessionStorage.getItem(BUTTON_REMOVED_KEY) === 'true';
};

const resetButtonState = () => {
  const rickrollButton = document.getElementById(RICKROLL_BUTTON_ID);
  sessionStorage.removeItem(BUTTON_REMOVED_KEY);
  rickrollButton.style.display = 'block';
};

const removeRickrollButton = () => {
  const rickrollButton = document.getElementById(RICKROLL_BUTTON_ID);
  if (rickrollButton) {
    rickrollButton.style.display = 'none';
  } else {
    console.warn(`Button with ID "${RICKROLL_BUTTON_ID}" not found for removal.`);
  }
};

/**
 * Handles the visibility change of the document.
 * If the document becomes hidden, sets the document title to COMEBACK_TITLE.
 * If the document becomes visible again, sets the document title to ORIGINAL_TITLE.
 */
const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    document.title = COMEBACK_TITLE;
  } else {
    document.title = ORIGINAL_TITLE;
  }
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const handleWindowResize = debounce(() => {
  const rickrollButton = document.getElementById(RICKROLL_BUTTON_ID);
  if (!buttonClickedBefore()) {
    if (rickrollButton) {
      resetButtonState();
    } else {
      console.warn(`Button with ID "${RICKROLL_BUTTON_ID}" not found.`);
    }
    console.debug('Window resized');
  }
}, resizeDebounceTime);

