---
layout: post
title: "测试Markdown中的LaTeX"
date: 2024-09-25 11:00:00 +0800
categories: blog
description: "用数学归纳法证明平方和公式f(n) = n(n+1)(2n+1)/6对所有非负整数成立"
lang: zh-CN
slug: LaTeX-in-markdown-test
---

## 问题

可以通过数学归纳法(M.I.)轻松证明
$$
f(n) = \frac{n(n+1)(2n+1)}{6}, \forall n \geq 0
$$

## 证明

令$f(n)$为$0^2+1^2+2^2+3^2+\ldots+n^2=\frac{n(n+1)(2n+1)}{6}$，
对于$\forall n \geq 0$，

$$
\begin{align*}
\text{对于} n = 0, \ \text{L.H.S.} = 0 \\
\text{R.H.S.} = 0
\end{align*}
$$

$$ \because \text{L.H.S.} = \text{R.H.S.} $$

$$ \therefore f(0) \text{成立。} $$

假设$S(n)$对某个$n=k$成立，其中$k \geq 0$，
即$0^2+1^2+2^2+3^2+\ldots+k^2=\frac{k(k+1)(2k+1)}{6}$

$$
\begin{align*}
\text{对于$n=k+1$，L.H.S.} &= 0^2+1^2+2^2+3^2+\ldots+k^2+(k+1)^2 \\
&= \frac{k(k+1)(2k+1)}{6}+(k+1)^2 \text{（根据归纳假设）} \\
&= \frac{k(k+1)(2k+1)+6(k+1)^2}{6} \\
&= \frac{(k+1)(k(2k+1)+6(k+1))}{6} \\
&= \frac{(k+1)(2k^2+7k+6)}{6} \\
&= \frac{(k+1)(k+2)(2k+3)}{6} \\
&= \frac{(k+1)((k+1)+1)(2(k+1)+1)}{6} \\
&= \text{R.H.S.}
\end{align*}
$$

$$ \because \text{L.H.S.} = \text{R.H.S.} $$

$$ \therefore \text{根据数学归纳法原理，} f(n) \text{对所有} n \geq 0 \text{成立。} $$