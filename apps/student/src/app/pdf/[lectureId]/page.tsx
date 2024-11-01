import { lectureService } from '@/module/lecture/service'
import { PDFArea } from './_ui/pdf-area'

interface LecturePDFPageProps {
	params: {
		lectureId: string
	}
	searchParams: {
		type?: 'default' | 'person_removed' | 'white_ver_dir'
	}
}

export default async function LecturePDFPage({
	params,
	searchParams
}: LecturePDFPageProps) {
	const { type } = searchParams

	const lecture = await lectureService.getLectureInfo(
		params.lectureId
	)
	return (
		<div>
			<PDFArea lecture={lecture} type={type} />
		</div>
	)
}
