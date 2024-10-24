/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

export async function POST(req: Request) {
	const { url } = await req.json()
	const chromium = require('@sparticuz/chromium')
	const puppeteer = require('puppeteer-core')

	console.log(url)

	if (!url) {
		return new Response(
			JSON.stringify({ error: 'URL is required' }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	}

	try {
		const chromiumPath = await chromium.executablePath()
		const browser = await puppeteer.launch({
			args: [
				...chromium.args,
				'--hide-scrollbars',
				'--disable-web-security'
			],
			defaultViewport: chromium.defaultViewport,
			executablePath: chromiumPath,
			headless: true,
			ignoreHTTPSErrors: true
		})
		const page = await browser.newPage()

		await page.goto(url, { waitUntil: 'networkidle2' })

		const pdf = await page.pdf({
			format: 'A3',
			printBackground: true,
			displayHeaderFooter: true,
			headerTemplate: '<span></span>',
			footerTemplate: `
				<div style="width: 100%; text-align: center; font-size: 10px; padding: 5px 0;">
					<span class="pageNumber"></span> / <span class="totalPages"></span>
				</div>
			`,
			margin: {
				top: '50px',
				bottom: '50px'
			}
		})

		await browser.close()

		return new Response(pdf, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition':
					'attachment; filename=exported.pdf'
			}
		})
	} catch (error) {
		console.error('PDF 생성 실패:', error)
		return new Response(
			JSON.stringify({ error: 'Failed to generate PDF' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	}
}
