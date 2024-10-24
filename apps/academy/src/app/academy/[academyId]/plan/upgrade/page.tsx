import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { MobileDetailHeader } from '@/app/_ui/mobile-detail-header'
import { academyService } from '@/module/academy/service'
import { PlanUpgradeCard } from '../_ui/plan-upgrade-card'
import { PlanCardEnterprise } from '../_ui/plan-card-enterprise'

interface PlanUpgradePageProps {
	params: {
		academyId: string
	}
}

export default async function PlanUpgradePage({
	params
}: PlanUpgradePageProps) {
	const academyInfo = await academyService.getAcademyInfo(
		params.academyId
	)
	const currentPlan = academyInfo.plan.name

	return (
		<div className="bg-background max-pc:flex-col pc:h-screen flex w-full items-center justify-center">
			<MobileDetailHeader title="플랜 업그레이드" />
			<div className="max-pc:p-4 flex w-full max-w-[1040px] flex-col gap-10">
				<div className="max-pc:hidden flex justify-between">
					<div className="flex flex-col gap-2">
						<div className="text-2xl font-semibold">
							플랜 업그레이드
						</div>
						<div className="text-secondary-foreground text-base font-medium">
							플랜을 업그레이드하고 더 많은 혜택을 누려보세요!
						</div>
					</div>
					<Link href={`/academy/${params.academyId}/plan`}>
						<Icon name="CloseLine" size={28} />
					</Link>
				</div>
				<div className="pc:grid-cols-4 grid grid-cols-1 gap-4">
					<PlanUpgradeCard
						academyInfo={academyInfo}
						name="LIGHT"
						description="VILIV에 입문하기 적합한 플랜이에요"
						price={30000}
						credit={30}
						currentPlan={currentPlan}
					/>
					<PlanUpgradeCard
						academyInfo={academyInfo}
						name="STANDARD"
						description="1-3명의 소규모 학원에 적합한 플랜이에요"
						price={90000}
						credit={100}
						currentPlan={currentPlan}
					/>
					<PlanUpgradeCard
						academyInfo={academyInfo}
						name="PRO"
						description="5명 이상 규모의 수업이 많은 학원에 적합한 플랜이에요"
						price={350000}
						credit={500}
						currentPlan={currentPlan}
					/>
					<PlanCardEnterprise
						name="ENTERPRISE"
						currentPlan={currentPlan}
					/>
				</div>
			</div>
		</div>
	)
}
