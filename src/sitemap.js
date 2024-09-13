"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const loadingSpinner = document.getElementById("loading-spinner");
  const sitemapList = document.getElementById("sitemap-menu");

  fetch("/sitemap.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const urls = xmlDoc.querySelectorAll("url");

      urls.forEach((url) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = url.textContent;
        link.textContent = url.textContent;
        listItem.appendChild(link);
        sitemapList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching the sitemap:", error))
    .finally(() => {
      loadingSpinner.style.display = "none";
      sitemapList.style.display = "block";
    });
});
