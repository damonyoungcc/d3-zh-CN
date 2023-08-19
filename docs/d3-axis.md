<script setup>

import * as d3 from "d3";
import {shallowRef, onMounted, onUnmounted} from "vue";
import ExampleAxis from "./components/ExampleAxis.vue";

const domain = shallowRef([0, 100]);
const range = [20, 668];

let timer;

onMounted(() => {
  timer = d3.interval(() => {
    const x = Math.random() * 100;
    const l = Math.random() * 100;
    domain.value = [x, x + l];
  }, 5000);
});

onUnmounted(() => {
  timer?.stop();
});

</script>

# 坐标轴 d3-axis

<ExampleAxis :axis="d3.axisBottom(d3.scaleLinear([0, 100], range))" :y="7" />

<ExampleAxis :axis="d3.axisBottom(d3.scaleLog([1, 1000], range))" :y="7" />

<ExampleAxis :axis="d3.axisBottom(d3.scaleBand([...'ABCDEFGHIJKL'], range)).tickSizeOuter(0)" :y="7" />

<ExampleAxis :axis="d3.axisBottom(d3.scaleUtc([new Date('2011-01-01'), new Date('2013-01-01')], range))" :y="7" />

坐标轴组件会为位置 [比例尺 scales](./d3-scale.md) 呈现人类可读的参考标记。它适用于大多数比例尺类型，包括线性、对数、分段和时间比例尺，如上所示。

在SVG容器的选择上调用坐标轴组件（通常是单个G元素），可以填充坐标轴。坐标轴呈现在原点处。要改变坐标轴相对于图表的位置，请在包含的元素上指定一个 [transform 属性](http://www.w3.org/TR/SVG/coords.html#TransformAttribute)。

```js
const gx = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));
```

如果比例尺发生了变化，可以再次调用坐标轴组件以进行更新。为了实现平滑的动画效果，可以在过渡 [transition](./d3-transition.md) 中调用它。

<ExampleAxis :axis="d3.axisBottom(d3.scaleLinear(domain, range))" :y="7" :duration="1500" />

```js
gx.transition()
    .duration(750)
    .call(d3.axisBottom(x));
```

由坐标轴创建的元素被视为其公共 API 的一部分。你可以应用外部样式表或修改生成的坐标轴元素以 [自定义坐标轴样式](https://observablehq.com/@d3/styled-axes)。一个坐标轴由一个 class 为 “domain” 的 [path 元素](https://www.w3.org/TR/SVG/paths.html#PathElement) 表示刻度范围的域，接着是 class 为 “tick” 的变换后的 [g 元素](https://www.w3.org/TR/SVG/struct.html#Groups) 元素，表示每个刻度。每个刻度都有一个 [line 元素](https://www.w3.org/TR/SVG/shapes.html#LineElement) 元素用于绘制刻度线，以及一个 [text 元素](https://www.w3.org/TR/SVG/text.html#TextElement) 元素用于刻度标签。例如，这是一个典型的底部定向坐标轴：

```html
<g fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
  <path class="domain" stroke="currentColor" d="M0.5,6V0.5H880.5V6"></path>
  <g class="tick" opacity="1" transform="translate(0.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.0</text>
  </g>
  <g class="tick" opacity="1" transform="translate(176.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.2</text>
  </g>
  <g class="tick" opacity="1" transform="translate(352.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.4</text>
  </g>
  <g class="tick" opacity="1" transform="translate(528.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.6</text>
  </g>
  <g class="tick" opacity="1" transform="translate(704.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.8</text>
  </g>
  <g class="tick" opacity="1" transform="translate(880.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">1.0</text>
  </g>
</g>
```

坐标轴的方向是固定的；要更改方向，请删除旧的坐标轴并创建新的坐标轴。

## axisTop(*scale*) {#axisTop}

<ExampleAxis :axis="d3.axisTop(d3.scaleLinear([0, 100], range))" :y="23" />

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 传入一个指定的 [比例尺 scale](./d3-scale.md)，创建一个面向顶部的坐标轴生成器，使用空的 [刻度参数](#axis_ticks)，[刻度大小](#axis_tickSize) 为 6，[内边距](#axis_tickPadding) 为 3。在这种方向上，刻度绘制在水平域路径的上方。

## axisRight(*scale*) {#axisRight}

<ExampleAxis :axis="d3.axisRight(d3.scaleLinear([0, 100], [10, 190]))" :width="60" :height="200" :x="20" />

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 传入一个指定的 [比例尺 scale](./d3-scale.md)，创建一个面向右侧的坐标轴生成器，使用空的 [刻度参数](#axis_ticks)，[刻度大小](#axis_tickSize) 为 6，[内边距](#axis_tickPadding) 为 3。在这种方向上，刻度绘制在垂直域路径的右侧。

## axisBottom(*scale*) {#axisBottom}

<ExampleAxis :axis="d3.axisBottom(d3.scaleLinear([0, 100], range))" :y="7" />

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 传入一个指定的 [比例尺 scale](./d3-scale.md)，创建一个面向底部的坐标轴生成器，使用空的 [刻度参数](#axis_ticks)，[刻度大小](#axis_tickSize) 为 6，[内边距](#axis_tickPadding) 为 3。在这种方向上，刻度绘制在垂直域路径的下方。

## axisLeft(*scale*) {#axisLeft}

<ExampleAxis :axis="d3.axisLeft(d3.scaleLinear([0, 100], [10, 190]))" :width="60" :height="200" :x="40" />

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 传入一个指定的 [比例尺 scale](./d3-scale.md)，创建一个面向左侧的坐标轴生成器，使用空的 [刻度参数](#axis_ticks)，[刻度大小](#axis_tickSize) 为 6，[内边距](#axis_tickPadding) 为 3。在这种方向上，刻度绘制在垂直域路径的左侧。

## *axis*(*context*) {#_axis}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 将坐标轴渲染到给定的 *上下文 context* 中，该上下文可以是 SVG 容器的 [选择集 selection](./d3-selection.md) （可以是 SVG 或 G 元素），也可以是相应的 [过渡效果 transition](./d3-transition.md)。

```js
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));
```

## *axis*.scale(*scale*) {#axis_scale}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *比例尺 scale* ，则设置 [比例尺 scale](./d3-scale.md) 并返回坐标轴。如果没有指定 *比例尺 scale*，则返回当前的比例尺。


```js
const xAxis = d3.axisBottom().scale(x);
```

## *axis*.ticks(...*arguments*) {#axis_ticks}

设置在渲染坐标轴时将传递给 [*scale*.ticks](./d3-scale/linear.md#linear_ticks) 和 [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat) 的 *参数 arguments* ，并返回坐标轴生成器。

*参数 arguments* 的含义取决于 [坐标轴的比例尺 axis’ scale](#axis_scale) 类型：通常，这些参数是用于刻度数量的建议 *计数 count* （或用于时间比例尺的 [时间间隔 time *interval*](./d3-time.md) ），以及一个可选的格式说明符，用于自定义刻度值的格式。例如，要在线性比例尺上生成二十个带有 SI 前缀格式的刻度，可以这样设置：

```js
axis.ticks(20, "s");
```

要使用时间比例尺设置刻度间隔为 15 分钟，可以这样设置：

```js
axis.ticks(d3.timeMinute.every(15));
```

这是一个方便用于设置 [坐标轴刻度参数 *axis*.tickArguments](#axis_tickArguments) 的函数。例如，下面这段代码：

```js
axis.ticks(10);
```

等同于：

```js
axis.tickArguments([10]);
```

如果比例尺未实现 *scale*.ticks，例如带有 [band](./d3-scale/band.md) 和 [point](./d3-scale/point.md) 比例尺，该方法将不产生任何效果。要显式设置刻度值，请使用 [*axis*.tickValues](#axis_tickValues)。要显式设置刻度格式，请使用 [*axis*.tickFormat](#axis_tickFormat)。要直接生成刻度值，请使用 [*scale*.ticks](./d3-scale/linear.md#linear_ticks)。

## *axis*.tickArguments(*arguments*) {#axis_tickArguments}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *参数 arguments*，则在绘制轴时会设置这些 *参数 arguments* ，这些参数将传递给 [*scale*.ticks](./d3-scale/linear.md#linear_ticks) 和 [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat)。函数会返回轴生成器。更常见的做法是使用 [*axis*.ticks](#axis_ticks)。

*参数 arguments* 的含义取决于轴的 [比例尺类型 axis’ scale](#axis_scale)：最常见的情况是，这些参数是刻度的建议 *数量 count* （或时间刻度的 [时间间隔 time *interval*](./d3-time.md)），以及可选的格式说明符，用于自定义刻度值的格式。例如，要在线性比例尺上生成带有 SI 前缀格式的二十个刻度，可以这样说：

```js
axis.tickArguments([20, "s"]);
```

要在时间比例尺上每隔十五分钟生成刻度，可以这样说：

```js
axis.tickArguments([d3.timeMinute.every(15)]);
```

如果未指定 *参数 arguments*，则返回当前刻度参数，默认为空数组。如果指定了参数 *参数 arguments*，并且比例尺未实现 *scale*.ticks（例如带有 [band](./d3-scale/band.md) 和 [point](./d3-scale/point.md) 比例尺），则该方法不会产生任何效果。要显式设置刻度值，请使用 [*axis*.tickValues](#axis_tickValues)。要显式设置刻度格式，请使用 [*axis*.tickFormat](#axis_tickFormat)。

## *axis*.tickValues(*values*) {#axis_tickValues}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了可迭代对象 *值 values* ，则使用指定的值作为刻度，而不使用比例尺的自动刻度生成器。例如，要在特定的值上生成刻度：


```js
const axis = d3.axisBottom(x).tickValues([1, 2, 3, 5, 8, 13, 21]);
```

显式的刻度值优先于由 [*axis*.tickArguments](#axis_tickArguments) 设置的刻度参数。然而，如果没有设置刻度格式，任何刻度参数仍将传递给比例尺的 [tickFormat](#axis_tickFormat) 函数。

如果 *值 values* 为 null，则清除任何先前设置的显式刻度值，并恢复为比例尺的刻度生成器。如果未指定 *值 values* ，则返回当前的刻度值，默认为 null。

## *axis*.tickFormat(*format*) {#axis_tickFormat}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *格式 format* ，则设置刻度格式函数并返回坐标轴。例如，要显示具有千位分组的整数：

```js
axis.tickFormat(d3.format(",.0f"));
```

更常见的情况是，将格式说明符传递给 [*axis*.ticks](#axis_ticks)，这样做的好处是可以根据刻度间隔自动设置格式精度：

```js
axis.ticks(10, ",f");
```

参见 [d3-format](./d3-format.md)和 [d3-time-format](/d3-time-format.md) 以获取创建格式化函数的帮助。

如果未指定格式 *format* ，则返回当前的格式化函数，默认为 null。null 的格式表示应该使用比例尺的默认格式化器，该格式化器通过调用 [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat) 生成。在这种情况下，由 [*axis*.tickArguments](#axis_tickArguments) 指定的参数也会传递给 *scale*.tickFormat。

## *axis*.tickSize(*size*) {#axis_tickSize}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *size*，将 [内部 inner](#axis_tickSizeInner) 和[外部 outer](#axis_tickSizeOuter) 刻度大小设置为指定的值，并返回坐标轴。

```js
const axis = d3.axisBottom(x).tickSize(0);
```

如果未指定 *size*，则返回当前的内部刻度大小，默认为 6。

```js
axis.tickSize() // 0
```

## *axis*.tickSizeInner(size) {#axis_tickSizeInner}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *size*，则将内部刻度大小设置为指定的值，并返回坐标轴。

```js
const axis = d3.axisBottom(x).tickSizeInner(0);
```

如果未指定 *size*，则返回当前的内部刻度大小，默认为 6。

```js
axis.tickSizeInner() // 0
```

内部刻度大小控制刻度线的长度，相对于坐标轴的本机位置进行偏移。

## *axis*.tickSizeOuter(size) {#axis_tickSizeOuter}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *size*，则将外部刻度大小设置为指定的值，并返回坐标轴。

```js
const axis = d3.axisBottom(x).tickSizeOuter(0);
```

如果未指定 *size*，则返回当前的外部刻度大小，默认为 6。

```js
axis.tickSizeOuter() // 0
```

外部刻度大小控制域路径的方形末端的长度，相对于坐标轴的本机位置进行偏移。因此，“外部刻度”实际上不是刻度，而是域路径的一部分，其位置由关联的比例尺的域范围确定。因此，外部刻度可能与第一个或最后一个内部刻度重叠。外部刻度大小为 0 会抑制域路径的方形末端，而产生一条直线。

## *axis*.tickPadding(padding) {#axis_tickPadding}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *padding*，则将填充设置为指定的像素值，并返回坐标轴。

```js
const axis = d3.axisBottom(x).tickPadding(0);
```

如果未指定 *padding*，则返回当前的填充值，默认为 3 像素。

```js
axis.tickPadding() // 0
```

## *axis*.offset(offset) {#axis_offset}

[源码](https://github.com/d3/d3-axis/blob/main/src/axis.js) · 如果指定了 *offset*，则将像素偏移设置为指定的像素值，并返回坐标轴。

```js
const axis = d3.axisBottom(x).offset(0);
```

如果未指定 *offset*，则返回当前的像素偏移值。

```js
axis.offset() // 0
```

在 [设备像素比 devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) 比大于 1 的设备上，默认像素偏移为 0，在其他情况下默认为 0.5。这个默认像素偏移确保在低分辨率设备上呈现清晰的边缘效果。
