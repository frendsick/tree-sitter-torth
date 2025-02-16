/**
 * @file Torth grammar for tree-sitter
 * @author Teemu Pätsi <frendsick@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "torth",

  rules: {
    source_file: ($) => repeat($._definition),

    _definition: ($) => choice($.function_definition),

    function_definition: ($) => seq("function", $.identifier, ":", "end"),

    literal: ($) =>
      choice(
        $.literal_bool,
        $.literal_char,
        $.literal_int,
        $.literal_str,
        $.literal_fstr,
      ),
    literal_bool: () => /true|false/i,
    literal_char: () => /'.'/,
    literal_int: ($) => $.number,
    literal_str: () => /"[\s\S]*?"/,
    literal_fstr: () => /f"[\s\S]*?"/,

    identifier: () => /\S+/,
    number: () => /\d+/,
  },
});
