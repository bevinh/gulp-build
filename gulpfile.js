var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    useref = require('gulp-useref');

var options = {
    scripts: ['src/js/global.js', 'src/js/circle/circle.js', 'src/js/circle/autogrow.js'],
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

gulp.task('styles', ['clean'], function(){
    //Minify and copy all css with sourcemaps
    return gulp.src(options.cssFiles)
        .pipe(csso({
            restructure: true,
            sourceMap: true,
            debug: true
        }))
})


gulp.task('clean', function() {
    return del(['dist']);
});