import { type Prisma } from '@core/models'
import { z } from 'zod'

export const getMembersInclude = {
	user: true
} satisfies Prisma.AcademyMemberInclude
export type GetMembers = Prisma.AcademyMemberGetPayload<{
	include: typeof getMembersInclude
}>

export const getMyAcademyMemberInfoDto = z.object({
	academyId: z.string(),
	phoneNumber: z.string()
})
export type GetMyAcademyMemberInfoDto = z.infer<
	typeof getMyAcademyMemberInfoDto
>

export const getMyAcademyMemberInfoInclude = {
	_count: true
} satisfies Prisma.AcademyMemberInclude
export type GetMyAcademyMemberInfo =
	Prisma.AcademyMemberGetPayload<{
		include: typeof getMyAcademyMemberInfoInclude
	}>

export const switchSubscriptionDto = z.object({
	academyMemberId: z.string(),
	isSubscribed: z.boolean()
})
export type SwitchSubscriptionDto = z.infer<
	typeof switchSubscriptionDto
>
