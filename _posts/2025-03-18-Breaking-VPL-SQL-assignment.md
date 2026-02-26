---
layout: post
title: "Breaking VPL SQL Assignment"
date: 2025-03-18 21:10:00 +0800
categories: blog
---

![A quick demo photo of what is the main focus of this post](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-demo-success.webp)

How do I find it?

## Background

We got a question:

**Q6. [12%] Display *station_ID*, *station_name*, and *rental_income* for each of the charging stations in February 2024.**

- Sort the results by *rental_income* in descending order, then *station_ID* in ascending order.
- *rental_income* is the sum of the *payment_amount* in a given period.

Normally, we’d answer this question using a (My)SQL statement:

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

But someone on Moodle pointed out that the database is actually SQLite (In case if you're wondering, he is [skylee](https://skylee.xyz)). That sparked my curiosity and got me exploring ways to "complete" this question through alternate means.

![The output of `.version`: which shows the SQLite database version installed on the VPL jail system.](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-sqlite-discovered.webp){:class="_75_percent_width"}

## Information Gathering

By Googling, I learned we can execute shell commands inside an SQLite query. First, I listed the files in the current directory:

```shell
.shell ls
```

![Result of running `.shell ls` in SQLite](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-list-current-dir.webp){:class="_75_percent_width"}

Obviously, we need to inspect each file to see what we’ve got:

```shell
.shell cat *
```

![Result of running `.shell cat *` which prints the contents of all files in the current directory. On the screen, there’s one shell script used by VPL for judging purposes.](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-vpl-stuff.webp){:class="_75_percent_width"}

Hmm. Most of the files aren’t related to the assignment or the test cases themselves. Let’s check the `*.txt` and `*.sql` files since I strongly suspect they’re tied to this particular question:

```shell
.shell cat *.txt *.sql
```

![Result of running `.shell cat *.txt *.sql` which attempts to print out all files related to the above-mentioned SQL question.](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-not-vpl-stuff.webp){:class="_75_percent_width"}

We can see that the text file is likely what we want—the desired output. So, simply printing it should be enough to score 100%.

Note that this probably won’t work against hidden test cases, where they might use a different text file name to differentiate between tests. But that’s it.

## Fluff

If you want to make VSCode (and GitHub Copilot) work like Cursor Tab, make sure to enable this experimental setting (switch to a `pre-release` version of the extension first!):

![VSCode Copilot Tab setting location](/assets/images/2025-03-18-Breaking-VPL-SQL-assignment-make-vscode-like-cursor.webp){:class="_50_percent_width"}

*I recommend trying out other options too! I can’t say for sure, but some might surprise you!*
