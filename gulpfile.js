/*
 * --->  Loading External Node.js Modules  <------
 */

var gulp = require('gulp');
var express = require('express');
var connectLivereload = require('connect-livereload');
var opn = require('opn');
var gulpLivereload = require('gulp-livereload');
var path = require('path');
var os = require('os');
var fs = require('fs');
// var https = require('https');
var https = require('http');

/*
 * ---------->  Main Config  <-------------
 */
var config = {

  // this is your local directory to become served as root,
  // e.g. `localhost:8080` should point to show `index.html` in that directory
  rootDir: 'www',
  serverAddr: 'localhost',

  // any port to use for your local server
  servingPort: 8080,

  // the files you want to watch for changes for live reload
  // replace by any glob pattern matching your files
  filesToWatch: ['www/**/*.{html,css,js,jpg}']
}

/*
 * ---------->  Gulp Tasks  <-------------
 */

// The default task - called when you run `gulp` from CLI
// gulp.task('default', ['watch', 'connect']);
gulp.task('default', ['watch', 'serve']);

// `gulp watch` task watching for file changes
gulp.task('watch', ['connect'], function () {

  // start livereload server (at the default port 35729)
  //   https://github.com/vohof/gulp-livereload#install
  gulpLivereload.listen();

  // watch for file changes
  gulp.watch(config.filesToWatch, function(file) {

    // get the changed file
    //   not needed here but useful for fine grained customizations
    gulp.src(file.path)

      // notify server about changes
      .pipe(gulpLivereload());
  });
});

// `gulp serve` task loading the URL in your browser
gulp.task('serve', ['connect'], function () {
  opn('http://localhost:' + config.servingPort + '/index.html');
});

// `gulp connect` task starting your server
gulp.task('connect', function(){

  // connect server for our files (unrelated to the livereload server)
  var app = express();

  // inject JavaScript into our page with `index.html` to listen for change notifications:
  //   <script src="//localhost:35729/livereload.js?snipver=1"></script>
  app.use(connectLivereload());

  // specify the root directory for our connect server
  app.use(express.static(config.rootDir));

  var server = https.createServer(app);
  server.listen(config.servingPort);
});
