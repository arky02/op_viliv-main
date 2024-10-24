import { type Prisma } from '@core/models'

export const getClassInfoInclude = {
	_count: true,
	academy: {
		include: {
			academyMembers: {
				include: {
					user: true
				}
			},
			students: {
				select: {
					isPending: true
				}
			}
		}
	}
} satisfies Prisma.AcademyClassInclude
export type GetClassInfo = Prisma.AcademyClassGetPayload<{
	include: typeof getClassInfoInclude
}>
