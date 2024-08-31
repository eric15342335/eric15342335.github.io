'use strict';

/**
 * Fetches the sitemap.xml file, parses the URLs, and displays them in a list on the page.
 * This function is executed when the DOM content has finished loading.
 */
document.addEventListener('DOMContentLoaded', () => {
  fetch('sitemap.xml')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');
      const urls = xmlDoc.getElementsByTagName('url');
      const sitemapList = document.getElementById('sitemap-menu');

      for (let i = 0; i < urls.length; i++) {
        const loc = urls[i].getElementsByTagName('loc')[0].textContent;
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = loc;
        link.textContent = loc;
        listItem.appendChild(link);
        sitemapList.appendChild(listItem);
      }
    })
    .catch(error => console.error('Error fetching the sitemap:', error));
});
