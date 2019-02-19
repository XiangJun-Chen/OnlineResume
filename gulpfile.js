var gulp = require('gulp');
var fileInclude = require('gulp-file-include');
var htmlMin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var pump = require('pump');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imageMin');

/* 合并、压缩 HTML 文件 */
gulp.task('handleHtml', function() {
	return gulp.src('src/*.html')			//返回一个stream来表示该任务已完成
			   .pipe(fileInclude({
					prefix: '@@',			//用于识别关键字的前缀，包括'include'、'if'、'for'、'loop'
					basepath: '@file',		//基础路径，'@file'表示直接由引用的地方指定
					context: {}				//可以直接指定，也可以在引用的时候通过传参指定，之后可以通过关键字前缀访问
				}))
			   .pipe(htmlMin({
				   removeComments: true,				//清除注释
				   collapseWhitespace: true,			//清除除文本节点外的所有空格
				   minifyJS: true,						//压缩HTML中的JS
				   minifyCSS: true						//压缩HTML中的CSS
				}))
			   .pipe(gulp.dest('dist'));
});

/* 编译 SASS 文件 */
gulp.task('compileCss', function() {
	return gulp.src('src/css/*.scss')
			   .pipe(sass())
			   .pipe(gulp.dest('src/css'));
});

/* 合并、压缩 CSS 文件 */
gulp.task('handleCss', ['compileCss'], function() {
	return gulp.src(['src/css/jquery.fullPage.css','src/css/animate.min.css','src/css/main.css'])				//CSS需要手动指定合并顺序，用数组表示
			   .pipe(concat('main.min.css'))
			   .pipe(cleanCss({compatibility: 'ie8'}))
			   .pipe(gulp.dest('dist/css'));
});

/* 压缩 JS 文件 */
gulp.task('handleJs', function(cb) {
	pump([
        gulp.src('src/js/*.js'),
		uglify(),
		gulp.dest('dist/js')
    ], cb);
});

/* 压缩图片 */
gulp.task('handleImg', function() {
	return gulp.src('src/images/**/*')
			   .pipe(imageMin([
					imageMin.gifsicle({optimizationLevel: 2}),		//压缩gif
					imageMin.jpegtran({progressive: true}),			//压缩jpg
					imageMin.optipng({optimizationLevel: 3}),		//压缩png
					imageMin.svgo({									//压缩svg
						plugins: [
							{removeViewBox: true},
							{cleanupIDs: false}
						]
					})
			   ]))
			   .pipe(gulp.dest('dist/images'));
});

/* 按顺序执行任务 */
gulp.task('default', ['handleHtml','compileCss','handleCss','handleJs','handleImg'], function() {
	console.log('编译完成！');
});

/* 监听文件修改 */
gulp.task('watch', function() {
	console.log("已启动文件监听程序！");
	gulp.watch(['src/*.html'], function(e) {
		return gulp.src(e.path)			
			   .pipe(fileInclude({
					prefix: '@@',			
					basepath: '@file',		
					context: {}				
				}))
			   .pipe(htmlMin({
				   removeComments: true,				
				   collapseWhitespace: true,			
				   minifyJS: true,						
				   minifyCSS: true						
				}))
			   .pipe(gulp.dest('dist'));
	});
	gulp.watch(['src/public/*.html'], ['handleHtml']);
	gulp.watch(['src/css/*.scss'], ['compileCss','handleCss']);
	gulp.watch(['src/js/*.js'], function(e) {
		pump([
			gulp.src(e.path),
			uglify(),
			gulp.dest('dist/js')
		], e);
	});
	gulp.watch(['src/images/*'], function(e) {
		return gulp.src(e.path)
			   .pipe(imageMin([
					imageMin.gifsicle({optimizationLevel: 2}),		//压缩gif
					imageMin.jpegtran({progressive: true}),			//压缩jpg
					imageMin.optipng({optimizationLevel: 3}),		//压缩png
					imageMin.svgo({									//压缩svg
						plugins: [
							{removeViewBox: true},
							{cleanupIDs: false}
						]
					})
			   ]))
			   .pipe(gulp.dest('dist/images'));
	});
});