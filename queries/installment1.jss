{
	"id":  	 "installment1",
	"label": "Installment schedule",
	"select":
"SELECT i.INSTALLMENT_NUMBER,
  to_char(i.DUE_DATE, 'DD-MON-YYYY') as DUE_DATE,
  ip.AMOUNT,
  ip.PART_TYPE,
  i.ACTIVE_FLAG,
  i.RECALCULATION_REASON_TYPE,
  i.INSTALLMENT_VERSION
FROM bsl.bsl_installment i
INNER JOIN bsl.bsl_contract c
  ON c.id=i.contract_id
INNER JOIN bsl.bsl_client cl
  on cl.ID=c.client_ID
INNER JOIN bsl.bsl_installment_part ip
  ON ip.Installment_ID=i.ID
AND <binding>
AND i.ACTIVE_FLAG=1
ORDER BY i.installment_number",
	"binds":
		{
			"contractSprintCode":
				"c.sprint_code=:contractSprintCode",
			"contractCode":
				"c.contract_code=:contractCode"
		}

}