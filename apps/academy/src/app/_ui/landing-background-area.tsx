import Image from 'next/image'
import LandingBackgroundImage1 from '@/lib/asset/image/landing-background-1.png'
import LandingBackgroundImage2 from '@/lib/asset/image/landing-background-2.png'

export function LandingBackgroundArea() {
	return (
		<div className="pc:py-[120px] pc:max-w-[1200px] mx-auto flex flex-col gap-20">
			<div className="flex flex-col items-center justify-center gap-8">
				<div className="text-primary pc:text-2xl text-lg font-semibold">
					문제 배경
				</div>

				{/* Conditional Text for PC */}
				<div className="max-pc:hidden flex flex-col items-center justify-center gap-2 text-4xl font-bold">
					<div>
						학령 인구의 감소에도 불구하고 사교육 시장이 증가함에
						따라,
					</div>
					<div>
						학원 간 경쟁력(수업 학습 효과)은 더욱 중요해지고
						있어요
					</div>
				</div>

				{/* Conditional Text for Mobile */}
				<div className="pc:hidden flex flex-col items-center justify-center gap-2 text-2xl font-bold">
					<div>학령인구 감소에도 사교육 시장 증가,</div>
					<div>중요해진 학원 경쟁력(수업 학습 효과)</div>
				</div>
			</div>

			<div className="max-pc:flex-col flex justify-center gap-10">
				<Image
					src={LandingBackgroundImage1}
					alt="landing-background-1"
					className="pc:w-[431px] w-full"
				/>
				<Image
					src={LandingBackgroundImage2}
					alt="landing-background-2"
					className="pc:w-[431px] w-full"
				/>
			</div>
		</div>
	)
}
