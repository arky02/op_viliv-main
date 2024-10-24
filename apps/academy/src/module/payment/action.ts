'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { paymentService } from './service'
import {
	payPlanByAcademyIdDto,
	registCardAndPayDto,
	registCardDto
} from './model'

export const registCardAndPay = authAction
	.metadata({
		actionName: 'registCardAndPay'
	})
	.schema(registCardAndPayDto)
	.action(async ({ parsedInput }) => {
		const {
			academyId,
			cardNumber,
			cardName,
			billingKey,
			planId
		} = parsedInput
		await paymentService.registCardAndPay({
			academyId,
			cardNumber,
			cardName,
			billingKey,
			planId
		})
		revalidatePath('/')
	})

export const registCard = authAction
	.metadata({
		actionName: 'registCard'
	})
	.schema(registCardDto)
	.action(async ({ parsedInput }) => {
		const {
			academyId,
			cardNumber,
			cardName,
			billingKey,
			planId
		} = parsedInput
		await paymentService.registCard({
			academyId,
			cardNumber,
			cardName,
			billingKey,
			planId
		})
		revalidatePath('/')
	})

export const payPlanByAcademyId = authAction
	.metadata({
		actionName: 'payPlanByAcademyId'
	})
	.schema(payPlanByAcademyIdDto)
	.action(async ({ parsedInput }) => {
		const { academyId, planName, planCredit, amount, title } =
			parsedInput
		await paymentService.payPlanByAcademyId({
			academyId,
			planName,
			planCredit,
			amount,
			title
		})
		revalidatePath('/')
	})
