{
	"id":
		"listContracts",
	"label":
		"Contract list",
	"select":
		"select
		distinct ctr.SPRINT_CODE, ctr.CREATION_DATE, ctr.UPDATE_DATE, ctr.CONTRACT_TYPE, ctr.STATUS, ctr.CONTRACT_CODE
		from BSL.BSL_CONTRACT ctr
		join BSL.BSL_CLIENT cl on ctr.CLIENT_ID = cl.ID
		join BSL.BSL_CLIENT_SNAPSHOT snp on cl.ID = snp.CLIENT_ID
		where 1=1
		and <binding>
		and ctr.SPRINT_CODE is not null",
	"binds":
		{
			"ban":
				"snp.BAN = :ban"
		}

}   