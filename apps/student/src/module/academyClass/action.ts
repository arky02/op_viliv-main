'use server'

import { authAction } from '@core/react'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { academyClassService } from './service'

export const verifyInviteCodeAction = authAction
	.metadata({
		actionName: 'verifyInviteCode'
	})
	.schema(
		z.object({
			academyId: z.string(),
			inviteCode: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		const { academyId, inviteCode } = parsedInput
		const academyClass =
			await academyClassService.verifyInviteCode(
				academyId,
				inviteCode
			)
		revalidatePath('/academy', 'layout')
		return academyClass
	})
