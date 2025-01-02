'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { createAcademyDto, toggleDeviceConstraintDto } from '@/module/academy/model'
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

	export const toggleDeviceConstraintAction = authAction
		.metadata({
			actionName: 'toggleDeviceConstraint'
		})
		.schema(toggleDeviceConstraintDto)
		.action(async ({ parsedInput }) => {
			const { academyId, isConstrained } = parsedInput
			await academyService.toggleDeviceConstraint(
				academyId,
				isConstrained
			)
		})
	
		