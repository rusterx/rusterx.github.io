---
layout: post
title: "Zotero 7与Quicklook的联动插件"
date: 2025-1-3
comments: false
---

zotero 6的时候，大家可以使用quicklook和zotero连用，点击Space键就可以实现PDF文件的预览。到zotero 7的时候，结果很多zotero 6的插件就不兼容了，比如quicklook插件就是这样，等了很久，作者也一直没有更新适配。

虽然zotero 7有比较好用的PDF阅读器，而且可以直接在信息面板预览小图，不过有时候，我们期望更轻量化的PDF预览。

我本身会写一些html和js代码，之前一直想写一款支持zotero 7的quicklook插件，可以一看官方的示例代码就很头大，这个不是标准的浏览器插件代码，包含了很多自动的设置。

前几天突然得闲，就快马加鞭写了一个，看起来基本够用，唯一的缺憾是quicklook.exe的路径需要直接在代码文件 `bootstrap.js`中设置，而不能直接在UI界面设置【实在太复杂了】

## 使用方法

1. 下载插件，<https://gitee.com/rusterx/zotero.quicklook/releases/download/v1.0.6/zotero.quicklook.zip>，解压缩之后包含 `bootstrap.js` `manifest.json`以及`logo.png`等文件。
2. 根据自己实际的quicklook.exe的路径，修改 `bootstrap.js`文件的内容。

```js {9-10}
try {
	// if(supportedFileExtensions.includes(extension)){
	//   let exePath = "D:\\Documents\\VSCode\\zotero.quicklook\\app.js";
	//   Zotero.launchFileWithApplication(`${path}`, exePath);
	// }else{
	//   let exePath = "C:\\Users\\xing\\AppData\\Local\\Programs\\QuickLook\\QuickLook.exe";
	//   Zotero.launchFileWithApplication(path, exePath);
	// }
	let exePath = "C:\\Users\\xing\\AppData\\Local\\Programs\\QuickLook\\QuickLook.exe";
	Zotero.launchFileWithApplication(path, exePath);
}
catch (e) {
	Zotero.debug(e);
}
```
3. 重新打包成zip，注意必须在插件的文件夹的根目录，直接选中所有文件去压缩，而不是在外面一层，选中插件文件夹去压缩，否则可能不会被识别兼容性。
4. 首先加载插件，依次选择【工具】-【插件】菜单，打开插件管理面板
5. 点击 `input Plugin From File`，安装完，出现 `open attachements with space`这个插件就算是正常了。

![images\20250103154653_17cfc22af7c1a4f0965bf2966deb7242.png](https://jekyll-1251110281.file.myqcloud.com/images%5C20250103154653_17cfc22af7c1a4f0965bf2966deb7242.png)

![images\20250103154722_7e553e953e693ce8f71868999886248a.png](https://jekyll-1251110281.file.myqcloud.com/images%5C20250103154722_7e553e953e693ce8f71868999886248a.png)

## 插件优点以及相关快捷键

1. 该插件支持预览很多文件，只要quicklook安装了相关的插件就可以。
2. Space键，调用quicklook预览PDF
3. 上下箭头，如果选择的为多个文件，或者多个item【包含附件】，那么上下箭头可以实现循环切换文件的预览