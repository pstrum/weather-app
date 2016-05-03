var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.index.src, ['index']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.javascript.src, ['webpack']);
});
