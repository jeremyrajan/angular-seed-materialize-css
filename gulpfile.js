// Requiring Gulp
var gulp = require('gulp');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stylish = require('jshint-stylish');
var ghPages = require('gulp-gh-pages');
var fixmyjs = require("gulp-fixmyjs");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var map = require('map-stream');


var bases = {
	app: 'app/',
	dist: 'dist/',
};

var paths = {
	scripts: ['js/**/*.js', '!js/libs/**/*.js'],
	libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
	styles: ['css/**/*.css'],
	html: ['index.html', '404.html'],
	images: ['images/**/*.png'],
	extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
	fonts: ['css/font/**/*.*']
};

/*functions*/
var exitOnJshintError = map(function (file, cb) {
	if (!file.jshint.success) {
		gulp.start('clean');
		console.error('JShint failed.');
		process.exit(1);
	}
});
/*ends*/

// Delete the dist directory
gulp.task('clean', function () {
	return gulp.src(bases.dist)
		.pipe(clean());
});

//build code for dist
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
	.pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(gulp.dest(bases.dist));
});

//setup server
gulp.task('serve', ['lint', 'browserSync'], function () {
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*', ['lint', browserSync.reload]);
	gulp.watch('app/css/*', browserSync.reload);
});


//lint
gulp.task('lint', function () {
	return gulp.src(bases.app + 'js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(exitOnJshintError);

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

// Copy font files to dist directly
gulp.task('fonts', function () {
	gulp.src(paths.fonts, { cwd: bases.app })
		.pipe(gulp.dest(bases.dist + '/css/fonts/'));
});

//deploy dist folder to gh-pages for github
gulp.task('deploy', function () {
	return gulp.src('./dist/**/*')
		.pipe(ghPages());
});

//fix JS errors.
gulp.task('fix', function () {
	gulp.src("dist/js/*.js")
		.pipe(fixmyjs({
			// JSHint settings here
		}))
		.pipe(gulp.dest("./src"));
});

//build task
gulp.task('build', ['clean', 'lint', 'useref', 'fonts'], function () {

});
