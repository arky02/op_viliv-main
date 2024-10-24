import { type Prisma } from '@core/models'
import { z } from 'zod'

export const createLectureDto = z.object({
	academyId: z.string(),
	classId: z.string(),
	name: z.string(),
	date: z.date(),
	academyMemberId: z.array(z.string()),
	videoUrl: z.string(),
	videoDuration: z.number()
})
export type CreateLectureDto = z.infer<
	typeof createLectureDto
>

export const updateLectureDto = z.object({
	lectureId: z.string(),
	name: z.string(),
	date: z.date(),
	academyMemberId: z.array(z.string())
})
export type UpdateLectureDto = z.infer<
	typeof updateLectureDto
>

export const getLectureInfoInclude = {
	_count: true,
	analyzedLecture: {
		include: {
			segments: {
				orderBy: {
					timeStamp: 'asc'
				},
				include: {
					textWithTimestamps: {
						orderBy: {
							timeStamp: 'asc'
						}
					},
					frames: true
				}
			},
			questions: true,
			fullSummarization: true
		}
	},
	academyMembers: {
		include: {
			user: true
		}
	}
} satisfies Prisma.LectureInclude
export type GetLectureInfo = Prisma.LectureGetPayload<{
	include: typeof getLectureInfoInclude
}>
