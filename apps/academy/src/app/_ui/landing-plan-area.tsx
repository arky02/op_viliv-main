export function LandingPlanArea() {
	return (
		<div className="pc:m-[120px] flex flex-col items-center gap-20">
			<div className="flex flex-col items-center gap-6">
				<div className="text-4xl font-bold">
					플랜 업그레이드
				</div>
				<div className="text-center text-xl font-medium">
					<div>지금 바로, 플랜을 업그레이드하고</div>
					<div>여러가지 혜택을 누려보세요</div>
				</div>
			</div>

			<div className="max-pc:overflow-x-scroll max-pc:w-[calc(100vw-32px)] pc:justify-center flex justify-start gap-4">
				<div className="bg-secondary flex h-[212px] w-[288px] shrink-0 flex-col justify-between rounded-xl p-8">
					<div className="flex flex-col gap-1">
						<div className="text-primary text-base font-semibold">
							LIGHT
						</div>
						<div className="text-secondary-foreground text-sm">
							VILIV에 입문하기 적합한 플랜이에요
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex items-end gap-1">
							<div className="text-2xl font-bold">30,000원 </div>
							<div className="text-lg font-semibold">/ 월</div>
						</div>
						<div className="text-secondary-foreground text-sm">
							영상 30시간 업로드 가능
						</div>
					</div>
				</div>
				<div className="bg-secondary flex h-[212px] w-[288px] shrink-0 flex-col justify-between rounded-xl p-8">
					<div className="flex flex-col gap-1">
						<div className="text-primary text-base font-semibold">
							STANDARD
						</div>
						<div className="text-secondary-foreground text-sm">
							강사진 1-3명의 소규모 학원에 적합한 플랜이에요
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex items-end gap-1">
							<div className="text-2xl font-bold">90,000원 </div>
							<div className="text-lg font-semibold">/ 월</div>
						</div>
						<div className="text-secondary-foreground text-sm">
							영상 100시간 업로드 가능
						</div>
					</div>
				</div>
				<div className="bg-secondary flex h-[212px] w-[288px] shrink-0 flex-col justify-between rounded-xl p-8">
					<div className="flex flex-col gap-1">
						<div className="text-primary text-base font-semibold">
							PRO
						</div>
						<div className="text-secondary-foreground text-sm">
							강사진 5명 이상 규모의 수업이 많은 학원에 적합한
							플랜이에요
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex items-end gap-1">
							<div className="text-2xl font-bold">350,000원 </div>
							<div className="text-lg font-semibold">/ 월</div>
						</div>
						<div className="text-secondary-foreground text-sm">
							영상 500시간 업로드 가능
						</div>
					</div>
				</div>
				<div className="bg-secondary flex h-[212px] w-[288px] shrink-0 flex-col justify-between rounded-xl p-8">
					<div className="flex flex-col gap-1">
						<div className="text-primary text-base font-semibold">
							ENTERPRISE
						</div>
						<div className="text-secondary-foreground text-sm">
							대형 학원, 학교, 기관 등을 위한 맞춤 플랜을 제공해
							드려요
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div className="text-2xl font-bold">커스텀</div>
						<div className="text-secondary-foreground text-sm">
							고객센터 문의
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
