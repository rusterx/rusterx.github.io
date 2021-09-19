---
layout: post
title: "Python处理FDTD Solutions导出数据"
date: 2020-05-14 12:20:57 +0800
comments: false
---

FDTD Solutions可以计算任意形状贵金属纳米颗粒的光学特性，其电场数据可以使用matlabsave方法导出，然后使用Python读取并画图。下面是一张3D的电场数据在Z方向上的某个切片。

## 三维数据

如果电场moinitor是三维的，那么通常还分为多波长和单波长的数据，对于多波长的数据，数据E的尺寸为[sx\*sy\*sz, 3, len(wavelengths)]，对于单波长的，数据E的尺寸为[sx\*sy\*sz, 3]，由于numpy和matlab对于行列不同的优先填充特性，导入的数据需要转置。

```py
# f为h5py打开的文件对象
ME = f[keys[-1]]
E = np.array(ME['E']).transpose()
```

以多波长为例，电场的绝对值和最大值及其索引可以使用如下的方法处理，这里主要涉及到结构化数组（sturctured array）的处理。

```py
Ex = np.abs(E[:, 0, :]['real']+1j*E[:, 0, :]['imag'])
Ey = np.abs(E[:, 1, :]['real']+1j*E[:, 1, :]['imag'])
Ez = np.abs(E[:, 2, :]['real']+1j*E[:, 2, :]['imag'])

Ea = np.sqrt(np.power(Ex, 2)+np.power(Ey, 2)+np.power(Ez, 2))
```

```py
index = np.argmax(Ea)
[i, j] = np.unravel_index(index, (sizes[0], sizes[2]))
[m, n, k] = np.unravel_index(i, (sx, sy, sz))[::-1]
```

需要注意的是，对于matlab存储的数据，Python在reshape之后，需要转置

```py
Ear = Ea[:, j].reshape((sx, sy, sz)).T
```

- 第一张切片

![第一张电场切片](https://jekyll-1251110281.file.myqcloud.com/images/tetrahedron_field_733nm_0_field_20200514_compressed_masked.jpg)

- 最大的切片

![最大的电场切片](https://jekyll-1251110281.file.myqcloud.com/images/tetrahedron_field_733nm_34_field_20200514_compressed_masked.jpg)
