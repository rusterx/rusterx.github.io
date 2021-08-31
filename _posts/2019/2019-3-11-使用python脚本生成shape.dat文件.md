---
layout: post
title: "使用Python脚本生成shape.dat文件"
date: 2019-03-11 21:59:42 +0800
comments: false
---

`ddscat`所使用的shape.dat文件实际上就是点的集合，使用python生成该文件十分方便，以下就是实例

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-


"""
该代码主要用来生成球形的shape.dat，用于ddscat的计算
"""

header_template = """ >core_shell.py: NBX, NBY, NBZ=  {}  {}  {}
{:>7} = NAT
   1.0000   0.0000   0.0000 = A_1 vector
   0.0000   1.0000   0.0000 = A_2 vector
 1.000000 1.000000 1.000000 = lattice spacings (d_x,d_y,d_z)/d
 0.0 0.0 0.0
     JA  IX  IY  IZ ICOMP(x,y,z)
"""

data = list()
index = 1
radius = 20

for x in range(-1*radius, radius+1):
    for y in range(-1*radius, radius+1):
        for z in range(-1*radius, radius+1):
            if x**2 + y**2 + z**2 <= radius**2:
                data.append('{:>7}{:>4}{:>4}{:>4} 1 1 1\n'.format(index, x, y, z))
                index = index + 1

with open('shape.dat', 'w', encoding="utf-8") as f:
    f.write(header_template.format(radius*2, radius*2, radius*2, index-1))
    f.write(''.join(data))

```

在python环境中运行这个文件，就会生成一个半径为20个点的球体，使用vtrconvert命令将这个文件转换成paraview可以使用的vtr文件如下：

```
vtrconvert shape.dat output
```

使用paraview软件打开output_1.vtr文件，然后使用Contour过滤器，应用之后，就会形成如下的图形。

![](https://jekyll-1251110281.file.myqcloud.com/images/shape_paraview.jpg)