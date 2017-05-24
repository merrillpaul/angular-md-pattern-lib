'use strict';

var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../configuration');
var sassImporter = require('./import-sass');

gulp.task('compile-sass', function() {
  return gulp
    .src(config.paths.styles)
    //.pipe(sourcemaps.init()) // add later on when not using relative routes for node_modules scss
    .pipe(sass({
      errLogToConsole: true,
      importer: sassImporter,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('bundle-sass', function() {
  return gulp.src(config.paths.styles)
   // .pipe(nano({zindex: false}))
   // .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('dist/'));
})