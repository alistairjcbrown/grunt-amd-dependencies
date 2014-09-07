'use strict';

var grunt = require('grunt'),
    AmdDependencies = require("../tasks/amd_dependencies"),
    amd_dependencies = new AmdDependencies(grunt),

    // Fixtures
    test_file_paths = grunt.file.readJSON("test/fixtures/test_file_paths.json"),
    test_file_paths_invalid = grunt.file.readJSON("test/fixtures/test_file_paths_invalid.json"),
    test_file_contents = grunt.file.readJSON("test/fixtures/test_file_contents.json"),
    test_file_data = grunt.file.readJSON("test/fixtures/test_file_data.json"),
    test_file_contents_invalid = grunt.file.readJSON("test/fixtures/test_file_contents_invalid.json"),
    test_file_contents_amd = grunt.file.readJSON("test/fixtures/test_file_contents_amd.json"),
    test_file_contents_amd_unused = grunt.file.readJSON("test/fixtures/test_file_contents_amd_unused.json"),
    test_file_amd_parse_results = grunt.file.readJSON("test/fixtures/test_file_amd_parse_results.json"),
    test_file_amd_parse_results_unused = grunt.file.readJSON("test/fixtures/test_file_amd_parse_results_unused.json");


/*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
        test.expect(numAssertions)
        test.done()
    Test assertions:
        test.ok(value, [message])
        test.equal(actual, expected, [message])
        test.notEqual(actual, expected, [message])
        test.deepEqual(actual, expected, [message])
        test.notDeepEqual(actual, expected, [message])
        test.strictEqual(actual, expected, [message])
        test.notStrictEqual(actual, expected, [message])
        test.throws(block, [error], [message])
        test.doesNotThrow(block, [error], [message])
        test.ifError(value)
*/

exports.getFilePaths = {
    setUp: function(done) {
        done();
    },

    tearDown: function(done) {
        done();
    },

    // No data
    noSourceData: function(test) {
        var file_paths = amd_dependencies.getFilePaths();

        test.equal(file_paths.length, 0);
        test.deepEqual(file_paths, []);

        test.done();
    },

    // Source in invalid format
    invalidSourceData: function(test) {
        var file_paths = amd_dependencies.getFilePaths({
            src: {}
        });

        test.equal(file_paths.length, 0);
        test.deepEqual(file_paths, []);

        test.done();
    },

    // Source with no matches, string match
    unmatchingSourceDataString: function(test) {
        var file_paths = amd_dependencies.getFilePaths({
            src: "./fixtures/nomatch*"
        });

        test.equal(file_paths.length, 0);
        test.deepEqual(file_paths, []);

        test.done();
    },

    // Source with no matches, array match
    unmatchingSourceDataArray: function(test) {
        var file_paths = amd_dependencies.getFilePaths({
            src: [ "./fixtures/nomatch*" ]
        });

        test.equal(file_paths.length, 0);
        test.deepEqual(file_paths, []);

        test.done();
    },

    // Source with matches, string match
    matchingSourceDataString: function(test) {
        var file_paths = amd_dependencies.getFilePaths({
            src: "test/fixtures/*.js"
        });

        test.equal(file_paths.length, 2);
        test.deepEqual(file_paths, test_file_paths);

        test.done();
    },

    // Source with matches, array match
    matchingSourceDataArray: function(test) {
        var file_paths = amd_dependencies.getFilePaths({
            src: [ "test/fixtures/*.js" ]
        });

        test.equal(file_paths.length, 2);
        test.deepEqual(file_paths, test_file_paths);

        test.done();
    },

};



exports.getFileContents = {
    setUp: function(done) {
        done();
    },

    tearDown: function(done) {
        done();
    },

    // No data
    noPathData: function(test) {
        var file_contents = amd_dependencies.getFileContents();

        test.equal(file_contents.length, 0);
        test.deepEqual(file_contents, []);

        test.done();
    },

    // No path data
    emptyPathData: function(test) {
        var file_contents = amd_dependencies.getFileContents([]);

        test.equal(file_contents.length, 0);
        test.deepEqual(file_contents, []);

        test.done();
    },

    // Invalid paths not mapping to files
    invalidPathData: function(test) {
        var file_contents = amd_dependencies.getFileContents(test_file_paths_invalid);

        test.equal(file_contents.length, 0);
        test.deepEqual(file_contents, []);

        test.done();
    },

    // Valid paths mapping to files
    validPathData: function(test) {
        var file_contents = amd_dependencies.getFileContents(test_file_paths);

        test.equal(file_contents.length, 2);
        test.deepEqual(file_contents, test_file_data);

        test.done();
    },

};


exports.parseFileContents = {
    setUp: function(done) {
        done();
    },

    tearDown: function(done) {
        done();
    },

    // No data
    noFileContents: function(test) {
        var parse_results = amd_dependencies.parseFileContents();

        test.equal(parse_results.length, 0);
        test.deepEqual(parse_results, []);

        test.done();
    },

    // No file data
    emptyFileContents: function(test) {
        var parse_results = amd_dependencies.parseFileContents([]);

        test.equal(parse_results.length, 0);
        test.deepEqual(parse_results, []);

        test.done();
    },

    // Valid JS, not AMD
    nonAmdFileContents: function(test) {
        var parse_results = amd_dependencies.parseFileContents(test_file_contents);

        test.equal(parse_results.length, 0);
        test.deepEqual(parse_results, []);

        test.done();
    },

    // Syntactically invalid JS
    invalidFileContents: function(test) {
        var parse_results = amd_dependencies.parseFileContents(test_file_contents_invalid);

        test.equal(parse_results.length, 0);
        test.deepEqual(parse_results, []);

        test.done();
    },

    // Valid AMD with no unused dependencies
    amdFileContentsNoUnusedDependencies: function(test) {
        var parse_results = amd_dependencies.parseFileContents(test_file_contents_amd);

        test.equal(parse_results.length, 2);
        test.deepEqual(parse_results, test_file_amd_parse_results);

        test.done();
    },

    // Valid AMD with unused dependencies
    amdFileContentsUnusedDependencies: function(test) {
        var parse_results = amd_dependencies.parseFileContents(test_file_contents_amd_unused);

        test.equal(parse_results.length, 2);
        test.deepEqual(parse_results, test_file_amd_parse_results_unused);

        test.done();
    },

};