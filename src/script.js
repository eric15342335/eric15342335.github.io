'use strict';

/* Modifing button requires the DOM to be fully loaded */
document.addEventListener('DOMContentLoaded', function() {
  const rickrollButton = document.getElementById('rickroll-button');
  if (rickrollButton) {
    rickrollButton.addEventListener('click', redirectToYouTube);
  }
});

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const redirectToYouTube = function() {
  if (confirm('Are you sure you want to leave this page?')) {
    window.location.href = RICKROLL_URL;
  }
  else {
    /* Removes the button */
    document.getElementById('rickroll-button').remove();
  }
};
