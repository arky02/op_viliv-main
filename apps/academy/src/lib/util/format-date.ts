export function formatDate(date: Date) {
	const year = date.getFullYear().toString().slice(2)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const weekDay = date.toLocaleDateString('ko-KR', {
		weekday: 'short'
	})

	return `${year}년 ${month}월 ${day}일(${weekDay})`
}
