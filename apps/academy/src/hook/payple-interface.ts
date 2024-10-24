export interface RegisterPaypleCard {
	PCD_PAY_TYPE: string // e.g., "card"
	PCD_PAY_WORK: string // e.g., "AUTH"
	PCD_CARD_VER: string // e.g., "01"
	PCD_PAYER_NAME: string // e.g., "홍길동"
	PCD_PAYER_EMAIL: string // e.g., "dev@payple.kr"
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	callbackFunction?: (result: any) => void // Optional, based on the commented-out line
	clientKey: string // e.g., "test_DF55F29DA654A8CBC0F0A9DD4B556486"
	PCD_RST_URL: string // e.g., "/order_result.php"
}

export interface PaypleResponse {
	PCD_PAY_RST: 'success' | 'error' | 'close'
	PCD_PAY_CODE: string
	PCD_PAY_MSG: string
	PCD_PAY_TYPE: 'card' | 'transfer'
	PCD_CARD_VER?: string
	PCD_PAY_WORK: string
	PCD_AUTH_KEY: string
	PCD_PAY_REQKEY: string
	PCD_PAY_HOST: string
	PCD_PAY_URL?: string
	PCD_PAY_COFURL?: string
	PCD_PAYER_ID: string
	PCD_PAYER_NO: string
	PCD_PAYER_NAME: string
	PCD_PAYER_HP: string
	PCD_PAYER_EMAIL: string
	PCD_PAY_OID: string
	PCD_PAY_GOODS: string
	PCD_PAY_AMOUNT: string
	PCD_PAY_DISCOUNT?: string
	PCD_PAY_AMOUNT_REAL: string
	PCD_PAY_TOTAL: string
	PCD_PAY_TAXTOTAL: string
	PCD_PAY_ISTAX: 'Y' | 'N'
	PCD_PAY_CARDNAME?: string
	PCD_PAY_CARDNUM?: string
	PCD_PAY_CARDQUOTA?: string
	PCD_PAY_CARDTRADENUM?: string
	PCD_PAY_CARDAUTHNO?: string
	PCD_PAY_CARDRECEIPT?: string
	PCD_PAY_TIME: string
	PCD_SIMPLE_FLAG: string
	PCD_RST_URL: string
	PCD_PAY_BANKACCTYPE?: 'personal' | 'company'
	PCD_PAY_BANK?: string
	PCD_PAY_BANKNAME?: string
	PCD_PAY_BANKNUM?: string
	PCD_TAXSAVE_MGTNUM?: string
	PCD_LINK_ADD_PARAM?: string
}
