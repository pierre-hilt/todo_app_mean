var gulp = require('gulp')
	, nodemon = require('gulp-nodemon');
var child_process = require('child_process');

gulp.task('default', function() {
	child_process.exec("start mongod --dbpath C:/db", function(err, stdout, stderr) {
		console.log(stdout);
	})
	nodemon({
    	script: 'server.js'
  		, ext: 'js html'
  		, env: { 'NODE_ENV': 'development' }
  	})
  // place code for your default task here
});