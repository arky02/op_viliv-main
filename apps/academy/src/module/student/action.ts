'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { studentService } from './service'

export const acceptStudentAction = authAction
	.metadata({
		actionName: 'acceptStudent'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await studentService.acceptStudent(parsedInput)
		revalidatePath('/academy', 'layout')
	})

export const rejectStudentAction = authAction
	.metadata({
		actionName: 'rejectStudent'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await studentService.rejectStudent(parsedInput)
		revalidatePath('/academy', 'layout')
	})
