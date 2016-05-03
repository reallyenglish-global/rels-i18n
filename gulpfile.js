// var gulp = require('gulp');
// require('./gulp/');
// gulp.task('default', ['test']);

var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
require('rels-gulp')(gulp);

gulp.task('default', ['test']);