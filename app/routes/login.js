var express = require('express');
var router = express.Router();
var debug = require('debug')('infomat:login');
var oraCon = require('../lib/oraConnect');

 var util = require('util');


router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Infomat - login',
    user: req.session.user
  });
});

router.post('/', function(req, res, next) {
  var data = req.body;
  if (!data.userName || typeof(data.userName) !== 'string' || data.userName.length < 1)
    return res.status(400).json({error: 'userName not defined correctly'});
  if (!data.inputPassword || typeof(data.inputPassword) !== 'string' || data.inputPassword.length < 1)
    return res.status(400).json({error: 'inputPassword not defined correctly'});
  
  oraCon.checkDbAccess(data.userName, data.inputPassword, function(err, user) {
    if (err) {
      debug(err);
      return res.status(400).json({error: ('' + err)});
    }
    // Creates logged sessions
    req.session.user = user; //+ Math.ceil(Math.random() * 1000); //randata.userName;
    res.json({success: (user + " successfully logged in.")});
//  });
  })
    
    
    
    
});

module.exports = router;
