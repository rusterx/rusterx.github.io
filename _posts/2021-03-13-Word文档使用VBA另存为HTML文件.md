---
layout: post
title: "Word文档使用VBA另存为HTML文件"
date: 2021-03-13 22:31:39 +0800
comments: false
---

Word文档虽然非常常见，但是不便于通过网站给别人浏览，因此需要将其转换成HTML文件。Word应用是自带转换功能的，只需将其另存为HTML文件即可。不过这个另存为功能在转后将自动切换到HTML文件，由于我们有时只是需要将文档转换成HTML文件，但是仍然还要在这个Word文档上工作，修改文件内容，那么这个功能就稍微显得麻烦一些。如果解决这个办法呢，可以使用VBA脚本来解决。

- 设置路径变量

```vb
Let strDocName = ActiveDocument.Name
Let intPos = InStrRev(strDocName, ".")
Let strDocName = Left(strDocName, intPos - 1)
Let htmlFileName = strDocName & ".htm"
Let htmlDir = ActiveDocument.Path & "\html"
Let htmlFullPath = htmlDir & "\" & htmlFileName
```

- 判断路径是否存在

```vb
If Dir(htmlDir, vbDirectory) = "" Then
    MkDir htmlDir
End If
```

- 创建新的文档 

```vb
Dim oNewDocument As Document
Set oNewDocument = Documents.Add(Template:=ActiveDocument.FullName, DocumentType:=wdNewBlankDocument, Visible:=False)
```

- 另存为HTML文件

```vb
oNewDocument.SaveAs2 FileName:=htmlFullPath, FileFormat:=wdFormatHTML
oNewDocument.Close SaveChanges:=False
```

- 清除对象

```vb
Set oNewDocument = Nothing
```