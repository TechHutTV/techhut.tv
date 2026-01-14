---
title: "ChatGPT in YOUR Terminal"
date: "2023-04-23"
url: chatgpt-in-your-terminal
draft: false
authors:
  - "Brandon Hopkins"
categories:
  - "Guides"
tags:
  - "Guides"
  - "AI"
  - "Terminal"
---

AI and ChatGPT is possible in your Windows, macOS, and Linux terminal! In this article, we cover a small utility called tgpt that will allow you to run AI prompts in your terminal without the need for API keys.

![](images/tgpt-programing-1024x599.png)

From its GitHub page, the application is described as "a cross-platform CLI (command-line) tool that lets you use ChatGPT 3.5 in Terminal without API KEYS. It communicates with the Backend of the Bai chatbot. It's written in Go."

In macOS and Linux, download the latest release and make the installer executable by right-clicking and going to properties, then permissions. Then, in the terminal, go to the directory of the downloaded repo and run the installer with the following.

```
./install
```

The **Windows** version was submitted to choco and is waiting to be approved.

## Using tgpt in Terminal

All you need to do is type tgpt followed by your prompt in quotes. As of my testing, this will not work like a conversation similar to the web version of ChatGPT, meaning you cannot reference past prompts.

```
tgpt "How do I install docker in Fedora?"
```

![](images/tgpt-1024x512.gif)

## Checkout our Video Demo and Testing

https://youtu.be/Xg63xdqbA9E
