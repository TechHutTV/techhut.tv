---
title: "Nextcloud announces Hub 4 with AI Tools for everyone, a Sharepoint alternative, and more!"
date: "2023-03-21"
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

## Hub 4 introduces AI Tools in Nextcloud

**We are currently witnessing a race by big companies to introduce AI tools in their "office" ecosystems**. Microsoft, as an example, [has announced](https://www.theverge.com/2023/3/17/23644501/microsoft-copilot-ai-office-documents-microsoft-365-report) a "Copilot" that will be able to generate text for Word and interact with other Office365 apps; Google [also announced](https://www.theverge.com/2023/3/14/23639273/google-ai-features-docs-gmail-slides-sheets-workspace) similar features in its Workspace applications. Two issues arise: firstly, these features are currently only available to a small selected number of partners; secondly, there is no interest by them - quite the opposite - to push for open and ethical AI models.

**Nextcloud addresses both**. Hub 4 introduces AI tools that are available to everyone, and an "Ethical Rating" that is based on the availability of the model, the original code, the training data, and such. This makes sure that _anyone_ can make an _informed_ choice on whether to use these tools or not.

**One of the main AI features is speech-to-text**. Hub 4 makes use of Whisper, which has been [recently published](https://openai.com/research/whisper) by OpenAI (and whose models are freely available). This means that, anywhere in Nextcloud, you can start transcribing your voice with great accuracy and with automatic translation if necessary.

**Then we have GPT text generation**, again using the models by OpenAI. This feature is still available throughout Hub 4 apps, meaning that anywhere you can invoke GPT to e.g. write a first draft of an email, brainstorm some simple ideas, or fill out basic information. The UI gives you one result by default, but you're able to see more than one through advanced settings.

**Finally, there's image generation through Stable Diffusion**. This uses DALL-E models released by - you guessed it - OpenAI. Similar to what Google claims to be offering in their Workspaces, you're able to describe an image to quickly get one generated. This could be particularly useful for early drafts or as references for further work. (Image generation, obviously, has [still its own issues to address](https://techhut.tv/ai-needs-to-deal-with-copyright-laws/)).

It's great that Nextcloud is the first service offering these workspace-integrated AI tools for everyone, but **some compromises were made** to achieve this. There's no context awareness that Microsoft and Google are claiming (as an example, you can't simply type "make a summary of this email exchange", unless you copy-paste it). You don't have app-specific fine-tuning options (e.g. a "tone of voice" button when drafting emails). And there's no way for the AI to directly interact with the content you're working on.

This doesn't mean all these features can't be added in the next versions. To make - yet another - example of what we're able to achieve, there's [a proof of concept](https://twitter.com/rowancheung/status/1637509968021819392) that **allows you to ask GPT to edit 3D objects in Unity**; maybe something similar could be achieved by exposing Nextcould's API to GPT?

## All of this, powered by a "Smart Picker"

The way that Nextcloud approaches offering the above tools throughout Hub 4 apps is by having a **new component called "Smart Picker" that will pop up whenever you insert the character "/"** in a supported text field (quite similarly to Notion, if you've used that). You'll have the ability to select what type of content you'd like to insert; we've already discussed the "ChatGPT-like text", "AI Image Generation" and "AI Speech-to-text" options, but there are more.

You can **translate between languages** (using DeepL and Nextcloud Translate), **insert text templates** that you prepared beforehand, **insert an OpenStreetMap location** selected using an interactive map, **link a PeerTube video** with a UI to search through them, **search through movies/series/actors** from The Movie Database, share **toots and Mastodon links**, and even **share gifs** from Giphy.

</figure>

You can also interact with other parts of Nextcloud through the Smart Picker; as an example, you can **create new tasks on Deck** on the fly. Sometimes, the content you inserted will be embedded, e.g. inserting an OpenStreetMap location in a text document will embed a viewer with all of the map's options (search, zoom, layers, ...).

Another great example is the fact that you can quickly embed Tables, but maybe I should first explain what those are.

## Hub 4 introduces the Nextcloud Tables App

This application is presented as an alternative to Microsoft Sharepoint. If you're not aware of what _that_ is either, MS describes it as an "intelligent intranet", which allows for internal document management and acts as a storage system. By comparison, Nextcloud Tables offers a way to "_manage and work with data structures, putting together easy 'apps' and connecting them to various other components in Nextcloud_".

Promotional speech aside, Tablet allows you to **create tables with custom columns and various types of content** that each column can contain. As an example, you could have a table of employees where each row has "name" (text), "from" and "to" (date), "number of working days" (int), "approved" (yes/no) fields.

You can create them from scratch or from templates, export data to CSV/clipboard, import data from the clipboard, and most importantly you can share tables with other users but control permissions for each sharing. From this point of view, Tables is quite similar to Notion as well; or at least, to a subset of it.

And finally, here's the Smart Picker allowing you to select a Table, as I mentioned:

## Nextcloud Talk: Video Recording & Breakout Rooms

Nextcloud Talk is an application for Nextcloud that allows hosting online meetings, sharing the screen, and so on. In Hub 4, there are two new major features; firstly, the ability to record a meeting. After the call, you can send the recording in the chat ta make sure it'll be available for everyone. This is quite an important feature that's often used e.g. to register video lectures or important meetings for people to catch up later on.

Secondly, there's the introduction of "Breakout Rooms", which are quite useful for larger interactive calls (e.g. e-learning). This allows splitting the users into sub-rooms within a call, where they'll be able to interact with each other. You can then move users between rooms, send messages to specific rooms, and so on. When activating this functionality you can choose tnumberunt of rooms to split the members in and whether the division should happen automatically, manually, or by choice of each member.

## Nextcloud Files: Advance File Versioning

The File Manager application of Nextcloud already had file versioning capabilities, as is common in online hosting services. However, Hub 4 brings in two very important features to set it aside from competitors. The first one is simply the ability to give a name to a specific version of the file, which makes it significantly easier to go back to a certain draft instead of having to guess the exact time and date you're looking for. This is especially useful when reverting files written by colleagues, since reading the name of each version is much faster than seeing what actually changes in each one.

Also - similar to backup tools like BackInTime - Nextcloud now uses a "time-based algorithm" for versions. This means that one version is kept for each minute in the first hour, then one version each hour for the first day, then one version each day, and so on. This provides great granularity in reverting recent changes but uses much less storage space than actually keeping one version for each minute for the past months (obviously!).

Finally, there's a little AI component here that will show you the "recommended" files at the top of your files list, trying to guess which ones you're interested in based on previous behavior. The same applies to the share dialog, which guesses _who_ you want to share the file with.

Oh, and according to the project announcement, "N_extcloud Talk reduced loading times, server load and notification delays by up to 99%_". Of course, the more exact meaning of "up to 99%" isn't that clear, but that seems like a pretty impressive optimization nonetheless.

## More Hub 4 New Features

There are some improvements to **Nextcloud Collectives** as well. As a bit of context, it's an application that allows to organize markdown-formatted knowledge in pages and sub-pages, a bit like Wikis. The new Nextcloud makes it easier to create new Collectives and to move pages between them. The collectives also link to the Files, which makes it easy to find where each file that's part of it is stored. Better collaboration is coming to Text as well, where **you will see the cursors of other people working on the same document** as you.

**Nextcloud File Drop**, a feature to send other people file through a hyperlink, now supports End-to-End encryption for increased security in your organization.

**Nextcloud Deck**, a project management app, now uses a Nextcloud Text component to edit paragraphs on the cards; this allows for formatted rich text, and also makes sure that the Smart Picker mentioned above works perfectly here as well. This release also brings support for live editing by multiple people, exporting boards to CSV, and creating new tags when assigning them.

A little useful new feature, **Nextcloud Mail** allows you to add attachments when creating an appointment in the Calendar.

Finally, we have the ability to embed videos within documents, manage the installed fonts, and watermark official documents with a custom text or logo. These are of course only the highlights of the release, which comes with many more bug fixes and performance improvements.

**_Notice: This is an older newsletter; many links and images were lost in the migration process. Click [this link](https://archive.techhut.tv/) for an archive of the old newsletter site_**.
