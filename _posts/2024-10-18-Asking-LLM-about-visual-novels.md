---
layout: post
title: "Asking LLM about visual novels"
date: 2024-10-18 03:00:00 +0800
categories: blog
---

## Context

So, one day, I was playing around with [ollama][ollama], and I was curious about how do the model parameters and quantization levels affect their output. I will talk about
quantization levels later If I have time. Let's focus on the number of parameters first.

My take will be simply asking the AI model what is [Hoshizora no Memoria][hoshizora-no-memoria], the visual novel that I read last time. And the model with the smallest parameter size
over this blog [`qwen2.5:0.5b-instruct-fp16`][qwen2.5:0.5b-instruct-fp16] (ID: `c82efd44bfdc`, size: `994 MB`) fail to
recognize it as a visual novel, but at least know I was talking about something Japanese-related:

### Qwen2.5 0.5b

```shell
PS C:\Users\123er> ollama run qwen2.5:0.5b-instruct-fp16
```

`>>>` Hoshizora no Memoria

I understand you're looking for information on "Memoria Hoshizora," which refers to the memory of Senzō Hoshizō, the sixth emperor of Japan. While I am not a historian or expert in Japanese history, I can provide some general insights.

Senzō Hoshizō was born around 1495 and died in 1560. He was an influential figure during the late Edo period (1867-1912), known for his efforts to harmonize Confucianism with traditional Japanese culture. His memory often comes up in discussions about historical figures who lived within that era.

(the chat continues here...)

### Llama3.2 3b

[`llama3.2:3b-instruct-q8_0`][llama3.2:3b-instruct-q8_0] at least guessed it as something ACG-related:

```shell
PS C:\Users\123er> ollama run llama3.2:3b-instruct-q8_0
```

`>>>` Hoshizora no Memoria

Hoshizora no Memoria (, lit. "Memories of the Horizon") is a Japanese manga series written and
illustrated by Yura Mimiwa.

The story follows a young girl named Akiha Hoshino, who possesses a unique ability to see and interpret the memories of others through their emotions. She uses this power to help people overcome their traumatic pasts and find closure.

(the chat continues here...)

### GPT-4o-mini

[`GPT-4o-mini`][gpt-4o-mini] is more accurate, but still screwed up the details:

**Hoshizora no Memoria** (星空のメモリア) is a visual novel developed by **Furukawa Shun** and released by **Hoshizora no Memoria Team**. It combines elements of romance and drama, featuring a rich story and character development.

(the chat continues here...)

### ChatGPT-4o-latest

[`ChatGPT-4o-Latest`][ChatGPT-4o-Latest] was very accurate:

**Hoshizora no Memoria -Wish upon a Shooting Star-** is a Japanese visual novel developed by **Favorite**, originally released in 2009. It is a romance visual novel that features branching storylines and multiple endings depending on the player's choices. The story revolves around the protagonist and his return to his hometown, where he reconnects with childhood memories and encounters mysterious events, particularly involving a promise made to a girl under the night sky.

### Plot Summary

The story begins with **Kogasaka You**, the protagonist, returning to his hometown after several years of living elsewhere. His mother has passed away, and he moves back with his younger sister, **Chinami**, to live with their aunt.

(the chat continues here...)

## Final words

As you can think of, the parameter size increases will make the AI remember more and more characteristics of the words it gets trained on. At first, it recognized it was Japanese, then it was ACG-related, then visual novel, finally coming up with pretty accurate information.

### Model Performance Comparison

| Model | Parameter Size | Output Accuracy | Key Issue |
|-|-|-|-|
| Qwen2.5 0.5b | 0.5 Billion | Completely irrelevant (talked about a historical figure) | Misinterpreted the query entirely |
| Llama3.2 3b | 3 Billion | Recognized ACG context, but gave incorrect details (manga) | Misrepresented the content as a manga |
| GPT-4o-mini | ? | Recognized the visual novel but got some details wrong | Incorrect developer, vague plot description |
| ChatGPT-4o-Latest | ? | Provided accurate details about the game and its storyline | Accurate |

## My hardware specs

| Component | Name |
|-|-|
| CPU | AMD Ryzen 7 7840HS w/ Radeon 780M Graphics |
| Memory | 4*4GB DDR5 5500MT/s |
| GPU | NVIDIA GeForce RTX 4050 Laptop (6GB) |

[ollama]: https://ollama.com/
[hoshizora-no-memoria]: https://vndb.org/v1474
[qwen2.5:0.5b-instruct-fp16]: https://ollama.com/library/qwen2.5:0.5b-instruct-fp16
[llama3.2:3b-instruct-q8_0]: https://ollama.com/library/llama3.2:3b-instruct-q8_0
[gpt-4o-mini]: https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/
[chatgpt-4o-latest]: https://platform.openai.com/docs/models/gpt-4o
