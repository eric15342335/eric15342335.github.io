# [eric15342335.github.io](https://eric15342335.github.io)

[![powered by Jekyll](https://img.shields.io/badge/powered_by-Jekyll-yellow.svg)](https://jekyllrb.com)
[![pages-build-deployment](https://github.com/eric15342335/eric15342335.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/eric15342335/eric15342335.github.io/actions/workflows/pages/pages-build-deployment)

[![Rss](https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white)](https://eric15342335.github.io/feed.xml)

Static site powered by **Jekyll** and hosted via **GitHub Pages**.

---

## 📂 Project Structure

<!-- markdownlint-disable MD033 -->

<details>
  <summary><code>_includes/</code></summary>
  Shared HTML components (e.g., headers, footers).
</details>

<details>
  <summary><code>_layouts/</code></summary>
  Templates for posts and pages.
</details>

<details>
  <summary><code>_posts/</code></summary>
  Markdown files for blog posts.
</details>

<details>
  <summary><code>.github/</code></summary>
  GitHub-specific files, including workflows for GitHub Actions.
</details>

<details>
  <summary><code>.well-known/</code></summary>
  Files for web standards (e.g., security policies, verification files).
</details>

<details>
  <summary><code>assets/</code></summary>
  Static assets like fonts, images, and styles.
  <ul>
    <li><code>font/</code>: Font files</li>
  </ul>
</details>

<details>
  <summary><code>pages/</code></summary>
  Static HTML pages (e.g., <code>index.html</code>, <code>blog.html</code>).
</details>

<details>
  <summary><code>src/</code></summary>
  JavaScript source files.
  <ul>
    <li><code>thirdparty/</code>: Minified external javascript files (e.g. GoatCounter <code>count.js</code> file).</li>
  </ul>
</details>

<!-- markdown-enable MD033 --->

---

## 🌍 Browser Support

- **Chrome**: Monitored via [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) & [PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Feric15342335.github.io%2F)
- **Firefox**
- **Mobile**: Responsive design

---

## ⚙️ Dev Setup

> [!NOTE]
> If you are new to Jekyll, you can refer to [Jekyll's documentation](https://jekyllrb.com/docs/).

### Local Development

1. **Install dependencies**:

   ```bash
   gem install bundler
   bundle install
   ```

2. **Serve locally**:

   ```bash
   bundle exec jekyll serve --profile
   ```

   Optional for local network testing:

   ```bash
   bundle exec jekyll serve --host <YOUR_LOCAL_IP>
   ```

3. **Visit**:  
   Open `http://localhost:4000` in your browser.
