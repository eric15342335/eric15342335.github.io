<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="3.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
  <xsl:message>
    <!-- Original author message -->
    Powered by <a href="https://www.sitemap.style/">Sitemap Style</a>
  </xsl:message>

  <!-- get the hostname from the first url/loc -->
  <xsl:variable name="hostname" select="substring-before(substring-after(/sitemap:urlset/sitemap:url[1]/sitemap:loc, '://'), '/')" />
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="unsafe-url" />
        <title>Sitemap for <xsl:value-of select="$hostname"/></title>
        <link rel="stylesheet" href="/assets/style.css" />
      </head>
      <body>
        <!-- Display the hostname in the header -->
        <h1>Pages on <xsl:value-of select="$hostname"/></h1>

        <h3>XML Sitemap - Eric's GitHub Pages</h3>

        <!-- List of sitemap URLs -->
        <ul class="sitemap-menu">
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <!-- Extract the location of each URL -->
            <xsl:variable name="sitemap_loc"><xsl:value-of select="sitemap:loc"/></xsl:variable>
            
            <!-- List item for each URL -->
            <li>
              <a href="{$sitemap_loc}"><xsl:value-of select="sitemap:loc" /></a>
            </li>
          </xsl:for-each>
        </ul>
        
        <!-- Display the total number of pages -->
        <p><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> pages</p>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
