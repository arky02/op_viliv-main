export function getDeviceInfo() {
	const userAgent = navigator.userAgent

	// 괄호 안의 기기 정보 추출
	const match = /\((?<temp1>.*?)\)/.exec(userAgent)

	// 기기 정보만 반환
	return match ? match[1] || 'unknown' : 'unknown'
}

export function getDeviceType() {
	const width = window.innerWidth
	const userAgent = navigator.userAgent

	// 화면 크기 기준으로 기본 구분
	if (width <= 768) {
		if (/Tablet|iPad/i.test(userAgent)) {
			return 'tablet'
		}
		return 'mobile'
	}

	if (/Windows|Macintosh|Linux/i.test(userAgent)) {
		return 'pc'
	}

	return 'unknown'
}
