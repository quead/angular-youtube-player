'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('build', function() {
    console.log('Installing packages...');
    exec('npm install', { cwd: 'dist', stdio: 'inherit' }, function (error, stdout, stderr) {
        if (stderr !== null) {
            console.log(stderr);
        }
        if (stdout !== null) {
            console.log(stdout);
        }
        if (error !== null) {
            console.log(error);
        }
    }).on('close', done);

    function done() {
        exec('npm run package', { cwd: 'dist', stdio: 'inherit' }, function (error, stdout, stderr) {
            if (stderr !== null) {
                console.log(stderr);
            }
            if (stdout !== null) {
                console.log(stdout);
            }
            if (error !== null) {
                console.log(error);
            }
        });
    }
});