// src/module/academy/action.ts

'use server'

import { authAction } from '@core/react'
import { z } from 'zod'
import { studentService } from './service'

export const createStudentAction = authAction
	.metadata({
		actionName: 'inviteStudent'
	})
	.schema(
		z.object({
			academyId: z.string(),
			academyClassId: z.string(),
			phoneNumber: z.string(),
			userId: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		const { academyId, academyClassId, phoneNumber, userId } =
			parsedInput
		await studentService.createStudent(
			academyId,
			academyClassId,
			phoneNumber,
			userId
		)
	})
