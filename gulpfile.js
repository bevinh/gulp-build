var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    useref = require('gulp-useref');

var options = {
    scripts: ['src/js/global.js', 'src/js/circle/circle.js', 'src/js/circle/autogrow.js'],
    cssfiles: ['src/sass/**/*.scss', 'sass/circle/**/*.sass'],
    src: 'src'
};

gulp.task('default', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JavaScript
    // with sourcemaps
    return gulp.src(options.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('sass', ['clean'], function(){
    return gulp.src(options.cssfiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('tmp/css'));
});

gulp.task('styles', ['clean', 'sass'], function(){
    //Minify and copy all css with sourcemaps
    return gulp.src('tmp/css/global.css')
        .pipe(sourcemaps.init())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles/'));
})


gulp.task('clean', function() {
    return del(['dist', 'tmp']);

});