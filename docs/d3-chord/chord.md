# Chords

弦图布局 Chord Layout 计算角度以生成弦图表[chord diagram](../d3-chord.md)。

## chord() {#chord}

[源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 使用默认设置创建新的弦图布局。

```js
const chord = d3.chord();
```

## *chord*(*matrix*) {#_chord}

[源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 对于指定的 *n*×*n* 大小的矩阵计算选图布局，其中矩阵表示 *n* 个节点的网络（完全有向图）之间的定向流动。

*chord*(*matrix*) 的返回值是一个弦 *chords* 数组，每个弦代表节点 *i* 和 *j* 之间的双向流动（其中 *i* 可能等于 *j*），并且是一个具有以下属性的对象：

* `source` - the source subgroup
* `target` - the target subgroup

每个 `source and target subgroup` 也是一个具有以下属性的对象：

* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - the flow value *matrix*[*i*][*j*]
* `index` - the node index *i*

通常将弦传递给 [ribbon](./ribbon.md) 来显示网络关系。

返回的数组仅包含值矩阵 *matrix*[*i*][*j*] 或矩阵 *matrix*[*j*][*i*] 为非零的弦对象。此外，返回的数组仅包含唯一的弦：给定的弦 *ij* 表示从 *i* 到 *j* 和从 *j* 到 *i* 的双向流动，并且不包含重复的弦 *ji*；选择 *i* 和 *j* 以使弦的源始终表示 *matrix*[*i*][*j*] 和 *matrix*[*j*][*i*] 中较大的那个。

The *chords* array also defines a secondary array of length *n*, *chords*.groups, where each group represents the combined outflow for node *i*, corresponding to the elements *matrix*[*i*][0 … *n* - 1], and is an object with the following properties:


*chords* 数组还定义了一个长度为 *n* 的次级数组 *chords*.groups，其中每个分组表示节点 *i* 的综合流出，对应于元素 *matrix*[*i*][0 … *n* - 1]，并且是一个具有以下属性的对象：


* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - the total outgoing flow value for node *i*
* `index` - the node index *i*

通常将这些分组传递给 [arc](../d3-shape/arc.md) 函数，以在弦布局的周长上生成一个甜甜圈图表。

## *chord*.padAngle(*angle*) {#chord_padAngle}

[源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 如果指定了角度 *angle*，则将相邻分组之间的填充角度设置为指定的弧度数，并返回此弦布局。如果未指定角度，则返回当前的填充角度，默认为零。

## *chord*.sortGroups(*compare*) {#chord_sortGroups}

[源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 如果指定了 *compare*，则将分组比较器设置为指定的函数或 null，并返回此弦布局。如果未指定 *compare*，则返回当前的分组比较器，默认为 null。如果分组比较器为非 null，则会使用它按其总流量对分组进行排序。另请参见 [ascending](../d3-array/sort.md#ascending) 和 [descending](../d3-array/sort.md#descending)。

## *chord*.sortSubgroups(*compare*) {#chord_sortSubgroups}

[源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 如果指定了 *compare*，则将子分组比较器设置为指定的函数或 null，并返回此弦布局。如果未指定 *compare*，则返回当前的子分组比较器，默认为 null。如果子分组比较器为非 null，则会使用它按其总流量对与给定分组 i 对应的 *matrix*[*i*][0 … *n* - 1] 的子分组进行排序。另请参见 [ascending](../d3-array/sort.md#ascending) 和 [descending](../d3-array/sort.md#descending)。

## *chord*.sortChords(*compare*) {#chord_sortChords}

[源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 如果指定了 *compare*，则将和弦比较器设置为指定的函数或 null，并返回此和弦布局。如果未指定 *compare*，则返回当前的和弦比较器，默认为 null。如果和弦比较器为非 null，则会使用它按其组合流量对和弦进行排序；这仅影响和弦的 Z 轴顺序。另请参见 [ascending](../d3-array/sort.md#ascending) 和 [descending](../d3-array/sort.md#descending)。

## chordDirected() {#chordDirected}

[示例](https://observablehq.com/@d3/directed-chord-diagram) · [源码](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 用于单向流量的和弦布局。从 *i* 到 *j* 的和弦仅由 *matrix*[*i*][*j*] 中的值生成。


## chordTranspose() {#chordTranspose}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · 转置的和弦布局。用于突出显示出流量（而不是入流量）