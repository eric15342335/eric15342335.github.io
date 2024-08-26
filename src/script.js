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
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
});

const redirectToYouTube = () => {
  if (confirm(CONFIRM_MESSAGE)) {
    window.location.href = RICKROLL_URL;
  } else {
    document.getElementById(RICKROLL_BUTTON_ID).remove();
  }
};

const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    document.title = COMEBACK_TITLE;
  } else {
    document.title = ORIGINAL_TITLE;
  }
};
