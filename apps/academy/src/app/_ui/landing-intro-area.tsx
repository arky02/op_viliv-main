import { Button } from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'
import LandingIntroImage from '@/lib/asset/image/landing-intro.png'

interface LandingIntroAreaProps {
	isSignedIn: boolean
}

export function LandingIntroArea({
	isSignedIn
}: LandingIntroAreaProps) {
	return (
		<div className="pc:py-[120px] pc:max-w-[1200px] mx-auto flex flex-col items-center gap-20">
			<div className="flex flex-col items-center justify-center gap-[60px]">
				<div className="flex flex-col items-center justify-center gap-4">
					<div className="text-secondary-foreground pc:text-5xl text-2xl font-bold">
						시간과 노력을 절약하세요
					</div>

					{/* PC에서 보이는 텍스트 */}
					<div className="pc:text-7xl text-center text-3xl font-bold">
						강의를 PDF로 간편하게{' '}
						<span className="max-pc:block">변환해 드려요</span>
					</div>
				</div>
				{/* PC에서 보이는 텍스트 */}
				<div className="max-pc:hidden flex flex-col items-center justify-center gap-2 text-xl font-semibold">
					<div>
						빌리브는 강의 내용을 신속하게 분석하여 핵심 정보를
						추출하여 깔끔한 PDF 형식으로 변환해드려요
					</div>
					<div>
						학습자는 효율적으로 복습할 수 있으며, 시간과 노력을
						절약할 수 있어요
					</div>
				</div>
				{/* 모바일에서 보이는 텍스트 */}
				<div className="pc:hidden flex flex-col items-center justify-center gap-1 text-base font-semibold">
					<div>
						빌리브는 강의 내용을 신속하게 분석하여 핵심 정보를
					</div>
					<div>추출하여 깔끔한 PDF 형식으로 변환해드려요</div>
					<div>학습자는 효율적으로 복습할 수 있으며,</div>
					<div>시간과 노력을 절약할 수 있어요</div>
				</div>

				<Button
					className="max-pc:hidden w-fit"
					asChild
					size="lg"
				>
					<Link href={isSignedIn ? '/academy' : '/start'}>
						빌리브 시작하기
					</Link>
				</Button>
			</div>

			<Image
				src={LandingIntroImage}
				alt="landing-intro"
				className="pc:w-[800px] w-[358px]"
			/>
		</div>
	)
}
