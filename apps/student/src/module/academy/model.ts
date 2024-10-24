import { type Prisma } from '@core/models'

export const getAcademiesInclude = {
	academyClasses: {
		select: {
			id: true,
			_count: {
				select: {
					students: true
				}
			}
		}
	},
	academyMembers: {
		select: {
			user: {
				select: {
					id: true,
					name: true
				}
			}
		}
	},
	students: {
		select: {
			phoneNumber: true
		}
	}
} satisfies Prisma.AcademyInclude
export type GetAcademies = Prisma.AcademyGetPayload<{
	include: typeof getAcademiesInclude
}>

export const getAcademyInfoInclude = {
	_count: true,
	academyMembers: {
		include: {
			user: true
		}
	}
} satisfies Prisma.AcademyInclude
export type GetAcademyInfo = Prisma.AcademyGetPayload<{
	include: typeof getAcademyInfoInclude
}>

export const getLecturesInclude = {
	_count: true,
	academyMembers: {
		include: {
			user: true
		}
	}
} satisfies Prisma.LectureInclude
export type GetLectures = Prisma.LectureGetPayload<{
	include: typeof getLecturesInclude
}>
