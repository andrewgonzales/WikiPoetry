var gulp = require('gulp');
var browserSync = require("browser-sync").create();
var nodemon = require('gulp-nodemon');
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var lint = require('gulp-eslint');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var jest = require('gulp-jest');
var exec = require('child_process').exec;

var config = {
  port: 8888,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './client/app/*.html',
    js: './client/**/*.js',
    css: [
      './client/lib/skeleton/css/normalize.css',
      './client/lib/skeleton/css/skeleton.css',
      './client/styles/styles.css'
    ],
    images: './client/images/*',
    server: './server/config/*.js',
    dist: './server/dist',
    mainJs: './client/app/main.js'
  }
};

gulp.task('mocha', function () {
  gulp.src('./tests/server/ServerSpec.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}))
});

var BROWSER_SYNC_RELOAD_DELAY = 50;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: './server/server.js',
    watch: ['./server/server.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});



gulp.task('jest', function (cb) {
  exec('jest', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('test-api', function () {
  gulp.src('./tests/server/AshleySpec.js', {read: false})
  .pipe(mocha({reporter: 'nyan', timeout: 4000}))
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:8080',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google-chrome']
  });
});

gulp.task('html', function () {
  gulp.src(config.paths.html)
  .pipe(gulp.dest(config.paths.dist))
});

gulp.task('js', function () {
  browserify(config.paths.mainJs)
  .transform(reactify)
  .bundle()
  .on('error', console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
});

gulp.task('css', function () {
  gulp.src(config.paths.css)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('images', function () {
  gulp.src(config.paths.images)
  .pipe(gulp.dest(config.paths.dist + '/images'))

  gulp.src('./client/favicon')
  .pipe(gulp.dest(config.paths.dist))
});

gulp.task('js-watch', browserSync.reload);

gulp.task('lint', function() {
  return gulp.src([config.paths.js, config.paths.server])
  .pipe(lint({config: 'eslint.config.json'}))
  .pipe(lint.format());
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch(config.paths.html, ['html', 'bs-reload']);
  gulp.watch(config.paths.js, ['js', 'jest', browserSync.reload]);
  gulp.watch(config.paths.server, ['nodemon']);
});

gulp.task('default', ['mocha', 'test-api', 'html', 'js', 'css', 'images', 'jest','browser-sync', 'watch']);
