---
layout: post
title: "How to make the most of your ChatGPT $20 subscription on the Web UI"
date: 2026-07-14 20:29:36 +08:00
categories: blog
tags: [chatgpt, prompts, ai]
---

We often imagine an agent that can work for us continuously - researching, self-criticizing, understanding the big picture, and avoiding premature convergence.

Here is the simplest prompt I found to keep [ChatGPT 5.5 or 5.6](https://openai.com/index/gpt-5-6/) working on a task for longer.

Copy and paste the following verbatim into the chat:

```text
Spend at least [N minutes] actively working on this task before giving the final answer. Count only productive task work, not idle time, waiting, sleep commands, artificial delays, or time spent merely keeping a timer running. Use timing utilities only to measure elapsed time, and briefly report how you measured it.
```

Practically, the value of N can be set to `N <= 30`. Otherwise, ChatGPT's internal safety/alignment guardrails might trigger (it may detect time‑wasting behavior) and refuse to operate for a long time.

---

I store my reusable prompts in my GitHub repository: [eric15342335/misc - prompts](https://github.com/eric15342335/misc/tree/main/prompts).

I am expected to graduate in July 2027 and am seeking entry-level roles in cloud computing and AI.
