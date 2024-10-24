import { type Prisma } from '@core/models'

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
