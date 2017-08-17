{
	"id":
		"military",
	"label":
		"Military suspension period",
	"select":
		"SELECT mdi.cap_flag, mdi.end_date, mdi.update_date, mdi.creation_date
			FROM bsl.bsl_military_deployment_int mdi
			JOIN bsl.bsl_contract c
			ON c.id=mdi.contract_id
			WHERE <binding>",
	"binds":
		{
			"contractSprintCode":
				"c.sprint_code=:contractSprintCode"
		}
}   