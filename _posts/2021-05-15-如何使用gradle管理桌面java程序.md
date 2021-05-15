---
layout: post
title: "如何使用gradle管理桌面java程序"
date: 2021-05-15 20:58:22 +0800
comments: false
---

## 创建项目

![](https://jekyll-1251110281.file.myqcloud.com/images/2021-05-15_205936_20210515_compressed_masked.jpg)


## 创建package

其中package的名称可以在build.gradle中见到。

![](https://jekyll-1251110281.file.myqcloud.com/images/gradle-java-2_20210515_compressed_masked.jpg)

## 编译项目

为了更快的编译项目，在build.gradle文件中，将repositories修改为如下内容。

```
repositories {
    maven{ url 'https://maven.aliyun.com/repository/central' }
    maven{ url 'https://maven.aliyun.com/repository/public' }
    maven{ url 'https://maven.aliyun.com/repository/gradle-plugin'}
}
```