---
layout: post
title: "Generating commit message via GitLens and Copilot"
date: 2024-11-13 01:00:00 +0800
categories: blog
---

## Background

I have recently discovered a nice feature for [GitLens][gitlens] integration on [GitHub Copilot][github-copilot], that lets you generate commit messages using `o1-preview` or `o1-mini` without the need of typing them.

## Emm wait, isn't GitHub Copilot already have such feature?

![Figure: Already exists?](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-image1.png)
Yes, but it turns out that the extension uses `GPT-4o` models by default (source: trust me bro), and seems like there is no way to change it. If you want to use more advanced model (e.g. `o1` family from OpenAI), you can follow my steps. ([Notify me][website-repo-issue] if there is indeed a way!)

This is how to use the feature:

1. Install [GitLens extension][gitlens-extension] and [GitHub Copilot extension][github-copilot-extension]
2. Make changes by code something new
3. Proceed to `Source Control`(press `Ctrl+Shift+G`, followed by `G`), hover on the `SOURCE CONTROL` collapsable menu, and click the three horizontal dot button (`More Actions...`)
4. Click "Generate Commit Messages (GitLens)"
![Generate Commit Messages (GitLens)](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-image2.png)
5. Choose a model you like
![Choose a model](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-image3.png)
6. Wait, if you use `o1` models, it will take a long time

## Result

This is what [`o1-preview`][o1-preview-on-github-copilot] gives me:

Add guide on generating commit messages with GitLens

- Introduce a blog post explaining how to use GitLens and GitHub Copilot to automatically generate commit messages without typing.
- Include screenshots and update CSS to enhance image display.
- Organize image assets and update references for better structure.

[github-copilot]: https://github.com/features/copilot
[github-copilot-extension]: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
[gitlens]: https://www.gitkraken.com/gitlens
[gitlens-extension]: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
[website-repo-issue]: https://github.com/eric15342335/eric15342335.github.io/issues/new
[o1-preview-on-github-copilot]: https://github.blog/news-insights/product-news/try-out-openai-o1-in-github-copilot-and-models/
