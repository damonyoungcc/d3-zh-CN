# d3-scale

比例尺是将抽象数据的维度进行可视化表达的映射。虽然常用于将数据编码成它本身代表的坐标位置，例如将时间和温度数值映射到散点图横纵坐标对应的位置，但比例尺几乎可以表示任何视觉编码，例如颜色，线条宽度或符号大小。刻度也可以用于几乎任何类型的数据，例如命名的分类数据或需要合理间隔的离散数据。

例如: 

* [Linear scales 线性比例尺](./d3-scale/linear.md) - 用于可用数字表示的定量数据
* [Time scales 时间比例尺](./d3-scale/time.md) - 用于时间序列数据
* [Pow scales 幂比例尺](./d3-scale/pow.md) - 用于可用数字表示的定量数据(通常有比较大的范围)
* [Log scales](./d3-scale/log.md) - for quantitative data (that has a wide range)
* [Symlog scales](./d3-scale/symlog.md) - for quantitative data (that has a wide range)
* [Ordinal scales](./d3-scale/ordinal.md) - for categorical or ordinal data
* [Band scales](./d3-scale/band.md) - for categorical or ordinal data as a position encoding
* [Point scales](./d3-scale/point.md) - for categorical or ordinal data as a position encoding
* [Sequential scales](./d3-scale/sequential.md) - for quantitative data as a sequential color encoding
* [Diverging scales](./d3-scale/diverging.md) - for quantitative data as a diverging color encoding
* [Quantile scales](./d3-scale/quantile.md) - for quantitative data as a discrete encoding
* [Quantize scales](./d3-scale/quantize.md) - for quantitative data as a discrete encoding
* [Threshold scales](./d3-scale/threshold.md) - for quantitative data as a discrete encoding

For visualizing the scale’s encoding, see [d3-axis](./d3-axis.md), as well as [*scale*.ticks](./d3-scale/linear.md#linear_ticks) and [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat). For color schemes, see [d3-scale-chromatic](./d3-scale-chromatic.md).
