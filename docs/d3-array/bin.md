# Binning data

将定量数据分成连续的、不重叠的区间，类似直方图<br/>
可以参考 Observable Plot 的[ bin transform ](https://observablehq.com/plot/transforms/bin)。

## bin() {#bin}

```js
const bin = d3.bin().value((d) => d.culmen_length_mm);
```

[示例](https://observablehq.com/@d3/d3-bin) · [源码](https://github.com/d3/d3-array/blob/main/src/bin.js) · 使用默认的设置构建一个新的区间生成器。返回的区间生成器支持方法链，因此通常将此构造函数与 [*bin*.value](#bin_value) 链接在一起，以分配值访问器。返回的生成器也是一个函数，将数据传递给它以进行分组。

## *bin*(*data*) {#_bin}

```js
const bins = d3.bin().value((d) => d.culmen_length_mm)(penguins);
```

将给定的数据样本迭代器分组成区间。返回一个由区间组成的数组，其中每个区间都是一个包含输入数据相关元素的数组。因此，区间的长度是该区间中元素的数量。每个区间还有两个额外的属性：

* `x0` - 区间的下限（包含）。
* `x1` - 区间的上限（不包含，最后一个区间除外）。

给定数据中的任何空值或不可比较值，以及超出定义域范围的值，都将被忽略。


## *bin*.value(*value*) {#bin_value}

```js
const bin = d3.bin().value((d) => d.culmen_length_mm);
```

如果指定了 *value* ，则将值访问器设置为指定的函数或常量，并返回此区间生成器。

```js
bin.value() // (d) => d.culmen_length_mm
```

如果未指定 *value* ，则返回当前的值访问器，默认为恒等函数。

当生成区间时，值访问器将会调用输入的数组中的每个元素，将元素 `d`、索引 `i` 和数组 `data` 作为三个参数传递。默认的值访问器假定输入数据是可排序（可比较）的，例如数字或日期。如果您的数据不是这样的，则应指定一个访问器，返回给定数据的相应可排序值。

这类似于在调用区间生成器之前将数据映射到值，它的好处在于输入数据与返回的区间保持关联，因此更容易访问数据的其他字段。

## *bin*.domain(*domain*) {#bin_domain}

```js
const bin = d3.bin().domain([0, 1]);
```

如果指定了 *domain* ，则将域访问器设置为指定的函数或数组，并返回此区间生成器。

```js
bin.domain() // [0, 1]
```

如果未指定 *domain* ，则返回当前的域访问器，默认为 [extent](./summarize.md#extent)。区间的定义域被定义为一个数组 [*min*, *max*]，其中 *min* 是最小的可观测值，*max* 是最大的可观测值；两个值都是包含的(左右都是开区间)。当 [生成区间](#_bin) 时，任何超出此域的值都将被忽略。

例如，要使用带有[线性比例尺 linear scale](../d3-scale/linear.md) `x` 的区间生成器，可以这样：

```js
const bin = d3.bin().domain(x.domain()).thresholds(x.ticks(20));
```

然后，您可以像这样从数字数组计算出区间：

```js
const bins = bin(numbers);
```

如果使用默认的 [extent](./summarize.md#extent) 域，并且 [阈值 thresholds](#bin_thresholds) 是指定为计数（而不是显式值），则计算出的域将被调整为使所有区间具有统一的宽度。

请注意，域访问器在实例化的值数组上调用，而不是在输入数据数组上调用。

## *bin*.thresholds(*count*) {#bin_thresholds}

```js
const bin = d3.bin().thresholds([0, 0.5, 1]);
```

If *thresholds* is specified, sets the [threshold generator](#bin_thresholds) to the specified function or array and returns this bin generator.

```js
bin.thresholds() // () => [0, 0.5, 1]
```

If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](#thresholdSturges). (Thus by default, the values to be binned must be numbers!) Thresholds are defined as an array of values [*x0*, *x1*, …]. Any value less than *x0* will be placed in the first bin; any value greater than or equal to *x0* but less than *x1* will be placed in the second bin; and so on. Thus, the [generated bins](#_bin) will have *thresholds*.length + 1 bins.

Any threshold values outside the [domain](#bin_domain) are ignored. The first *bin*.x0 is always equal to the minimum domain value, and the last *bin*.x1 is always equal to the maximum domain value.

```js
const bin = d3.bin().thresholds(20);
```

If a *count* is specified instead of an array of *thresholds*, then the [domain](#bin_domain) will be uniformly divided into approximately *count* bins; see [ticks](./ticks.md).

```js
const bin = d3.bin().thresholds((values) => [d3.median(values)]);
```

You may also implement your own threshold generator taking three arguments: the array of input [*values*](#bin_value) derived from the data, and the [domain](#bin_domain) represented as *min* and *max*. The generator may then return either the array of numeric thresholds or the *count* of bins; in the latter case the domain is divided uniformly into approximately *count* bins; see [ticks](./ticks.md#ticks). For instance, you might want to use time ticks when binning time-series data; see [example](https://observablehq.com/@d3/d3-bin-time-thresholds).

## thresholdFreedmanDiaconis(*values*, *min*, *max*) {#thresholdFreedmanDiaconis}

```js
const bin = d3.bin().thresholds(d3.thresholdFreedmanDiaconis);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/freedmanDiaconis.js) · Returns the number of bins according to the [Freedman–Diaconis rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

## thresholdScott(*values*, *min*, *max*) {#thresholdScott}

```js
const bin = d3.bin().thresholds(d3.thresholdScott);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/scott.js) · Returns the number of bins according to [Scott’s normal reference rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

## thresholdSturges(*values*, *min*, *max*) {#thresholdSturges}

```js
const bin = d3.bin().thresholds(d3.thresholdSturges);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/sturges.js) · Returns the number of bins according to [Sturges’ formula](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.
