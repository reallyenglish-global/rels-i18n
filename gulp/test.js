'use strict';

var gulp = require('gulp');
var browser = require('browser-sync');

gulp.task('test', ['test-build'], function(){

  gulp.watch('lib/**/*.js', ['test-build']);
  gulp.watch('test/**/*.spec.js', ['test-build']);
  var bs = browser.create();

  bs.watch([
    "gulp/**/*.js",
    "test/spec-manifest.js",
    "test/**/*.spec.js"
  ], function() {
    bs.reload();
  })

  bs = browser.init({
    server: {
      baseDir: ['./', 'test']
    }
  });
});
