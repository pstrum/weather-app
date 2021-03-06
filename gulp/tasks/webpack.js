var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../config').javascript;
var webpack = require('webpack-stream');

gulp.task('webpack', function(callback) {
  return gulp.src(config.entryPoint)
  .pipe(webpack({
    output: {
      filename: config.packedFile
    }
  }))
  .pipe(uglify())
  .pipe(gulp.dest(config.dest));
});
