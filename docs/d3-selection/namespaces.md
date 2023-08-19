# Namespaces

XML namespaces are fun! Right? 🤪 Fortunately you can mostly ignore them.

## namespace(*name*) {#namespace}

[Source](https://github.com/d3/d3-selection/blob/main/src/namespace.js) · Qualifies the specified *name*, which may or may not have a namespace prefix.

```js
d3.namespace("svg:text") // {space: "http://www.w3.org/2000/svg", local: "text"}
```

If the name contains a colon (`:`), the substring before the colon is interpreted as the namespace prefix, which must be registered in [d3.namespaces](#namespaces). Returns an object `space` and `local` attributes describing the full namespace URL and the local name. If the name does not contain a colon, this function merely returns the input name.

## namespaces

[Source](https://github.com/d3/d3-selection/blob/main/src/namespaces.js) · The map of registered namespace prefixes. The initial value is:

```js
{
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
}
```

Additional prefixes may be assigned as needed to create elements or attributes in other namespaces.
