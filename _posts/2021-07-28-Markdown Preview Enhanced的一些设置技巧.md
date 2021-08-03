---
layout: post
title: "Markdown Preview Enhanced的一些设置技巧"
date: 2021-07-28 14:17:41 +0800
comments: false
---

首先部分设置都是可以在系统的设置里边找到的（首选项->打开用户设置）。例如：

- 设置公式转换引擎为mathjax或者katex，默认的为katex，因为katex更快。
- 如果切换公式转换引擎后，需要重启，否则无法观察到效果。
- 对于mhchem插件，katex默认支持，而mathjax默认不支持，需要配置，配置代码如下：
```js
module.exports = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX','output/HTML-CSS'],
  messageStyle: 'none',
  tex2jax: {
    processEnvironments: false,
    processEscapes: true
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js', 'mhchem.js', 'siunitx.js']
  },
  'HTML-CSS': { availableFonts: ['TeX'] }
}
```
- katex可以通过宏的方式，定义一些字符的快捷方式，参考：<https://katex.org/docs/options.html>。
- 对于siunitx插件，katex不支持，mathjax支持，但是首先需要下载siunitx的js文件，放置在Tex文件夹中（和mhchem.js相同的文件夹下），然后按照如上的方式配置。
- 在预览页面，右键Puppeteer->Pdf导出Pdf的方式，默认是没有背景的，如果需要，可以在md文件的导言中设置，也可以直接在用户设置中设置。其他选项包含：<https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pagepdfoptions>。
