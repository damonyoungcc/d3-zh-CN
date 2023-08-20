<script setup>

import ExampleBlankChart from "./components/ExampleBlankChart.vue";

</script>

# 快速开始

D3 可以在任何 JavaScript 环境中运行。

## 在线尝试 D3

在 [Observable](https://observablehq.com) 上开始并获取关于 D3 的帮助是最快速的方式！D3 在 Observable 的笔记本中作为标准库的一部分默认可用。要使用 D3 创建某个内容，只需从单元格返回生成的 DOM 元素。以下是一个空白图表，帮助你入门：

<ExampleBlankChart />

```js
{
  // 声明图表的尺寸和边距。
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // 声明 x 轴（水平位置）比例尺。
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

  // 声明 y 轴（垂直位置）比例尺。
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

  // 创建 SVG 容器。
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  // 添加 x 轴。
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

  // 添加 y 轴。
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

  // 返回 SVG 元素。
  return svg.node();
}
```

作为更完整的示例，您可以尝试以下其中一个起始模板：

* [区域图 Area chart](https://observablehq.com/@d3/area-chart/2?intent=fork)
* [条形图 Bar chart](https://observablehq.com/@d3/bar-chart/2?intent=fork)
* [环形图 Donut chart](https://observablehq.com/@d3/donut-chart/2?intent=fork)
* [直方图 Histogram](https://observablehq.com/@d3/histogram/2?intent=fork)
* [折线图 Line chart](https://observablehq.com/@d3/line-chart/2?intent=fork)

您还可以在 [D3 gallery](https://observablehq.com/@d3/gallery) 图库中查看更多可 fork 的示例。

在 Observable 中，当您点击 **+** 来添加一个单元格时，会包含一些 D3 片段（在单元格菜单打开时键入“d3”以进行过滤），以及方便的 [示例数据集 sample datasets](https://observablehq.com/@observablehq/sample-datasets) ，可以尝试D3的功能。或者上传 CSV 或 JSON 文件开始处理您的数据。您还可以 fork 我们已发布的 [数百个笔记本  hundreds of notebooks](https://observablehq.com/@d3?tab=notebooks) 中的任何一个，以获取一个启动点。

Observable对于公开使用是免费的。注册 [Pro 账户](https://observablehq.com/pricing) 以连接到私有数据库、在私有笔记本上进行协作等。

## 在 HTML 中使用 D3

在 HTML 中，您可以从诸如 jsDelivr 之类的 CDN 加载 D3，也可以进行本地下载。我们推荐使用 CDN 托管的 ES 模块捆绑包。但对于那些需要的人，我们还提供了一个 UMD 捆绑包，在加载为纯脚本时会导出 d3 全局对象。

:::code-group
```html [ESM + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script type="module">

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// 声明图表的尺寸和边距。
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// 声明 x（水平位置）比例尺。
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// 声明 y（垂直位置）比例尺。
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// 创建 SVG 容器。
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// 添加 x 轴。
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// 添加 y 轴。
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// 添加 SVG 元素。
container.append(svg.node());

</script>
```

```html [UMD + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script type="module">

// 声明图表的尺寸和边距。
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// 声明 x（水平位置）比例尺。
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// 声明 y（垂直位置）比例尺。
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// 创建 SVG 容器。
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// 添加 x 轴。
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// 添加 y 轴。
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// 添加 SVG 元素。
container.append(svg.node());

</script>
```

```html [UMD + local]
<!DOCTYPE html>
<div id="container"></div>
<script src="d3.js"></script>
<script type="module">

// 声明图表的尺寸和边距。
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// 声明 x（水平位置）比例尺。
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// 声明 y（垂直位置）比例尺。
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// 创建 SVG 容器。
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// 添加 x 轴。
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// 添加 y 轴。
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// 添加 SVG 元素。
container.append(svg.node());

</script>
```
:::

如果你更喜欢在本地（或离线）运行 D3，你可以在这里下载 D3 的 UMD 包：

- <a href="./d3.v7.js" download>d3.v7.js</a>
- <a href="./d3.v7.min.js" download>d3.v7.min.js</a>

然后，像在上面的 **UMD + 本地** 标签中所示，创建一个 `index.html` 文件。在调试时使用非压缩的包，而在生产环境中使用压缩的包以获得更快的性能。

## 从 npm 安装

如果你正在使用 Node 开发 web 应用程序，你可以通过 yarn、npm、pnpm 或其他你喜欢的包管理器来安装 D3。

:::code-group

```bash [yarn]
yarn add d3
```

```bash [npm]
npm install d3
```

```bash [pnpm]
pnpm add d3
```

:::

然后你可以在你的应用程序中加载 D3，如下所示：

```js
import * as d3 from "d3";
```

如果你愿意，你也可以导入特定的符号：

```js
import {select, selectAll} from "d3";
```

或者你可以安装并从 D3 的子模块中导入：

```js
import {mean, median} from "d3-array";
```

TypeScript 声明可以通过 DefinitelyTyped 获取。

## D3 in React

大多数 D3 模块（包括 [d3-scale](./d3-scale.md)、[d3-array](./d3-array.md)、[d3-interpolate](./d3-interpolate.md) 和 [d3-format](./d3-format.md)）不与 DOM 交互，因此在 React 中使用它们时没有任何区别。您可以在 JSX 中使用它们进行纯声明式的可视化，例如下面的线图。

:::code-group
```jsx [LinePlot.jsx]
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
```
:::

<p style="margin-top: -1em;"><a href="https://codesandbox.io/s/d3-react-ssr-5g1bm0?file=/src/LinePlot.jsx" style="font-size: smaller;" target="_blank">Sandbox ↗︎</a></p>

D3模块中对 [选择集 selections](./d3-selection/selecting.md) 进行操作的部分（包括 [d3-selection](./d3-selection.md)、 [d3-transition](./d3-transition.md) 和 [d3-axis](./d3-axis.md)）会操作 DOM，这与 React 的虚拟 DOM 发生冲突。在这些情况下，您可以将 ref 附加到元素并在 useEffect 钩子中将其传递给 D3。

:::code-group
```jsx [LinePlot.jsx]
import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
```
:::

<p style="margin-top: -1em;"><a href="https://codesandbox.io/s/d3-react-useeffect-5lp0x6?file=/src/LinePlot.jsx" style="font-size: smaller;" target="_blank">Sandbox ↗︎</a></p>

要了解在 React 中使用 D3 的更多指导，请查看 [Amelia Wattenberger’s post](https://2019.wattenberger.com/blog/react-and-d3) 的文章。

## D3 in Svelte

与 [with React](#d3-in-react) 一样，您可以完全使用 Svelte 进行渲染，仅使用不操作 DOM 的 D3 模块。以下是一个使用 [d3-shape](./d3-shape.md) 和 [d3-scale](./d3-scale-chromatic.md) 的数字数组的折线图示例。

:::code-group
```svelte [LinePlot.svelte]
<script>
  import * as d3 from 'd3';

  export let data;
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 20;
  export let marginLeft = 20;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
</script>
<svg width={width} height={height}>
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>
```
:::

<p style="margin-top: -1em;"><a href="https://svelte.dev/repl/ece91c0d8b204d5ea970dbbc0d6783aa?version=3.59.1" style="font-size: smaller;" target="_blank">REPL ↗︎</a></p>

Svelte 的响应式语句 (`$:`) 与 D3 的 [数据绑定 data joins](./d3-selection/joining.md) 很好地配合，可以实现高效的更新。在下面的示例中，我们使用它们来在数据变化时渲染动态的坐标轴。

:::code-group
```svelte [LinePlot.svelte]
<script>
  import * as d3 from 'd3';

  export let data;
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 30;
  export let marginLeft = 40;

  let gx;
  let gy;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
  $: d3.select(gy).call(d3.axisLeft(y));
  $: d3.select(gx).call(d3.axisBottom(x));
</script>
<svg width={width} height={height}>
  <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
  <g bind:this={gy} transform="translate({marginLeft},0)" />
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>
```
:::

<p style="margin-top: -1em;"><a href="https://svelte.dev/repl/ff3bf3c7ca454d53913c0c33af0c1250?version=3.59.1" style="font-size: smaller;" target="_blank">REPL ↗︎</a></p>
