var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../../cfg/config');

var fieldsFile = require(path.resolve(config.fieldsFile));

//var allFields = require('../config/fields');

router.all(function(req, res, next) {
  setTimeout(function() {
    next();
  }, 3000);
})

router.get('/', function(req, res, next) {
  res.render('settings', {
    title: 'Infomat - Settings',
    fieldsConfig: fieldsFile,
  });
});


module.exports = router;