/* eslint-disable @typescript-eslint/use-unknown-in-catch-callback-variable */
/* eslint-disable camelcase */
class AiService {
	private host: string

	constructor() {
		this.host = 'https://viliv.ngrok.dev'
	}

	private async getAuthToken() {
		const secret = '7rSkPPtKtz%@In+G=XbrGN5f:p`U_W'
		const body = new URLSearchParams()
		body.append('admin_key', secret)

		const result = await fetch(`${this.host}/api/token`, {
			method: 'POST',
			body,
			cache: 'no-store'
		})

		const token = await result.json()

		return token as {
			access_token: string
		}
	}

	async analyzeVideo(videoUrl: string, lectureId: string) {
		const { access_token } = await this.getAuthToken()
		const webhookUrl = `${window.location.origin}/api/analyze`;

		console.log('analyzeVideo - Access token: ', access_token)

		const body = new URLSearchParams()
		body.append('analyzeVideo - video_url: ', videoUrl)
		body.append('analyzeVideo - webhook_url: ', webhookUrl)
		body.append('analyzeVideo - lecture_id: ', lectureId)

		const headers = new Headers()
		// headers.set('Authorization', `Bearer ${access_token}`)
		headers.set(
			'Content-Type',
			'application/x-www-form-urlencoded'
		)
		headers.set(
			'X-Secret-Key',
			'.Ov^z$/BnoK3ijTTbk21`E>_=^]]Wl'
		)

		const res = await fetch(`${this.host}/api/analyze`, {
			// mode: 'cors',
			headers,
			method: 'POST',
			body
			// cache: 'no-store'
		}).catch((error) => {
			console.error('Error analyzing video:', error)
		})

		console.log(headers)

		if (!res) {
			throw new Error('비디오 분석 중 오류가 발생했습니다.')
		}

		console.log('analyzeVideo - res: ', res)

		const data = await res.json()

		console.log('analyzeVideo - 응답 데이터: ', data)
	}
}

export const aiService = new AiService()
