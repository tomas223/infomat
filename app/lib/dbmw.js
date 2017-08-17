var qParser = require('./parseFiles');
var oraCon = require('./oraConnect');
var debug = require('debug')('infomat:dbmw');

var connectionDelay = 300; // time in ms to wait between each connection

/**
 * @summary         Main function of this module. Process HTTP request and returns object with DB data
 *
 * @param req       Express MW request
 * @param callback  Callback function containing with object cotnaining all DB responses
 */
var getDataFromDb = function(req, callback) {
	result = {};
  request = req.body;
	debug('Request passed to dbmw: ');
  debug(request);

	getResponses(request, function(err, queryId, data) {
    // single response
    var single = {};
		single.id = queryId;
		single.label = qParser.getWebData().queries[queryId];
		single.inputText = request.inputText;
		
		if (err) {
      debug('onResponse error: '+ err);
			single.message = 'Error';
			single.result = 'Error: ' + err;
		}
		else {
			single.message = 'Successful';
			single.result = data;
      
      // table headings - removing underscores + toLowerCase + capitalize first letter in each word
      newMeta = single.result.metaData.map(function(cell) {
        return cell.name.split('_').map(function(word) {
          return word.charAt(0).concat(word.substring(1).toLowerCase());
        }).join(' ');
      });
      single.result.metaData = newMeta;
      
      // adding table vertical rendering property 
      if (qParser.getFilesData()[queryId].vertical
          && qParser.getFilesData()[queryId].vertical.toLowerCase() === 'true')
        single.result.vertical = 'True';
      else
        single.result.vertical = 'False';
    }
    result[queryId] = single;
		
	}, function(err) {
		if (Object.keys(result).length < 1)
			debug('Nothing processed');
		return callback(err, result);
	});
}

/**
 * @summary           Connects to DB via oraConnect
 * 
 * @param request     HTTP request body
 * @param onResponse  function which is triggered each time DB responds with SQL response
 * @param cb          callback function when queries from request were processed
 */
var getResponses = function(request, onResponse, cb) {
	var querCount = request.queries.length;
	var waitTime = 1 - connectionDelay;
	var bind = {};
	bind[request.fieldId] = request.inputText;
	
	for (var queryId in request.queries) {
		(function(_queryId) {
			setTimeout(function() {
				var sql = qParser.getQuery(request.queries[_queryId], request.fieldId);

				oraCon.executeselect(sql, bind, function(err, data) {
					if (err) {
						console.log('Error executing sql statement' + err);
	//					return callback(err, null);
					}
					onResponse(err, request.queries[_queryId], data);
					querCount -= 1;
					if (querCount === 0)
						return cb(null);
				});
			}, waitTime += connectionDelay);
		})(queryId);
	}
	
//	function doSetTimeOut(var) 
}


module.exports.getDataFromDb = getDataFromDb;
	
	
	
	
	
	
	
	
	
	
	
	
	
	