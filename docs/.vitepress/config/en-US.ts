import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "D3 by Observable",
  description: "The JavaScript library for bespoke data visualization",
  cleanUrls: true,
  sitemap: {
    hostname: "https://d3js.org",
  },
  head: [
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
  ],
  markdown: {
    externalLinks: {
      rel: "external",
    },
  },
  vite: {
    resolve: {
      alias: [{ find: "d3", replacement: path.resolve("./dist/d3.mjs") }],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    siteTitle: "",
    nav: [
      { text: "Home", link: "/en-US/" },
      {
        text: "Examples",
        link: "https://observablehq.com/@d3/gallery?utm_source=d3js-org&utm_medium=nav&utm_campaign=try-observable",
        rel: "external",
      },
      { text: "Community", link: "/en-US/community" },
      {
        text: "Plot",
        link: "https://observablehq.com/plot?utm_source=d3js-org&utm_medium=nav&utm_campaign=try-observable",
        rel: "external",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "What is D3?", link: "/en-US/what-is-d3" },
          { text: "Getting started", link: "/en-US/getting-started" },
        ],
      },
      {
        text: "Visualization",
        items: [
          { text: "d3-axis", link: "/en-US/d3-axis" },
          {
            text: "d3-chord",
            link: "/en-US/d3-chord",
            collapsed: true,
            items: [
              { text: "Chords", link: "/en-US/d3-chord/chord" },
              { text: "Ribbons", link: "/en-US/d3-chord/ribbon" },
            ],
          },
          { text: "d3-color", link: "/en-US/d3-color" },
          {
            text: "d3-interpolate",
            link: "/en-US/d3-interpolate",
            collapsed: true,
            items: [
              {
                text: "Value interpolation",
                link: "/en-US/d3-interpolate/value",
              },
              {
                text: "Color interpolation",
                link: "/en-US/d3-interpolate/color",
              },
              {
                text: "Transform interpolation",
                link: "/en-US/d3-interpolate/transform",
              },
              {
                text: "Zoom interpolation",
                link: "/en-US/d3-interpolate/zoom",
              },
            ],
          },
          {
            text: "d3-contour",
            link: "/en-US/d3-contour",
            collapsed: true,
            items: [
              { text: "Contour polygons", link: "/en-US/d3-contour/contour" },
              { text: "Density estimation", link: "/en-US/d3-contour/density" },
            ],
          },
          {
            text: "d3-delaunay",
            link: "/en-US/d3-delaunay",
            collapsed: true,
            items: [
              {
                text: "Delaunay triangulations",
                link: "/en-US/d3-delaunay/delaunay",
              },
              { text: "Voronoi diagrams", link: "/en-US/d3-delaunay/voronoi" },
            ],
          },
          {
            text: "d3-force",
            link: "/en-US/d3-force",
            collapsed: true,
            items: [
              { text: "Force simulations", link: "/en-US/d3-force/simulation" },
              { text: "Center force", link: "/en-US/d3-force/center" },
              { text: "Collide force", link: "/en-US/d3-force/collide" },
              { text: "Link force", link: "/en-US/d3-force/link" },
              { text: "Many-body force", link: "/en-US/d3-force/many-body" },
              { text: "Position forces", link: "/en-US/d3-force/position" },
            ],
          },
          {
            text: "d3-geo",
            link: "/en-US/d3-geo",
            collapsed: true,
            items: [
              { text: "Paths", link: "/en-US/d3-geo/path" },
              {
                text: "Projections",
                link: "/en-US/d3-geo/projection",
                collapsed: true,
                items: [
                  {
                    text: "Azimuthal projections",
                    link: "/en-US/d3-geo/azimuthal",
                  },
                  { text: "Conic projections", link: "/en-US/d3-geo/conic" },
                  {
                    text: "Cylindrical projections",
                    link: "/en-US/d3-geo/cylindrical",
                  },
                ],
              },
              { text: "Streams", link: "/en-US/d3-geo/stream" },
              { text: "Spherical shapes", link: "/en-US/d3-geo/shape" },
              { text: "Spherical math", link: "/en-US/d3-geo/math" },
            ],
          },
          {
            text: "d3-hierarchy",
            link: "/en-US/d3-hierarchy",
            collapsed: true,
            items: [
              { text: "Hierarchies", link: "/en-US/d3-hierarchy/hierarchy" },
              { text: "Stratify", link: "/en-US/d3-hierarchy/stratify" },
              { text: "Tree", link: "/en-US/d3-hierarchy/tree" },
              { text: "Cluster", link: "/en-US/d3-hierarchy/cluster" },
              { text: "Partition", link: "/en-US/d3-hierarchy/partition" },
              { text: "Pack", link: "/en-US/d3-hierarchy/pack" },
              { text: "Treemap", link: "/en-US/d3-hierarchy/treemap" },
            ],
          },
          { text: "d3-path", link: "/en-US/d3-path" },
          { text: "d3-polygon", link: "/en-US/d3-polygon" },
          { text: "d3-quadtree", link: "/en-US/d3-quadtree" },
          {
            text: "d3-scale",
            link: "/en-US/d3-scale",
            collapsed: true,
            items: [
              { text: "Linear scales", link: "/en-US/d3-scale/linear" },
              { text: "Time scales", link: "/en-US/d3-scale/time" },
              { text: "Pow scales", link: "/en-US/d3-scale/pow" },
              { text: "Log scales", link: "/en-US/d3-scale/log" },
              { text: "Symlog scales", link: "/en-US/d3-scale/symlog" },
              { text: "Ordinal scales", link: "/en-US/d3-scale/ordinal" },
              { text: "Band scales", link: "/en-US/d3-scale/band" },
              { text: "Point scales", link: "/en-US/d3-scale/point" },
              { text: "Sequential scales", link: "/en-US/d3-scale/sequential" },
              { text: "Diverging scales", link: "/en-US/d3-scale/diverging" },
              { text: "Quantile scales", link: "/en-US/d3-scale/quantile" },
              { text: "Quantize scales", link: "/en-US/d3-scale/quantize" },
              { text: "Threshold scales", link: "/en-US/d3-scale/threshold" },
            ],
          },
          {
            text: "d3-scale-chromatic",
            link: "/en-US/d3-scale-chromatic",
            collapsed: true,
            items: [
              {
                text: "Categorical schemes",
                link: "/en-US/d3-scale-chromatic/categorical",
              },
              {
                text: "Cyclical schemes",
                link: "/en-US/d3-scale-chromatic/cyclical",
              },
              {
                text: "Diverging schemes",
                link: "/en-US/d3-scale-chromatic/diverging",
              },
              {
                text: "Sequential schemes",
                link: "/en-US/d3-scale-chromatic/sequential",
              },
            ],
          },
          {
            text: "d3-selection",
            link: "/en-US/d3-selection",
            collapsed: true,
            items: [
              {
                text: "Selecting elements",
                link: "/en-US/d3-selection/selecting",
              },
              {
                text: "Modifying elements",
                link: "/en-US/d3-selection/modifying",
              },
              { text: "Joining data", link: "/en-US/d3-selection/joining" },
              { text: "Handling events", link: "/en-US/d3-selection/events" },
              {
                text: "Control flow",
                link: "/en-US/d3-selection/control-flow",
              },
              { text: "Local variables", link: "/en-US/d3-selection/locals" },
              { text: "Namespaces", link: "/en-US/d3-selection/namespaces" },
            ],
          },
          {
            text: "d3-shape",
            link: "/en-US/d3-shape",
            collapsed: true,
            items: [
              { text: "Arcs", link: "/en-US/d3-shape/arc" },
              { text: "Areas", link: "/en-US/d3-shape/area" },
              { text: "Curves", link: "/en-US/d3-shape/curve" },
              { text: "Lines", link: "/en-US/d3-shape/line" },
              { text: "Links", link: "/en-US/d3-shape/link" },
              { text: "Pies", link: "/en-US/d3-shape/pie" },
              { text: "Stacks", link: "/en-US/d3-shape/stack" },
              { text: "Symbols", link: "/en-US/d3-shape/symbol" },
              { text: "Radial areas", link: "/en-US/d3-shape/radial-area" },
              { text: "Radial lines", link: "/en-US/d3-shape/radial-line" },
              { text: "Radial links", link: "/en-US/d3-shape/radial-link" },
            ],
          },
        ],
      },
      {
        text: "Animation",
        items: [
          { text: "d3-ease", link: "/en-US/d3-ease" },
          { text: "d3-timer", link: "/en-US/d3-timer" },
          {
            text: "d3-transition",
            link: "/en-US/d3-transition",
            collapsed: true,
            items: [
              {
                text: "Selecting elements",
                link: "/en-US/d3-transition/selecting",
              },
              {
                text: "Modifying elements",
                link: "/en-US/d3-transition/modifying",
              },
              { text: "Timing", link: "/en-US/d3-transition/timing" },
              {
                text: "Control flow",
                link: "/en-US/d3-transition/control-flow",
              },
            ],
          },
        ],
      },
      {
        text: "Interaction",
        items: [
          { text: "d3-brush", link: "/en-US/d3-brush" },
          { text: "d3-dispatch", link: "/en-US/d3-dispatch" },
          { text: "d3-drag", link: "/en-US/d3-drag" },
          { text: "d3-zoom", link: "/en-US/d3-zoom" },
        ],
      },
      {
        text: "Data",
        items: [
          {
            text: "d3-array",
            link: "/en-US/d3-array",
            collapsed: true,
            items: [
              { text: "Adding numbers", link: "/en-US/d3-array/add" },
              { text: "Binning data", link: "/en-US/d3-array/bin" },
              { text: "Bisecting data", link: "/en-US/d3-array/bisect" },
              { text: "Blurring data", link: "/en-US/d3-array/blur" },
              { text: "Grouping data", link: "/en-US/d3-array/group" },
              { text: "Interning values", link: "/en-US/d3-array/intern" },
              { text: "Set operations", link: "/en-US/d3-array/sets" },
              { text: "Sorting data", link: "/en-US/d3-array/sort" },
              { text: "Summarizing data", link: "/en-US/d3-array/summarize" },
              { text: "Ticks", link: "/en-US/d3-array/ticks" },
              { text: "Transforming data", link: "/en-US/d3-array/transform" },
            ],
          },
          { text: "d3-dsv", link: "/en-US/d3-dsv" },
          { text: "d3-fetch", link: "/en-US/d3-fetch" },
          { text: "d3-format", link: "/en-US/d3-format" },
          { text: "d3-random", link: "/en-US/d3-random" },
          { text: "d3-time", link: "/en-US/d3-time" },
          { text: "d3-time-format", link: "/en-US/d3-time-format" },
        ],
      },
      { text: "API index", link: "/en-US/api" },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/d3" },
      { icon: "twitter", link: "https://twitter.com/observablehq" },
      { icon: "mastodon", link: "https://vis.social/@observablehq" },
      {
        icon: "slack",
        link: "https://join.slack.com/t/observable-community/shared_invite/zt-1x7gs4fck-UHhEFxUXKHVE8Qt3XmJCig",
      },
      { icon: "linkedin", link: "https://www.linkedin.com/company/observable" },
      { icon: "youtube", link: "https://www.youtube.com/c/Observablehq" },
    ],
  },
});
