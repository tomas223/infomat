var express = require('express');
var router = express.Router();
var debug = require('debug')('infomat:logout');
//var session = require('express-session');

router.get('/', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err)
      debug('Error destroying session' + err);
    res.redirect('/login');
  });
});

module.exports = router;