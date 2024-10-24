import { lectureService } from '@/module/lecture/service'
import { LectureDetailHeader } from '../../../_ui/lecture-detail-header'
import { LectureDetailArea } from '../../../_ui/lecture-detail-area'

interface LectureDetailPageProps {
	params: {
		lectureId: string
	}
}

export default async function LectureDetailPage({
	params
}: LectureDetailPageProps) {
	const lecture = await lectureService.getLectureInfo(
		params.lectureId
	)

	return (
		<div className="max-pc:bg-background">
			<LectureDetailHeader lecture={lecture} params={params} />
			<LectureDetailArea lecture={lecture} />
		</div>
	)
}
