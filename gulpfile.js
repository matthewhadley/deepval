/*eslint no-process-exit:0 */
'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var lintspaces = require('gulp-lintspaces');
var through2 = require('through2');
var clc = require('cli-color');

gulp.task('default', ['eslint', 'lintspaces'], function() {});

gulp.task('lintspaces', function() {
  var errors;
  return gulp.src('*.js')
    .pipe(lintspaces({
      editorconfig: '.editorconfig'
    }))
    .on('end', function(){
      if(errors){
        console.log();
        var total = 0;
        for(var file in errors){
          console.log(clc.underline(file));
          for(var ln in errors[file]) {
            errors[file][ln].forEach(function(err){
              total ++;
              console.log('  ', clc.blackBright(ln) + ':', err);
            });
          }
        }
        var problem = 'problem';
        if(total !== 1){
          problem = 'problems';
        }
        console.log('\n' + clc.red('✖', total, problem, '\n'));
        gulp.fail = true;
      }
    })
    .pipe(through2.obj(function(file, enc, cb) {
      if(Object.keys(file.lintspaces).length) {
        errors = errors || {};
        errors[file.path] = file.lintspaces;
      }
      cb();
    }));
});

gulp.task('eslint', function() {
  var errors;
  return gulp.src('*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .on('end', function(){
      if(errors){
        gulp.fail = true;
      }
    })
    .pipe(eslint.failOnError())
    .on('error', function(){
      // record that there have been errors
      errors = true;
    });
});

process.on('exit', function () {
  if(gulp.fail) {
    // return non-zero exit code
    process.exit(1);
  }
});
