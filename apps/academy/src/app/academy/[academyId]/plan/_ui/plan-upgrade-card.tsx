'use client'

import { type SubscribePlan } from '@core/models'
import { Button, toast } from '@design-system/ui'
import { commaizeNumber } from '@core/utils'
import { useState } from 'react'
import { useAction } from '@core/react'
import { usePayple } from '@/hook/use-payple'
import { payPlanByAcademyId } from '@/module/payment/action'
import { type PaypleResponse } from '@/hook/payple-interface'
import { type GetAcademyInfo } from '@/module/academy/model'

interface PlanUpgradeCardProps {
	academyInfo: GetAcademyInfo
	name: SubscribePlan
	description: string
	price: number
	credit: number
	currentPlan: SubscribePlan
}

export function PlanUpgradeCard({
	academyInfo,
	name,
	description,
	price,
	credit,
	currentPlan
}: PlanUpgradeCardProps) {
	const [loading, setLoading] = useState(false)
	const payple = usePayple()

	const payPlanByAcademyIdAction = useAction(
		payPlanByAcademyId,
		{
			onSuccess: () => {
				toast({
					title: '결제가 완료되었습니다',
					description: '빌리브를 이용해주셔서 감사합니다'
				})
				setLoading(false)
			},
			onError: () => {
				toast({
					title: '결제에 실패했습니다',
					variant: 'negative'
				})
				setLoading(false)
			}
		}
	)

	const handleRegistCardAndPayClick = () => {
		if (loading) return
		setLoading(true)

		if (!window.PaypleCpayAuthCheck) {
			setLoading(false)
			return toast({
				title: '결제사 모듈을 불러오는데 실패했습니다.',
				description: '잠시 후 다시 시도해주세요.',
				variant: 'negative'
			})
		}

		payple.setPayWork('CERT')
		payple.setCallbackFunction(registCallback)
		payple.requestPaypleCard()

		payPlanByAcademyIdAction.execute({
			academyId: academyInfo.id,
			planName: name,
			planCredit: credit * 3600,
			amount: price,
			title: 'aa'
		})
	}

	const registCallback = (res: PaypleResponse) => {
		if (res.PCD_PAY_RST !== 'success') {
			toast({
				title: '결제에 실패했습니다',
				variant: 'negative'
			})
			setLoading(false)
			return
		}
		console.log(academyInfo.id)
	}

	const isCurrentPlan = name === currentPlan

	return (
		<div className="bg-secondary pc:p-8 pc:h-[325px] max-pc:gap-6 flex w-full flex-col justify-between rounded-xl border p-5">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-1">
					<div className="text-primary text-base font-semibold">
						{name}
					</div>
					<div className="text-secondary-foreground text-sm">
						{description}
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="flex items-end gap-1">
						<div className="text-2xl font-bold">
							{commaizeNumber(price)}원
						</div>
						<div className="text-lg font-semibold">/</div>
						<div className="text-lg font-semibold">월</div>
					</div>
					<div className="text-secondary-foreground text-sm">
						영상 {credit}시간 업로드 가능
					</div>
				</div>
			</div>
			<Button
				variant="outline"
				disabled={isCurrentPlan}
				className="text-secondary-foreground w-full text-sm font-semibold"
				onClick={handleRegistCardAndPayClick}
			>
				{isCurrentPlan ? '현재 이용 중인 플랜' : '업그레이드'}
			</Button>
		</div>
	)
}
