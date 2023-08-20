<template>
  <div :class="`vp-doc ${$style.promo}`">
    <h1 :class="$style.hed">
      <slot>{{ promoTitle[site.lang] }}</slot>
    </h1>
    <div :class="$style.subhed">
      <slot>{{ promoSubTitle[site.lang] }}</slot>
    </div>
    <div :class="$style.columns">
      <div
        :class="$style.column"
        v-for="(item, index) in promoColumns"
        :key="index"
      >
        <span :class="$style['column-header']">
          <slot>{{ item[site.lang].header }}</slot>
        </span>
        <span :class="$style['column-body']">
          <slot>{{ item[site.lang].body }}</slot>
        </span>
      </div>
    </div>
    <a
      :class="$style.button"
      href="https://observablehq.com?utm_source=d3js-org&utm_medium=promo&utm_campaign=try-observable"
      target="_blank"
    >
      <slot>{{ promoButton[site.lang] }}</slot>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
const { site } = useData();
const promoTitle = {
  "en-US": "Build your best work with D3 on Observable",
  "zh-CN": "在 Observable 上使用 D3 构建你的最佳作品",
};
const promoSubTitle = {
  "en-US":
    "The only data workflow platform capable of supporting the full power of D3",
  "zh-CN": "唯一能够支持 D3 全部功能的数据工作流平台",
};

const promoColumns = [
  {
    "en-US": {
      header: "Connect to your data instantly",
      body: "Pull live data from the cloud, files, and databases into one secure place — without installing anything, ever.",
    },
    "zh-CN": {
      header: "立即连接您的数据",
      body: "从云端、文件和数据库实时提取数据到一个安全的地方，无需安装任何东西。",
    },
  },
  {
    "en-US": {
      header: "Code faster than you thought possible",
      body: "Get everything you need and none of what you don’t with lightweight automatic versioning, instant sharing, and real-time multiplayer editing.",
    },
    "zh-CN": {
      header: "比您想象中更快地编写代码",
      body: "通过轻量级的自动版本控制、即时共享和实时多人编辑，获得您所需的一切，而不会有多余的东西。",
    },
  },
  {
    "en-US": {
      header: "Accelerate your team’s analysis",
      body: "Create a home for your team’s data analysis where you can spin up charts, maps, and data apps to explore, analyze, and iterate on together.",
    },
    "zh-CN": {
      header: "加快团队的分析速度",
      body: "创建一个团队数据分析的空间，您可以在其中创建图表、地图和数据应用，一起探索、分析和迭代。",
    },
  },
];

const promoButton = {
  "en-US": "Build with D3 on Observable →",
  "zh-CN": "在 Observable 上使用 D3 →",
};
</script>

<style scoped>
h1 {
  border-top: none;
}
</style>

<style module>
.promo {
  margin: 96px auto 0 auto;
  max-width: 1152px;
  padding: 0 24px;
  text-align: center;
}

.column {
  margin: 2rem 0;
}

.column-header {
  font-weight: 600;
}

.hed,
.subhed,
.column {
  padding: 0 24px;
}

.hed,
.subhed,
.column-header {
  text-wrap: balance;
}

.subhed {
  margin-top: 1rem;
  opacity: 0.7;
}

a.button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  background-color: var(--vp-c-neutral);
  color: var(--vp-c-neutral-inverse);
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  margin: 0 24px;
}

a.button:hover {
  text-decoration: none;
}

@media (min-width: 640px) {
  .promo {
    padding: 0 48px;
  }
}

@media (min-width: 768px) {
  .promo {
    margin-top: 128px;
  }
}

@media (max-width: 959px) {
  .promo {
    max-width: 768px;
  }
  .column-header::after {
    content: " · ";
  }
  .columns {
    text-align: initial;
  }
}

@media (min-width: 960px) {
  .promo {
    padding: 0 64px;
  }
  .subhed {
    margin-top: 0.5rem;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .column {
    margin: 4rem 0;
  }
  .column-header {
    margin-bottom: 0.5rem;
  }
  .column-header,
  .column-body {
    display: block;
  }
}
</style>
