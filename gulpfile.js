const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');

/**
 * Gulp task to run tests after transpilation from es6 to es5
 */
gulp.task('test', ['transpile'], () =>{
  gulp.src('dist/test/**/*.js')
  .pipe(mocha());
});

/**
 * Gulp task to transpile source code in the server folder to es5
 */
gulp.task('transpile', () => {
  return gulp.src('./server/**/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest('dist'));
});

/**
 * Gulp task to run the server
 */
gulp.task('serve', () => {
  nodemon({'script': './dist/server.js'})
});

/**
 * Gulp task to watch the server folder for file changes, then run
 * necessary commands afterwards
 */
gulp.task('watch_server', () => {
  gulp.watch('./server/**/*.js', ['test']);
});

/**
 * Gulp task for development purposes
 * Transpile the sever source files to es5,
 * start the server,
 * listen to changes on the sever files
 */
gulp.task('develop_server', ['transpile', 'serve', 'watch_server']);