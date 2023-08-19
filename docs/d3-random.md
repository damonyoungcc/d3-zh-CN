<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import PlotRender from "./components/PlotRender.js";

</script>

# 随机数 d3-random

从各种概率分布中生成随机数。对于带有种子的随机数生成，请参考[_random_.source](#random_source)和[randomLcg](#randomLcg)。

## randomUniform(_min_, _max_) {#randomUniform}

<PlotRender :options='{
  height: 120,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomUniform.source(d3.randomLcg(42))(6)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomUniform(6); // 生成的数 ≥0 and <6
```

[示例](https://observablehq.com/@d3/d3-random#uniform) · [源码](https://github.com/d3/d3-random/blob/main/src/uniform.js) · 返回一个用于生成符合[均匀概率分布](<https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)>)随机数的函数. 返回的随机数的最小值为 *min* （包含），最大值为 *max* （不包含）。 如果未指定 *min* ，则默认为 0；如果未指定 *max*，则默认为 1。

## randomInt(*min*, *max*) {#randomInt}

<PlotRender :options='{
  height: 120,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomInt.source(d3.randomLcg(42))(100)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomInt(100) // 生成的整数 ≥0 and <6
```

[示例](https://observablehq.com/@d3/d3-random#int) · [源码](https://github.com/d3/d3-random/blob/main/src/int.js) · 返回一个用于生成符合[均匀概率分布](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\))随机整数的函数。返回的随机整数最小值为 *min* (包含)，最大值为 *max - 1*  (包含)。如果未指定 min，则默认为 0。

## randomNormal(*mu*, *sigma*) {#randomNormal}

<PlotRender defer :options='{
  height: 240,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomNormal.source(d3.randomLcg(42))(0, 1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomNormal(0, 1) // 期望值为0 ， 标准差为1
```

[示例](https://observablehq.com/@d3/d3-random#normal) · [源码](https://github.com/d3/d3-random/blob/main/src/normal.js) · 返回一个用于生成符合[正态（高斯）分布](https://en.wikipedia.org/wiki/Normal_distribution)随机数的函数。生成的数的期望值为 *mu*，标准差为给定的 *sigma*。如果未指定 *mu* ，则默认为0；如果未指定 *sigma* ，则默认为1。


## randomLogNormal(*mu*, *sigma*) {#randomLogNormal}

<PlotRender defer :options='{
  height: 240,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 400}, d3.randomLogNormal.source(d3.randomLcg(36))(0, 1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomLogNormal(0, 1)
```

[示例](https://observablehq.com/@d3/d3-random#logNormal) · [源码](https://github.com/d3/d3-random/blob/main/src/logNormal.js) · 返回一个用于生成符合[对数正态分布](https://en.wikipedia.org/wiki/Log-normal_distribution)随机数的函数。生成的随机变量的自然对数的期望值为 *mu*，标准差为给定的 *sigma*。如果未指定 *mu*，则默认为0；如果未指定 *sigma*，则默认为1。

## randomBates(*n*) {#randomBates}

<PlotRender defer :options='{
  height: 180,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomBates.source(d3.randomLcg(36))(3)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBates(3) // generates numbers between 0 and 1
```

[示例](https://observablehq.com/@d3/d3-random#bates) · [源码](https://github.com/d3/d3-random/blob/main/src/bates.js) · 返回一个用于生成具有 *n* 个独立变量的[贝茨分布](https://en.wikipedia.org/wiki/Bates_distribution)的随机数的函数，对于分数 *n* 的情况，与 d3.randomIrwinHall 处理方式相同，而d3.randomBates(0)等同于d3.randomUniform()。

## randomIrwinHall(*n*) {#randomIrwinHall}

<PlotRender defer :options='{
  height: 180,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomIrwinHall.source(d3.randomLcg(36))(3)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomIrwinHall(3) // generates numbers between 0 and 3
```

[示例](https://observablehq.com/@d3/d3-random#irwinHall) · [源码](https://github.com/d3/d3-random/blob/main/src/irwinHall.js) · 返回一个用于生成符合[Irwin–Hall 分布](https://en.wikipedia.org/wiki/Irwin–Hall_distribution)随机数的函数，该分布具有 *n* 个独立变量。如果 *n* 的小数部分非零，则将其视为将 d3.randomUniform() 乘以该小数部分加到整数部分上。

## randomExponential(*lambda*) {#randomExponential}

<PlotRender defer :options='{
  height: 190,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 600}, d3.randomExponential.source(d3.randomLcg(36))(1 / 40)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomExponential(1 / 40)
```

[示例](https://observablehq.com/@d3/d3-random#exponential) · [源码](https://github.com/d3/d3-random/blob/main/src/exponential.js) · Returns a function for generating random numbers with an [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) with the rate *lambda*; equivalent to time between events in a [Poisson process](https://en.wikipedia.org/wiki/Poisson_point_process) with a mean of 1 / *lambda*. For example, randomExponential(1 / 40) generates random times between events where, on average, one event occurs every 40 units of time.

## randomPareto(*alpha*) {#randomPareto}

<PlotRender defer :options='{
  height: 210,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 400}, d3.randomPareto.source(d3.randomLcg(36))(6)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomPareto(6)
```

[Examples](https://observablehq.com/@d3/d3-random#pareto) · [Source](https://github.com/d3/d3-random/blob/main/src/pareto.js) · Returns a function for generating random numbers with a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution) with the shape *alpha*. The value *alpha* must be a positive value.

## randomBernoulli(*p*) {#randomBernoulli}

<PlotRender defer :options='{
  height: 120,
  nice: true,
  width: 60,
  x: {ticks: 1},
  marks: [
    Plot.dotX(Array.from({length: 34}, d3.randomBernoulli.source(d3.randomLcg(36))(0.5)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBernoulli(0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#bernoulli) · [Source](https://github.com/d3/d3-random/blob/main/src/bernoulli.js) · Returns a function for generating either 1 or 0 according to a [Bernoulli distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with 1 being returned with success probability *p* and 0 with failure probability *q* = 1 - *p*. The value *p* is in the range [0, 1].

## randomGeometric(*p*) {#randomGeometric}

<PlotRender defer :options='{
  height: 240,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 400}, d3.randomGeometric.source(d3.randomLcg(36))(0.1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomGeometric(0.1)
```

[Examples](https://observablehq.com/@d3/d3-random#geometric) · [Source](https://github.com/d3/d3-random/blob/main/src/geometric.js) · Returns a function for generating numbers with a [geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution) with success probability *p*. The value *p* is in the range [0, 1].

## randomBinomial(*n*, *p*) {#randomBinomial}

<PlotRender defer :options='{
  height: 240,
  x: {domain: [0, 40]},
  marks: [
    Plot.dotX(Array.from({length: 300}, d3.randomBinomial.source(d3.randomLcg(36))(40, 0.5)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBinomial(40, 0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#binomial) · [Source](https://github.com/d3/d3-random/blob/main/src/binomial.js) · Returns a function for generating random numbers with a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with *n* the number of trials and *p* the probability of success in each trial. The value *n* is greater or equal to 0, and the value *p* is in the range [0, 1].

## randomGamma(*k*, *theta*) {#randomGamma}

<PlotRender defer :options='{
  height: 200,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomGamma.source(d3.randomLcg(36))(2, 1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomGamma(2, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/the-gamma-and-beta-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/gamma.js) · Returns a function for generating random numbers with a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution) with *k* the shape parameter and *theta* the scale parameter. The value *k* must be a positive value; if *theta* is not specified, it defaults to 1.

## randomBeta(*alpha*, *beta*) {#randomBeta}

<PlotRender defer :options='{
  height: 160,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomBeta.source(d3.randomLcg(36))(3, 1.5)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBeta(3, 1.5)
```

[Examples](https://observablehq.com/@parcly-taxel/the-gamma-and-beta-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/beta.js) · Returns a function for generating random numbers with a [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) with *alpha* and *beta* shape parameters, which must both be positive.

## randomWeibull(*k*, *a*, *b*) {#randomWeibull}

<PlotRender defer :options='{
  height: 200,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomWeibull.source(d3.randomLcg(36))(10)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomWeibull(10)
```

[Examples](https://observablehq.com/@parcly-taxel/frechet-gumbel-weibull) · [Source](https://github.com/d3/d3-random/blob/main/src/weibull.js) · Returns a function for generating random numbers with one of the [generalized extreme value distributions](https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution), depending on *k*:

* If *k* is positive, the [Weibull distribution](https://en.wikipedia.org/wiki/Weibull_distribution) with shape parameter *k*
* If *k* is zero, the [Gumbel distribution](https://en.wikipedia.org/wiki/Gumbel_distribution)
* If *k* is negative, the [Fréchet distribution](https://en.wikipedia.org/wiki/Fréchet_distribution) with shape parameter −*k*

In all three cases, *a* is the location parameter and *b* is the scale parameter. If *a* is not specified, it defaults to 0; if *b* is not specified, it defaults to 1.

## randomCauchy(*a*, *b*) {#randomCauchy}

<PlotRender defer :options='{
  height: 200,
  nice: true,
  x: {domain: [-5, 5]},
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomCauchy.source(d3.randomLcg(36))(0, 1)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomCauchy(0, 1) // above, clipped to [-5, 5] because “fat tails”
```

[Examples](https://observablehq.com/@parcly-taxel/cauchy-and-logistic-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/cauchy.js) · Returns a function for generating random numbers with a [Cauchy distribution](https://en.wikipedia.org/wiki/Cauchy_distribution). *a* and *b* have the same meanings and default values as in d3.randomWeibull.

## randomLogistic(*a*, *b*) {#randomLogistic}

<PlotRender defer :options='{
  height: 300,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomLogistic.source(d3.randomLcg(36))(0, 1)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomLogistic(0, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/cauchy-and-logistic-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/logistic.js) · Returns a function for generating random numbers with a [logistic distribution](https://en.wikipedia.org/wiki/Logistic_distribution). *a* and *b* have the same meanings and default values as in d3.randomWeibull.

## randomPoisson(*lambda*) {#randomPoisson}

<PlotRender defer :options='{
  height: 150,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomPoisson.source(d3.randomLcg(36))(400)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomPoisson(400)
```

[Examples](https://observablehq.com/@parcly-taxel/the-poisson-distribution) · [Source](https://github.com/d3/d3-random/blob/main/src/poisson.js) · Returns a function for generating random numbers with a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution) with mean *lambda*.

## *random*.source(*source*) {#random_source}

```js
const seed = 0.44871573888282423; // any number in [0, 1)
const random = d3.randomNormal.source(d3.randomLcg(seed))(0, 1);
random(); // -0.6253955998897069
```

[Examples](https://observablehq.com/@d3/random-source) · Returns the same type of function for generating random numbers but where the given random number generator *source* is used as the source of randomness instead of Math.random. The given random number generator must implement the same interface as Math.random and only return values in the range [0, 1). This is useful when a seeded random number generator is preferable to Math.random.

## randomLcg(*seed*) {#randomLcg}

<PlotRender defer :options='{
  height: 120,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomLcg(36)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomLcg(42)
```

[Examples](https://observablehq.com/@d3/d3-randomlcg) · [Source](https://github.com/d3/d3-random/blob/main/src/lcg.js) · Returns a [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator); this function can be called repeatedly to obtain pseudorandom values well-distributed on the interval [0,1) and with a long period (up to 1 billion numbers), similar to Math.random. A *seed* can be specified as a real number in the interval [0,1) or as any integer. In the latter case, only the lower 32 bits are considered. Two generators instanced with the same seed generate the same sequence, allowing to create reproducible pseudo-random experiments. If the *seed* is not specified, one is chosen using Math.random.
