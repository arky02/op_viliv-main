/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: [
			'puppeteer-core',
			'@sparticuz/chromium',
			'plyr'
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'fcbnsdgsjfktbbmtbupr.supabase.co'
			},
			{
				protocol: 'http',
				hostname: 'k.kakaocdn.net'
			},
			{
				protocol: 'http',
				hostname: 't1.kakaocdn.net'
			},
			{
				protocol: 'http',
				hostname: 'img1.kakaocdn.net'
			},
			{
				protocol: 'https',
				hostname: 'viliv.ngrok.dev'
			}
		]
	}
}
module.exports = nextConfig
