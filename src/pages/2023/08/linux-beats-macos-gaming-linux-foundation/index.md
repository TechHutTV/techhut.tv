---
title: "Linux beats MacOS in gaming, a big Linux Foundation problem, and more!"
date: "2023-08-02"
draft: false
description: "This is an archive news post feature tech, Linux, and other open-source news. This is an older article that was part of a migration. There will be missing images, broken links, and potentially other issues."
authors:
  - "Niccolo Venerandi"
categories:
  - "News"
tags:
  - "News"
  - "Archive"
---

## Linux overtakes MacOS among Steam users

The above image shows the market share of Linux among Steam users, as reported by the latest Valve survey. If we temporarily stop looking at the Y-axis scale the graph seems promising: a clear, accelerating, constant growth; and this latest month saw a big spike. Of course, we do have to keep in mind that even the spike is just below 2%, which is even lower than what StatCounter reports as being the Linux market share in the general population (3%). And, as I always say, this game of playing with small percentages is rarely useful.

Though, it's worth a few words. Firstly, why is this happening? The answer obviously lies in the SteamDeck: Steam just sold quite a large batch of the handheld device. If we look at which distributions drove this spike, we immediately see SteamOS (and - surprisingly - Pop!\_OS).

Secondly, is it plausible that Linux is less used among gamers compared to the general population? Given just how predominant Windows is in the gaming market, that wouldn't be surprising. In fact, even MacOS has a significantly lower market share reported in the Valve survey... even lower than Linux, thanks to the spike! This is the really interesting news: when game developers start thinking about which OS to offer compatibility for, they'll have to keep in mind that **Linux is a bigger potential market of users compared to MacOS** – starting today.

## KDE shares the features to be removed in Plasma 6

What you see in the above image is a pretty cool but hardly known feature of KDE Plasma; you can create "custom gestures" to be triggered simply by drawing shapes with the middle mouse button. As an example, moving the mouse towards the top of the screen whilst pressing that button might trigger the desktop grid, or switch to the above virtual desktop. This is particularly useful for drawing tablet owners, who can simply draw shapes whilst holding a pen button to activate Plasma functionalities. Pretty cool, huh?

Well, this feature will die within months. It's already unsupported in Wayland, and it relies on some quite old and hard-to-maintain code. Because of that, it has been decided to drop the entire codebase around it - called KHotkeys, because **K**DE - on the next Plasma version.

That's not the only victim of the major version switch. The global setting for the icon size will also be removed. The "Force Font DPI" option. Some low-quality task switchers (in Plasma, the dialogs that appear when you hit alt+tab are modular). The Air Plasma Style, which looks like this:

The list goes on, but even if you are a Plasma user you might not recognize many of the elements in it. These are often half-broken or hacky features, hard to maintain, and used by a few users. Nonetheless, if you are worried something you're interested in might be in it, it's worth giving a read to Nate's (KDE dev) blogpost:

## The Linux Foundation has a problem. It's not what you think

Quick: if you google "Linux Foundation" and click on the first result, what is it going to be all about?

On my machine, the very first result - which is an advertisement from the Linux Foundation - brings me to this page:

In fact, it seems like offering training and certifications is a pretty significant part of the Linux Foundation. This might not come as a surprise to you, but I knew nothing about this. This is why I was so shocked today when I found a big rant about the Linux Foundation "stealing" money. What's up with that?

Firstly, let me point out that these certifications aren't that cheap. To become a certified sysadmin, for example, you have to pay a whopping $400. However, I'll admit I don't have other offerings to compare the price to. Still, for that amount, you would expect a fair assessment of your abilities.

Getting back to the above-mentioned rant: one year ago the Linux Foundation has changed the platform they take tests on, and since then multiple reports have appeared on how bad it is. Multiple users found it impossible to even take the test, with the platform just refusing to start citing internet issues. Then there's "lag, freezes, problems with clipboard (when exam depends on copying from official docs), shell barely responding".

When I say "multiple reports", I do mean it. I'm scrolling through the list on just one online community - r/kubernetes - and I can't see the end. Some titles are quite, ehm, explicative of the bad experience (the platform is called PSI): "Massive rant about PSI", "PSI is the worst", "Linux foundation is trash", "Traumatic PSI experience", and so on.

Even worse, the support from the Linux Foundation seems to be non-existent. Going back to the original rant, the platform failed multiple times to allow the user to take the test. Each time, the test was marked as failed. The only thing that the technical support did to help this user was simply to allow them to re-take the exam – even though it was pretty clear that, without addressing the underlying issue, that wouldn't help. The user tried to contact the supervisor about what was happening during the test too and received no response whatsoever. A reimbursement wasn't granted either. Next step? Credit card chargeback.

I'm not sure what to make of all of this. It's not something that will directly affect desktop Linux; however, if you see rants about how bad the Linux Foundation is, you now know what's likely to be the reason behind them.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
