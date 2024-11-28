import { z } from 'zod'
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
			isPending: true,
			id: true,
			user: {
				select: {
					id: true,
					name: true
				}
			}
		}
	}
} satisfies Prisma.AcademyInclude
export type GetAcademies = Prisma.AcademyGetPayload<{
	include: typeof getAcademiesInclude
}>

export const createAcademyDto = z.object({
	name: z.string().min(2, {
		message: '올바른 기관 이름을 입력해주세요'
	}),
	image: z.string(),
	phoneNumber: z.string(),
	postalCode: z.string().min(4, {
		message: '주소를 선택해주세요'
	}),
	address: z.string(),
	detailAddress: z.string().min(2, {
		message: '상세주소를 입력해주세요'
	})
})
export type CreateAcademyDto = z.infer<
	typeof createAcademyDto
>

export const getAcademyInfoInclude = {
	_count: true,
	academyMembers: {
		include: {
			user: true
		}
	},
	plan: true
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
