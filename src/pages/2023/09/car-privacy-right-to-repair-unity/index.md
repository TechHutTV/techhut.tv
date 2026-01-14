---
title: "Terrible car privacy, Right to Repair for smartphones, and more!"
date: "2023-09-13"
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

## Criticism over Unity's new pricing, and Godot's new development fund

This is about the proprietary game engine, not the open-source desktop environment. Unity has recently announced a new pricing plan which - I think - is both a great example of why relying on proprietary platforms is a considerable risk, and an excellent occasion for open-source alternatives like Godot to become more mainstream.

The new pricing plan includes a pay-per-download pricing scheme. The rates go from 20 cents per install (Unity Personal / Unity Plus) to 1 cent per install (Unity Enterprise). Even if this sounds reasonable to you, there's a big, big issue.

It's Unity who has the responsibility to count the number of installs. When asked by users how that would happen, Unity replied that the system is proprietary and they would prefer not to disclose details about it; that is, we should blindly trust Unity on how much we own them. To make this even worse, Unity said that this proprietary system is unable to distinguish between a fresh install and a re-install. If the user installs, uninstalls, and re-installs the game, developers will pay the fee two times. Obviously, this means that malicious actors might purposefully re-install games multiple times as a form of protest. Even worse, installing the game on multiple devices (e.g. your computer and your handheld) will also count as two separate installs. Finally, "install" - as defined by Unity - includes "distribution via streaming or web browser". If you embed your Unity game in a web page, you will be charged for each user that will simply access that page.

All of this was done unilaterally, without any prior warning. By coincidence, the very same day Godot announced their new Development Fund. This allows you - or your company - to donate directly to the project; the donations will then be used to hire new developers. This fund already reached 27,710€/month.

## New EU rules for smartphone repairability, by Right to Repair

Right to Repair, a movement very close to the Free & Open Source values, published a blog post covering the new EU Ecodesign and Energy Labelling rules on mobile phones and tablets. These will make smartphones easier to repair and more durable and will come into effect in June 2025. These two paragraphs are concise enough that I can just quote them:

> These regulations will empower independent repairers and end-users by ensuring **access to spare parts and to the information necessary to repair for at least 7 years** after the end of the distribution of a product in the market. Additionally, manufacturers will have to make  **compatible software updates available for at least 5 years**.

> On reliability, smartphones will have to withstand at least 45 accidental drops without functional impairment and maintain at least 80% of their battery capacity after undergoing 800 charging cycles. Tablets are to follow the same rules, but only for their battery capacity.

On top of that, Right to Repair nicely explains what changes are still required, and the shortcomings of the above ruling. If you're interested in this cause, I would suggest giving the full article a read:

## Mozilla claims **cars** are the worst product category for Privacy

The "Privacy Not Included" blog, hosted by Mozilla, analyzes various products to see how well they respect your privacy. Just last week a blog post about car software was published, and the situation seems to be _really_ bad. Firstly, here's a list of data that car manufacturers can collect:

> The gist is: they can collect super intimate information about you -- from your medical information, your genetic information, to your “sex life” (seriously), to how fast you drive, where you drive, and what songs you play in your car -- in huge quantities.

Now, the claim that cars collect your "_sex life_" sounds... weird. Investigating, this seems to come from this [Nissan](https://www.nissanusa.com/privacy.html) webpage. Indeed, we see that both Sexual Orientation and Sexual Activity can be collected according to that privacy policy; however, they can only be collected by "Direct contact with users and Nissan employees". The data is collected for "internal reporting and analytics purposes" and will be shared with business partners. So, yeah, that's bad.

On top of that, 84% of the brands they tested will sell your data, and 56% will also share it with the government in response to even an informal request. This sounds pretty dangerous, considering that cars collect your _position_.

If this interested you, I suggest that you peek over the full report:

## The Internet Archive will appeal in the _Hachette v. Internet Archive_ lawsuit

Necessary context: the Internet Archive has an _Open Library_ program, later expanded with the _National Emergency Library_ Initiative. This allows users to digitally lend e-books for a certain period of time, including many under copyright. They were immediately sued by four publishers who claimed that both systems (Open Library & NEL) were “willful digital piracy on an industrial scale”; they won in March, and in August the Internet Archive was asked to take down the copyrighted books.

The Internet Archive has decided to appeal this decision. It won't be an easy battle, though: Chris Freeland - the director of library services - said:

> As we stated when the decision was handed down in March, we believe the lower court made errors in facts and law, so we are fighting on in the face of great challenges. We know this won’t be easy, but it’s a necessary fight if we want library collections to survive in the digital age.

Again, if you're interested, you can check out the full article here:

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
