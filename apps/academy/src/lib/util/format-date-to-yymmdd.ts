export function formatDateToYYMMDD(
	date: string | number | Date | undefined
) {
	if (!date) return ''

	const d = new Date(date)
	const year = d.getFullYear().toString().slice(-2) // 마지막 두 자리
	const month = String(d.getMonth() + 1).padStart(2, '0') // 월 (01-12)
	const day = String(d.getDate()).padStart(2, '0') // 일 (01-31)

	return `${year}-${month}-${day}`
}
