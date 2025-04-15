---
layout: post
title: "chatgpt.hku.hk 无法渲染LaTeX的解决方案"
date: 2025-04-01 23:45:00 +0800
categories: blog
lang: zh-CN
slug: chatgpt-hku-lacking-mathjax
---

## 更新

我给HKU ITS发了一封邮件，没想到他们真的迅速回复了，短短一周内就上线了这个功能（现在[chatgpt.hku.hk](https://chatgpt.hku.hk)可以直接看到$\LaTeX$公式啦！）。现在的问题是，LLM 模型输出公式的时候，是不是始终能严格按照LaTeX的标准格式，比如正确使用`$`或者`$$`来包围公式，这一点还需要多观察一下。

## 背景说明

如果你也是香港大学（HKU）的学生，相信你肯定知道，学校目前为大家提供了[DeepSeek-r1](https://deepseek.com/) 的免费访问途径（就在 [chatgpt.hku.hk](https://chatgpt.hku.hk)）。与此前的 [GPT-4o](https://openai.com/index/gpt-4o-system-card/) 等模型相比，如今这个平台不仅无限次数、不限速，连以前每月500,000个token的计费模式都直接取消了。虽然条件看起来很不错，但我最近发现，这个网页版界面竟然不支持LaTeX公式渲染！不得不说，这对数学或数理相关专业的同学们来说确实非常不方便。

## 解决方案

其实解决起来倒也不难，按照下面这两个步骤操作就行：

1. 在你跟模型交互的prompt里面，加上这么一句：

    ```txt
    Enclose LaTeX in $ (inline math) or $$ (multi-line math). Use appropriate delimiters for your equations.
    ```

    这句话的意思是提示模型使用标准的 `$` 或 `$$` 符号来划分公式，这样渲染起来更规范。

2. 然后在浏览器的控制台（Console）中直接粘贴以下代码即可：

    我后来直接开发了一个Chrome扩展，如果你需要经常处理公式，不妨试试：[mathjax-injector-extension](https://github.com/eric15342335/mathjax-injector-extension)
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
