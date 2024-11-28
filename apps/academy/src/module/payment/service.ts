import { db } from '@core/models'
import { paypleService } from '../payple/service'
import {
	type RegistCardDto,
	type RegistCardAndPayDto,
	type PayPlanByAcademyIdDto
} from './model'

class PaymentService {
	async getPaymentsByAcademyId(academyId: string) {
		const payments = await db.payment.findMany({
			where: {
				academyId
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return payments
	}

	async getPaymentCardByAcademyId(academyId: string) {
		const card = await db.academyPaymentCard.findFirst({
			where: {
				academyId
			}
		})

		return card
	}

	async registCard(dto: RegistCardDto) {
		const { academyId, cardNumber, cardName, billingKey } =
			dto

		// 기관에 카드 정보만 등록 (결제는 수행하지 않음)
		await db.academy.update({
			where: {
				id: academyId
			},
			data: {
				academyPaymentCard: {
					upsert: {
						where: {
							academyId
						},
						create: {
							cardNumber,
							cardName,
							billingKey
						},
						update: {
							cardNumber,
							cardName,
							billingKey
						}
					}
				}
			}
		})

		return true
	}

	async registCardAndPay(dto: RegistCardAndPayDto) {
		const {
			academyId,
			cardNumber,
			cardName,
			billingKey,
			planId
		} = dto

		const planDetails = await db.plan.findUniqueOrThrow({
			where: {
				id: planId
			}
		})

		console.log(planDetails)

		const amount = planDetails.price
		const title = `[빌리브] ${planDetails.name} 플랜 월간 구독`

		// 결제 수행
		await paypleService.paymentByBillingKey({
			title,
			amount,
			billingKey
		})

		await db.academy.update({
			where: {
				id: academyId
			},
			data: {
				planId,
				academyPaymentCard: {
					upsert: {
						where: {
							academyId
						},
						create: {
							cardNumber,
							cardName,
							billingKey
						},
						update: {
							cardNumber,
							cardName,
							billingKey
						}
					}
				}
			}
		})

		await this.createPaymentRecord(
			academyId,
			planDetails.id,
			amount,
			'CARD',
			billingKey,
			'KRW'
		)

		return true
	}

	async payPlanByAcademyId(dto: PayPlanByAcademyIdDto) {
		const academy = await db.academy.findUniqueOrThrow({
			where: {
				id: dto.academyId
			},
			include: {
				academyPaymentCard: true,
				plan: true
			}
		})

		if (!academy.academyPaymentCard) {
			throw new Error('등록된 결제수단이 없습니다')
		}

		const title = dto.title
		const amount = dto.amount

		// 결제 수행
		await paypleService.paymentByBillingKey({
			title,
			amount,
			billingKey: academy.academyPaymentCard.billingKey
		})

		await this.createPaymentRecord(
			dto.academyId,
			academy.plan.id,
			amount,
			'CARD',
			academy.academyPaymentCard.billingKey,
			'KRW'
		)

		await db.academy.update({
			where: {
				id: dto.academyId
			},
			data: {
				plan: {
					update: {
						name: dto.planName,
						price: amount,
						contentsLimit: dto.planCredit
					}
				}
			}
		})
	}

	async createPaymentRecord(
		academyId: string,
		planId: string,
		amount: number,
		paymentMethod: string,
		billingKey: string,
		currency: string
	) {
		// 현재 날짜로부터 한 달 후를 만료일로 설정
		const expireDate = new Date()
		expireDate.setMonth(expireDate.getMonth() + 1)

		return await db.payment.create({
			data: {
				academyId,
				planId,
				amount,
				paymentMethod,
				currency,
				expireDate,
				status: 'COMPLETED'
			}
		})
	}
}

export const paymentService = new PaymentService()
