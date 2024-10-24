import { type Prisma } from '@core/models'

export const getStudentsInclude = {
	user: true
} satisfies Prisma.StudentInclude
export type GetStudents = Prisma.StudentGetPayload<{
	include: typeof getStudentsInclude
}>
