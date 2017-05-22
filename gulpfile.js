var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

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

gulp.task('cleanTmp', function(){
    return del(['tmp']);
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    // with sourcemaps
    return gulp.src(options.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('sass', function(){
    //Process the sass before minifying
    return gulp.src(options.cssfiles)
        .pipe(concat('all.min.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('tmp/css'));
});

gulp.task('styles', function(){
    //Minify and copy all css with sourcemaps
    return gulp.src('tmp/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('all', gulp.series('clean', 'scripts', 'sass', 'styles', 'cleanTmp'));
