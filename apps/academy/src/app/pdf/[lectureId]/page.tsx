import { lectureService } from '@/module/lecture/service'
import { PDFArea } from './_ui/pdf-area'

interface LecturePDFPageProps {
	params: {
		lectureId: string
	}
}

export default async function LecturePDFPage({
	params
}: LecturePDFPageProps) {
	const lecture = await lectureService.getLectureInfo(
		params.lectureId
	)
	return (
		<div>
			<PDFArea lecture={lecture} />
		</div>
	)
}
