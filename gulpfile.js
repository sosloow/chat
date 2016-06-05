var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var del = require('del');
var Server = require('karma').Server;
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');

gulp.task("default", ['start', 'pack:dev']);

gulp.task('clean', function(next) {
    del(['./public/js/**'], next);
});

gulp.task('pack:dev', function() {
  return gulp.src('client/index.js')
    .pipe(webpack({
      watch: true,
      devtool: 'source-map',
      output: {
        filename: 'index.js'
      },
      module: {
        loaders: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }]
      }
    }))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('pack:production', function() {
  return gulp.src('client/index.js')
    .pipe(webpack({
      output: {
        filename: 'index.js'
      },
      module: {
        loaders: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }]
      }
    }))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('lint', function () {
  return gulp.src(['./client/**/*.js', './server/**/*.js'])
    .pipe(eslint({
      rules: {
        'no-console': 0
      },
      ecmaFeatures: {
        sourceType: "module"
      },
      "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
      },
      extends: 'eslint:recommended',
      envs: ['browser', 'node', 'es6']
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('start', function () {
  nodemon({
    script: 'server/index.js',
    ext: 'js html',
    cwd: __dirname,
    ignore: [],
    watch: ['server'],
    env: {
      'NODE_ENV': 'development'
    }
  });
});

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: 3000,
    livereload: true
  });
});

gulp.watch(['./client/**/*', './server/**/*'], ['lint']);
