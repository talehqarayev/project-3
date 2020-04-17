const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "ПРОЕКТ-3"
        }
    });
});

gulp.task('style', function() {
    return gulp.src("ПРОЕКТ-3/sass/*.sass")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("ПРОЕКТ-3/css"))
        .pipe(browserSync.stream());
})


gulp.task("watch", function() {
    gulp.watch("ПРОЕКТ-3/sass/*.sass", gulp.parallel("styles"));
    gulp.watch("ПРОЕКТ-3/*.html").on("change", browserSync.reload());
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));

