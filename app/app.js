var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var debug = require('debug')('infomat:app');
var config = require('../cfg/config');

// routes
var index = require('./routes/index');
var settings = require('./routes/settings');
//var users = require('./routes/users');
var ws = require('./routes/ws');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Session manager
var sessionAge = (typeof config.session.time === 'number')
  ? config.session.time
  : 5 * 60 * 1000;
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  name: 'session-id',
  cookie: { maxAge: sessionAge }  
}));

// req+res debug output
app.use(function(req, res, next) {
  debug(req.session);
  debug('xhr: ' + req.xhr);
  return next();
});

app.all('/', isLogged, index);
app.use('/settings', isLogged, settings);
app.use('/ws', isLogged, ws);
app.use('/logout', logout);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler for XHR
app.use(function(err, req, res, next) {
  debug('XHR error: ');
  debug(err);
  if (req.xhr) {
    res.json({error: err.message});
  }
  next(err);
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function isLogged(req, res, next) {
//  debug(req.cookie);
  if (req.session.user)
    return next();
  else
    return res.redirect('./login');
};

module.exports = app;
