const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const sequence = require('run-sequence');

/**
 * Gulp task to run tests after transpilation from es6 to es5
 */
gulp.task('test', () => {
  return gulp.src('dist/tests/**/*.spec.js')
  .pipe(mocha());
});

/**
 * Gulp task to transpile source code in the server folder to es5
 * and place in the dist folder
 */
gulp.task('transpile', () => {
  return gulp.src(['server/**/*.js'])
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist'));
});

/**
 * Gulp task to run the server with nodemon listening for changes
 * and restart the server accordingly.
 */
gulp.task('serve', () => {
  return nodemon({'script': './dist/server.js'});
});

/**
 * Gulp task to watch the server folder for file changes, then
 * transpile sever code to es5 and place in the dist folder
 */
gulp.task('watch_server', () => {
  return gulp.watch('server/**/*.*', {cwd: './'}, () => {
    sequence(
      'transpile',
      'test'
    );
  });
});

/**
 * Gulp task for development purposes
 * Transpile the sever source files to es5,
 * start the server,
 * listen to changes on the sever files
 */
gulp.task('develop_server', () => {
  sequence(
    'transpile',
    'test',
    'watch_server'
  );
}); 
