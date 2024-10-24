'use server'

import { authAction } from '@core/react'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { analyzedLectureService } from './service'

export const editFullSummarizationAction = authAction
	.metadata({
		actionName: 'editFullSummarization'
	})
	.schema(
		z.object({
			lectureId: z.string(),
			fullSummarization: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		await analyzedLectureService.editFullSummarization(
			parsedInput.lectureId,
			parsedInput.fullSummarization
		)
		revalidatePath('/academy', 'layout')
	})

export const editSegmentTitleAction = authAction
	.metadata({
		actionName: 'editSegmentTitle'
	})
	.schema(
		z.object({
			segmentId: z.string(),
			title: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		await analyzedLectureService.editSegmentTitle(
			parsedInput.segmentId,
			parsedInput.title
		)
		revalidatePath('/academy', 'layout')
	})
