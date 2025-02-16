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

    identifier: () => /\S+/,
    number: () => /\d+/,

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

    intrinsic: ($) =>
      choice(
        $.binary_operator,
        /argc/i,
        /argv/i,
        /drop/i,
        /dup/i,
        /envp/i,
        /exec/i,
        /load_byte/i,
        /load_word/i,
        /load_dword/i,
        /load_qword/i,
        /over/i,
        /rot/i,
        /store_byte/i,
        /store_word/i,
        /store_dword/i,
        /store_qword/i,
        /swap/i,
        /syscall0/i,
        /syscall1/i,
        /syscall2/i,
        /syscall3/i,
        /syscall4/i,
        /syscall5/i,
        /syscall6/i,
      ),

    binary_operator: () =>
      choice(
        /plus/i,
        "+",
        /minus/i,
        "-",
        /mul/i,
        "*",
        /div/i,
        "/",
        /mod/i,
        "%",
        /gt/i,
        ">",
        /lt/i,
        "<",
        /eq/i,
        "==",
        /ne/i,
        "!=",
        /ge/i,
        ">=",
        /le/i,
        "<=",
        /shl/i,
        ">>",
        /le/i,
        "<<",
        /and/i,
        "&&",
        /or/i,
        "||",
        /not/i,
      ),

    control_flow: () =>
      choice(
        /if/i,
        /elif/i,
        /else/i,
        /endif/i,
        /do/i,
        /while/i,
        /break/i,
        /continue/i,
        /done/i,
      ),

    // TODO: Body of each section
    if_block: () =>
      seq(
        /if/i,
        // TODO: Condition
        /do/i,
        repeat(seq(/elif/i, /do/i)),
        optional(/else/i),
        /endif/i,
      ),

    while_block: () =>
      seq(
        /while/i,
        // TODO: Condition
        /do/i,
        // TODO: Body of the `while` loop
        /done/i,
      ),
  },
});
