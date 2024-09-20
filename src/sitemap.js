"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const loadingSpinner = document.getElementById("loading-spinner");
  const sitemapList = document.getElementById("sitemap-menu");

  // Use XMLHttpRequest instead of fetch for IE11 support
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/sitemap.xml", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
      var urls = xmlDoc.querySelectorAll("url");

      // IE11 does not support forEach on NodeLists, so use a for loop
      for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var listItem = document.createElement("li");
        var link = document.createElement("a");
        link.href = url.textContent;
        link.textContent = url.textContent;
        listItem.appendChild(link);
        sitemapList.appendChild(listItem);
      }

      // Hide loading spinner and show sitemap after processing
      loadingSpinner.style.display = "none";
      sitemapList.style.display = "block";
    }
  };

  xhr.onerror = function() {
    console.error("Error fetching the sitemap.");
  };

  xhr.send();
});
