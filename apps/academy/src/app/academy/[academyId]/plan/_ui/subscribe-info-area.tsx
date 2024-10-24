import { Button } from '@design-system/ui'
import Link from 'next/link'
import { commaizeNumber } from '@core/utils'
import { type Payment } from '@core/models'
import { type GetAcademyInfo } from '@/module/academy/model'
import { formatDateToYYMMDD } from '@/lib/util/format-date-to-yymmdd'
import { PlanQuitModal } from './plan-quit-modal'

interface SubscribeInfoAreaProps {
	params: {
		academyId: string
	}
	academyInfo: GetAcademyInfo
	paymentInfo: Payment[]
}

export function SubscribeInfoArea({
	params,
	academyInfo,
	paymentInfo
}: SubscribeInfoAreaProps) {
	const name = academyInfo.plan.name
	const isFreePlan = name === 'FREE'

	const LastExpireDate = paymentInfo[0]?.expireDate
	const formattedDate = formatDateToYYMMDD(LastExpireDate)
	return (
		<div className="pc:p-4 bg-background flex flex-col rounded-xl border p-3 shadow">
			<div className="border-border-strong overflow-hidden rounded-lg border">
				<div className="bg-secondary border-b p-6 text-base font-semibold">
					구독 정보
				</div>
				<div className="p-6">
					<div
						className={`flex items-center justify-between gap-4 ${
							isFreePlan ? '' : 'max-pc:flex-col'
						}`}
					>
						{isFreePlan ? (
							<div className="text-muted-foreground pc:text-base text-sm">
								아직 구독한 플랜이 없어요
							</div>
						) : (
							<div className="flex flex-col gap-1">
								<div className="pc:text-base text-sm font-semibold">
									{name}
								</div>
								<div className="text-secondary-foreground text-sm">
									{`다음 결제일(${formattedDate})에 ${commaizeNumber(academyInfo.plan.price)}원이 청구될
									예정이에요`}
								</div>
							</div>
						)}
						{isFreePlan ? (
							<Link
								href={`/academy/${academyInfo.id}/plan/upgrade`}
							>
								<Button variant="secondary">구독하기</Button>
							</Link>
						) : (
							<div className="max-pc:w-full flex gap-2">
								<Link
									href={`/academy/${academyInfo.id}/plan/upgrade`}
								>
									<Button variant="secondary">플랜 변경</Button>
								</Link>
								<PlanQuitModal params={params} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
