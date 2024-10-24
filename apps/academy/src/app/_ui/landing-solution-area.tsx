import Image from 'next/image'
import { Icon } from '@design-system/icon'
import LandingSolveImage3 from '@/lib/asset/image/landing-solve-3.png'
import LandingSolveImage4 from '@/lib/asset/image/landing-solve-4.png'
import LandingSolveImage5 from '@/lib/asset/image/landing-solve-5.png'
import LandingSolveImage6 from '@/lib/asset/image/landing-solve-6.png'

export function LandingSolutionArea() {
	return (
		<div className="max-pc:gap-[120px] flex flex-col items-center">
			<div className="max-pc:flex-col pc:m-[120px] flex gap-16">
				<div className="max-pc:text-center flex flex-col justify-center gap-6">
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden text-4xl font-bold">
						중요한 내용만 콕 집어서 보여드려요
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden text-2xl font-bold">
						<div>중요한 내용만 콕 집어서 </div>
						<div>보여드려요</div>
					</div>
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden text-xl font-medium">
						<div>
							강의 영상의 중요한 부분을 자동으로 캡처하고 선별하여
						</div>
						<div>VILIV PDF에 담을 수 있어요</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden text-base font-medium">
						<div>
							강의 영상을 5초마다 캡처하여 중요한 부분만 선별해
						</div>
						<div>VILIV PDF에 담을 수 있어요!</div>
					</div>
				</div>
				<Image src={LandingSolveImage3} alt="" width={600} />
			</div>
			<div className="max-pc:flex-col pc:m-[120px] flex gap-16">
				<Image
					src={LandingSolveImage4}
					alt=""
					width={600}
					className="max-pc:order-2 order-1"
				/>
				<div className="max-pc:text-center max-pc:order-1 order-2 flex flex-col justify-center gap-6">
					{/* PC에서 보이는 텍스트 */}
					<div className="pc:text-4xl max-pc:gap-1 gap-2 text-2xl font-bold">
						<div>어느 기기에서나 필기하기 쉽도록</div>
						<div>PDF 파일로 변환이 가능해요</div>
					</div>
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden gap-2 text-xl font-medium">
						<div>
							종이로 인쇄하거나 다양한 기기에서 학습할 수 있도록,
							필기하면서 공
						</div>
						<div>
							부하기 편한 디자인의 PDF 복습 자료를 생성해 줘요
						</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden gap-1 text-base font-medium">
						<div>
							종이로 인쇄하거나 다양한 기기에서 학습할 수 있도록,
						</div>
						<div>필기하면서 공부하기 편한 디자인의</div>
						<div>PDF 복습 자료를 생성해 줘요</div>
					</div>
				</div>
			</div>
			<div className="max-pc:flex-col pc:m-[120px] flex gap-16">
				<div className="max-pc:text-center flex flex-col justify-center gap-6">
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden flex flex-col gap-2 text-4xl font-bold">
						<div>AI의 분석이 마음에 들지 않으면</div>
						<div className="flex">
							<div className="bg-primary text-background">
								바로 수정해 보세요
							</div>
							<div className="bg-primary w-[45px]" />
							<Icon
								name="EraserFill"
								size="40"
								className="text-primary"
							/>
						</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden flex flex-col gap-1 text-2xl font-bold">
						<div>AI의 분석이 마음에 들지 않으면</div>
						<div>바로 수정해 보세요</div>
					</div>
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden text-xl font-medium">
						<div>AI의 영상 분석 결과가 마음에 들지 않을 경우</div>
						<div>
							요약 내용과 스크립트, 사진 등을 포함한 데이터를
							수정할 수 있어요
						</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden text-base font-medium">
						<div>
							AI의 영상 분석 결과가 마음에 들지 않을 경우, 요약
							내용
						</div>
						<div>
							과 스크립트를 포함한 모든 내용을 수정할 수 있어요
						</div>
					</div>
				</div>
				<Image src={LandingSolveImage5} alt="" width={600} />
			</div>
			<div className="max-pc:flex-col pc:m-[120px] flex gap-16">
				<Image
					src={LandingSolveImage6}
					alt=""
					width={600}
					className="max-pc:order-2 order-1"
				/>
				<div className="max-pc:text-center max-pc:order-1 order-2 flex flex-col justify-center gap-6">
					<div className="pc:gap-2 pc:text-4xl flex flex-col gap-1 text-2xl font-bold">
						<div>진행했던 강의들을 자동으로</div>
						<div>정리해 드릴게요</div>
					</div>
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden text-xl font-medium">
						<div>
							자동 강의일지 정리 기능으로 간편하게 강의를 관리 및
							기록하고,
						</div>
						<div>
							지난 강의 내용의 요약 내용을 쉽게 확인할 수 있어요
						</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden text-base font-medium">
						<div>다양한 기기에서 쉽게 필기할 수 있도록</div>
						<div>
							최적화된 PDF 변환으로 언제 어디서나 학습을 이어가세요
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
