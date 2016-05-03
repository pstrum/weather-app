var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var handleErrors = require('../util/handleErrors');
var config = require('../config').sass;

gulp.task('sass', function() {
  return gulp.src(config.src)
  .pipe(sourcemaps.init())
  .pipe(sass(config.settings, {
    errLogToConsole: true,
    outputStyle: 'expanded' 
   }))
  .on('error', handleErrors)
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssnano())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(config.dest));
});
