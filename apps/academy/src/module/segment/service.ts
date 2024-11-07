import { db } from '@core/models'
import { type UpdateSegmentDto } from './model'

class SegmentService {
	async getSegmentInfo(id: string) {
		const segment = await db.segment.findUnique({
			where: { id },
			include: {
				textWithTimestamps: true,
				frames: true,
			}
		})
		return segment
	}

	async updateSegment(dto: UpdateSegmentDto) {
		return await db.segment.update({
			where: { id: dto.segmentId },
			data: {
				title: dto.title,
				summarization: dto.summarization,
				textWithTimestamps: {
					updateMany: dto.textWithTimestamps.map((item) => ({
						where: { id: item.id },
						data: {
							timeStamp: item.timeStamp,
							text: item.text
						}
					}))
				},
				framesId: dto.framesId,
				frames: {
					updateMany: dto.frames.map((item) => ({
						where: { id: item.id },
						data: {
							frame: item.frame,
							isThumbnail: item.isThumbnail
						}
					}))
				}
			}
		})
	}
}

export const segmentService = new SegmentService()
