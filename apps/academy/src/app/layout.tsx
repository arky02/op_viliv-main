import type { Metadata } from 'next'
import AuthProvider from '@providers/auth/auth-provider'
import './globals.css'
import { Toaster } from '@design-system/ui'

export const metadata: Metadata = {
	title: {
		default: '빌리브',
		template: '%s | 빌리브'
	},
	description:
		'강의를 PDF로 간편하게 변환, 시간과 노력을 절약하세요'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="kr">
			<body className="bg-secondary">
				<AuthProvider>{children}</AuthProvider>
				<Toaster />
			</body>
		</html>
	)
}
