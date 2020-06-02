---
layout: post
title: "Visual Studio Code 结合Python打造jekyll写作工具"
date: 2019-11-18 14:42:42 +0800
comments: false
---

`jekyll`配合github的版本控制功能，使之成为非常流行的写作工具。通过Visual Studio Code结合Python可以使写作更加流畅。

- 使用Python编写`jekyll`日志的生成工具，一个命令就可以创建一个Post文件，使我们可以专注写作的过程，可以参考`如何使用python创建jekyll日志模板`

- 写作的过程难免会涉及到图片，由于github的服务器在国外，又多有限制，图片的传输比较慢。解决github上传图片慢的问题，可以使用国内比如腾讯云，阿里云的对象存储来存储图片。由于存储过程涉及复制、粘贴还有图片的压缩操作，那么结合这些对象存储供应商的sdk，编写python工具，并结合注册表，制作一个右键菜单，使得可以通过右键菜单，完成图片的压缩，上传，返回markdown代码的操作。

![](https://jekyll-1251110281.file.myqcloud.com/images/vsc_jekyll面板_compressed.jpg)

