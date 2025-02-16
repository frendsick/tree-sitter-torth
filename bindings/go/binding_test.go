package tree_sitter_torth_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_torth "github.com/frendsick/tree-sitter-torth/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_torth.Language())
	if language == nil {
		t.Errorf("Error loading Torth grammar")
	}
}
