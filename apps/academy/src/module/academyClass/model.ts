import { type Prisma } from '@core/models'
import { z } from 'zod'

export const getClassesInclude = {
	students: true,
	academyMembers: {
		include: {
			user: true
		}
	},
	academy: true,
	_count: true
} satisfies Prisma.AcademyClassInclude
export type GetClasses = Prisma.AcademyClassGetPayload<{
	include: typeof getClassesInclude
}>

export const getClassInfoInclude = {
	students: true,
	academy: true,
	_count: true
} satisfies Prisma.AcademyClassInclude
export type GetClassInfo = Prisma.AcademyClassGetPayload<{
	include: typeof getClassInfoInclude
}>

export const createClassDto = z.object({
	academyId: z.string(),
	name: z.string(),
	description: z.string(),
	inviteCode: z.string(),
	academyMemberId: z.array(z.string())
})
export type CreateClassDto = z.infer<typeof createClassDto>

export const updateClassDto = z.object({
	classId: z.string(),
	name: z.string(),
	description: z.string(),
	academyMemberId: z.array(z.string())
})
export type UpdateClassDto = z.infer<typeof updateClassDto>

export const updateInviteCodeDto = z.object({
	academyClassId: z.string(),
	inviteCode: z.string()
})
export type UpdateInviteCodeDto = z.infer<
	typeof updateInviteCodeDto
>
