---
layout: post
title: "How to enable RTX Virtual Super Resolution (VSR) or HDR in VLC"
date: 2025-05-17 20:00:00 +0800
categories: blog
---

If you are coming here because you have a relatively new desktop/laptop, with a recent GPU like the 30 or 40 series (e.g. RTX 4050 Laptop), and you want to improve the video quality when you watch videos using VLC, then yes I did exactly the same thing. Here is how.

The first Google search probably brings you to [here, the official VLC webpage with version 3.0.19](https://downloads.videolan.org/testing/vlc-rtx-upscaler/). In fact, when I use the version, it sometimes crashes, and in some scenarios that I cannot reproduce, I cannot use Virtual Super Resolution (VSR) and the SDR-to-HDR mapping feature (powered by AI) at the same time. Therefore, I suggest you use the latest (which is 3.0.21) version of VLC, and manually enable the settings (very quick) so that you can enjoy a stable viewing experience (Note that this version also has some bugs, like fullscreen resolution is not really upscaled (black bars around the video), but the RTX features work).

Tools -> Preferences -> Video -> Show Settings (All) -> Search "3D11" (which is Direct3D 11) -> Output Modules - Direct3D 11 -> Change "Video Upscaling Mode" to "Super Resolution", Change "HDR Output Mode" to "Generate HDR from SDR". -> (You usually don't need to) Go back to "Output Module", change "Automatic" to "Direct3D 11".

Don't forget to:

1. Set the "vlc.exe" to "High Performance GPU (NVIDIA RTX ...)" in your Windows settings.
2. Enable VSR and HDR features in the NVIDIA App or NVIDIA Control Panel.
3. Install latest drivers, Windows Update, general advice, etc.
