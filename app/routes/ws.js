var express = require('express');
var router = express.Router();
var inputCheck = require('../lib/inputCheck');
var oraCon = require('../lib/oraConnect');
var dbmw = require('../lib/dbmw');
var debug = require('debug')('infomat:ws');

var obj = {
	name: "server",
	surname: "response"
}

//router.use(inputCheck.checkRequestObject);

router.post('/requestData', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
  validity = inputCheck.checkRequestValidity(req.body);
  
  if (validity  === true) {
    dbmw.getDataFromDb(req, function(err, result) {
      if (err) {
        debug("Error: " + err);
        res.statusCode = 400;
        return res.json("Error " + err);
      }
      else {
        debug('Data successfuly received from DB.');
        debug(result);
        return res.json(result);
      }
    });
  }
  else {
    debug("Error: " + validity);
    res.statusCode = 400;
    return res.json({error: validity});
  }
                       
                       

//	dbmw.getDataFromDb(req, function(err, result) {
//		if (err) {
//			debug("Error: " + err);
//			res.statusCode = 400;
//			return res.json("Error " + err);
//		}
//		else {
//			debug('Data successfuly received from DB.');
//      debug(result);
//      return res.json(result);
//		}
		
//		console.log(JSON.parse(result));
		
//		res.json(result);
//	});

});

module.exports = router;
