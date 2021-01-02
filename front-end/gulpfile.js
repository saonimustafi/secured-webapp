var gulp = require('gulp');
var browserify = require('gulp-browserify');
var hbsfy = require('hbsfy');
// var hbsfy = require("hbsfy").configure({
//     precompiler: "secure-handlebars"
// });
var concat = require('gulp-concat');
var gulpMerge = require('gulp-merge');

gulp.task('browserify', function () {
    var app = gulp.src('./js/app.js').pipe(browserify({
        transform: [hbsfy]
    }));

    // var build = gulpMerge('', app);

    return app.pipe(concat('bundle.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function () {
    gulp.start('browserify');
});

gulp.task('default', function () {
    gulp.start('build');
    gulp.watch(['js/**'], ['browserify']);
});



// var browserify = require('browserify');
// var gulp = require('gulp');
// var source = require('vinyl-source-stream');
//
// gulp.task('browserify', function() {
//     return browserify('./js/app.js')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('./'));
// });