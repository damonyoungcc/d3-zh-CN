# 线性比例尺 Linear scales

线性比例尺将连续的定量输入 [域 domain](#linear_domain) 通过线性变换（平移和缩放）映射到连续的输出 [范围 range](#linear_range) 。如果范围也是数值，映射可以 [反转 inverted](#linear_invert)。线性比例尺是连续定量数据的良好默认选择，因为它们保持了比例差异。每个范围值 *y* 可以表示为域值 x 的函数： *x*: *y* = *mx* + *b*。

<!-- A continuous scale is not constructed directly; instead, try a [linear](#linear-scales), [power](#power-scales), [log](#log-scales), [identity](#identity-scales), [radial](#radial-scales), [time](#time-scales) or [sequential color](#sequential-scales) scale. -->

## scaleLinear(*domain*, *range*) {#scaleLinear}

[示例](https://observablehq.com/@d3/d3-scalelinear) · [源码](https://github.com/d3/d3-scale/blob/main/src/linear.js) · 使用指定的 [域 domain](#linear_domain) 和 [范围 range](#linear_range)、[默认 default](../d3-interpolate/value.md#interpolate) [插值器 interpolator](#linear_interpolate)和禁用(在范围之外的值被强制限制在范围内 [clamping](#linear_clamp)) 构建一个新的线性比例尺。

```js
d3.scaleLinear([0, 100], ["red", "blue"])
```

如果只指定一个参数，则代表设置 *范围 range*。如果未指定 *域 domain* 或 *范围 range* ，则默认为各自的 [0, 1]。

```js
d3.scaleLinear(["red", "blue"]) // default domain of [0, 1]
```

## *linear*(*value*) {#_linear}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 给定一个来自 [域 domain](#linear_domain) 的 *值 value*，返回相应的 [范围 range](#linear_range) 内的值。例如，要应用位置编码：

```js
const x = d3.scaleLinear([10, 130], [0, 960]);
x(20); // 80
x(50); // 320
```

要应用颜色编码：

```js
const color = d3.scaleLinear([10, 100], ["brown", "steelblue"]);
color(20); // "rgb(154, 52, 57)"
color(50); // "rgb(123, 81, 103)"
```

如果给定的 *值 value* 超出了定义域，并且未启用 (在范围之外的值被强制限制在范围内 [clamping](#linear_clamp))，则映射将进行外推，使得返回的值在范围之外。

## *linear*.invert(*value*) {#linear_invert}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 给定一个 [范围 range](#linear_range) 内的 *值 value* ，返回对应的 [域 domain](#linear_domain) 内的值。反转在交互中很有用，比如可以用来确定与鼠标位置相对应的数据值。例如，反转一个位置编码：

```js
const x = d3.scaleLinear([10, 130], [0, 960]);
x.invert(80); // 20
x.invert(320); // 50
```

如果给定的 *值 value* 超出了范围，并且未启用 (在范围之外的值被强制限制在范围内 [clamping](#linear_clamp))，则映射可能被外推，以致返回的值超出了域。这种方法仅在范围为数字时支持。如果范围不是数字，则返回 NaN。

对于范围内的有效值 *y*，<i>linear</i>(<i>linear</i>.invert(<i>y</i>)) 大致等于 *y*；类似地，对于域内的有效值 *x*，<i>linear</i>.invert(<i>linear</i>(<i>x</i>))大致等于 *x*。由于浮点精度的限制，缩放和其逆可能并不完全准确。

## *linear*.domain(*domain*) {#linear_domain}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 如果指定了 *域 domain* ，则将比例尺的域设置为指定的数字数组，并返回该比例尺。

```js
const x = d3.scaleLinear().domain([10, 130]);
```

数组必须包含两个或更多元素。如果给定数组中的元素不是数字，则它们将被强制转换为数字。

尽管连续比例尺的域和范围通常各自有两个值，但指定多于两个值会产生一个分段比例尺。例如，要创建一个分散的颜色比例尺 [diverging color scale](./diverging.md)，用于在负值时在白色和红色之间进行插值，在正值时在白色和绿色之间进行插值，可以这样说：

```js
const color = d3.scaleLinear([-1, 0, 1], ["red", "white", "green"]);
color(-0.5); // "rgb(255, 128, 128)"
color(+0.5); // "rgb(128, 192, 128)"
```

在内部，分段比例尺对给定的域值执行二分搜索 [binary search](../d3-array/bisect.md)，以找到对应的范围插值器。因此，域必须按升序或降序排列。如果域和范围的长度不同，分别为 *N* 和 *M*，那么只观察每个中的前 *min(N,M)* 个元素。

如果未指定域，将返回比例尺当前域的副本。

```js
color.domain() // [-1, 0, 1]
```

## *linear*.range(range) {#linear_range}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 如果指定了 *range*，将比例尺的范围设置为指定的值数组，并返回该比例尺。

```js
const x = d3.scaleLinear().range([0, 960]);
```

该数组必须包含两个或更多的元素。与域 [domain](#linear_domain) 不同，给定数组中的元素不必是数字；任何受底层插值器 [interpolator](#linear_interpolate) 支持的值都可以使用，尽管需要注意反转 [invert](#linear_invert) 时需要使用数值范围。

如果未指定范围 *range*，则返回比例尺当前范围的副本。

```js
x.range() // [0, 960]
```

请参阅 [*linear*.interpolate](#linear_interpolate) 获取更多示例。

## *linear*.rangeRound(*range*) {#linear_rangeRound}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 将比例尺的范围 [*range*](#linear_range) 设置为指定的值数组，同时将比例尺的插值器 [interpolator](#linear_interpolate) 设置为 [interpolateRound](../d3-interpolate/value.md#interpolateRound) 返回此比例尺。

```js
const x = d3.scaleLinear().rangeRound([0, 960]);
```

这是一个等同于以下操作的便捷方法：

```js
linear.range(range).interpolate(d3.interpolateRound)
```

舍入插值器有时用于避免抗锯齿伪影，但也要考虑 [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) 的“crispEdges”样式。请注意，此插值器只能用于数值范围。

## *linear*.clamp(*clamp*) {#linear_clamp}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 如果指定了 *clamp*，根据指定的值启用或禁用 clamping；返回此比例尺。

```js
const x = d3.scaleLinear([0, 960]).clamp(true);
```

如果禁用了 clamping，并且比例尺被传递一个超出域 [domain](#linear_domain) 范围的值，比例尺可能通过外推返回一个超出 [range](#linear_range) 的值。如果启用了 clamping，则比例尺的返回值始终在比例尺的范围内。Clamping 同样适用于 [*linear*.invert](#linear_invert)。例如：

```js
const x = d3.scaleLinear([10, 130], [0, 960]); // clamping disabled by default
x(-10); // -160, outside range
x.invert(-160); // -10, outside domain
x.clamp(true); // enable clamping
x(-10); // 0, clamped to range
x.invert(-160); // 10, clamped to domain
```

如果未指定 *clamp*，则返回比例尺当前是否将值夹在范围内。

```js
x.clamp() // true, perhaps
```

## *linear*.unknown(*value*) {#linear_unknown}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 如果指定了 *value*，则设置比例尺对于未定义或 NaN 输入值的输出值，并返回该比例尺。这对于指定如何显示丢失或无效数据非常有用。

```js
const color = d3.scaleLinear([0, 100], ["red", "blue"]).unknown("#ccc");
color(NaN); // "#ccc"
```

如果未指定 *value*，则返回当前的未知值，其默认值为 undefined。

```js
color.unknown() // "#ccc"
```

## *linear*.interpolate(*interpolate*) {#linear_interpolate}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 如果指定了 *interpolate*，则设置比例尺的范围 [range](#linear_range) 插值器工厂。

```js
const color = d3.scaleLinear(["red", "blue"]).interpolate(d3.interpolateHcl);
```

比例尺的插值器工厂用于为范围中的每一对相邻值创建插值器；这些插值器将规范化的域参数 *t* （在 [0, 1] 内）映射到范围中的相应值。如果未指定 factory，则返回比例尺当前的插值器工厂，默认为 [d3.interpolate](../d3-interpolate/value.md#interpolate)。请参阅 [d3-interpolate](../d3-interpolate.md) 获取更多插值器。

例如，考虑一个范围中有三种颜色的分散色标尺：

```js
const color = d3.scaleLinear([-100, 0, +100], ["red", "white", "green"]);
```

比例尺内部会创建两个插值器，相当于：

```js
const i0 = d3.interpolate("red", "white");
const i1 = d3.interpolate("white", "green");
```

指定自定义插值器的常见原因是改变插值的颜色空间。例如，使用 [HCL](../d3-interpolate/color.md#interpolateHcl)：

```js
const color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateHcl);
```

或者使用自定义伽马值的 [Cubehelix](../d3-interpolate/color.md#interpolateCubehelix) 插值器：

```js
const color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateCubehelix.gamma(3));
```

:::warning 注意
默认的插值器 [default interpolator](../d3-interpolate/value.md#interpolate) **可能会重复使用返回值**。例如，如果范围值是对象，那么值插值器始终返回相同的对象，并在这个对象上直接修改。如果该比例尺用于设置属性或样式，这通常是可以接受的（对于性能来说也是理想的）；然而，如果您需要存储比例尺的返回值，您必须指定自己的插值器或适当地进行复制。
:::

## *linear*.ticks(*count*) {#linear_ticks}

[示例](https://observablehq.com/@d3/scale-ticks) · [源码](https://github.com/d3/d3-scale/blob/main/src/linear.js) · 从比例尺的域 [domain](#linear_domain) 中返回大约 *count* 个代表性值。

```js
const x = d3.scaleLinear([10, 100], ["red", "blue"]);
x.ticks(); // [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

如果未指定 *count*，它默认为 10。返回的刻度值均匀分布，具有人类可读的值（如 10 的幂的倍数），并且保证在域的范围内。刻度经常用于与可视化数据一起显示参考线或刻度标记。指定的 *count* 只是一个提示；刻度尺可能根据域返回更多或更少的值。另请参阅 d3-array 的 [ticks](../d3-array/ticks.md)。

## *linear*.tickFormat(*count*, *specifier*) {#linear_tickFormat}

[示例](https://observablehq.com/@d3/scale-ticks) · [源码](https://github.com/d3/d3-scale/blob/main/src/tickFormat.js) · 返回适合显示刻度值的数字格式 [number format](../d3-format.md) 函数，自动计算基于刻度值之间的固定间隔的适当精度。指定的 *count* 应该与用于生成刻度值 [tick values](#linear_ticks) 的 *count* 具有相同的值。

```js
const x = d3.scaleLinear([0.1, 1], ["red", "blue"]);
const f = x.tickFormat();
f(0.1); // "0.1"
f(1); // "1.0"
```

可选的格式说明符 *specifier* 允许使用自定义格式 [custom format](../d3-format.md#locale_format)，其中格式的精度由比例尺自动设置，以适应刻度间隔。例如，要格式化百分比变化，您可以这样写：

```js
const x = d3.scaleLinear([-1, 1], [0, 960]);
const T = x.ticks(5); // [-1, -0.5, 0, 0.5, 1]
const f = x.tickFormat(5, "+%");
T.map(f); // ["−100%", "−50%", "+0%", "+50%", "+100%"]
```

如果格式说明符 *specifier* 使用格式类型 `s`，则比例尺将根据域中的最大值返回一个SI前缀格式 [SI-prefix format](../d3-format.md#locale_formatPrefix)。如果格式说明符 *specifier* 已经指定了精度，则此方法等效于 [*locale*.format](../d3-format.md#locale_format)。

另请参阅 [d3.tickFormat](#tickFormat)。

## *linear*.nice(count) {#linear_nice}

[示例](https://observablehq.com/@d3/d3-scalelinear) · [源码](https://github.com/d3/d3-scale/blob/main/src/nice.js) · 扩展域 [domain](#linear_domain)，使其以整数值开始和结束。

```js
const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice();
x.domain(); // [0.2, 1]
```

这种方法通常会修改刻度的域，可能只会将边界扩展到最近的整数值。如果域是根据数据计算得出的，比如使用 [extent](../d3-array/summarize.md#extent) 方法，且可能是不规则的，那么使用 nicing 是很有用的。如果域有多于两个值，nicing 方法只会影响第一个和最后一个值。

可选的刻度数量 *count* 参数可以更好地控制用于扩展边界的步长，确保返回的刻度 [ticks](#linear_ticks) 完全覆盖了域。

```js
const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice(40);
x.domain(); // [0.24, 0.98]
```

使用 nicing 方法只会修改当前的域 domain，它不会自动对后续使用 [*linear*.domain](#linear_domain) 设置的域进行 nicing。如果希望在设置新域后，您必须重新应用 nicing 方法来对刻度进行重新调整。

## *linear*.copy() {#linear_copy}

[示例](https://observablehq.com/@d3/continuous-scales) · [源码](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · 返回比例尺的拷贝。

```js
const x1 = d3.scaleLinear([0, 100], ["red", "blue"]);
const x2 = x1.copy();
```

对此比例尺的更改不会影响返回的比例尺，反之亦然。

## tickFormat(*start*, *stop*, *count*, *specifier*) {#tickFormat}

[示例](https://observablehq.com/@d3/scale-ticks) · [源码](https://github.com/d3/d3-scale/blob/main/src/tickFormat.js) · 返回一个适合显示刻度值的数字格式 [number format](../d3-format.md) 函数，根据刻度值之间的固定间隔自动计算适当的精度，由 [d3.tickStep](../d3-array/ticks.md#tickStep) 确定。


```js
const f = d3.tickFormat(0, 1, 20);
f(1); // "1.00"
```

一个可选的格式说明符 *specifier* 允许自定义格式 [custom format](../d3-format.md#locale_format)，其中格式的精度由比例尺根据刻度间隔自动设置。例如，要格式化百分比变化，您可以这样说：

```js
const f = d3.tickFormat(-1, 1, 5, "+%");
f(-0.5); // "-50%"
```

如果格式说明符 *specifier* 使用格式类型 `s`，则比例尺将基于 *开始* 和 *结束* 值的较大绝对值返回一个SI前缀格式 [SI-prefix format](../d3-format.md#locale_formatPrefix)。如果格式说明符 *specifier* 已经指定了精度，则此方法相当于 [*locale*.format](../d3-format.md#locale_format)。

## scaleIdentity(*range*) {#scaleIdentity}

[示例](https://observablehq.com/@d3/d3-scalelinear) · [源码](https://github.com/d3/d3-scale/blob/main/src/identity.js) · 使用指定的范围 [range](#linear_range)（以及由此推导出的域 [domain](#linear_domain)）构建一个新的恒等比例尺。


```js
const x = d3.scaleIdentity([0, 960]);
```

恒等比例尺是线性比例尺 [linear scales](#linear-scales) 的一种特殊情况，其中域和范围是相同的；因此，比例尺及其反转方法是恒等函数。在处理像素坐标时，这些比例尺偶尔会很有用，例如与轴一起使用。恒等比例尺不支持 [rangeRound](#linear_rangeRound)、 [clamp](#linear_clamp) 或 [interpolate](#linear_interpolate)。

如果未指定范围 *range*，则默认为[0, 1]。

## scaleRadial(*domain*, *range*) {#scaleRadial}

[示例](https://observablehq.com/@d3/radial-stacked-bar-chart) · [源码](https://github.com/d3/d3-scale/blob/main/src/radial.js) · 使用指定的域 [domain](#linear_domain) 和范围 [range](#linear_range) 构建一个新的径向比例尺。

```js
const r = d3.scaleRadial([100, 200], [0, 480]);
```

径向比例尺是线性比例尺 [linear scales](#linear-scales) 的一种变体，其中范围在内部进行了平方处理，使得输入值与平方的输出值线性对应。当您希望输入值对应于图形标记的面积，而且标记是由半径指定的（例如径向条形图）时，这些比例尺非常有用。径向比例尺不支持插值 [interpolate](#linear_interpolate)。

如果未指定域 *domain* 或范围 *range*，则每个默认为 [0, 1]。