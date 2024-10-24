export function convertToTimeFormatNumber(
	timestamp: number
) {
	const timeInSeconds = Math.floor(timestamp / 1000)
	const hours = Math.floor(timeInSeconds / 3600)
	const minutes = Math.floor((timeInSeconds % 3600) / 60)
	const seconds = timeInSeconds % 60
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
