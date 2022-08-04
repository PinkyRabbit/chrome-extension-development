const gulp = require("gulp");
const run = require("gulp-run");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");
const plumber = require("gulp-plumber");

const TASK = {
  MANIFEST: "manifest",
  EXTENSION: "extension",
  TOOLBAR: "toolbar",
  WATCH: "watch-for-changes",
};

gulp.task(TASK.MANIFEST, () => {
  return run("node src/manifest.js").exec();
});

gulp.task(TASK.EXTENSION, () =>
  gulp
    .src("src/extension/main.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(plumber())
    .pipe(gulp.dest("dist")),
);

gulp.task(TASK.TOOLBAR, () => {
  return gulp
    .src("src/toolbar/popup.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("dist/toolbar"));
});

gulp.task(TASK.WATCH, () => {
  gulp.watch("src/manifest.js", gulp.series("manifest"));
  gulp.watch("src/extention/*.js", gulp.series("extension"));
  gulp.watch("src/toolbar/*.*", gulp.series("toolbar"));
});

const tasks = [TASK.MANIFEST, TASK.EXTENSION, TASK.TOOLBAR, TASK.WATCH];
gulp.task("default", gulp.series(...tasks));
