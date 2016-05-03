var gulp = require('gulp');
var config = require('../config').server;
var gls = require('gulp-live-server');

gulp.task('serve', function() {
  var server = gls.new([config.serverFile]);
  server.start();
  gulp.watch(['src/**/*.html', 'src/**/*.js', 'src/**/*.scss'], function (file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(config.serverFile, server.start.bind(server));
});
