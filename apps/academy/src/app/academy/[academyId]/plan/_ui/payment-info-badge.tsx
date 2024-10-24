import { Badge } from '@design-system/ui'
import {
	type Payment,
	type PaymentStatus
} from '@core/models'

interface PaymentInfoBadgeProps {
	paymentInfo: Payment
}

const getBadgeByStatus = (status: PaymentStatus) => {
	switch (status) {
		case 'PENDING':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="rounded-sm"
				>
					결제 대기
				</Badge>
			)
		case 'COMPLETED':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="rounded-sm bg-[#3C83F61A] text-[#3C83F6]"
				>
					결제 완료
				</Badge>
			)
		case 'CANCELED':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="rounded-sm"
				>
					취소 완료
				</Badge>
			)
	}
}

export function PaymentInfoBadge({
	paymentInfo
}: PaymentInfoBadgeProps) {
	const { status } = paymentInfo

	return <div>{getBadgeByStatus(status)}</div>
}
