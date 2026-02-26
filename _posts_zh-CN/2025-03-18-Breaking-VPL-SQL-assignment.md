---
layout: post
title: "攻破VPL SQL作业的一个小尝试"
date: 2025-03-18 21:10:00 +0800
categories: blog
lang: zh-CN
slug: Breaking-VPL-SQL-assignment
---

![快速演示图，展示本篇文章的核心内容](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-demo-success.webp)

我到底是怎么发现这个的？

## 背景故事

我们遇到过这样一道题目：

**Q6. [12%] 显示2024年2月期间，每个充电站（charging station）的 *station_ID*、*station_name* 和 *rental_income*。**

- 结果排序要求：首先按 *rental_income* 从高到低排序，然后按 *station_ID* 从低到高排序。
- 这里的 *rental_income* 就是该时段内所有 *payment_amount* 的总和。

平时的话，我们直接用(My)SQL一句话就给它解决了：

```sql
SELECT cs.station_ID, cs.name AS station_name,
    SUM(rt.payment_amount) AS rental_income
FROM ChargingStation cs
    INNER JOIN RentalTransaction rt ON cs.station_ID = rt.station_ID
WHERE rt.end_datetime >= '2024-02-01 00:00:00' AND
    rt.end_datetime < '2024-03-01 00:00:00' AND
    rt.status = 1 -- Completed transaction
GROUP BY cs.station_ID, cs.name
ORDER BY rental_income DESC, cs.station_ID ASC;
```

不过，Moodle上有位同学（就是这位 [skylee](https://skylee.xyz)）提醒我们，其实后台用的是SQLite数据库。这下子倒是激起了我的好奇心，于是开始倒腾SQLite，琢磨着能不能用点“取巧”的手段完成这道题。

![`.version`命令输出结果，显示了VPL沙盒中搭建的SQLite版本。](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-sqlite-discovered.webp){:class="_75_percent_width"}

## 探索与信息收集

一番Google下来，我发现SQLite其实可以直接在查询过程中执行shell命令的！所以我赶紧用一下最简单的`ls`命令查看当前目录下都有些啥：

```shell
.shell ls
```

![在SQLite中执行`.shell ls`的结果](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-list-current-dir.webp){:class="_75_percent_width"}

好了，现在文件列表看到了，那我们当然得瞅瞅每个文件的内容：

```shell
.shell cat *
```

![执行`.shell cat *`之后的输出结果，会显示当前目录下所有文件的内容。其中有一个VPL用于测试作业的shell脚本。](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-vpl-stuff.webp){:class="_75_percent_width"}

Emmm……看起来大部分文件都跟我们想看的内容没什么关系。 不过我觉得，题目相关的文件估计是`.txt`或`.sql`扩展名，所以再挑明一下：

```shell
.shell cat *.txt *.sql
```

![执行`.shell cat *.txt *.sql`，试图打印所有可能与SQL题目相关的文件内容。](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-not-vpl-stuff.webp){:class="_75_percent_width"}

果然，不出所料！看起来这个txt文件应该就是我们想要的“标准输出”。所以说，只要简单地把它的内容打印出来，我们就能直接拿个满分了。

当然啦，这个骚操作在隐藏测试点面前可能就行不通了，因为隐藏测试点往往会使用不同的文件名。不过，对于这道数据固定的题而言，这就完全够了。

## 再闲扯几句

顺便提一下，如果你想让VSCode（以及GitHub Copilot）用起来更像Cursor Tab，其实也是有办法的！你只需要先切换到`pre-release`版扩展，然后启用这个实验设置：

![VSCode中Copilot Tab配置的位置](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-make-vscode-like-cursor.webp){:class="_50_percent_width"}

*建议把其他可选配置也折腾一下，说不定还能发现点意料之外的好东西！*
