import { type LectureStatus, db } from '@core/models'
import { getLectureInfoInclude } from './model'

class LectureService {
	async getLectureInfo(id: string) {
		const lectureInfo = await db.lecture.findUniqueOrThrow({
			where: { id },
			include: getLectureInfoInclude
		})

		return lectureInfo
	}

	async switchLectureOpened(
		lectureId: string,
		lectureStatus: LectureStatus
	) {
		await db.lecture.update({
			where: {
				id: lectureId
			},
			data: {
				status: lectureStatus
			}
		})
	}
}

export const lectureService = new LectureService()
