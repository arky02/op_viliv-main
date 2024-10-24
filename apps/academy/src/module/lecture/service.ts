import { type LectureStatus, db } from '@core/models'
import {
	type UpdateLectureDto,
	getLectureInfoInclude,
	type CreateLectureDto
} from './model'

class LectureService {
	async createLecture(dto: CreateLectureDto) {
		return await db.lecture.create({
			data: {
				academyClassId: dto.classId,
				name: dto.name,
				date: dto.date,
				academyMembers: {
					connect: dto.academyMemberId.map((id) => ({
						id
					}))
				},
				videoUrl: dto.videoUrl,
				status: 'PENDING'
			}
		})
	}

	async updateLecture(dto: UpdateLectureDto) {
		return await db.lecture.update({
			where: { id: dto.lectureId },
			data: {
				name: dto.name,
				date: dto.date,
				academyMembers: {
					connect: dto.academyMemberId.map((id) => ({
						id
					}))
				}
			}
		})
	}

	async deleteLecture(id: string) {
		await db.lecture.delete({
			where: {
				id
			}
		})
	}

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

	async updateLectureDescription(
		lectureId: string,
		description: string
	) {
		await db.lecture.update({
			where: {
				id: lectureId
			},
			data: {
				description
			}
		})
	}
}

export const lectureService = new LectureService()
