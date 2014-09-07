/*
 * grunt-amd-dependencies
 * https://github.com/alistairjcbrown/grunt-amd-dependencies
 *
 * Copyright (c) 2014 Alistair Brown
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

    var amd_dependencies = this,
        amd_extract = require("amdextract"),
        check = require("check-type").init();

    // ----


    this.getFilePaths = function(data) {
        if ( ! check(data).has("src") ||
            check(data.src).is.not("array") &&
            check(data.src).is.not("string")) {

            return [];
        }

        return grunt.file.expand(data.src);
    };


    this.getFileContents = function(file_paths) {
        var file_contents = [];

        // Complete if there are no paths to check
        if (check(file_paths).is.not("array") || file_paths.length < 1) {
            return file_contents;
        }

        file_paths.forEach(function(file_path) {
            var output;

            try {
                output = grunt.file.read(file_path);
            } catch(e) {
                grunt.log.ok("Unable to read file at " + file_path);
                return;
            }

            file_contents.push({
                path: file_path,
                contents: output
            });
        });

        return file_contents;
    };


    this.parseFileContents = function(file_contents) {
        var parse_results = [];

        // Complete if there are no paths to check
        if (check(file_contents).is.not("array") || file_contents.length < 1) {
            return parse_results;
        }

        file_contents.forEach(function(file_data) {
            var output;

            try {
                output = amd_extract.parse(file_data.contents);
            } catch(e) {
                grunt.log.ok("Invalid Javascript file matched at " + file_data.path);
                return;
            }

            parse_results = parse_results.concat(output.results);
        });

        return parse_results;
    };



    /*
     * Task declaration for amd_dependencies
     *
     * Use:
     *   amd_dependencies
     */
    grunt.registerMultiTask("amd_dependencies", "Grunt task to check AMD modules for unused and invalid dependencies", function() {
        var files = amd_dependencies.getFilePaths(this.data),
            file_contents, results;

        // Complete if there are no files to check
        if (files.length < 1) {
            grunt.log.ok("No files to check");
            return;
        }

        file_contents = amd_dependencies.getFileContents();

        results = this.parseFileContents(file_contents);

        // grunt.file.exists

        grunt.log.writeln("Hello World", results);

    });

};
