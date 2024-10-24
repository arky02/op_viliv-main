import { authService } from '@providers/auth'
import { GlobalFooter } from './_ui/global-footer'
import { GlobalHeader } from './_ui/global-header'
import { LandingArea } from './_ui/landing-area'
import { MobileStickyStartButton } from './_ui/mobile-sticky-start-button'

export default async function Home() {
	const session = await authService.getMySession()
	const isSignedIn = !!session

	return (
		<main className="bg-background m-auto flex w-full flex-col items-center justify-center">
			<GlobalHeader isSignedIn={isSignedIn} />
			<LandingArea isSignedIn={isSignedIn} />
			<div className="h-[200px]" />
			<MobileStickyStartButton />
			<GlobalFooter />
		</main>
	)
}
