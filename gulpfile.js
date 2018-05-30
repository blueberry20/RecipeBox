var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var autoprefix = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var del = require("del");
var watch = require("gulp-watch");

var onError = function(err) {
	notify.onError({
		title: "Error",
		message: "<%= error %>"
	})(err);
	this.emit("end");
};

var plumberOptions = {
	errorHandler: onError
};

//convert sass to css
gulp.task("sass", function() {
	return gulp
		.src("./src/style/scss/main.scss") // Gets all files ending with .scss in app/scss
		.pipe(sass())
		.pipe(gulp.dest("./src/style/css"))
		.pipe(connect.reload());
});

//minify css file
gulp.task("minify-css", function() {
	var cssPath = {
		cssSrc: ["./src/style/css/main.css", "!*.min.css", "!/**/*.min.css"],
		cssDest: "./contentbuild/css/"
	};
	return gulp
		.src(cssPath.cssSrc)
		.pipe(autoprefix("last 2 versions"))
		.pipe(minifyCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(cssPath.cssDest))
		.pipe(connect.reload());
});

//delete old css file
gulp.task("clean", function() {
	return del(["/contentbuild/css"]);
});

// Watch
gulp.task("watch", function() {
	// Watch .scss files
	return gulp.watch("./src/style/scss/main.scss", ["sass"]);
	gulp.watch(".src/style/css/main.css", ["minify-css"]);
});

//first delete old css file, then run sass and watch
gulp.task("default", ["clean"], function() {
	gulp.start("sass", "minify-css", "watch");
});
