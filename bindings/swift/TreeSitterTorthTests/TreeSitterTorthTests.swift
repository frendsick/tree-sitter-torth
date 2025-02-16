import XCTest
import SwiftTreeSitter
import TreeSitterTorth

final class TreeSitterTorthTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_torth())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Torth grammar")
    }
}
