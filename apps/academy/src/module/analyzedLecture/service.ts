import { db } from '@core/models'

class AnalyzedLectureService {
	async editFullSummarization(
		lectureId: string,
		fullSummarization: string
	) {
		await db.lecture.update({
			where: { id: lectureId },
			data: {
				analyzedLecture: {
					update: {
						fullSummarization: {
							update: {
								summarization: fullSummarization
							}
						}
					}
				}
			}
		})
	}

	async editSegmentTitle(segmentId: string, title: string) {
		await db.segment.update({
			where: { id: segmentId },
			data: {
				title
			}
		})
	}
}
export const analyzedLectureService =
	new AnalyzedLectureService()
