var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , include = require('gulp-include-source')
  , watch = require('gulp-watch')
  , child_process  = require('child_process')
  , livereload = require('gulp-livereload')

// Start livereload server
function startLivereload() {
  livereload.listen(35729, function() {
      console.log('... Listening on 35729 ...');
  })
}

// reload browser if change in public
function reloadOnChange() {
  return watch(['./public/**.html'], function() {
          console.log("reload browser");
          livereload.reload()
        })
}

function rebuildIndexOnChange() {
  return watch(['client/**.js', 'client/index.html'], function() {
          console.log("something change");
          gulp.src( './client/index.html' )
          .pipe(include())
          .pipe(gulp.dest('public/'))
        })
}

// Set Gulp default task
// Run gulp
gulp.task('default', function() {
  startLivereload();
  reloadOnChange();
  rebuildIndexOnChange();
  
  // Start Mongod
  child_process.exec("start mongod --dbpath C:/db", function(err, stdout, stderr) {
    console.log(stdout);
  });

  // Start nodemon and ignore client files and gulpfile 
  nodemon({
    script: 'server.js'
    , ignore: ['client', 'gulpfile.js']
    , ext: 'js css'
    , env: { 'NODE_ENV': 'development' }
  });
});