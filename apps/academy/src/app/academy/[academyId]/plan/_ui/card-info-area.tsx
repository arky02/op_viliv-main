import { Button, toast } from '@design-system/ui'
import { useAction } from '@core/react'
import { useState } from 'react'
import { type GetAcademyInfo } from '@/module/academy/model'
import { registCard } from '@/module/payment/action'
import { type PaypleResponse } from '@/hook/payple-interface'
import { type RegistCardDto } from '@/module/payment/model'
import { usePayple } from '@/hook/use-payple'

interface CardInfoAreaProps {
	academyInfo: GetAcademyInfo
	cardNumber: string | undefined
}

export function CardInfoArea({
	cardNumber,
	academyInfo
}: CardInfoAreaProps) {
	const [loading, setLoading] = useState(false)
	const payple = usePayple()

	const registCardAction = useAction(registCard, {
		onSuccess: () => {
			toast({
				title: '카드 등록이 완료되었습니다',
				description: '빌리브를 이용해주셔서 감사합니다'
			})
			setLoading(false)
		},
		onError: () => {
			toast({
				title: '카드 등록에 실패했습니다',
				variant: 'negative'
			})
			setLoading(false)
		}
	})

	const handleRegistCardClick = () => {
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

		payple.setPayWork('AUTH')
		payple.setCallbackFunction(registCallback)
		payple.requestPaypleCard()
	}

	const registCallback = (res: PaypleResponse) => {
		if (res.PCD_PAY_RST !== 'success') {
			toast({
				title: '결제사 카드 등록에 실패했습니다',
				variant: 'negative'
			})
			setLoading(false)
			return
		}

		const dto: RegistCardDto = {
			academyId: academyInfo.id,
			planId: academyInfo.planId,
			billingKey: res.PCD_PAYER_ID,
			cardName: res.PCD_PAY_CARDNAME || '',
			cardNumber: res.PCD_PAY_CARDNUM || ''
		}

		registCardAction.execute(dto)
	}
	return (
		<div className="pc:p-4 bg-background flex flex-col rounded-xl border p-3 shadow">
			<div className="border-border-strong overflow-hidden rounded-lg border">
				<div className="bg-secondary border-b p-6 text-base font-semibold">
					결제 카드 정보
				</div>
				<div className="p-6">
					{cardNumber ? (
						<div className="flex items-center justify-between">
							<div className="pc:text-base text-sm">
								{cardNumber}
							</div>

							<Button
								variant="secondary"
								onClick={handleRegistCardClick}
							>
								카드 수정
							</Button>
						</div>
					) : (
						<div className="flex items-center justify-between">
							<div className="text-muted-foreground pc:text-base text-sm">
								아직 등록된 결제 카드가 없어요
							</div>
							<Button
								variant="secondary"
								onClick={handleRegistCardClick}
							>
								카드 등록
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
