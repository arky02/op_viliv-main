'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { updateSegmentDto } from './model'
import { segmentService } from './service'

export const updateSegmentAction = authAction
	.metadata({
		actionName: 'updateSegment'
	})
	.schema(updateSegmentDto)
	.action(async ({ parsedInput }) => {
		await segmentService.updateSegment(parsedInput)
		revalidatePath('/academy', 'layout')
	})
