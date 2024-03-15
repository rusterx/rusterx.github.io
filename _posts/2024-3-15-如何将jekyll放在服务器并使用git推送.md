---
layout: post
title: "如何将jekyll放在服务器，使用git推送"
date: 2024-03-15
comments: false
---

## 创建一个非`root`用户，专用于`git`登录

如果系统自带一个非`root`用户，感觉也可以直接使用。当然最好创建一下，然后不让这个用户使用交互shell（完成所有的操作之前，不要禁用交互shell，因为下面的大部分创作，都需要在使用该用户权限来操作）。创建的办法，参考<https://www.liaoxuefeng.com/wiki/896043488029600/899998870925664>。

新创建的用户，可能没有添加sudoers文件中，没有root权限，这样可以参考[git出现xxx is not in the sudoers file This incident will be reported的解决方法](https://blog.csdn.net/u013866352/article/details/105386536)。


注意：如果不想使用密码登录或者git不想使用密码，用户创建完成之后，将本地ssh的公共密钥放置在`~/.ssh/authorized_keys`文件中。


## 安装`nginx`

安装的方法，参考：<https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04>

```sh
sudo rm /var/www/html/index.nginx-debian.html
sudo chown git:www-data /var/www/html
```


注意：这里的用户`git`应该替换成实际的用户，因为nginx默认的用户很可能是root，这样无法被非root用户使用。


## 安装`jekyll`

安装方法参考：<https://jekyllrb.com/docs/installation/ubuntu/>

将以下代码添加到`.bashrc`文件中

```sh
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```


## 创建`git`仓库

参考：<https://www.digitalocean.com/community/tutorials/how-to-deploy-a-jekyll-site-using-git-hooks-on-ubuntu-16-04>的Step 2 — Setting Up a Git Repository


- 将本地代码推送到服务器
- 将服务的repos，clone一份到临时文件夹

在临时文件夹，运行`jekyll serve`，看看发生生么错误，直到把所有的没有安装的都安装完全，不再发生错误。

在repo中的`hooks/post-receive`文件里边，写入以下的代码

```sh
#!/usr/bin/env bash

export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"

GIT_DIR=$HOME/osier.git
TMP_GIT_CLONE=/tmp/osier.blog
PUBLIC_WWW=/var/www/html

git clone $GIT_DIR $TMP_GIT_CLONE
jekyll build -s $TMP_GIT_CLONE -d $PUBLIC_WWW --incremental
rm -Rf $TMP_GIT_CLONE
exit
```

将本地的repo的remote地址根据实际更改，然后推送即可。

```sh
git remote set-url origin ubuntu@[ip or domain]:osier.git
# OR
git remote add origin <url>
```

删除的方法为

```sh
git remote remove <name>
```



