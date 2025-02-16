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

    identifier: $ => /\S+/,
  },
});
