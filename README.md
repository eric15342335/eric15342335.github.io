# [eric15342335.github.io](https://eric15342335.github.io)

[![powered by Next.js](https://img.shields.io/badge/powered_by-Next.js-000000.svg)](https://nextjs.org)
[![Next.js Build and Deploy](https://github.com/eric15342335/eric15342335.github.io/actions/workflows/jekyll-ci.yml/badge.svg)](https://github.com/eric15342335/eric15342335.github.io/actions/workflows/jekyll-ci.yml)

[![Rss](https://img.shields.io/badge/rss-F88900?style=for-the-badge&logo=rss&logoColor=white)](https://eric15342335.github.io/feed.xml)

Static site powered by **Next.js** with TypeScript and hosted via **GitHub Pages**.

---

## 📂 Project Structure

<!-- markdownlint-disable MD033 -->

<details>
  <summary><code>src/components/</code></summary>
  React components (Navbar, Footer) shared across pages.
</details>

<details>
  <summary><code>src/app/</code></summary>
  Next.js App Router structure with page components and layouts.
</details>

<details>
  <summary><code>_posts/</code></summary>
  Markdown files for blog posts with date-based naming (YYYY-MM-DD-title.md).
</details>

<details>
  <summary><code>_posts_zh-CN/</code></summary>
  Chinese language versions of blog posts.
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
  <summary><code>public/</code></summary>
  Static assets and data files:
  <ul>
    <li><code>font/</code>: Self-hosted Inter font</li>
    <li><code>images/</code>: WebP images for blog posts, PWA manifest etc.</li>
    <li><code>manifest.json</code>: PWA configuration</li>
    <li><code>courses.json</code>: Course data</li>
    <li><code>lib/</code>: Third-party libraries (highlight.js, GoatCounter, etc.)</li>
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
> This site is built with Next.js. You can refer to [Next.js documentation](https://nextjs.org/docs) for more information.

### Local Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Visit**:  
   Open `http://localhost:3000` in your browser.

### Features

- **Static Site Generation (SSG)**: Pre-rendered at build time for optimal performance
- **TypeScript**: Type-safe development
- **Dark/Light Theme**: Automatic theme switching based on user preference
- **Multi-language Support**: English and Chinese versions
- **Blog System**: Markdown-based blog posts with automatic page generation
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Analytics**: GoatCounter integration for privacy-friendly analytics
