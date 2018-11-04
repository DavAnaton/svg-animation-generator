var gulp = require('gulp'),
	$ = require( 'gulp-load-plugins' )({lazy: true});

var path = {
	app_index: 'index.js',
	views: 'views/*'
}

gulp.task('nodemon', function (cb) {
	var started = false;
	return $.nodemon({
		script: path.app_index,
		watch: [path.app_index],
	}).on('start', function () {
		gulp.watch(path.app_index, function(){gulp.src(path.views).pipe($.refresh())});
		if (!started) {
			cb();
			started = true; 
		}
	});
});

gulp.task('watch', function(){
	$.refresh.listen()
	gulp.watch(path.views, function(){gulp.src(path.views).pipe($.refresh())});
});

gulp.task('default', function(){
	gulp.start(
		'nodemon',
		'watch'
	)
});