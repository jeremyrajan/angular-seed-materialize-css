// Requiring Gulp
var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('serve', ['browserSync'], function () {
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*', browserSync.reload);
	gulp.watch('app/css/*', browserSync.reload);
});


// Start browserSync server
gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		port: 9393,
		notify: false,
		ui: false
	})
})
