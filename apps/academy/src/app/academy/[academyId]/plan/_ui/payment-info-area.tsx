import { type Payment } from '@core/models'
import { Badge, Separator } from '@design-system/ui'
import { commaizeNumber } from '@core/utils'
import { PaymentInfoBadge } from './payment-info-badge'

interface PaymentInfoAreaProps {
	paymentInfo: Payment[]
}

export function PaymentInfoArea({
	paymentInfo
}: PaymentInfoAreaProps) {
	return (
		<div className="pc:p-4 bg-background flex flex-col rounded-xl border p-3 shadow">
			<div className="border-border-strong overflow-hidden rounded-lg border">
				<div className="bg-secondary border-b p-6 text-base font-semibold">
					결제 내역
				</div>
				<div>
					{paymentInfo.length === 0 ? (
						<div className="text-muted-foreground pc:text-base flex items-center justify-center p-6 text-sm">
							아직 결제한 내역이 없어요
						</div>
					) : (
						<div className="grid grid-rows-5">
							{paymentInfo.slice(0, 5).map((payment) => {
								const createdAt = new Date(payment.createdAt)
								const formattedDate =
									createdAt.toLocaleDateString('ko-KR')
								const formattedTime =
									createdAt.toLocaleTimeString('ko-KR')

								return (
									<div
										key={payment.id}
										className="border-border flex items-center justify-between border-b px-6 py-[14px]"
									>
										<div className="flex items-center gap-[10px]">
											<PaymentInfoBadge paymentInfo={payment} />
											<div className="text-sm font-semibold">
												{commaizeNumber(payment.amount)}원
											</div>
										</div>
										<div className="text-secondary-foreground flex gap-[10px] text-sm font-medium">
											<div>{formattedDate}</div>
											<Separator
												orientation="vertical"
												className="border-border-strong max-pc:hidden"
											/>
											<div className="max-pc:hidden">
												{formattedTime}
											</div>
											<Separator
												orientation="vertical"
												className="max-pc:hidden"
											/>
											<div className="max-pc:hidden">
												{payment.paymentMethod}
											</div>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
