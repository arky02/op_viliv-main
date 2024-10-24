/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
interface PaypleToken {
	cstId: string
	custKey: string
	AuthKey: string
	PCD_PAY_HOST: string
	PCD_PAY_URL: string
	returnUrl: string
}

interface PaymentByBillingKeyParams {
	billingKey: string
	title: string
	amount: number
}

class PaypleService {
	private formatPhoneNumber(phoneNumber: string) {
		if (!phoneNumber) return ''
		let standardNumber = phoneNumber.replace(/\D/g, '')

		if (standardNumber.startsWith('8210')) {
			standardNumber = `010${standardNumber.substring(4)}`
		}

		return standardNumber
	}

	async getPaypleToken() {
		console.log('Payple Token API 호출')
		console.log(
			'환경 변수:',
			process.env.PAYPLE_API_URL,
			process.env.PAYPLE_HTTP_REFERER,
			process.env.PAYPLE_cstId,
			process.env.PAYPLE_CUST_KEY
		)
		const apiUrl = process.env.PAYPLE_API_URL || ''
		const result = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				referer: process.env.PAYPLE_HTTP_REFERER || ''
			},
			body: JSON.stringify({
				cstId: process.env.PAYPLE_cstId || '',
				custKey: process.env.PAYPLE_CUST_KEY || '',
				PCD_PAY_TYPE: 'card',
				PCD_SIMPLE_FLAG: 'Y'
			})
		})
			.then((res) => {
				if (!res) return null
				return res.text()
			})
			.then((text) => {
				console.log('Raw response Token:', text)

				if (!text) return null
				return JSON.parse(text)
			})

		if (!result) throw new Error('Payple Token API Error')

		if (result.result !== 'success')
			throw new Error(result.resultMsg)

		console.log('token result-----', result)

		const {
			cstId,
			custKey,
			AuthKey,
			returnUrl
		}: PaypleToken = result
		return { cstId, custKey, AuthKey, returnUrl }
	}

	async paymentByBillingKey(
		params: PaymentByBillingKeyParams
	) {
		return true

		const { cstId, custKey, AuthKey, returnUrl } =
			await this.getPaypleToken()
		console.log('Return URL:', returnUrl)

		const apiUrl = returnUrl

		try {
			console.log('Payple 결제 API 호출')
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
					Referer: 'http://localhost:3000'
				},
				body: JSON.stringify({
					PCD_cstId: cstId,
					PCD_CUST_KEY: custKey,
					PCD_AUTH_KEY: AuthKey,
					PCD_PAY_TYPE: 'card',
					PCD_PAYER_ID: params.billingKey,
					PCD_PAY_GOODS: params.title,
					PCD_PAY_TOTAL: params.amount,
					PCD_SIMPLE_FLAG: 'Y'
					// PCD_PAYER_HP: this.formatPhoneNumber(params.phoneNumber),
					// PCD_PAYER_EMAIL: params.email,
				})
			})

			if (!response.ok) {
				const errorText = await response.text()
				throw new Error(
					`HTTP 오류: ${response.status} - ${errorText}`
				)
			}

			const text = await response.text()
			console.log('원시 응답:', text)

			const result = JSON.parse(text)

			if (result.PCD_PAY_RST !== 'success') {
				throw new Error(result.resultMsg)
			}

			// 결제 금액 검증을 원하시면 다음 코드를 활성화하세요
			// if (+result.PCD_PAY_TOTAL !== params.amount) {
			//     throw new Error('실제 결제 금액이 일치하지 않습니다.');
			// }

			return result
		} catch (error: any) {
			console.error('paymentByBillingKey 오류:', error.message)
			throw new Error(`결제 처리 실패: ${error.message}`)
		}
	}
}

export const paypleService = new PaypleService()
