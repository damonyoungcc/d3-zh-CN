# 数值求和运算 Adding numbers

以完全的精度进行浮点数值求和运算。

## new Adder() {#Adder}

```js
const adder = new d3.Adder();
```

[示例](https://observablehq.com/@d3/d3-fsum) · [源码](https://github.com/d3/d3-array/blob/main/src/fsum.js) · 创建一个初始值为 0 的加法器。

## *adder*.add(*number*) {#adder_add}

```js
adder.add(42)
adder.add(42).add(42)  // 因为返回它自己，因此可以链式调用
```

将指定的数字加到加法器的当前值上，并返回加法器。

## *adder*.valueOf() {#adder_valueOf}

```js
adder.valueOf() // 42
+adder // 42
Number(adder) // 42
```

返回加法器当前值的 IEEE 754 双精度表示。在使用简写符号`+adder`或将其强制转换为数字`Number(adder)`时最有用。

## fsum(*values*, *accessor*) {#fsum}

```js
d3.fsum([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) // 1
```

[示例](https://observablehq.com/@d3/d3-fsum) · [源码](https://github.com/d3/d3-array/blob/main/src/fsum.js) · 返回给定*值* 的完全精度求和。虽然速度较慢，但 d3.fsum 可以替代 [d3.sum](./summarize.md#sum)，适用于需要更高精度的场合。

```js

const penguins = [
  {
    body_mass_g: 1,
  },
  {
    body_mass_g: 2,
  },
  {
    body_mass_g: 1436997,
  },
];

d3.fsum(penguins, (d) => d.body_mass_g) // 1437000
```

如果指定了访问器函数，将对输入 *值* 中的每个元素调用给定的函数，传递元素 `d`，索引 `i` 和数组 `数据` 作为三个参数；然后将返回的值相加。

## fcumsum(*values*, *accessor*) {#fcumsum}

```js
d3.fcumsum([1, 1e-14, -1]) // [1, 1.00000000000001, 1e-14]
```

[示例](https://observablehq.com/@d3/d3-fcumsum) · [源码](https://github.com/d3/d3-array/blob/main/src/fsum.js) · 返回给定值的完全精度累积和，返回值是一个 Float64Array。虽然速度较慢，但 d3.fcumsum 可以替代 [d3.cumsum](./summarize.md#cumsum)，适用于需要更高精度的场合。

```js
const penguins = [
  {
    body_mass_g: 3750, // 3750 + 0 = 3750
  },
  {
    body_mass_g: 3750, // 3750 + 3750 = 7550
  },
  {
    body_mass_g: 3300, // 7550 + 3300 = 10800
  },
  {
    body_mass_g: 0,  // 10800 + 0 = 10800
  },
  {
    body_mass_g: 3450,  // 10800 + 3450 = 14250
  }
];

d3.fcumsum(penguins, (d) => d.body_mass_g) // [3750, 7550, 10800, 10800, 14250]
```

如果指定了访问器函数，将对输入值中的每个元素调用给定的函数，传递元素`d`、索引`i`和数组`数据`作为三个参数，然后将返回的值完全精度累积相加。