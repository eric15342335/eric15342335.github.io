# [eric15342335.github.io](https://eric15342335.github.io)

[![pages-build-deployment](https://github.com/eric15342335/eric15342335.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/eric15342335/eric15342335.github.io/actions/workflows/pages/pages-build-deployment)

Powered by Github Pages and `Jekyll` (for static site generation).

## Folder Structure

```bash
_includes/      # Shared HTMLs for all pages (Jekyll)
assets/         # CSS and PDFs
assets/font/    # `Inter` font files
pages/          # HTML pages
src/            # JavaScripts
```

## Browser support

* Chrome
  * I keep track of [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) [(or PageSpeed Insights)](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Feric15342335.github.io%2F) data
* Firefox
* Mobile devices

## Development

> [!NOTE]
> If you are new to Jekyll, you can refer to [Jekyll's documentation](https://jekyllrb.com/docs/).

Run:

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

to start a local server.
