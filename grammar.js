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

    _definition: ($) =>
      choice(
        $.comment_definition,
        $.const_definition,
        $.enum_definition,
        $.function_definition,
        $.include_definition,
      ),

    function_definition: ($) =>
      seq(/function/i, $.identifier, ":", $.function_body, /end/i),

    comment_definition: () => token(seq("//", repeat(/[^\n]/))),

    const_definition: ($) => seq(/const/i, $.identifier, $.literal, /end/i),

    enum_definition: ($) =>
      seq(/enum/i, $.identifier, $.number, ":", repeat($.identifier), /end/i),

    include_definition: ($) => seq(/include/i, $.literal_str),

    function_body: ($) => repeat1(choice($.operation, $.comment_definition)),

    identifier: () => /\S+/,
    number: () => /\d+/,

    operation: ($) => choice($.literal, $.intrinsic, $.identifier),

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
    literal_str: () => seq('"', repeat(/[^"]/), '"'),
    literal_fstr: ($) => seq("f", $.literal_str),

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
        /return/i,
      ),
  },
});
