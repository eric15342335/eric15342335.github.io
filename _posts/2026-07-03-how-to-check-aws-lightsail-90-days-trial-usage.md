---
layout: post
title: "How to check AWS Lightsail 90 days trial usage"
date: 2026-07-03 19:24:02 +0800
categories: blog
---

If you want to quickly check whether your AWS Lightsail usage is still covered by the new customer 90-day free benefit, here is the simplest way I use.

## Step 1

Go to [Billing and Cost Management](https://console.aws.amazon.com/billing/home?region=us-east-1#/bills).

## Step 2

![Go to Bills and click Expand All](/assets/images/2026-07-03-AWS-Lightsail-free-90days-1.png)

Go to **Bills** and click **Expand All**.

## Step 3

![Lightsail resource line item showing the trial usage](/assets/images/2026-07-03-AWS-Lightsail-free-90days-2.png)

Go check the [Lightsail](https://aws.amazon.com/lightsail/) resource. The `$0.00 per Hrs from 0 to 750 for BundleUsage:2GB in Asia Pacific (Singapore)` will appear. $0 indicates your resource usage is under the new customer 90 days free benefit.

Alternatively, you can ask [Amazon Q](https://aws.amazon.com/q/) to help you query the data, or help you find it.
