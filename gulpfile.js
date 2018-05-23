var gulp = require("gulp");
var sass = require("gulp-sass");
var gulpIf = require("gulp-if");
var plumber = require("gulp-plumber");
var eslint = require("gulp-eslint");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var autoprefix = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");

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

//Lint JS/JSX files
gulp.task("eslint", function() {
	return gulp
		.src(jsFiles.source)
		.pipe(
			eslint({
				baseConfig: {
					ecmaFeatures: {
						jsx: true
					}
				}
			})
		)
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

//convert sass to css
gulp.task("sass", function() {
	return gulp
		.src("./src/style/scss/*.scss") // Gets all files ending with .scss in app/scss
		.pipe(sass())
		.pipe(gulp.dest("./src/style/css"));
});

// CSS concat, auto prefix, minify, then rename output file
gulp.task("minify-css", function() {
	var cssPath = {
		cssSrc: ["./src/style/css/*.css", "!*.min.css", "!/**/*.min.css"],
		cssDest: "./contentbuild/css/"
	};

	return gulp
		.src(cssPath.cssSrc)
		.pipe(concat("styles.css"))
		.pipe(autoprefix("last 2 versions"))
		.pipe(minifyCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(cssPath.cssDest));
});

// // default gulp task
gulp.task("default", ["sass", "minify-css"], function() {
	//watch for sass changes
	gulp.watch("./src/style/scss/*.scss", ["sass"]);
	// watch for CSS changes
	gulp.watch("./src/style/css/*.css", ["minify-css"]);
});
