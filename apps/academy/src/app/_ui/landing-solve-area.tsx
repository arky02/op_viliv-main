import Image from 'next/image'
import LandingSolveImage1 from '@/lib/asset/image/landing-solve-1.png'
import LandingSolveImage2 from '@/lib/asset/image/landing-solve-2.png'

export function LandingSolveArea() {
	return (
		<div className="pc:m-[120px] flex flex-col gap-20">
			<div className="flex flex-col items-center justify-center gap-8">
				<div className="text-primary pc:text-2xl text-lg font-semibold">
					이렇게 해결했어요
				</div>
				<div className="flex flex-col items-center gap-10">
					<div className="pc:text-4xl text-2xl font-bold">
						AI 분석을 통한 강의 핵심 내용 요약
					</div>
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden text-secondary-foreground text-center text-xl font-medium">
						<div>
							자막 추출, 대문단 및 소문단으로 분할하여 요약 정리로
							학생들이 수업시간에 놓친부분을
						</div>
						<div>
							효율적으로 학습할 수 있게 하고 학원의 시간과 인건비를
							절약할 수 있어요!
						</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden text-secondary-foreground text-center text-base font-medium">
						<div>자막 추출, 대문단 및 소문단으로 분할하여</div>
						<div>요약 정리로 학생들이 수업시간에 놓친부분을</div>
						<div>효율적으로 학습할 수 있게 하고</div>
						<div>학원의 시간과 인건비를 절약할 수 있어요!</div>
					</div>
				</div>
			</div>
			<div className="max-pc:flex-col flex justify-center gap-3">
				<Image
					src={LandingSolveImage1}
					alt="landing-solve-1"
					className="pc:w-[490px] pc:h-[526px] w-full"
				/>
				<Image
					src={LandingSolveImage2}
					alt="landing-solve-2"
					className="pc:w-[490px] w-full"
				/>
			</div>
		</div>
	)
}
