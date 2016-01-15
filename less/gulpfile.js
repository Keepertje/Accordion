var gulp = require('gulp');
var less = require('gulp-less');
var inject = require('gulp-inject');
var del = require('del');
var watch =require('gulp-watch');

gulp.task('build',['clean'],() => {     
      gulp.src(['./*.less'])
     .pipe(less())
      .pipe(gulp.dest('../accordion/css'));
});

gulp.task('watch',()=>{
     gulp.src(['./*.less'])
    .pipe(watch(['./*.less'],()=>{
        gulp.start('build');
    })
    );
})

//Throw away the old build
gulp.task('clean', () => {
  console.log('Clean old build');
  del(['../accordion/css']);
});

