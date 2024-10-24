import { authService } from '@providers/auth/auth-service'
import { redirect } from 'next/navigation'
import { isUserSignedUp } from '@/app/start/_action/is-user-signed-up'
import { LoginArea } from './_ui/login-area'

export const metadata = {
	title: '빌리브 시작하기'
}

interface StartPageProps {
	searchParams?: {
		nextPath?: string
	}
}

export default async function StartPage({
	searchParams
}: StartPageProps) {
	const nextPath = searchParams?.nextPath ?? '/'
	const session = await authService.getMySession()

	if (session) {
		const isSignedUp = await isUserSignedUp()
		isSignedUp?.data
			? redirect(nextPath)
			: redirect(`/start/new?nextPath=${nextPath}`)
	}
	return (
		<div className="bg-background flex h-screen w-full items-center justify-center">
			<LoginArea />
		</div>
	)
}
