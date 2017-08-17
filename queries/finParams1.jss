{
	"id":	"finParams1",
	"label": "Financial parameters",
	"vertical": "True",
	"select":
		"SELECT fp.terms, fp.FIRST_DUE_DATE,
		fp.LOAN_PROVIDING_DATE,
		fp.EXPECTED_END_DATE,
		fp.CREATION_DATE, fp.installment_due_day,
		fp.provided_credit_amount, fp.ANNUITY_AMOUNT,
		fp.ANN_EFFECTIVE_INTEREST_RATE
		FROM bsl.bsl_financial_parameters fp
		JOIN bsl.bsl_contract c
				ON c.id=fp.contract_id
		WHERE <binding>",
	"binds":
		{
			"contractSprintCode":	"c.sprint_code=:contractSprintCode"
		}
	
}   