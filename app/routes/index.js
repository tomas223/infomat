var express = require('express');
var router = express.Router();
var qParser = require('../lib/parseFiles');

/* GET home page. */




router.get('/', function(req, res, next) {
  res.render('index', {
		title: 'Infomat',
    user: req.session.user,
		webData: JSON.stringify(qParser.getWebData()),
	});
    
});



module.exports = router;




// Temporary variable
optns = {
  queries: {
    contr1: "Basic Contract Dataa",
    contr2: "Detailed Contract Data",
    contr_list: "List of contracts",
    contr_history: "Contract history",
    installment: "Installment schedule",
    customer1: "Basic customer data",
    customer2: "Blaze score",
    military: "Military deployment",
    contract_count1: "Contract count 10mins/24h"
  },
  fields: {
    ban: {
      id: "ban",
      label: "BAN",
      options: ["contr1", "contr2", "contr_history", "installment", "customer1", "customer2", "military"]
    },
    contr: {
      id: "contractScprintCode",
      label: "Contract SprintCode",
      options: ["contr1", "contr2", "contr_history", "installment"]
    },
    other: {
      id: "other",
      label: "Other",
      options: ["contract_count1"]
    }
      // "BAN": ["contr1", "contr2", "contr_history", "installment", "customer1", "customer2", "military"],
      // "Contract SprintCode": ["contr1", "contr2", "contr_history", "installment"],
      // "Other": ["contract_count1"]
  }
};