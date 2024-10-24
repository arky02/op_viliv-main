export async function downloadPDF(url: string) {
	try {
		const response = await fetch('/api/pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		})

		if (response.ok) {
			const blob = await response.blob()
			const link = document.createElement('a')
			link.href = window.URL.createObjectURL(blob)
			link.download = 'lecture-details.pdf'
			document.body.appendChild(link)
			link.click()
			link.remove()
		} else {
			alert('PDF 생성 실패')
		}
	} catch (error) {
		console.error('PDF 생성 중 오류 발생:', error)
		alert('PDF 생성 중 오류 발생')
	}
}
