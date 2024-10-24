import { Progress, Button } from '@design-system/ui'
import Link from 'next/link'
import { type GetAcademyInfo } from '@/module/academy/model'

interface PlanSectionProps {
	academyInfo: GetAcademyInfo
}

export function PlanSection({
	academyInfo
}: PlanSectionProps) {
	const creditToHour = (academyInfo.credit / 3600).toFixed(0)

	const createTime = new Date(academyInfo.createdAt)
	const currentTime = new Date()
	const elapsedTimeInDays = Math.floor(
		(currentTime.getTime() - createTime.getTime()) /
			(1000 * 60 * 60 * 24)
	)
	const totalPlanDays = 14
	const remainingDays = totalPlanDays - elapsedTimeInDays
	const contentsLimit = academyInfo.plan.contentsLimit / 3600

	return (
		<div className="bg-secondary flex flex-col gap-3 rounded-lg border p-4">
			{remainingDays > 0 ? (
				<>
					<div className="bg-background text-secondary-foreground rounded-sm py-1 text-center text-[11px] font-semibold shadow">
						플랜 종료까지 {remainingDays}일 남았어요
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-secondary-foreground text-center text-[11px] font-medium">
							남은 업로드 시간 ({creditToHour}/{contentsLimit})
						</div>
						<Progress
							value={(Number(creditToHour) / contentsLimit) * 100}
							className="h-2"
						/>
					</div>
				</>
			) : (
				<>
					<div className="bg-background text-secondary-foreground rounded-sm py-1 text-center text-[11px] font-semibold shadow">
						무료 체험기간이 종료되었어요
					</div>
					<Link href={`/academy/${academyInfo.id}/plan/upgrade`}>
						<Button className="w-full shrink-0 whitespace-nowrap text-sm">
							플랜 업그레이드
						</Button>
					</Link>
				</>
			)}
		</div>
	)
}
