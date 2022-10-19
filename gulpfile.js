import { deleteSync as del } from 'del';
import gulp from 'gulp';
import csso from 'gulp-csso';
import htmlmin from 'gulp-htmlmin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import uglifyES from 'gulp-uglify-es';
import base64 from 'gulp-base64-inline';
import concat from 'gulp-concat';
import trim from 'gulp-trim';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import os from 'os';

const uglify = uglifyES.default;
const sass = gulpSass(dartSass);

/**
 * Transpile scss to css and minify it and save to output dir (/dist)..
 */
gulp.task('style', () => {
    return gulp.src('./assets/scss/**.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(csso())
        .pipe(concat('styles.css'))
        .pipe(base64("../assets"))
        .pipe(trim())
        .pipe(gulp.dest('./dist/assets/css'));
});

/**
 * Minify js and save to output dir (/dist)..
 */
gulp.task('script', () => {
    return gulp.src('./assets/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
});

/**
 * Minify HTML files and save to output dir (/dist).
 */
gulp.task('html', () => {
    return gulp.src('./index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));
});

/**
 * Clean output directory and save to output dir (/dist).
 */
gulp.task('clean', (done) => {
    del(['dist']);
    done();
});

/**
 * Optimize images and save to output dir (/dist).
 */
gulp.task('img', () => {
    return gulp.src('./assets/img/**/*.**')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'));
});

/**
 * Serve at default port and watching changes.
 */
gulp.task('serve', (done) => {
    //browser name by platform.
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));
    //setup browser server sync in default port.
    browserSync.init({
        server: { baseDir: './dist' },
        open: true,
        browser: browser
    });

    //watch any style, script or html changes.
    gulp.watch(['./assets/scss/*.scss'], gulp.series('style', browserSync.reload));
    gulp.watch('./assets/js/**/*.js', gulp.series('script', browserSync.reload));
    gulp.watch('./assets/img/**/*.**', gulp.series('img', browserSync.reload));
    gulp.watch('./index.html', gulp.series('html', browserSync.reload));
    done();
});

/**
 * Minify all files
 */
gulp.task('build', gulp.series('clean', gulp.parallel(['style', 'script', 'html'])), (done) => {
    console.log("It's done!");
    done();
});

/**
 * Minify all files and serve
 */
gulp.task('default', gulp.series('build', 'serve'), (done) => {
    console.log("It's done!");
    done();
});
