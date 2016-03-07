var gulp = require('gulp');
var args = require('yargs').argv;

var $ = require('gulp-load-plugins')({lazy: true});

//var jscs = require('gulp-jscs');
//var util = require('gulp-util');
//var stylish = require('gulp-jscs-stylish');
//var gulpprint = require('gulp-print');
//var gulpif = require('gulp-if');
//var jshint = require('gulp-jshint');

gulp.task('vet', function () {
    log('Analyzing...');
    return gulp
        .src([
            './src/**/*.js',
            './*/js'
        ])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jscsStylish.combineWithHintResults())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
