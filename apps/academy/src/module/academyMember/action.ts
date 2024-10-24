'use server'

import { authAction } from '@core/react'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { solapiService } from '@providers/solapi'
import {
	getMyAcademyMemberInfoDto,
	switchSubscriptionDto
} from './model'
import { academyMemberService } from './service'

export const switchSubscriptionAction = authAction
	.metadata({
		actionName: 'switchSubscription'
	})
	.schema(switchSubscriptionDto)
	.action(async ({ parsedInput }) => {
		const { academyMemberId, isSubscribed } = parsedInput
		await academyMemberService.switchSubscription(
			academyMemberId,
			isSubscribed
		)
	})

export const removeMemberAction = authAction
	.metadata({
		actionName: 'removeMember'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await academyMemberService.removeMember(parsedInput)
		revalidatePath('/academy', 'layout')
	})

export const updateMemberRoleAction = authAction
	.metadata({
		actionName: 'updateMemberRole'
	})
	.schema(
		z.object({
			academyMemberId: z.string(),
			role: z.enum(['OWNER', 'MANAGER', 'TEACHER'])
		})
	)
	.action(async ({ parsedInput }) => {
		const { academyMemberId, role } = parsedInput
		await academyMemberService.updateMemberRole(
			academyMemberId,
			role
		)
		revalidatePath('/academy', 'layout')
	})

export const getMyAcademyMemberInfoAction = authAction
	.metadata({
		actionName: 'getMyAcademyMemberInfo'
	})
	.schema(getMyAcademyMemberInfoDto)
	.action(async ({ parsedInput }) => {
		const { academyId, phoneNumber } = parsedInput
		return await academyMemberService.getMyAcademyMemberInfo({
			academyId,
			phoneNumber
		})
	})

export const inviteMemberAction = authAction
	.metadata({
		actionName: 'inviteMember'
	})
	.schema(
		z.object({
			academyId: z.string(),
			phoneNumber: z.string(),
			role: z.enum(['OWNER', 'MANAGER', 'TEACHER'])
		})
	)
	.action(async ({ parsedInput }) => {
		const { academyId, phoneNumber, role } = parsedInput
		await academyMemberService.inviteMember(
			academyId,
			phoneNumber,
			role
		)

		await solapiService.sendShortSMS({
			to: phoneNumber,
			text: `https://viliv.ai/`
		})
		revalidatePath('/academy', 'layout')
	})

export const acceptAcademyMemberAction = authAction
	.metadata({
		actionName: 'acceptAcademyMember'
	})
	.schema(z.string())
	.action(async ({ parsedInput }) => {
		await academyMemberService.acceptMember(parsedInput)
		revalidatePath('/academy', 'layout')
	})
