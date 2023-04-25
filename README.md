# rehype-inline-code-language

A [Rehype](https://github.com/rehypejs/rehype) plugin that allows passing a language to inline code. This is useful for syntax highlighting.

Note: This is not a standard markdown feature.

## Example

```
`_js console.log()`
```

## Installation

```
npm i -D remark-inline-code-language
```

<!-- prettier-ignore -->
```js
import { unified } from "unified"
import { visit } from "unist-util-visit"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeInlineCodeLanguage from "rehype-inline-code-language"

const file = await unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeInlineCodeLanguage)
	.use(rehypeStringify)
	.process("`_js console.log()`")

console.log(String(file))

```

```html
<p><code class="language-js">console.log()</code></p>
```

## Options

You can customize the syntax!

If you are going to only change 1 option, sadly you need to add in all other options too.

```js
.use(rehypeInlineCodeLanguage, {
	// ...
})
```

### `separator_character`

This is the character(s) that separates the language name from the code content itself.

- Type: `string`
- Default: `"_"`

#### Examples

- `"_"` => `_js console.log()`
- `"+"` => `+js console.log()`
- `"="` => `=js console.log()`

### `separator_position`

- Type: `"before" | "after" | "both"`
- Default: `"before"`

#### Examples

- `"before"` => `_js console.log()`
- `"after"` => `js_ console.log()`
- `"both"` => `_js_ console.log()`
