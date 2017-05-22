var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    del = require('del');

var options = {
    scripts: ['src/js/global.js', 'src/js/circle/circle.js', 'src/js/circle/autogrow.js'],
    cssfiles: ['src/sass/**/*.scss', 'sass/circle/**/*.sass'],
    src: 'src'
};

const server = browserSync.create();


//Server task
gulp.task('serve', function() {
    server.init({
        server: {
            baseDir: 'dist/'
        }
    });
//add the build task when the css changes in the sass dir
    gulp.watch(options.src + "/sass/global.scss", gulp.series('build'));
//add the reload task once the css file changes in the main dir
    gulp.watch("dist/styles/*.css").on('change', server.reload)

});


//task to clean up a tmp directory used in transformation of the sass
gulp.task('cleanTmp', function(){
    return del(['tmp']);
});


gulp.task('clean', function() {
    return del(['dist']);
});


gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
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

gulp.task('images', function(){
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});



gulp.task('build', gulp.series('clean', 'scripts', 'sass', 'styles', 'images', 'html', 'cleanTmp'));
gulp.task('default', gulp.series('serve'));


