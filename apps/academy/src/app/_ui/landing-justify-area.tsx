import Image from 'next/image'
import ChartNegativeIcon from '@/lib/asset/image/icon/chart-negative.png'
import TebletChartIcon from '@/lib/asset/image/icon/teblet-chart.png'
import WalletIcon from '@/lib/asset/image/icon/wallet.png'
import TimerIcon from '@/lib/asset/image/icon/timer.png'
import TabletIcon from '@/lib/asset/image/icon/tablet.png'
import PieChartIcon from '@/lib/asset/image/icon/pie-chart.png'

export function LandingJustifyArea() {
	return (
		<div className="max-pc:gap-[120px] flex flex-col">
			<div className="pc:m-[120px] pc:gap-20 flex flex-col gap-10">
				<div className="flex flex-col items-center justify-center gap-8">
					<div className="text-primary pc:text-2xl text-lg font-semibold">
						문제 정의
					</div>
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden flex flex-col items-center justify-center gap-2 text-4xl font-bold">
						<div>
							학생들의 집중력 부족과 복습 미흡으로 발생한 비효율을
							해결하기 위한
						</div>
						<div>
							기존 학원들의 해결 방식에는 다음과 같은 문제점이
							있었어요
						</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden flex flex-col items-center justify-center gap-1 text-2xl font-bold">
						<div>학생들의 집중력 부족과 복습 미흡으로</div>
						<div>발생한 비효율 개선방식에 문제 발견</div>
					</div>
				</div>
				<div className="pc:justify-center max-pc:overflow-x-scroll flex gap-3">
					<div className="bg-secondary pc:px-[60px] flex shrink-0 flex-col items-center justify-center gap-6 rounded-xl px-6 py-10">
						<Image
							src={ChartNegativeIcon}
							alt="chart-negative-icon"
							width={80}
							height={80}
						/>
						<div className="flex flex-col items-center gap-2">
							<div className="text-xl font-semibold">
								학생에게 떠넘기는 책임 소재
							</div>
							<div className="text-secondary-foreground text-center text-base font-medium">
								<div>학생의 학습 실패로 인한 불만족, 학원 매출</div>
								<div>하락까지 이어질 수 었어요</div>
							</div>
						</div>
					</div>
					<div className="bg-secondary pc:px-[60px] flex shrink-0 flex-col items-center justify-center gap-6 rounded-xl px-6 py-10">
						<Image
							src={TebletChartIcon}
							alt="teblet-chart-icon"
							width={80}
							height={80}
						/>
						<div className="flex flex-col items-center gap-2">
							<div className="text-xl font-semibold">
								집중력 저하 감지되면 휴식 반복
							</div>
							<div className="text-secondary-foreground text-center text-base font-medium">
								<div>집중력 저하를 감지하지 못하는 경우도 있</div>
								<div>고 수업 반복으로 인한 비효율이 생겨요</div>
							</div>
						</div>
					</div>
					<div className="bg-secondary pc:px-[60px] flex shrink-0 flex-col items-center justify-center gap-6 rounded-xl px-6 py-10">
						<Image
							src={WalletIcon}
							alt="wallet-icon"
							width={80}
							height={80}
						/>
						<div className="flex flex-col items-center gap-2">
							<div className="text-xl font-semibold">
								비효율적인 인수인계 구조
							</div>
							<div className="text-secondary-foreground text-center text-base font-medium">
								<div>조교에게 수업 내용을 인수인계하기 어려</div>
								<div>운 구조로 시간과 인건비가 낭비돼요</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pc:m-[120px] pc:gap-20 flex flex-col gap-10">
				<div className="flex flex-col items-center justify-center gap-8">
					{/* PC에서 보이는 텍스트 */}
					<div className="max-pc:hidden flex flex-col items-center justify-center gap-2 text-4xl font-bold">
						<div>
							학생들에게 인터뷰를 진행한 결과, 복습 미흡 원인중
							하나로
						</div>
						<div>기존 복습자료의 불편함을 언급했어요</div>
					</div>
					{/* 모바일에서 보이는 텍스트 */}
					<div className="pc:hidden flex flex-col items-center justify-center gap-1 text-2xl font-bold">
						<div>학생 인터뷰 결과, 복습 미흡 원인으로</div>
						<div>기존 복습자료 불편함 언급</div>
					</div>
				</div>
				<div className="pc:justify-center max-pc:overflow-x-scroll flex gap-3">
					<div className="bg-secondary pc:px-[60px] flex shrink-0 flex-col items-center justify-center gap-6 rounded-xl px-6 py-10">
						<Image
							src={TimerIcon}
							alt="timer-icon"
							width={80}
							height={80}
						/>
						<div className="flex flex-col items-center gap-2">
							<div className="text-xl font-semibold">
								긴 녹화 영상 시간
							</div>
							<div className="text-secondary-foreground text-center text-base font-medium">
								<div>복습을 위해 녹화 영상을 다시 보려면</div>
								<div>시간이 너무 오래걸려요</div>
							</div>
						</div>
					</div>
					<div className="bg-secondary pc:px-[60px] flex shrink-0 flex-col items-center justify-center gap-6 rounded-xl px-6 py-10">
						<Image
							src={TabletIcon}
							alt="tablet-icon"
							width={80}
							height={80}
						/>
						<div className="flex flex-col items-center gap-2">
							<div className="text-xl font-semibold">
								빈약한 내용의 복습 자료
							</div>
							<div className="text-secondary-foreground text-center text-base font-medium">
								<div>자체 복습 자료에 수업 내용이</div>
								<div>전부 다 들어있지않아 내용이 빈약해요</div>
							</div>
						</div>
					</div>
					<div className="bg-secondary pc:px-[60px] flex shrink-0 flex-col items-center justify-center gap-6 rounded-xl px-6 py-10">
						<Image
							src={PieChartIcon}
							alt="pie-chart-icon"
							width={80}
							height={80}
						/>
						<div className="flex flex-col items-center gap-2">
							<div className="text-xl font-semibold">
								그 외 여러 불편함
							</div>
							<div className="text-secondary-foreground text-center text-base font-medium">
								<div>여러가지 불편함 때문에 복습하고싶은</div>
								<div>마음이 사라져버려요</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
