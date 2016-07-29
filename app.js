var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

var DEVELOPMENT = 'development';
var PRODUCTION = 'production';
var env = process.env.NODE_ENV || DEVELOPMENT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Bower Components */
app.use('/statics', express.static(path.join(__dirname, 'bower_components')));

/* Angular Templates */
app.use('/admin/view', express.static(path.join(__dirname, 'templates/admin')));
app.use('/client/view', express.static(path.join(__dirname, 'templates/client')));

/* Routes */
app.use('/', require('./routes/index'));

// use webpack-dev-middleware for DEVELOPMENT
if (env == DEVELOPMENT) {

  var config = require('./webpack.config.dev');
  var compiler = webpack(config);

  var middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.use('/admin', express.static(path.join(__dirname, config.output.publicPath)));
  app.get('/admin/*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'admin/dev.html'));
  });

  app.use('/client', express.static(path.join(__dirname, config.output.publicPath)));
  app.get('/client/*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'client/dev.html'));
  });

} else {

  app.use('/admin', express.static(path.join(__dirname, 'dist/admin')));
  app.get('/admin/*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/admin/index.html'));
  });

  app.use('/client', express.static(path.join(__dirname, 'dist/client')));
  app.get('/client/*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/client/index.html'));
  });
}


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
