<script setup>

import ColorSpan from "./components/ColorSpan.vue";
import ExampleChord from "./components/ExampleChord.vue";

</script>

# 弦 d3-chord

<ExampleChord/>

弦图 Chord diagrams 用于可视化图中一组节点之间的流动关系，例如有限状态之间的转移概率。上面的图示展示了一个来自 [Circos](http://circos.ca/guide/tables/) 的虚构数据集，表示染发的人群。

D3 的弦图布局使用一个大小为 *n*×*n* 的正方形 *矩阵 matrix* 表示流动，其中 *n* 是图中节点的数量。矩阵中的每个值 *matrix*[*i*][*j*] 表示从第 *i* 个节点流向第 *j* 个节点的流量。（每个数字 *matrix*[*i*][*j*] 必须是非负的，尽管如果从节点 *i* 到节点 *j* 没有流动，它可以为零。）

在上面的例子中，每一行和每一列代表了一种发色（<ColorSpan color="black" />, <ColorSpan color="#ffdd89" text="blond" />, <ColorSpan color="#957244" text="brown" />, <ColorSpan color="#f26223" text="red" />）；每个数值代表了从一种颜色变成另一种颜色的人数。例如，5,871 人将黑<ColorSpan color="black" />发染成金<ColorSpan color="#ffdd89" text="blond" />发，而 1,951 人将金<ColorSpan color="#ffdd89" text="blond" />发染成黑<ColorSpan color="black" />发。矩阵的对角线表示保持相同颜色的人数。

```js
const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];
```

弦图通过将人口按照起始颜色排列 [arranging](./d3-chord/chord.md) 在一个圆的周围，并在每种颜色之间绘制 [带状图 ribbons](./d3-chord/ribbon.md) 来可视化这些转变。带状物的起始和结束宽度与具有相应起始和结束颜色的人数成比例。带状物的颜色是任意的，通常选择两个值中较大的那个颜色。

请查看以下例子：

- [弦图 Chords](./d3-chord/chord.md) - 用于弦图的布局
- [带状图 Ribbons](./d3-chord/ribbon.md) - 用于弦图的形状单元
