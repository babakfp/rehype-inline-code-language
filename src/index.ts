import { visit } from "unist-util-visit"

interface Options {
	separator_character: string
	separator_position: "before" | "after" | "both"
}

interface Inline_Code {
	type: "element"
	tagName: "code"
	lang?: string
	[key: string]: any
}

const default_options: Options = {
	separator_character: "_",
	separator_position: "before",
}

export default function attacher(options: Options = default_options) {
	return function transformer(tree: any) {
		visit(tree, "element", function visitor(node) {
			if (node.tagName === "code") {
				transform_node(node, options)
			}
		})
	}
}

function transform_node(node: Inline_Code, options: Options) {
	const transformed_values = get_transformed_values(node.children[0], options)

	if (transformed_values) {
		node.lang = transformed_values.language
		node.children[0].value = transformed_values.code
		node.properties = {
			className: [`language-${node.lang}`],
		}
	}

	return node
}

function get_transformed_values(node: Inline_Code, options: Options) {
	let match

	if (options.separator_position === "before") {
		match = node.value.match(
			get_separator_regex(
				options.separator_character,
				options.separator_position
			)
		)
	}

	if (options.separator_position === "after") {
		match = node.value.match(
			get_separator_regex(
				options.separator_character,
				options.separator_position
			)
		)
	}

	if (options.separator_position === "both") {
		match = node.value.match(
			get_separator_regex(
				options.separator_character,
				options.separator_position
			)
		)
	}

	if (match) {
		return {
			code: match[2],
			language: match[1],
		}
	}
}

function get_separator_regex(
	separator_character = default_options.separator_character,
	separator_position = default_options.separator_position
) {
	let regex_string = ""

	// `_py print(Hello, World!)`
	if (separator_position === "before")
		regex_string = `^\\${separator_character}([a-z]+)\\s+(.+)$` // /^_([a-z]+)\s+(.+)$/i
	// `py_ print(Hello, World!)`
	if (separator_position === "after")
		regex_string = `^([a-z]+)\\${separator_character}\\s+(.+)$` // /^([a-z]+)_\s+(.+)$/i
	// `_py_ print(Hello, World!)`
	if (separator_position === "both")
		regex_string = `^\\${separator_character}([a-z]+)\\${separator_character}\\s+(.+)$` // /^_([a-z]+)_\s+(.+)$/i

	return new RegExp(regex_string, "i")
}
