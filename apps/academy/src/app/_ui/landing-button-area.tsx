import { Button } from '@design-system/ui'
import Link from 'next/link'

interface LandingButtonAreaProps {
	isSignedIn: boolean
}

export function LandingButtonArea({
	isSignedIn
}: LandingButtonAreaProps) {
	return (
		<div className="bg-secondary pc:m-[120px] pc:gap-10 pc:py-20 flex flex-col items-center gap-6 rounded-xl py-10">
			<div className="pc:text-4xl pc:font-bold flex flex-col gap-2 text-center text-lg font-semibold">
				<div>VIdeo Lecture&apos;s Innovative Viewer</div>
				<div>빌리브와 함께하세요</div>
			</div>
			<Button size="lg" asChild className="w-fit">
				<Link href={isSignedIn ? '/academy' : '/start'}>
					시작하기
				</Link>
			</Button>
		</div>
	)
}
