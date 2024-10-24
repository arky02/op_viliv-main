'use server'
import puppeteer from 'puppeteer'

export async function generatePDF(
	url: string,
	outputPath: string
) {
	try {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(url, { waitUntil: 'networkidle0' })
		await page.pdf({
			path: outputPath,
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
	} catch (e) {
		console.error(e)
	}
}
