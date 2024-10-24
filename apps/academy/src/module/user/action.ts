'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import {
	USER_INFORMATION_SELECT_CONFIG,
	imageUpdateDto
} from './model'
import { userService } from './service'

export async function getMyDataAction(id: string) {
	const user = await db.user.findUniqueOrThrow({
		where: { id },
		select: USER_INFORMATION_SELECT_CONFIG
	})
	return user
}

export const updateUserNameAction = authAction
	.metadata({
		actionName: 'updateUserName'
	})
	.schema(z.string())
	.action(async ({ parsedInput, ctx: { userId } }) => {
		await userService.updateUserName(userId, parsedInput)
		revalidatePath('/academy')
	})

export const imageUpdateAction = authAction
	.metadata({
		actionName: 'imageUpdate'
	})
	.schema(imageUpdateDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const updatedImageUrl = await userService.updateImageUrl(
			userId,
			dto
		)
		revalidatePath('/academy')
		return updatedImageUrl
	})
