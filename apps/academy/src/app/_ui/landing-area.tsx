import { LandingIntroArea } from './landing-intro-area'
import { LandingBackgroundArea } from './landing-background-area'
import { LandingJustifyArea } from './landing-justify-area'
import { LandingSolveArea } from './landing-solve-area'
import { LandingSolutionArea } from './landing-solution-area'
import { LandingEffectArea } from './landing-effect-area'
import { LandingPlanArea } from './landing-plan-area'
import { LandingButtonArea } from './landing-button-area'

interface LandingAreaProps {
	isSignedIn: boolean
}

export function LandingArea({
	isSignedIn
}: LandingAreaProps) {
	return (
		<section className="max-pc:gap-[120px] max-pc:p-4 flex flex-col">
			<LandingIntroArea isSignedIn={isSignedIn} />
			<LandingBackgroundArea />
			<LandingJustifyArea />
			<LandingSolveArea />
			<LandingSolutionArea />
			<LandingEffectArea />
			<LandingPlanArea />
			<LandingButtonArea isSignedIn={isSignedIn} />
		</section>
	)
}
