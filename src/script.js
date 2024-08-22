'use strict';

// Constants for magic variables
const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const CONFIRM_MESSAGE = 'Are you sure you want to leave this page?';
const VISIBLE_TITLE = "Eric's GitHub Pages";
const HIDDEN_TITLE = "Come back to " + VISIBLE_TITLE + "!";
const RICKROLL_BUTTON_ID = 'rickroll-button';

/* Modifying button requires the DOM to be fully loaded */
document.addEventListener('DOMContentLoaded', () => {
  const rickrollButton = document.getElementById(RICKROLL_BUTTON_ID);
  if (rickrollButton) {
    rickrollButton.addEventListener('click', redirectToYouTube);
  }

  // Add event listener for visibility change
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

// Function to redirect to YouTube
const redirectToYouTube = () => {
  if (confirm(CONFIRM_MESSAGE)) {
    window.location.href = RICKROLL_URL;
  } else {
    /* Removes the button */
    document.getElementById(RICKROLL_BUTTON_ID).remove();
  }
};

// Function to handle visibility change
const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    // Change the title when the tab is not focused
    document.title = HIDDEN_TITLE;
  } else {
    // Restore the original title when the tab is focused
    document.title = VISIBLE_TITLE;
  }
};
