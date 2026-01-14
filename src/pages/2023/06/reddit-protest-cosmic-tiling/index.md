---
title: "The Reddit protest, COSMIC Tiling is awesome, and more!"
date: "2023-06-23"
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

## The Reddit protest goes on, with hacker stories and more

Even though the 48-hours mark the protest initially asked for has long passed, ~3000 subreddit are still private or restricted to protest against API changes. This has led Reddit to respond, in some very weird ways.

Steve "spez" Huffman (Reddit's CEO) doubled down on the changes, saying that Reddit API was never designed for third party applications; then, he openly praised Elon Musk management of Twitter as a reference for him. He also said that the blackout "will pass". However, since it didn't, Reddit has started threatening the moderators of the communities who won't re-open.

The first threat is: if some of the moderators doesn't agree with the protest, then we'll give them more priviledges, removing those who instead agree with it. The second one is less clear. The message ends in "if you're not \[...\] willing to reopen and maintain the community please let us known", which many subreddits interpreted as a veiled threat of replacing the entire moderator staff.

In fact, that has happened: Reddit has recently removed the moderators of r/midlyinteresting and banned them for a week. This only lasted a few hours, and was then reverted. When The Verge asked for explaination, Reddit replied with "I'm not going to set a precedent of confirming with The Verge every action we do or don't take".

Finally, the Reddit hackers who gained access to internal Reddit data in february asked for a ransom of $4.5 million, and then also added reverting the API changes on top of that. Reddit, again, declined to comment.

## COSMIC will completely revamp Pop!\_OS Tiling

And it's looking great. Firstly, the COSMIC team decided to get rid of the "adjustment mode" dedicated to tiling windows; instead, you can now use Shift + Super + Arrows anytime to move the windows around. This would normally be quite standard, but it comes with many features; firstly, moving one window towards another will create a "group" of windows; this will have a white outline and you'll be able to change the layout within the group without affecting the windows outside of it. You can also move the group themselves instead of windows within it; and, finally, you can "stack" entire groups.

Stacking allows you to merge multiple windows together into one; in this case, you'll get a "stack" icon on the titlebar, and a tab for each application within the stack:

Both the selected tab and the focused window, as you can see above, will be highlighted to make them stand out visually. You use tiling shortcuts to move one window within a stack around (e.g. outside of the stack) or you can select the entire stack and move _that_ around.

You still have shortcuts to make a certain window floating, swap two windows side-by-side, move window focus, and so on.  The main idea it to make tiling as intuitive as possible my making the group functionality automatic, so that you only have to use Shift + Super + Arrows to move windows where you want. Even better, even though the pictures you see above are mockups, all of this has already been implemented in COSMIC. The tiling system is the most powerful out there for a desktop environment, and by far (even considering scripts and extensions); I'm quite excited to see this in action!

## KDE Plasma 6 is liveable and in a code cleanup stage

Plasma 6 development has started months ago; initially, the system was very rough, difficult to compile and not in a daily-driveable state. A lot has changed since then, and KDE developer Nate Graham is now asking (developers or adventurous users) to try out 6 and see how it goes. This is especially easy since the development version of KDE's distribution, Neon, now ships with 6 out of the box. Testing the master version is quite important for the next development steps: cleaning up the code, implementing the new features developers want to introduce in Plasma 6, and - finally - quality assurance and testing.

There are some details on the changes already implemented in Plasma 6, too. Some will be clear to users: there's a new Overview effect that's quite similar to what GNOME has, System Settings is starting to feature buttons in the header area too instead of placing them all on the bottom, and so on. However, there's a lot of under-the-hood changes: the SVG handling of KDE is now its own library called KSvg, duplicated UI classes are being removed, and so on.

There's no clear roadmap or deadline for this release, though. The idea is to publish 6 "towards the end of the year, or beginning next year", which could be anytime between November and March 2024. If you can't wait, though, you can try out the current state of things on Neon!

## Another round of updates to GNOME's large apps community

This week's GNOME blogpost is actually the 100th they publish, which is a great achievement: congrats! Even though the changes in the GNOME project are quite technical, the list of improvements to third party applications is impressive and worth mentioning. Here's what has been updated:

- **Design**, the 2D CAD application, now has Line Types (such as donned, dashed, center, etc...) and exporting to alternative DXF versions.

- **Flowtime**, a productivity app for time management (pictured above) has received statistics to keep track of the time you've worked vs breaks; a more compact view with just the timer; the ability to run in the background; and a customizable factor to compute break time (you work for _x_ minutes, you take a break of _x × factor_ minutes!).

- **IPlan**, a to-do/planning application, has redesigned its task rows, shown description/subtasks/due date/reminders in the task row, added a one-week view, and more.

- **Footage**, a tool to rotate/flip/crop/trim/mute/export vides, has been released for the first time!

- **List**, a simple to-do application, now shows the history of deleted tasks and a button to undo their deletion

- **Wildcard**, a utility to test regular expressions, has also been published for the first time!

Even better, this is just a selection I've made of the most interesting changes. You can check out a much longer list too:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
