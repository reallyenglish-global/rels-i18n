'use strict';

module.exports = {
  test: {
    dest: 'test',
    runner: './test/runner.html',
    clean: [
      'test/spec-manifest.js',
      'test/vendor.js'
    ],
    build: {
      source: 'spec-manifest.js',
      bundle: {
        entries: [
          './test/**/*.spec.js',
          './test/support/setup.js'
        ]
      }
    },
    vendor: {
      source: 'vendor.js',
    },
    watch: [{
      files: ['test/**/*.spec.js', 'lib/**/*.js'],
      tasks: ['build:test', 'test-runner']
    }]
  }
}

