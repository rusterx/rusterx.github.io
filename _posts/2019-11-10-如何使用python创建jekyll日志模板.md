---
layout: post
title: "如何使用python创建jekyll日志模板"
date: 2019-11-10 12:4:38 +0800
comments: false
---

该日志的模板使用日志创建模板创立，文件名称为mkpost.py，结合listary的命令，随时随地都可以创建日志。

```python
#!/usr/bin/python
# -*- coding=utf-8 -*-

# 使用该命令可以创建jekyll的post

import os
import datetime
import sys
import subprocess

if len(sys.argv) == 1:
    print('请必须输入文章标题！')
    sys.exit(1)

sublime_path = r'---\sublime_text.exe'
post_title = sys.argv[1]
post_directory = r'---'
now = datetime.datetime.now()
post_filename = '{0}-{1:>02d}-{2:>02d}-{3}.md'.format(now.year, now.month, now.day, post_title)
post_path = os.path.join(post_directory, post_filename)

post_template = '''---
layout: post
title: "{0}"
date: {1}-{2:>02d}-{3:>02d} {4:>02d}:{5:>02d}:{6:>02d} +0800
comments: false
---

'''

post_content = post_template.format(post_title, now.year, now.month, now.day, now.hour, now.minute, now.second)


fid = open(post_path, 'w+', encoding="utf-8")
fid.write(post_content)
fid.close()

# 使用sublime_text打开post文件
subprocess.call(["cmd.exe", "/c", sublime_path, post_path])


```