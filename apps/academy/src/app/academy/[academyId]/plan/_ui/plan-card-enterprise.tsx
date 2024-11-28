import { type SubscribePlan } from '@core/models'
import { Button } from '@design-system/ui'
import Link from 'next/link'

interface PlanCardEnterpriseProps {
	name: string
	currentPlan: SubscribePlan
}

export function PlanCardEnterprise({
	name,
	currentPlan
}: PlanCardEnterpriseProps) {
	const isCurrentPlan = name === currentPlan
	const buttonText = isCurrentPlan
		? '현재 이용 중인 플랜'
		: '문의하기'
	const buttonHref = isCurrentPlan
		? '#'
		: 'http://pf.kakao.com/_pIQxoG'

	return (
		<div className="bg-secondary pc:p-8 pc:h-[325px] max-pc:gap-6 flex flex-col justify-between rounded-xl border p-5">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-1">
					<div className="text-primary text-base font-semibold">
						{name}
					</div>
					<div className="text-secondary-foreground text-sm">
						대형 기관, 학교, 기관 등을 위한 맞춤 플랜을 제공해
						드려요
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="flex items-end gap-1">
						<div className="text-2xl font-bold">커스텀</div>
					</div>
					<div className="text-secondary-foreground text-sm">
						고객센터 문의
					</div>
				</div>
			</div>
			{isCurrentPlan ? (
				<Button
					variant="outline"
					disabled
					className="text-secondary-foreground w-full text-sm font-semibold"
				>
					{buttonText}
				</Button>
			) : (
				<Link href={buttonHref} passHref>
					<Button
						variant="outline"
						className="text-secondary-foreground w-full text-sm font-semibold"
					>
						{buttonText}
					</Button>
				</Link>
			)}
		</div>
	)
}
