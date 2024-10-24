'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import {
	createClassDto,
	updateClassDto,
	updateInviteCodeDto
} from './model'
import { academyClassService } from './service'

export const createClassAction = authAction
	.metadata({
		actionName: 'createClass'
	})
	.schema(createClassDto)
	.action(async ({ parsedInput }) => {
		const {
			name,
			academyId,
			description,
			inviteCode,
			academyMemberId
		} = parsedInput
		await academyClassService.createClass({
			name,
			academyId,
			description,
			inviteCode,
			academyMemberId
		})
		revalidatePath(`/academy/${academyId}/student`)
	})

export const updateClassAction = authAction
	.metadata({
		actionName: 'updateClass'
	})
	.schema(updateClassDto)
	.action(async ({ parsedInput }) => {
		const { classId, name, description, academyMemberId } =
			parsedInput
		await academyClassService.updateClass({
			classId,
			name,
			description,
			academyMemberId
		})
		revalidatePath('/academy', 'layout')
	})

export const updateInviteCodeAction = authAction
	.metadata({
		actionName: 'updateInviteCode'
	})
	.schema(updateInviteCodeDto)
	.action(async ({ parsedInput }) => {
		const { academyClassId, inviteCode } = parsedInput
		await academyClassService.updateInviteCode(
			academyClassId,
			inviteCode
		)
		revalidatePath(`/academy`, 'layout')
	})

export const deleteClassAction = authAction
	.metadata({
		actionName: 'deleteClass'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await academyClassService.deleteClass(parsedInput)
		revalidatePath('/academy', 'layout')
	})
