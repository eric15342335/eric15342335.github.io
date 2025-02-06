---
layout: post-latex
title: "LaTeX in Markdown Test"
date: 2024-09-25 11:00:00 +0800
categories: blog
description: "A proof by mathematical induction that the sum of squares formula f(n) = n(n+1)(2n+1)/6 holds for all non-negative integers"
---

## Question

One can easily prove (by M.I.) that
$$
f(n) = \frac{n(n+1)(2n+1)}{6}, \forall n \geq 0
$$

## Proof

Let $f(n)$ be $0^2+1^2+2^2+3^2+\ldots+n^2=\frac{n(n+1)(2n+1)}{6}$ ,
for $\forall n \geq 0$,

$$
\begin{align*}
\text{For } n = 0, \ \text{L.H.S.} = 0 \\
\text{R.H.S.} = 0
\end{align*}
$$

$$ \because \text{L.H.S.} = \text{R.H.S.} $$

$$ \therefore f(0) \text{ is true.} $$

Assume $S(n)$ is true for some $n=k$ where $k \geq 0$,
i.e. $0^2+1^2+2^2+3^2+\ldots+k^2=\frac{k(k+1)(2k+1)}{6}$

$$
\begin{align*}
\text{For $n=k+1$ , L.H.S.} &= 0^2+1^2+2^2+3^2+\ldots+k^2+(k+1)^2 \\
&= \frac{k(k+1)(2k+1)}{6}+(k+1)^2 \text{ (By induction assumption)} \\
&= \frac{k(k+1)(2k+1)+6(k+1)^2}{6} \\
&= \frac{(k+1)(k(2k+1)+6(k+1))}{6} \\
&= \frac{(k+1)(2k^2+7k+6)}{6} \\
&= \frac{(k+1)(k+2)(2k+3)}{6} \\
&= \frac{(k+1)((k+1)+1)(2(k+1)+1)}{6} \\
&= \text{R.H.S.}
\end{align*}
$$

$$ \because \text{L.H.S.} = \text{R.H.S.} $$

$$ \therefore \text{By the principle of mathematical induction, } f(n) \text{ is true for all } n \geq 0. $$
