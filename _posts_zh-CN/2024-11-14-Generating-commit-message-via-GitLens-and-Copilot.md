---
layout: post
title: "用GitLens和Copilot自动生成commit message"
date: 2024-11-14 21:00:00 +0800
categories: blog
lang: zh-CN
slug: Generating-commit-message-via-GitLens-and-Copilot
---

## 背景

最近我发现了[GitLens][gitlens]与[GitHub Copilot][github-copilot]集成的一个特别好用的小功能，就是无需手动输入，就能直接使用 `o1-preview` 或 `o1-mini` 模型自动生成提交（commit）消息。

## 等等，GitHub Copilot不早就有了吗？

![Figure: Already exists?](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-image1.webp)

确实，Copilot本身就自带了自动生成commit信息的功能。可是实际用下来发现，这个自带功能默认调用的似乎是`GPT-4o`模型，目前好像也并没有提供让用户自行更改模型的选项。如果你也想选用一些更先进的模型（比如来自OpenAI的`o1`系列），可以跟着我这个指南走一遍。（如果后面官方确实有了方法，[请记得提醒一下我][website-repo-issue]！）

使用步骤如下：

1. 首先安装[GitLens扩展][gitlens-extension]以及[GitHub Copilot扩展][github-copilot-extension]。

   更新（2024年11月20日）：安装GitLens后，还需启用Pre-release版本，才能正常与Copilot扩展联动使用。

    ![Pre-release version of GitLens](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-gitlens-pre-release.webp)
    {: .encircled-text}

2. 接下来，就写几行代码，随便做些修改。
3. 进入`Source Control`页面（快捷键`Ctrl+Shift+G`，然后再按个`G`），将鼠标移到`SOURCE CONTROL`标题右侧，点击出现的三个点的图标（`More Actions...`）。
4. 点击"Generate Commit Messages (GitLens)"。

    ![Generate Commit Messages (GitLens)](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-image2.webp)

5. 接着，你就可以选择你喜欢的AI模型啦。

    ![Choose a model](/assets/images/2024-11-14-Generating-commit-message-via-GitLens-and-Copilot-image3.webp)

6. 不过提醒一下哟，用`o1`系列的模型生成commit message，那等待时间是真的略长，需要耐心……

## 效果展示

下面是用[`o1-preview`][o1-preview-on-github-copilot]给我生成的一条commit消息：

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
