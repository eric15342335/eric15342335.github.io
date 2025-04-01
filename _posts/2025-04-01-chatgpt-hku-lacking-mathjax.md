---
layout: post
title: "chatgpt.hku.hk does not render LaTeX: how to fix"
date: 2025-04-01 23:45:00 +0800
categories: blog
---

## Background

If you're studying in HKU, you would know that the University provides access to [DeepSeek-r1](https://deepseek.com/) at [chatgpt.hku.hk](https://chatgpt.hku.hk) (with no restrictions or rate limits, unlike previous models like [GPT-4o](https://openai.com/index/gpt-4o-system-card/), which billed 500,000 tokens monthly). However, as of when this blog was written, the web UI does not render $\LaTeX{}$, which is a major drawback for students who are studying mathematics or related subjects.

## Solution

Follow these steps:

1. Include the following in your prompt:

    ```txt
    Enclose LaTeX in $ and don't use double/triple ticks.
    ```

2. Simply paste this code into your browser console:

    Update: I made a Chrome extension to automate this process. [Check it out here!](https://github.com/eric15342335/mathjax-injector-extension)
    {: .encircled-text}

    ```javascript
    // Create and load MathJax
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";

    // Configure MathJax with all needed delimiters
    window.MathJax = {
        tex: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]],
            displayMath: [["$$", "$$"], ["\\[", "\\]"]],
            packages: ['base', 'ams', 'noerrors', 'noundefined', 'autoload', 'require']
        },
        startup: {
            typeset: false
        }
    };

    // Add script to document
    document.head.appendChild(script);

    // Set up observer to detect new messages
    script.onload = function () {
        // Initial typeset
        MathJax.typeset();

        // Debounce function to limit typeset calls
        let timeoutId = null;
        const debounceTypeset = function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(function () {
                MathJax.typeset();
                timeoutId = null;
            }, 10); // Wait ?ms before processing to batch changes
        };

        // Create observer for new content
        new MutationObserver(function (mutations) {
            let hasNewNodes = false;

            // Check if any of the mutations contain new nodes
            for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                    hasNewNodes = true;
                    break;
                }
            }

            if (hasNewNodes) {
                // Use debounced typeset
                debounceTypeset();
            }
        }).observe(document.body, {
            childList: true,
            subtree: true,
            characterData: false,
        });
    };
    ```
