import { SubscribePlan } from '@core/models'
import { z } from 'zod'

export const registCardDto = z.object({
	academyId: z.string(),
	cardNumber: z.string(),
	cardName: z.string(),
	billingKey: z.string(),
	planId: z.string()
})
export type RegistCardDto = z.infer<typeof registCardDto>

export const registCardAndPayDto = z.object({
	academyId: z.string(),
	cardNumber: z.string(),
	cardName: z.string(),
	billingKey: z.string(),
	planId: z.string()
})
export type RegistCardAndPayDto = z.infer<
	typeof registCardAndPayDto
>

export const payPlanByAcademyIdDto = z.object({
	academyId: z.string(),
	planName: z.nativeEnum(SubscribePlan),
	planCredit: z.number(),
	amount: z.number(),
	title: z.string()
})
export type PayPlanByAcademyIdDto = z.infer<
	typeof payPlanByAcademyIdDto
>
