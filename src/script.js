'use strict';

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const CONFIRM_MESSAGE = 'Are you sure you want to leave this page?';
const ORIGINAL_TITLE = document.title;
const COMEBACK_TITLE = `Come back to ${ORIGINAL_TITLE}!`;
const RICKROLL_BUTTON_ID = 'rickroll-button';

// Modifying button requires the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const rickrollButton = document.getElementById(RICKROLL_BUTTON_ID);
  if (rickrollButton) {
    rickrollButton.addEventListener('click', redirectToYouTube);
  } else {
    console.warn(`Button with ID "${RICKROLL_BUTTON_ID}" not found.`);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
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
  }
};

const removeRickrollButton = () => {
  const button = document.getElementById(RICKROLL_BUTTON_ID);
  if (button) {
    button.remove();
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
