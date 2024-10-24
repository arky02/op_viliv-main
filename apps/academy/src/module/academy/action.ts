'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { createAcademyDto } from '@/module/academy/model'
import { academyService } from './service'

export const createAcademyAction = authAction
	.metadata({
		actionName: 'createAcademy'
	})
	.schema(createAcademyDto)
	.action(async ({ parsedInput }) => {
		const {
			name,
			image,
			phoneNumber,
			postalCode,
			address,
			detailAddress
		} = parsedInput
		await academyService.createAcademy({
			name,
			image,
			phoneNumber,
			postalCode,
			address,
			detailAddress
		})
		revalidatePath('/academy')
	})
