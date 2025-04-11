---
layout: post
title: "用LLM问了下Galgame，居然是这种结果"
date: 2024-10-18 03:00:00 +0800
categories: blog
lang: zh-CN
slug: Asking-LLM-about-visual-novels
---

## 事情是这样的……

前段时间没事做，折腾了一下 [ollama][ollama] 这个玩意儿。突然想到一个有趣的问题：模型的参数量和量化等级对输出结果究竟会产生怎样的影响？量化等级啥的过段时间有空再聊吧，这篇我们先聊聊参数数量的问题。

于是我想出了个简单粗暴的办法——直接问问AI，我最近看的这部日本Galgame(视觉小说)《[Hoshizora no Memoria][hoshizora-no-memoria]》(星空的记忆) 到底是个什么东西。结果呢，参数量最小的那个模型，也就是本文里用到的 [`qwen2.5:0.5b-instruct-fp16`][qwen2.5:0.5b-instruct-fp16]（镜像ID：`c82efd44bfdc`，大小：`994 MB`），直接翻了个大车，竟然误以为我在讨论啥日本历史人物，连游戏都没识别出来，不过好歹感觉出了点日本相关的味道：

### Qwen2.5 0.5b

```shell
PS C:\Users\123er> ollama run qwen2.5:0.5b-instruct-fp16
```

`>>>` Hoshizora no Memoria

I understand you're looking for information on "Memoria Hoshizora," which refers to the memory of Senzō Hoshizō, the sixth emperor of Japan. While I am not a historian or expert in Japanese history, I can provide some general insights.

Senzō Hoshizō was born around 1495 and died in 1560. He was an influential figure during the late Edo period (1867-1912), known for his efforts to harmonize Confucianism with traditional Japanese culture. His memory often comes up in discussions about historical figures who lived within that era.

(the chat continues here...)

### Llama3.2 3b

[`llama3.2:3b-instruct-q8_0`][llama3.2:3b-instruct-q8_0] 倒是至少猜到了是ACG相关的东西（虽然依然翻车，说成了漫画）：

```shell
PS C:\Users\123er> ollama run llama3.2:3b-instruct-q8_0
```

`>>>` Hoshizora no Memoria

Hoshizora no Memoria (, lit. "Memories of the Horizon") is a Japanese manga series written and
illustrated by Yura Mimiwa.

The story follows a young girl named Akiha Hoshino, who possesses a unique ability to see and interpret the memories of others through their emotions. She uses this power to help people overcome their traumatic pasts and find closure.

(the chat continues here...)

### GPT-4o-mini

[`GPT-4o-mini`][gpt-4o-mini] 的准确度好了一大截，但一些细节还是胡乱编了下：

**Hoshizora no Memoria** (星空のメモリア) is a visual novel developed by **Furukawa Shun** and released by **Hoshizora no Memoria Team**. It combines elements of romance and drama, featuring a rich story and character development.

(the chat continues here...)

### ChatGPT-4o-latest

而咱的 [`ChatGPT-4o-Latest`][ChatGPT-4o-Latest] 就真的yyds了，信息不仅贼靠谱，而且剧情细节也整挺清楚的：

**Hoshizora no Memoria -Wish upon a Shooting Star-** is a Japanese visual novel developed by **Favorite**, originally released in 2009. It is a romance visual novel that features branching storylines and multiple endings depending on the player's choices. The story revolves around the protagonist and his return to his hometown, where he reconnects with childhood memories and encounters mysterious events, particularly involving a promise made to a girl under the night sky.

### Plot Summary

The story begins with **Kogasaka You**, the protagonist, returning to his hometown after several years of living elsewhere. His mother has passed away, and he moves back with his younger sister, **Chinami**, to live with their aunt.

(the chat continues here...)

## 一点小感想吧

总之，这次简单粗暴的测试还挺有意思的，可以看出来随着AI参数量的增加，对词汇记忆和理解的细节把握程度也明显提升了不少。一开始只认出了是日本的东西，后来猜到了是ACG相关，再后来正确识别为视觉小说，最后则能相当精准地介绍具体剧情。不得不说，这个学习规律还是挺直观的。

### 不同模型的表现对比 (Model Performance Comparison)

| 模型 | 参数规模 | 输出准确性 | 存在的问题 |
|-|-|-|-|
| Qwen2.5 0.5b | 0.5B | 完全跑题 (扯到历史人物去了😂) | 完全误解了提问 |
| Llama3.2 3b | 3B | 知道是ACG，但胡编成了漫画 | 错误识别内容类型 |
| GPT-4o-mini | ? | 正确认出了视觉小说，但细节乱给 | 开发商乱编，剧情概述简陋 |
| ChatGPT-4o-Latest | ? | 信息精准，剧情细节完整到位 | 完全正确 |

## 顺便贴一下我自己的电脑配置

| 配件 | 型号 |
|-|-|
| CPU | AMD Ryzen 7 7840HS w/ Radeon 780M Graphics |
| 内存 | 4*4GB DDR5 5500MT/s |
| GPU | NVIDIA GeForce RTX 4050 Laptop (6GB) |

[ollama]: https://ollama.com/
[hoshizora-no-memoria]: https://vndb.org/v1474
[qwen2.5:0.5b-instruct-fp16]: https://ollama.com/library/qwen2.5:0.5b-instruct-fp16
[llama3.2:3b-instruct-q8_0]: https://ollama.com/library/llama3.2:3b-instruct-q8_0
[gpt-4o-mini]: https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/
[ChatGPT-4o-Latest]: https://platform.openai.com/docs/models/gpt-4o
