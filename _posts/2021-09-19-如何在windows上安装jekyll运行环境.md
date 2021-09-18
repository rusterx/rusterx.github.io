---
layout: post
title: "如何在windows上安装jekyll运行环境"
date: 2021-09-19 01:58:04 +0800
comments: false
---

jekyll搭配markdown写作是一件非常方便的事情，可以直接在本地写完，然后使用git进行版本控制。然而，鉴于当前恶劣的网络环境，寻找一个稳定的、能用的jekyll平台变得非常困难。github由于是国外公司，ghpages经常无法正常访问，而国内的一些git平台，速度通常快很多，但是要么限制颇多，要么时常生出各种问题，比如清洁网络。如果自己有服务器，且是Windows服务器的情况下，如何安装jekyll环境呢。

# jekyll环境的安装

- 安装Ruby语言环境。下载的页面地址：<http://www.ruby-lang.org/zh_cn/downloads/>或者<https://rubyinstaller.org/downloads/>。第一次在rubyinstaller中下载安装最新版的ruby+devkit的版本，但是安装过程会出现问题。因此推荐带devkt的[rubyinstaller-devkit-2.7.4-1-x64.exe](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.7.4-1/rubyinstaller-devkit-2.7.4-1-x64.exe)

- 安装gem，然后安装jekyll、jekyll-paginate以及jekyll-minimal等插件。
