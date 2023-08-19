<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData} from "vitepress";
import {computed} from "vue";
import LogoDiagram from "./components/LogoDiagram.vue";
import PlotRender from "./components/PlotRender.js";

const {site: {value: {themeConfig: {sidebar}}}} = useData();

const paths = computed(() => {
  const paths = [];
  (function visit(node, path) {
    paths.push({path, link: node.link && `.${node.link}`});
    if (node.items) {
      for (const item of node.items) {
        visit(item, (path === "/" ? path : path + "/") + item.text);
      }
    }
  })({items: sidebar}, "/D3");
  return paths;
});

// https://github.com/observablehq/plot/issues/1703
function computeTreeWidth(paths) {
  const root = d3.tree().nodeSize([1, 1])(d3.stratify().path((d) => d.path)(paths));
  const [x1, x2] = d3.extent(root, (d) => d.x);
  return x2 - x1;
}

</script>

# D3 是什么 ？

<LogoDiagram />

**D3** (或者 **D3.js**)是一个免费、开源的用于数据可视化的 JavaScript 库。它提供了基于 Web 标准的底层方法，为编写动态、数据驱动的图形提供了无与伦比的灵活性。十多年来， D3 作为基础工具库为其他更高级的图表库和可视化项目提供了支持和基础，并且孕育了一个充满活力的全球数据从业者参与的社区。

Information is Beautiful [2022 Test of Time Award](https://nightingaledvs.com/information-is-beautiful-awards-test-of-time/) 评价道：“D3将领域推向了前所未有的增长、多样性和创造力”，“改变了数百万数据可视化在新闻编辑室、网站和个人作品集中的创建方式”。 The IEEE VIS [2021 Test of Time Award](https://ieeevis.org/year/2021/info/awards/test-of-time-awards) 指出：“通过创建一个引人入胜且易于Web开发人员使用的框架来制作交互式可视化，作者无疑有助于将数据可视化带入主流。[D3] 是这次会议特别是整个领域成功的重要贡献。”

D3 是由 Mike Bostock 于 2011 年创建的。Mike 与 Jeff Heer 和 Vadim Ogievetsky 在斯坦福大学共同撰写了[D3 论文](http://vis.stanford.edu/papers/d3)。Jason Davies 在 2011 年至 2013 年期间对 D3 做出了重要贡献，尤其是 D3 的地理投影系统。自 2016 年以来，Philippe Rivière 一直是 D3 及其文档的主要贡献者。多年来，无数热心的个人通过分享代码和想法，教学和解答问题，以及组织人们共同推进可视化实践，为 D3 做出了贡献。目前，Mike 和 Philippe 在[Observable](https://observablehq.com) 维护着 D3 和 [Observable Plot](https://observablehq.com/plot)。

## D3 是一个底层工具箱。

D3 并不是传统意义上的图表库。它没有“图表”这个概念。当你使用 D3 对数据进行可视化时，你需要组合各种基本元素。

要创建一个堆叠区域图 [stacked area chart](https://observablehq.com/@d3/stacked-area-chart/2)，你可能会使用：

- CSV 解析器 [CSV parser](./d3-dsv.md) 来加载数据，
- 时间比例尺 [time scale](./d3-scale/time.md) 用于水平位置 (*x*)，
- 线性比例尺 [linear scale](./d3-scale/linear.md) 用于垂直位置 (*y*)，
- 有序比例尺 [ordinal scale](./d3-scale/ordinal.md) 和分类方案 [categorical scheme](./d3-scale-chromatic/categorical.md) 用于设置颜色，
- 堆叠布局 [stack layout](./d3-shape/stack.md) 来排列数值，
- 带有线性曲线 [linear curve](./d3-shape/curve.md)  的区域形状 [area shape](./d3-shape/area.md) 用于生成 SVG 路径数据，
- 坐标轴 [axes](./d3-axis.md)  用于记录位置编码，
- 选择集 [selections](./d3-selection.md) 用于创建 SVG 元素。

听起来很多吧？但深呼吸一下 — 你不必一下子学会所有的东西。每个组件都可以独立使用，因此你可以在将它们组合在一起之前，逐个学习它们。D3 不是一个单一的整体，而是一个由30个独立的库（或“模块”）组成的套件。我们将这些模块捆绑在一起是为了方便，而不是必需，这样你在设计迭代时可以方便地使用你的工具。

D3 工具箱中有哪些内容？我们建议探索文档和示例，以了解对你来说什么是相关的。

<PlotRender :options='{
  axis: null,
  height: computeTreeWidth(paths) * 12,
  marginTop: 4,
  marginBottom: 4,
  marginRight: 120,
  marks: [
    Plot.tree(paths, {path: "path", textStroke: "var(--vp-c-bg)", channels: {href: {value: "link", filter: null}}, treeSort: null})
  ]
}' />

:::tip 提示
除非你需要使用 D3 的底层方法定制可视化，我们推荐你使用我们的高级库：[Observable Plot](https://observablehq.com/plot)。在 D3 中，制作一个直方图可能需要50行代码，而在 Plot 中只需要一行！Plot 的简洁而表达丰富的 API 让你更专注于分析和可视化数据，而不是网页开发。你甚至可以将 Plot 和 D3 结合起来，兼具两者的优势。
:::

## D3 是灵活的

因为 D3 没有总体的“图表”抽象，即使是一个基本的图表可能也需要几十行代码。好处是，所有的组件都摆在你面前，你对发生的一切有完全的控制权。你可以根据自己的需求来定制可视化效果，实现你想要的准确结果。D3 没有默认的数据呈现方式 — 只有你自己编写的代码（或从示例中复制的代码）。

把 D3 视为“自己动手”，而不是作为高级图表库的替代品。如果你对其他工具不满意，并且想要使用 SVG、Canvas（甚至 WebGL）制作自己的图表，不妨查看一下 D3 的工具箱！几乎肯定在这里会有一些东西能够帮助你构建出你梦想中的图表，而不会限制你的创意。

## D3 与 Web 协同工作

D3 并不引入新的图形表示，而是直接与 Web 标准（如 SVG 和 Canvas）一起使用。

“D3” 的名称是数据驱动文档 *data-driven documents* 的缩写，其中的文档 *documents* 指的是表示网页内容的文档对象模型 [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) 标准。虽然 D3 的一些模块（例如选择 [selections](./d3-selection.md) 和过渡 [transitions](./d3-selection.md)）涉及到 DOM，但其他模块（包括比例尺 [scales](./d3-scale.md) 和形状 [shapes](./d3-shape.md)）只对数据进行操作。D3 也可以与 Web 框架（如 React、Vue 和 Svelte）配合使用；请查看 [入门指南](./getting-started.md) 以获取建议。

D3 对 Web 标准的支持带来了许多优势。例如，你可以使用外部样式表来更改图表的外观（甚至响应媒体查询，例如用于响应式图表或暗黑模式）；你可以使用调试器和元素检查器来审查你的代码正在做什么；而 D3 的同步、命令式评估模型 — 调用 [*selection*.attr](./d3-selection/modifying.md#selection_attr) 立即改变 DOM — 可以使其比具有复杂异步运行时的框架更易于调试。

## D3 用于定制化可视化

D3 使得一切成为可能，但并不一定易于实现；即使是应该容易的简单任务，通常也并非如此。用阿曼达·考克斯（Amanda Cox）的话来说：“如果你认为为一个条形图编写一百行代码是完全正常的，那就使用 D3。”

如果你需要为定制化的可视化获取最大表现力，那么你应该考虑使用 D3。D3 对于媒体机构（如 *纽约时报* 或 *The Pudding* ）是有意义的，其中一个图形可能会被百万读者看到，一个编辑团队可以共同努力推动视觉传达领域的技术发展。

另一方面，如果你只是想快速创建一个私有仪表盘或进行一次性分析，那么使用 D3 就有些过头了。不要被华而不实的示例所迷惑：许多示例实际上需要付出巨大的努力才能实现！如果你受到时间限制（谁不是呢？），使用 [Observable Plot](https://observablehq.com/plot) 很可能会产生更好的可视化或分析结果。

## D3 用于动态可视化

D3 最独特的概念是数据连接 [data join](./d3-selection/joining.md)：给定一组数据和一组 DOM 元素，数据连接允许你对进入 *entering*,更新 *updating*和退出 *exiting* 元素应用不同的操作。如果你只是创建静态图表（不具有动画效果或不响应用户输入的图表），你可能会觉得这个概念不直观，甚至有些奇怪，因为它并不是必需的。

数据连接的存在是为了在数据发生变化时精确控制发生的情况，并响应地更新显示。这种直接控制允许非常高性能的更新 —— 你只会触及需要更改的元素和属性，而不需要对 DOM 进行差异比较 —— 并在状态之间平滑地进行动画过渡。D3 在动态、交互式可视化方面表现出色。（试试在 2012 年的通往白宫的512条路径中  [“512 Paths to the White House”](https://archive.nytimes.com/www.nytimes.com/interactive/2012/11/02/us/politics/paths-to-the-white-house.html) 选择状态切换，按下选项键进行尝试。真的很有趣。）
