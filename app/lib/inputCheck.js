var debug = require('debug')('infomat:inputCheck');
var path = require('path');
var config = require('../../cfg/config');

var qParser = require('./parseFiles');
var webData;


var checkRequestValidity = function(reqBody) {
  webData = qParser.getWebData();
  if (!reqBody.fieldId)
    return 'fieldID not specified.';
  if (!reqBody.inputText)
    return 'inputText not specified.';
  if (!reqBody.queries)
    return 'queries array not specified.';
  if (reqBody.queries.length < 1)
    return 'queries array contains zero elements.';
  
  fieldId = reqBody.fieldId;
  inputText = reqBody.inputText;
  queries = reqBody.queries;
  
  // check if fieldId exists
  if (!webData.fields.hasOwnProperty(fieldId))
    return 'fieldID is incorrect.';
  
  // if dataType = 'string' check string length
  if (webData.fields[fieldId].dataType === 'string') {
    if (inputText.length < webData.fields[fieldId].minLength)
      return 'inputText is too short';
    if (inputText.length > webData.fields[fieldId].maxLength)
      return 'inputText is too long';
  }
  
  debug(webData.fields[fieldId].options);
  
  // checks if queries is array and if all are valid options
  if (!Array.isArray(queries))
    return 'queries has to be an array';
  for (i = 0; i < queries.length; i++) {
    isValidQuery = webData.fields[fieldId].options.indexOf(queries[i]);
    if (isValidQuery < 0)
      return 'query: "' + queries[i] + '" is invalid.'
  }
  
  return true;
}


module.exports.checkRequestValidity = checkRequestValidity;