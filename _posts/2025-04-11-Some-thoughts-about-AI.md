---
layout: post
title: "AI is Going to Replace Most Work"
date: 2025-04-11 00:42:00 +0800
categories: blog
---

#### Clickbait (not really)

## Background

Here are just my thoughts on AI (in particular **Large Language Models**, since it is currently the most impactful AI system for normal people). I do write them in point-form, so don't expect coherence here :\(

## Requirements for AI Replacement

1. A lot of people did the same/similar work previously
2. Examples were readily available online

> **Statement**: No matter how powerful LLMs are (reasoning, agents, long context retrieval, etc.), they still require previously seen knowledge and cannot solely rely on their "hallucination".
>
> **Hypothesis**: AI with significant reasoning ability cannot complete a task flawlessly if it is completely new to either humans or AI systems in general.

## Result

AI is able to train on and remember these examples, letting anyone do the same thing with minimal prior knowledge.

## Solution

Go to fields that have minimal examples:

- **Fields with few practitioners**
  - Relatively unused fields like certain historical niches
    - (Though I likely won't study these fields)
  - Useful fields that require significant knowledge and research (e.g., *SOTA*)

- **Fields with no patterns**
  - Fields that are purely random in nature
    - (I likely won't succeed in these fields due to their indeterministic nature)

- **Fields that constantly generate new examples**
  - Faster than what AI can learn
  - Question: *As AI scales up every year, what fields can really keep pace?*

---

## What AI have I been using recently?

### [ChatGPT 4o][chatgpt] (on chatgpt.com)

- **Image generation ability** (as of Apr 11, 2025)
  - Native generation is really impressive and is able to form correct, clean text such as banners or blackboards, etc. However, there are still some issues with the geometric understanding.

### [Gemini 2.5 Pro Preview][aistudio] (on aistudio.google.com)

- **Really impressive long context retrieval and reasoning ability**
  - It is able to perform calculation *step by step* (not skipping steps unlike other AI models when they receive 10 math questions and told to do all at once). It is able to make best informed decision according to the context provided. TL;DR, it is *attentive to details* (Yes K.P. Wat!)
- Unlimited usage and free, can't demand more, right?

### [Gemini DeepResearch][gemini] (on gemini.google.com)

- This is really impressive. I used it for several purposes:
  - Finding scholarly published papers and using them as my APA citations for my essay assignments and other stuff
  - Performing in-depth broad range analysis and investigation on one particular field or topic
    - It is able to consider almost all aspects of the topic (primarily due to the mass amount of information it receives on the internet, and its reasoning ability) and generate a detailed report. If my prompt is detailed, then I would expect more than 10 pages, 5000+ words report (including references).
  - I almost built a workflow for this:
      1. (This should be step 0) Come up with an interesting topic that I want to read about and spend time on it
      2. Ask [Gemini 2.5 Pro][aistudio], or other AI models to understand what I don't know, and to provide me with a detailed prompt which covers various aspects of the topic to be explored on
      3. Throw the prompt into [Gemini DeepResearch][gemini]
      4. In the meantime, generate a $\LaTeX{}$ template using either [Gemini 2.5 Pro][aistudio] or [Claude 3.7 Sonnet][claude] (you may ask why I use this? It is because I bought Claude Pro, so not using it feels like wasting money 😅)
      5. Wait until the [Gemini DeepResearch][gemini] finishes
      6. Throw the entire report into [ChatGPT 4o][chatgpt] and let it generate a cover page image (using its native image generation ability)
      7. Ask any of the LLM models mentioned above to amend the $\LaTeX{}$ template in order to adjust the section, subsection and other stuff that the DeepResearch-generated report gave us
      8. Copy respective sections from the report and paste them into the $\LaTeX{}$ template
      9. Fix the errors that arise, this step should take around 5-10 trials depending on luck
      10. $\cdots$
      11. Done!
  - In fact, you can see one of my [previously generated report samples here][A24-Consultancy-Report-Gemini-DeepResearch]

### [Claude 3.7 Sonnet][claude] (thinking) (on claude.ai via my Claude Pro subscription)

- Before the [GPT-4o][chatgpt] image generation ability was released, I thought this was the best decision (of subscribing to an AI service) because Claude was the strongest LLM model at (web development specifically) programming and I have a web development course ([COMP3322][comp3322-hku-cs])
- It turns out [GPT-4o][chatgpt] native image output released few days after
- [Gemini 2.5 Pro][aistudio] followed next
  - So it was kind of not a good time to buy a subscription lol
- UI is generally good, with support of React artifacts (I primarily use it for data visualization since I don't need to run it on my python lol)
- In terms of the *attention to details* ability, it is not as good as [Gemini 2.5 Pro][aistudio] (which is able to perform step by step calculation). Claude 3.7 Sonnet (thinking) would just summarize everything if I didn't explicitly ask it to explore every step in-depth

[chatgpt]: https://chatgpt.com
[aistudio]: https://aistudio.google.com
[gemini]: https://gemini.google.com
[claude]: https://claude.ai
[A24-Consultancy-Report-Gemini-DeepResearch]: /assets/A24_Consultancy_Research_AIGenReport.pdf
[comp3322-hku-cs]: https://www.cs.hku.hk/index.php/programmes/course-offered?infile=2024/comp3322.html
