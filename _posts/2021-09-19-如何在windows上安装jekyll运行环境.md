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

```bash
gem install jekyll
gem install jekyll-paginate
gem install jekyll-minimal
```

# 编写应对hook的脚本

类似github等软件平台，提供push等事件的hook。即如果我们将编写的post提交到github中，github将触发一个hook事件，调用一个我们提供的网址。这个时候，我们可以使用powershell编写一个简单的http服务器，当接收到hook的请求，然后脚本就将github中的版本更新到本地，从而达到更新网站的目的。

对于http服务器的创建，可以使用`System.Net.HttpListener`去实现。需要注意github的hook必须是实现了POST请求类型，如果没有，可能导致超时错误。

```powershell
$http = New-Object System.Net.HttpListener
```

由于更新git版本是一个较为耗时的过程，可以使用ps中的`Start-Job`功能，例如：

```powershell
Start-Job -ScriptBlock{
    Push-Location -Path "location of your git repo"
    git pull
    Pop-Location
}
```

**注明**：`Start-Job`执行的背景线程，依赖于主线程。如果主线程关闭，背景线程也将会关闭，此与`Start-Process`不同。


# 后台运行


- 运行jekyll

```powershell
Start-Process powershell -WindowStyle Hidden -ArgumentList "jekyll server"
```

后台的进程实际有`Ruby`执行。

- 运行HttpListener脚本

```powershell
Start-Process powershell -WindowStyle Hidden -ArgumentList "powershell_script_filepath"
```

- 运行nginx（前端服务器）

```powershell
Start-Process powershell -WindowStyle Hidden -ArgumentList "nginx"
```

# 错误解决

安装完成之后，可能发现标题带有中文的页面无法访问，这个时候可以参考一下网页解决: <https://guosongyu.github.io/2020/01/jekyll%E4%BD%BF%E7%94%A8%E4%B8%AD%E6%96%87%E8%B7%AF%E5%BE%84>，主要是Ruby处理中文字符出现的编码问题。