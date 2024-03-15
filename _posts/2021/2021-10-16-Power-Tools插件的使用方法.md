---
layout: post
title: Power-Tools插件的使用方法
date: 2021-10-16 23:56:03 +0800
comments: false
---

# 安装

[vscode-powertools](https://github.com/egomobile/vscode-powertools#readme)是一款非常好用的vscode插件，可以用来自定义一些命令，菜单和按钮功能，而不必自己去开发插件。

安装的时候，直接去vscode中，搜索名称`Power Tools`的插件，点击安装即可。

# 自定义命令

在vscode的`settings.json`中插入类似的代码块即可定义命令（参考：<https://github.com/egodigital/vscode-powertools/wiki/Commands>）：

```json
{
    "ego.power-tools": {
        "commands": {
            "myCommand": {
                "script": "my_command.js",
                "button": {
                    "text": "Click here to start the command."
                }
            }
        }
    }
}
```

这里，`myCommand`这个键及其子对象，都是可以重复定义的，这样可以用来定义更多的命令。而对于`my_command.js`的位置，如果设置在`C:\Users\<username>\.vscode-powertools`是比较妥当的。

# 运行命令

命令的运行实视`settings.json`中定义的不同而有不同的运行方式：（1）如果包含了`Button`的定义，则在状态栏就会存在相应的按钮；（2）如果包含了`forFile`或者`forFolder`的定义，则在`SideBar`中可以通过右键文件或者文件夹的而运行`Excute Power Command`菜单；（3）或者直接按下<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd>快捷键，输入`PTC`三个键，运行`Power Tools: Commands`命令，然后选中需要运行的命令即可。
