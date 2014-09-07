/*
 * grunt-amd-dependencies
 * https://github.com/alistairjcbrown/grunt-amd-dependencies
 *
 * Copyright (c) 2014 Alistair Brown
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js",
        "<%= nodeunit.tests %>"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Configuration to be run (and then tested).
    amd_dependencies: {
      all: {
        options: {
        },
        src: []
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ["test/*_test.js"]
    },

    keybase_dir: {
      verify: {},
      sign: {}
    }

  });

  // Actually load this plugin"s task(s).
  grunt.loadTasks("tasks");

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-nodeunit");

  // Code signing and verification tasks
  grunt.registerTask("sign",   [ "keybase_dir:sign" ]);
  grunt.registerTask("verify", [ "keybase_dir:verify" ]);

  // Whenever the "test" task is run, run this plugin"s task, then test the result.
  grunt.registerTask("test", [ "jshint", "nodeunit" ]);
  grunt.registerTask("go",   [ "sign", "test", "verify" ]);

  // By default, sign, test and verify.
  grunt.registerTask("default", [ "go" ]);


};
