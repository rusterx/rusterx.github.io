---
layout: post
title: "如何在笔记本上使用i-zhejiang WIFI"
date: 2019-11-09 15:34:34 +0800
comments: false
---


>i-zhejiang（awifi）是浙江在商城、交通枢纽、行政机关等人流密集区域设置的免费wifi热点。


i-zhejiang这个wifi在连接的时候，会打开默认的浏览器并打开授权的WEB页面。该页面会检测打开页面的浏览器是否为手机浏览器，如果是，输入手机号，得到验证码，就可以连接wifi了。而如果授权页检测到电脑浏览器，授权页面会跳转到提示页面，告诉你该wifi只能使用手机连接。那么如何在笔记本中使用该wifi呢，此处提供两个办法？

- 一方面，可以使用手机连接该wifi并分享热点给笔记本电脑。

- 另一方面，由于授权页面判断终端类型是基于请求头的User-Agent，那么在默认浏览器上安装一个切换User-Agent的插件，将默认浏览器的User-Agent设置为手机的类型，就可以让授权页面以为打开的是一个手机浏览器，从而进行正常的授权而连接wifi。

如果你不想使用切换User-Agent的插件，那么在第一次认证之后，每次单击连接i-zhejiang的wifi，不管弹出的非手机终端提示页面，只需要执行以下的python代码，也可以最终连接上wifi。

```python
#!/usr/bin/python
# -*- coding=utf-8 -*-

import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36'
}
url = 'http://www.msftconnecttest.com/redirect'
s = requests.session()
r = s.get(url)
print(r.headers)

post_url = 'http://30.254.8.226:8080/page/auth'
post_data = {
    "mobile": "---",
    "authCode": "",
    "isold": 1
}
s.post(post_url, data=post_data)

```

**友情提示**：post_data变量里边的mobile字段需要替换成你自己的手机号码。