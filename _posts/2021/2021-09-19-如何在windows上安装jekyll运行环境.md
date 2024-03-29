---
layout: post
title: "如何在windows上安装jekyll运行环境"
date: 2021-09-19 01:58:04 +0800
comments: false
---

jekyll搭配markdown写作是一件非常方便的事情，可以直接在本地写完，然后使用git进行版本控制。然而，鉴于当前恶劣的网络环境，寻找一个稳定的、能用的jekyll平台变得非常困难。github由于是国外公司，ghpages经常无法正常访问，而国内的一些git平台，虽然速度通常快很多，但是条款经常变化。例如，我曾经使用了一阵子gitee，但是后面这个网站只能Pro版的用户定制域名，甚至在后面因为需要清理站点，几个月无法提交pages服务。而coding.net网站，也是开始好好的，后面就和腾讯云合作，jekyll的运行环境变得不定，特别容易发生提交出错。

那么，如果自己有服务器，且是Windows服务器的情况下，如何安装jekyll环境呢（Ps，最近腾讯云有那个轻量级应用服务器，60元就可以玩一年，所以买了一个做测试。）。

# jekyll环境的安装

- 安装Ruby语言环境。下载的页面地址：<http://www.ruby-lang.org/zh_cn/downloads/>或者<https://rubyinstaller.org/downloads/>。第一次在rubyinstaller中下载安装最新版的ruby+devkit的版本，但是安装过程会出现问题。因此推荐带devkt的[rubyinstaller-devkit-2.7.4-1-x64.exe](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.7.4-1/rubyinstaller-devkit-2.7.4-1-x64.exe)

- 安装gem，然后安装jekyll、jekyll-paginate以及jekyll-minimal等插件。

```bash
gem install jekyll
gem install jekyll-paginate
gem install jekyll-minimal
```

安装完成之后，运行`jekyll server`即可生成服务。不过，后面为了放在后台运行，可以使用powershell脚本的Start-Process命令。

# 编写应对hook的脚本

类似github、gitee等软件平台，提供push等事件的hook。即如果我们将编写的post提交到网站上，将触发一个hook事件，调用一个我们提供的网址。这个时候，我们可以使用powershell编写一个简单的http服务器，当接收到hook的请求，脚本就将网站中的repo更新到本地，从而达到更新网站的目的。很多网站都会提供密码验证服务，避免收到攻击。

对于http服务器的创建，可以使用python脚本，只需要非常简单的的几行就可以。不过需要安装python解析器。如果实在较新的windows系统中，还可以基于powershell脚本使用`System.Net.HttpListener`去实现。需要注意通常的hook必须是实现了POST请求类型，如果没有，可能导致超时错误。

```powershell
$http = New-Object System.Net.HttpListener
```

由于使用git更新repo内容，尤其是提交的东西较多或者网络不好时，是一个较为耗时的过程，容易导致hook调用发生time out错误。此时，可以使用ps中的`Start-Job`功能，将这个耗时的动作放在背景线程中去执行，例如：

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
Start-Process nginx -WindowStyle Hidden
```

exe程序可以独立运行，不需要借助于powershell。在nginx的配置文件中，将powershell的HttpLisener和ruby的jekyll脚本设置为后端代理，nginx作为前端处理流量。这样可以实现多个域名对应多个服务器了。

# 错误解决

安装完成之后，可能发现标题带有中文的页面无法访问，这个时候可以参考一下网页解决: <https://guosongyu.github.io/2020/01/jekyll%E4%BD%BF%E7%94%A8%E4%B8%AD%E6%96%87%E8%B7%AF%E5%BE%84>，主要是Ruby处理中文字符出现的编码问题，将编码设置为utf-8即可。