const gulp                      = require('gulp');
const del                       = require('del');
const browserSync               = require('browser-sync').create();
const sass                      = require('gulp-sass')(require('sass'));


// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
}


// Очистка директории
const clear = done => {
    del.sync('./public');
    done();
}


// HTML
const html = () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
};


// SASS
const scss = () => {
    return gulp.src('./src/sass/*.{sass,scss}')
        .pipe(sass())
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
};

// FONT
const font = () => {
    return gulp.src('./src/font/**/*.{ttf,woff,woff2,eot}')
        .pipe(gulp.dest('./public/font'))
        .pipe(browserSync.stream());
};

// IMG
const img = () => {
    return gulp.src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.stream());
};


// Отслеживание
const watch = () => {
    gulp.watch('./src/*.html', html);
    gulp.watch('./src/sass/**/*.{sass,scss}', scss);
    gulp.watch('./src/font/**/*.{ttf,woff,woff2,eot}', font);
    gulp.watch('./src/img/**/*.{jpg,jpeg,png,gif,svg}', img);
}


exports.default = gulp.series(
    clear,
    gulp.parallel(html, scss, font, img),
    gulp.parallel(watch, server)
);