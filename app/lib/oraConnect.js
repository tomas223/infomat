var async = require('async');
var oracledb = require('oracledb');
var config = require('../../cfg/config');
var debug = require('debug')('infomat:oraConnect');

var dbConfig = config.dbConfig;

// Properties are applicable to all connections and SQL executions.
// They can also be set or overridden at the individual execute() call level
//
// This script sets outFormat in the execute() call but it could be set here instead:
// oracledb.outFormat = oracledb.OBJECT;


var checkDbAccess = function(username, password, cb) {
  oracledb.getConnection(
    {
      user          : username,
      password      : password,
      connectString : dbConfig.connectString
    },
    function(err, conn) {
      if (conn) {
        dorelease(conn);
        debug("DB connection released.");
			}
      debug('--  error -- ');
      debug(err);
      if (err) {
//        debug(err);
        debug("DB access check FAIL.");
        return cb(err);
      }
			else
        return cb(err, username);
		});
};

var doconnect = function(cb) {
  oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
    function(err, conn) {
      debug('Error: ' + err);
      debug('Connection: ' + conn);
			return cb(err, conn);
		});
};

var dorelease = function(conn) {
  conn.close(function (err) {
    if (err)
      console.error(err.message);
  });
};

// Default Array Output Format
var doquery_array = function (query, bind, conn, cb) {
  conn.execute(
    query,
		bind,
    function(err, result)
    {
      if (err) {
        return cb(err, conn);
      } else {
        return cb(null, conn, result);
      }
    });
};


var executeselect = function(query, bind, callback) {
    async.waterfall(
      [
        doconnect,
        async.apply(doquery_array, query, bind)
      ],
      function (err, conn, result) {
        if (err) {
					console.error("In waterfall error cb: ==>", err, "<==");
					return callback(err, null);
				}
        if (conn) {
					dorelease(conn);
					debug("Connection released");
				}
//				console.log(result);
		  	callback(null, result);
      })
};

module.exports.executeselect = executeselect;
module.exports.checkDbAccess = checkDbAccess;