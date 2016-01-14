var gulp = require('gulp');
var less = require('gulp-less');
var inject = require('gulp-inject');
var del = require('del');

gulp.task('build',['styles','clean'],() => {     
      gulp.src(['./less/**/*.less'])
     .pipe(less())
      .pipe(gulp.dest('../accordion/css'));
});


//Throw away the old build
gulp.task('clean', () => {
  console.log('Clean old build');
  del(['../accordion/css']);
});

