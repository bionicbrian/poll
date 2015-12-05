"use strict";

var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");

function onError(e) {
    console.error("ERROR: " + e.message);
}

function bundleIt() {
    function bundle() {
        return b.bundle()
            .on("error", onError)
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("public/js"));
    }

    var b = browserify({
            entries: ["src/js/main.js"],
            cache: {},
            packageCache: {},
            plugin: [watchify]
        })
        .transform(babelify.configure({
            presets: ["es2015", "react"]
        }))
        .on("update", bundle);

    return bundle();
}

gulp.task("default", bundleIt);
