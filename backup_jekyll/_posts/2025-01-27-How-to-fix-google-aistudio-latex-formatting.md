---
layout: post
title: "How to fix Google AI Studio LaTeX Formatting"
date: 2025-01-27 17:20:00 +0800
categories: blog
description: "Quick fix for Google AI Studio's broken LaTeX formatting: add 'Enclose LaTeX in $ and don't use double/triple ticks' to your prompt for properly rendered math equations and formulas."
---

## Update

As of April 11, 2025, the models from Google AI Studio now output coherent LaTeX formatting without specific guided prompts. This post now serves as a historical reference.

## Solution

Paste this in your system prompt (or after your user prompt):

```txt
Enclose LaTeX in $ and don't use double/triple ticks.
```

## Source

<https://www.reddit.com/r/Bard/comments/1h2ndnu/comment/m1q5gea/>
