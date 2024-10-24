import Image from 'next/image'
import LandingEffectImage1 from '@/lib/asset/image/landing-effect-1.png'
import LandingEffectImage2 from '@/lib/asset/image/landing-effect-2.png'

export function LandingEffectArea() {
	return (
		<div className="pc:m-[120px] flex flex-col gap-20">
			<div className="flex flex-col items-center justify-center gap-8">
				<div className="text-primary pc:text-2xl text-lg font-semibold">
					이런 효과가 있었어요
				</div>
				<div className="pc:text-4xl flex flex-col items-center justify-center gap-2 text-2xl font-bold">
					학생과 학원 모두가 만족했어요
				</div>
			</div>
			<div className="max-pc:flex-col flex justify-center gap-10">
				<Image
					src={LandingEffectImage1}
					alt="landing-effect-1"
					className="pc:w-[431px] w-full"
				/>
				<Image
					src={LandingEffectImage2}
					alt="landing-effect-2"
					width={431}
					className="pc:w-[431px] w-full"
				/>
			</div>
		</div>
	)
}
