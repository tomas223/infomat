var fs = require('fs');
var debug = require('debug')('infomat:parseFiles');
var util = require('util');
var path = require('path');
var config = require('../../cfg/config');

var fieldsFile = require(path.resolve(config.fieldsFile));
var queriesDir = path.resolve(config.queriesFolder);

var allDbQueries = {};
var webData = {};

// Callback cb(null) is called when all files are processed, successfuly or not
// cb(err) is called only when 0 files were processed
var readFiles = function(dirName, onData, cb) {
	fs.readdir(dirName, function(err, filenames) {
		if (err) {
			return cb(err);
		}
		var iter = filenames.length;
		if (iter === 0) {
			return cb('No matching files found');
		}
		filenames.forEach(function(filename) {
			fs.readFile(path.join(dirName, filename), 'utf-8', function(err, content) {
				if (err) {
          debug(err);
				}
				onData(err, filename, content);
				iter -= 1;
				if (iter === 0)
					return cb(null);
			});
		});
	});
}


var loadFiles = function(callback) {
	var fileCount = 0;
	allDbQueries = {};
		
	readFiles(queriesDir, function(err, filename, content) {
		++fileCount;
		if (err)
      return debug("Error reading file: '" + filename + "' -> " + err);
    fileExtension = path.extname(path.join(queriesDir, filename));
    if (fileExtension !== '.jss')
      return debug("File '" + filename + "' has incorrect extension. Skipping");
		try {
			var jsonOut = JSON.parse(content.replace(/[\r\n\t ]+/g, " "));
		}
		catch (err) {
			console.log(err);
			return debug("JSON parsing error on '" + filename + "': " + err);
		}
		// TODO add more data checks
		if (!jsonOut.id)
			return debug("'id' element missing in file '" + filename + "'");
    if (!jsonOut.label)
			return debug("'label' element missing in file '" + filename + "'");
    if (!jsonOut.select)
			return debug("'select' element missing in file '" + filename + "'");
    if (!jsonOut.binds)
			return debug("'binds' element missing in file '" + filename + "'");
    
    
    
    allDbQueries[jsonOut.id] = jsonOut;
    return debug("File '" + filename + "' successfuly processed.");
				
	}, function(err) {
		if (err) {
			return callback(err);
		}
		successFiles = Object.keys(allDbQueries).length;
		debug(successFiles + ' from ' + fileCount + ' files were succesfuly parsed');
		if (successFiles === 0) {return callback('Error, 0 files processed')}
		return callback(null, allDbQueries);
	});
};

var createOutputData = function(callback) {
	webData = {
		queries: {},
		fields: {}
	};
	
	loadFiles(function(err, filesData) {
		if (err) {
			console.log('Error creating input data: ' + err);
			console.log(err);
			return callback(err);
		}
		for (var key in fieldsFile) {
			webData.fields[fieldsFile[key].id] = {
				id: fieldsFile[key].id,
				label: fieldsFile[key].label,
        dataType: fieldsFile[key].dataType,
        minLength: fieldsFile[key].minLength,
        maxLength: fieldsFile[key].maxLength,
				options: []
			};
		};
		
		// Parsing JSONs exported from all other files
		for (var key in filesData) {
			webData.queries[key] = filesData[key].label;
			
			var binds = filesData[key].binds;
			for (var i in binds) {
				if (webData.fields.hasOwnProperty(i)) {
					var opt = filesData[key].id;
					webData.fields[i].options.push(opt);
				}
			}
		}
		
		debug("-------------- webData ----------------")
		console.log(JSON.parse(JSON.stringify(webData)));
		callback(null);
		
	});
}

function getWebData() {
//	console.log(webData);
	return webData;
};

var getFilesData = function() {
	return allDbQueries;
};

var getQuery = function(queryId, bindID) {
  console.log(queryId + bindID);
	query = allDbQueries[queryId].select;
	binding = allDbQueries[queryId].binds[bindID];
	ret = query.replace('<binding>', binding);
	return ret;
}


module.exports = {
	prepareData: createOutputData,
	webData: webData,
  getWebData: getWebData,
	filesData:  allDbQueries,
  getFilesData: getFilesData,
	getQuery: getQuery
}