---
layout: post
title: "如何修复Google AI Studio的LaTeX公式显示问题"
date: 2025-01-27 17:20:00 +0800
categories: blog
description: "简单一招修复Google AI Studio中LaTeX公式显示异常的问题：提示词中添加 'Enclose LaTeX in $ and don't use double/triple ticks'，公式就能正常渲染显示了。"
lang: zh-CN
slug: How-to-fix-google-aistudio-latex-formatting
---

## 更新说明

截至2025年4月11日，Google AI Studio的模型已经可以自动输出格式正确的LaTeX公式，无需额外添加特定提示词。因此，本篇文章目前仅作历史参考。

## 快捷解决方案

在你的系统提示（system prompt）或者用户提示（user prompt）后加入以下这句话即可：

```txt
Enclose LaTeX in $ and don't use double/triple ticks.
```

## 信息来源

<https://www.reddit.com/r/Bard/comments/1h2ndnu/comment/m1q5gea/>
