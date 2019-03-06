const gulp       = require('gulp'),
      ts         = require('gulp-typescript'),
      exec       = require('child_process').exec,
      browserify = require("browserify"),
      source     = require('vinyl-source-stream'),
      buffer     = require('vinyl-buffer'),
      uglify     = require('gulp-uglify'),
      sourcemaps = require('gulp-sourcemaps'),
      tsify      = require("tsify"),
      babelify   = require('babelify');


gulp.task('ng-build', (cb) => {
  exec('ng build --prod --aot', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
    return true;
  });
});
gulp.task('content-script', () => {
  return browserify({
    basedir: '.',
    debug: true,
    entries: 'content-script/boot.ts'
  })
    .plugin(tsify)
    .transform(babelify, {extensions: ['.ts']})
    .bundle()
    .pipe(source('content-script.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('default', ['ng-build', 'content-script']);

gulp.task('watch', ['ng-build', 'content-script'], () => {
  gulp.watch('src/**/*.*', ['default']);
});
