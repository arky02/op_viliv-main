'use client'

import { type Payment } from '@core/models'
import { type GetAcademyInfo } from '@/module/academy/model'
import { CardInfoArea } from './card-info-area'
import { SubscribeInfoArea } from './subscribe-info-area'
import { PaymentInfoArea } from './payment-info-area'

interface PlanInfoProps {
	params: {
		academyId: string
	}
	academyInfo: GetAcademyInfo

	cardNumber: string | undefined
	paymentInfo: Payment[]
}

export function PlanInfo({
	academyInfo,
	params,
	cardNumber,
	paymentInfo
}: PlanInfoProps) {
	return (
		<div className="pc:w-[768px] pc:ml-8 pc:mt-8 flex flex-col gap-4">
			<SubscribeInfoArea
				params={params}
				academyInfo={academyInfo}
				paymentInfo={paymentInfo}
			/>
			<CardInfoArea
				academyInfo={academyInfo}
				cardNumber={cardNumber}
			/>
			<PaymentInfoArea paymentInfo={paymentInfo} />
		</div>
	)
}
