'use server'

import { authAction } from '@core/react'
import { z } from 'zod'
import { academyService } from './service'

export const searchAcademiesAction = authAction
	.metadata({
		actionName: 'searchAcademies'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		const academies =
			await academyService.searchAcademies(parsedInput)
		return academies
	})
