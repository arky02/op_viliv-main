export interface SendShortSMSRequest {
	to: string
	text: string
}

export interface SendKakaoAlimtalkRequest {
	to: string
	templateId: string
	variables: Record<`#{${string}}`, string>
	scheduledDate?: Date
}
