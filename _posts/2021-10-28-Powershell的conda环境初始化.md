---
layout: post
title: Powershell的conda环境初始化
date: 2021-10-28 14:06:17 +0800
comments: false
---

如果打开powershell或者跨平台的pwsh之后，无法使用conda命令，如何初始化环境呢。

![anaconda](https://jekyll-1251110281.file.myqcloud.com/images/20211028140841_277fe96163715a5df412aa346a90ac25.png)

搜索anaconda，打开终端，然后搜索`where conda`命令，可以显示类似的结果。

![where conda的搜索结果](https://jekyll-1251110281.file.myqcloud.com/images/20211028141115_b3d9b59cde55209897d13e78023cdb6f.png)

复制`conda.exe`的全路径，然后在没有显示conda的powershell终端上，输入：

```bash
conda_full_path init powershell
```

关闭终端，然后重启，输入`conda env list`来验证修改的结果，如果正常显示内容，代表显示成功。

