---
layout: post
title: 使用Pandoc编写docx和pdf文件的实践
date: 2021-10-29 19:48:46 +0800
comments: false
---

[pandoc](https://pandoc.org/)可以将`.md`文件转换成pdf和docx文档。不过，如果想要建立包含图片、表格、公式和文献引用，实现起来就需要一些额外的设置了。这里的默认编辑器为vscode。

# Pandoc安装

如果已经安装了`anaconda`环境，那么使用下面的代码即可安装：

```batch
conda install pandoc
```

不过这种方法安装得到pandoc文件不一定是最新版的，如果想要安装最新版的。可以先使用如下代码获得pandoc文件的位置，然后去<https://github.com/jgm/pandoc/releases>下载最新版的文件，然后覆盖到pandoc文件原来的位置。

```batch
where pandoc
```

如果使用conda安装的，则一般来说说，默认的位置在python环境的下级目录`Scripts`中。比如我的pandoc默认在`C:\ProgramData\Anaconda3\Scripts`中（为了方便说明，将该路径成为Scripts路径）。

# 编写PDF文档

为了编写漂亮的PDF文档，我选择了使用`eisvogel.tex`，下载地址参见：<https://github.com/Wandmalfarbe/pandoc-latex-template>。

- 设置颜色标题页

```yaml
titlepage: true
titlepage-color: "3C9F53"
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "FFFFFF"
titlepage-rule-height: 2
```

- 设置图片标题页

```yaml
titlepage: true,
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "360049"
titlepage-rule-height: 0
titlepage-background: "background.pdf"
```

- 示例task

```json
{
    "label": "Pandoc PDF Document Using EISVOGEL",
    "type": "shell",
    "command": "pandoc",
    "args": [
        "--listings",
        "--pdf-engine",
        "xelatex",
        "--defaults=${env:APPDATA}\\Code\\User\\additions\\pdf.yml",
        "--template",
        "${env:APPDATA}\\Code\\User\\additions\\eisvogel.tex",
        "${file}",
        "-o",
        "${fileDirname}\\${fileBasenameNoExtension}.pdf",
    ],
    "presentation": {
        "echo": true,
        "reveal": "silent",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": true,
        "clear": false
    }
},
```

- `pdf.yaml`文件

```py
csl: "C:\\Users\\<username>\\AppData\\Roaming\\Code\\User\\additions\\american-chemical-society.csl"
filters:
- pandoc-crossref
- citeproc
```

这里pandoc-crossref的安装方法可以参见<https://github.com/lierdakil/pandoc-crossref>，说明参见<https://lierdakil.github.io/pandoc-crossref/>。安装文件，最直接的安装方法就是下载`pandoc-crossref.exe`然后放在Scripts路径。

- 示例pandoc的yaml文件

```yaml
---
title: 请输入标题
CJKmainfont: "STSong"
author: ["<username>"]
date: 2021年10月29日
listings: True
bibliography: [ref.bib]
---
```

- 示例的引用设置

```yaml
figPrefix: "图"
eqnPrefix: "公式"
tblPrefix: "表格"
titleDelim: period
figureTitle: "图"
tableTitle: "公式"
```

更加详细的设置，参考<https://github.com/lierdakil/pandoc-crossref>。


# 编写docx文档

- 示例yaml

```yaml
---
title: 请输入标题
author: ["<username>"]
date: 2021年10月29日
bibliography: [ref.bib]
---
```

- 示例task文件

```json
{
    "label": "7. Pandoc Docx Document",
    "type": "shell",
    "command": "pandoc",
    "args": [
        "--reference-doc=${env:APPDATA}\\Code\\User\\additions\\referrence.docx",
        "--defaults=${env:APPDATA}\\Code\\User\\additions\\docx.yml",
        // "-N",
        "'${file}'",
        "-o",
        "${fileDirname}\\${fileBasenameNoExtension}.docx",
    ],
    "presentation": {
        "echo": true,
        "reveal": "silent",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": true,
        "clear": false
    }
},
```

- 示例docx.yaml

```yaml
csl: "C:\\Users\\<username>\\AppData\\Roaming\\Code\\User\\additions\\american-chemical-society.csl"
# highlight-style: tango
filters:
- pandoc-fignos
- pandoc-tablenos
- pandoc-eqnos
- pandoc-secnos
- pandoc-docx-pagebreakpy
- citeproc
```

这里`pandoc-fignos`、`pandoc-tablenos`、`pandoc-eqnos`、`pandoc-secnos`和`pandoc-docx-pagebreakpy`。这些插件的安装方法可以pip方法安装。如果无法安装，则下载下来放在Scripts文件夹中。

- 示例引用yaml

```yaml
fignos-plus-name: 图
fignos-caption-name: 图
fignos-caption-separator: period
fignos-cleveref: true
tablenos-plus-name: 表
tablenos-caption-name: 表
tablenos-caption-separator: period
tablenos-cleveref: true
```

其他的设置参见<https://github.com/tomduck/pandoc-fignos>。


