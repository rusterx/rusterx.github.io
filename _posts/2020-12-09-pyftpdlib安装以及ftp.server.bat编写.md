---
layout: post
title: "pyftpdlib安装以及ftp.server.bat编写"
date: 2020-12-09 09:14:43 +0800
comments: false
---

## 安装

```bat
pip install pyftpdlib
```


## 编写`ftp.server.bat`文件

```bat
@ECHO OFF

if "%1"=="" (
    pushd %1
)

::get the object line
::http://www.bathome.net/thread-9512-1-1.html
for /f "tokens=*" %%i in ('ipconfig ^|findstr IPv4') do (
    SET IPLine=%%i
)

::split by ":" and obtain the second element
for /f "tokens=2 delims=:" %%j in ("%IPLine%") do (
    SET IPv4Line=%%j
)

::get the substring
SET IPv4=%IPv4Line:~1%

::copy host to clipboard
echo ftp://%IPv4%/ | clip

python -m pyftpdlib -i %IPv4% -p 21 -w
```


## 解决中文字符乱码的问题

pyftpdlib内部使用utf8，而windows使用gbk，可以将pyftpdlib进行修改：

- filesystems.py

```py
yield line.encode('utf8', self.cmd_channel.unicode_errors)
```

将`utf8`改成`gbk`

- handlers.py

```py
return bytes.decode('utf8', self.unicode_errors)
```

将`utf8`改成`gbk`


## 参考

- <https://github.com/giampaolo/pyftpdlib/issues/257>
- <https://blog.csdn.net/iteye_13695/article/details/82681602>