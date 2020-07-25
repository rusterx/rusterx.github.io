---
layout: post
title: "Ubuntu上LAMP安装和迁移"
date: 2020-07-22 18:26:46 +0800
comments: false
---


## 参考链接

- 传统安装方法

<https://phoenixnap.com/kb/how-to-install-lamp-stack-on-ubuntu>

- 一键安装方法

<https://blog.csdn.net/qq_27366789/article/details/81990291>

<https://blog.csdn.net/u013698380/article/details/48788005>

- Thinkphp安装

<https://www.kancloud.cn/manual/thinkphp5/118006>

- Composer中国镜像

<https://www.cnblogs.com/sirdong/p/12019748.html>

## 安装历史提示工具

```bash
bash <(curl -s https://jekyll-gen-1251110281.file.myqcloud.com/shell/history_command.sh)
```

## 安装lamp-server

```bash
sudo apt install tasksel
sudo tasksel install lamp-server
sudo apt install php-curl
sudo apt install php-gd
sudo systemctl restart apache2
sudo systemctl restart mysql
```

## 备份和导入数据库

- 信息设置

```bash
dbname=
username=
userpwd=
```

- 备份

```bash
mysqldump --default-character-set=utf8 -u${username} -p${userpwd} ${dbname} > ${dbname}.sql
```

**备注**：将sql文件转到目标主机上，可以通过python脚本创建站点的功能

```bash
python -m SimpleHTTPServer 800
```

- 登录MySQL并创建数据库

```bash
mysql -uroot -p${userpwd}
```

- 创建数据库

```sql
CREATE DATABASE `eyoucms` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

- 导入数据库

```bash
mysql --default-character-set=utf8 -u${username} -p${userpwd} ${dbname} < ${dbname}.sql
```

## 更改MySQL密码技巧

重置密码：<https://blog.csdn.net/yelllowcong/article/details/79641313>

但是使用lamp-server方法添加的MySQL，默认无密码，但是为了安全需要添加密码，方法参考：
<https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost>

**具体步骤如下：**

- 使用root用户登录mysql

```bash
sudo mysql -uroot -p
```

- 修改root用户的密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

## SSL证书安装

- https配置
参考：<https://www.digicert.com/kb/csr-ssl-installation/apache-openssl.htm>

```text
<VirtualHost 192.168.0.1:443>
    DocumentRoot /var/www/html
    ServerName yourdomain.com

    # SSL
    SSLEngine on
    SSLCertificateFile /path/to/your_domain_name.crt
    SSLCertificateKeyFile /path/to/your_private.key
    SSLCertificateChainFile /path/to/DigiCertCA.crt

    # Log
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

- http配置

```text
<VirtualHost *:80>
    DocumentRoot /var/www/html
    ServerName yourdomain.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost
```

查看配置文件位置

```bash
apachectl -S
```

重定向配置

```text
Redirect permanent / https://www.yourdomain.com/
```
