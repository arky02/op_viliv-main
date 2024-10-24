import { type Prisma } from '@core/models'

export const getMembersInclude = {
	user: true
} satisfies Prisma.AcademyMemberInclude
export type GetMembers = Prisma.AcademyMemberGetPayload<{
	include: typeof getMembersInclude
}>
