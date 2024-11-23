import { lectureService } from '@/module/lecture/service'
import { PDFArea } from './_ui/pdf-area'

interface LecturePDFPageProps {
	params: {
		lectureId: string
	}
	searchParams: {
		type?: 'default' | 'person_removed' | 'white_ver_dir'
		script?: boolean
	}
}

export default async function LecturePDFPage({
	params,
	searchParams
}: LecturePDFPageProps) {
	const lecture = await lectureService.getLectureInfo(
		params.lectureId
	)
	const { type = '', script = true } = searchParams
	return (
		<div>
			<PDFArea lecture={lecture} type={type} script={script} />
		</div>
	)
}
