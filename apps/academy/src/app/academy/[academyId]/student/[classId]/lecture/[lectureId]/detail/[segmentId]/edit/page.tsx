import { notFound } from 'next/navigation'
import { segmentService } from '@/module/segment/service'
import { LectureDetailEditArea } from './lecture-detail-edit-area'

interface LectureDetailEditPageProps {
	params: {
		segmentId: string
	}
}

export default async function LectureDetailEditPage({
	params
}: LectureDetailEditPageProps) {
	const segmentInfo = await segmentService.getSegmentInfo(
		params.segmentId
	)

	if (!segmentInfo) {
		notFound()
	}

	return (
		<div>
			<LectureDetailEditArea segment={segmentInfo} />
			<div className="h-[400px]" />
		</div>
	)
}
