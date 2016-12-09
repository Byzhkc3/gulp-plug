// 导入 gulp 
var gulp = require('gulp');
// 导入 gulp-sass
var sass = require('gulp-sass');
// 导入 gulp-connect 用于创建自动刷新服务器
var connect = require('gulp-connect');
// 导入 gulp-minify-css 压缩css
var minifycss = require('gulp-minify-css');
// 导入 gulp-concat 合并js
var concat = require('gulp-concat');
// 导入 gulp-uglify 合并js
var uglify = require('gulp-uglify');
// 导入 gulp-rename 重命名
var rename = require('gulp-rename');

// 创建服务器
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: 8080,
        livereload: true
    });
});

// 监听文件变化
gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

// 编译sass
gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});


// 压缩css
gulp.task('minicss',function(){
	return gulp.src('app/css/*.css')
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload());
});

// 压缩js
gulp.task('minijs',function(){
	return gulp.src('app/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('app/js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/scss/style.scss'], ['sass']);
});

// 设置默认命令
gulp.task('default', ['connect', 'watch']);
