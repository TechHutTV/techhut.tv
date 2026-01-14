---
title: "Refurbished Steam Decks, BBC on the Fediverse, Rhino Linux, and more!"
date: "2023-08-09"
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

## Valve is now selling Certified Refurbished Steam Decks

Valve has started selling refurbished Steam Decks at a significantly cheaper price: $319 instead of $399 for the base version, $419 instead of $529 for the 256GB model, and $519 instead of $649 for the 512GB model. On top of that, refurbished Steam Decks will also start appearing in Game Stops, though those will be refurbished by the Game Stops themselves and will only be available to Game Stop Pro subscribers. Refurbished supplies are limited, so Valve expects them to go out of stock frequently.

As always, the Decks feature Linux and are developed in (indirect) partnership with KDE; if you're interested in an open-source-friendly handheld, this might be a great time to buy one.

## The BBC joined the Fediverse (as an experiment)

The BBC decided to create its own Mastodon instance (social.bbc) to host its social media accounts, like BBC R&D, Radio 4, and 5 Live. This is already quite exciting in itself: it's probably one of the biggest public recognitions of the importance of the Fediverse so far. Even cooler, the BBC announcement gives a bit of insight into the reasoning behind the choice, including its challenges.

As an example, they've decided not to allow users to register in their Mastodon instance. This makes sense for them: by only having the official accounts we'll be able to trust the accounts on the instance, and they won't have to moderate it.

Actually, that's a lie: when users reply to social.bcc posts, those replies will be hosted on their website. This means they do have to moderate the replies themselves, something that's usually mostly handled by the social network itself.

This is an experiment that will run for six months. Then, they'll decide whether to continue or not. I quite appreciate how transparent they are in this phase: they don't know if reaching a wider audience will be worth maintaining and moderating the instance, they are worried about the lack of centralized rules or filters, and so on; they just say, "we are learning as we go".  

## First stable version of Rhino Linux released

You might remember Rolling Rhino, a rolling (a.k.a. continuous stream of updates) version of Ubuntu. You might not know that Rolling Rhino was discontinued just last year, teasing a new project called Rhino Linux.

So, what's this "Rhino Linux"? It's a rolling distribution, based on Ubuntu, using the Unicorn desktop. It's made by the same developers as Rolling Rhino, and it has just been released as stable. For that out-of-the-loop, Ubuntu only releases two major releases a year containing all the upgrades in the past six months; a rolling distribution, instead, has no major releases and has a constant stream of updates.

So, what's this "Unicorn" desktop? It's a derivative of XFCE. It comes out of the box with ULauncher, a lightweight Linux launcher. They've also customized the default look - as you can see in the above screenshot - and included the app grid applet. The dock is not XFCE's, but Plank.

If all of this sound interesting to you, check out the project here:

## A summary of GNOME, KDE, and Elementary updates

This week, we happen to have a lot of smaller but interesting updates from these three projects, so I will try my best to quickly tell you about what you should know.

On the KDE side of things, Plasma 6 is progressing fast; even cooler, core developer David Edmunson has published a blogpost with new functionalities he implemented (but that are not part of Plasma yet). If everything goes well and those features actually get included, you will be able to:

- Press and hold a key to see accents alternatives, like on a phone keyboard;

- Insert a live transcription of your voice in any text field using Whisper;

- Insert any emoji simply by typing ":" and the emoji name;

- Type in any text field in a language, and have KDE automatically translate the text in a different language;

and more! It's easy to see how this experiment with input methods is quite exciting. You can check it out, with videos, here:

[http://blog.davidedmundson.co.uk/blog/new-ideas-using-wayland-input-methods/](http://blog.davidedmundson.co.uk/blog/new-ideas-using-wayland-input-methods/)

On the GNOME side of things, GNOME Shell and Mutter 45 have been released as betas, if you want to try them out before the official release. Also, multiple blogposts describe how the Nighly version of Sysprof is helping GNOME developers to reduce the runtime and startup times of a lot of GNOME search providers (the components which populate the search results of the shell). Also, Workbench - GNOME's prototyping application - is now able to load and save on-disk projects; this is a great tool to test out small snippets of code and learn about GNOME technologies. If you're curious for more, check out this link:

Finally, ElementaryOS also published an update. We now have multiple applications (Mail, Calendar, etc.) startup handled in system settings, meaning you can customize which applications you want to automatically run after log in. Also, Mail now uses the File Chooser Portal when picking a file, meaning it will always use the (most appropriate) system file picker. This update also mentions various redesigns, and you can find the full list here:  

## Bram Moolenaar, the creator of Vim, has passed away

The family of Bram Moolenaar has announced the sad news on the Vim google group. The cause is an unspecified medical condition that progressed quickly over the last few weeks. The funeral service is currently being arranged, to be held in the Netherlands.

## Indian Defence Ministry switches from Windows to Linux

The reasoning behind the choice is the increasing cyber and malware attacks, and it affects all computers connected to the Internet. The distribution of choice is called Maya, based on Ubuntu, and it was developed internally for this purpose. They say that Maya has an interface and functionalities resembling Windows, making the switch particularly easy.

Maya was developed within six months, and now the Army and Air Force are currently evaluating it. This is particularly interesting, especially if we go ahead and look at the Linux market share (according to statcounter) in India: it reaches the record value of 14%, easily beating MacOS (~3%) and ChromeOS (~0.24%).

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
