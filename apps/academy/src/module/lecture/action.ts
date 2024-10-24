'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@core/models'
import { academyService } from '../academy/service'
import { aiService } from '../ai/service'
import { createLectureDto, updateLectureDto } from './model'
import { lectureService } from './service'

export const createLectureAction = authAction
	.metadata({
		actionName: 'createLecture'
	})
	.schema(createLectureDto)
	.action(async ({ parsedInput }) => {
		const {
			academyId,
			classId,
			name,
			date,
			academyMemberId,
			videoUrl,
			videoDuration
		} = parsedInput

		console.log('Start Action:', parsedInput)

		try {
			const createdLecture =
				await lectureService.createLecture({
					academyId,
					classId,
					name,
					date,
					academyMemberId,
					videoUrl,
					videoDuration
				})

			const lectureId = createdLecture.id

			await aiService.analyzeVideo(videoUrl, lectureId)

			await academyService.spendCredit(
				academyId,
				videoDuration
			)
			const academy = await db.academy.findUnique({
				where: { id: academyId },
				select: { credit: true }
			})

			if (academy && academy.credit < 0) {
				throw new Error('Credit balance cannot be negative.')
			}

			revalidatePath(`/academy/${classId}/student`)
		} catch (error) {
			console.error('Error creating lecture:', error)
			throw new Error('강의 생성 중 오류가 발생했습니다.')
		}
	})

export const updateLectureAction = authAction
	.metadata({
		actionName: 'updateLecture'
	})
	.schema(updateLectureDto)
	.action(async ({ parsedInput }) => {
		const { lectureId, name, date, academyMemberId } =
			parsedInput

		await lectureService.updateLecture({
			lectureId,
			name,
			date,
			academyMemberId
		})
		revalidatePath('/academy', 'layout')
	})

export const deleteLectureAction = authAction
	.metadata({
		actionName: 'deleteLecture'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await lectureService.deleteLecture(parsedInput)
		revalidatePath('/academy', 'layout')
	})

export const switchLectureOpenedAction = authAction
	.metadata({
		actionName: 'switchLectureOpened'
	})
	.schema(
		z.object({
			lectureId: z.string(),
			lectureStatus: z.union([
				z.literal('OPENED'),
				z.literal('CLOSED')
			])
		})
	)
	.action(async ({ parsedInput }) => {
		const { lectureId, lectureStatus } = parsedInput
		await lectureService.switchLectureOpened(
			lectureId,
			lectureStatus
		)
		revalidatePath('/academy', 'layout')
	})

export const updateLectureDescriptionAction = authAction
	.metadata({
		actionName: 'updateLectureDescription'
	})
	.schema(
		z.object({
			lectureId: z.string(),
			description: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		const { lectureId, description } = parsedInput
		await lectureService.updateLectureDescription(
			lectureId,
			description
		)
		revalidatePath('/academy', 'layout')
	})
