import { lectureService } from '@/module/lecture/service'
import { LectureDetailHeader } from './_ui/lecture-detail-header'
import { LectureDetailArea } from './_ui/lecture-detail-area'

interface LectureDetailPageProps {
	params: {
		academyId: string
		classId: string
		lectureId: string
	}
	searchParams: {
		type?: 'default' | 'person_removed' | 'white_ver_dir'
	}
}

export default async function LectureDetailPage({
	params,
	searchParams
}: LectureDetailPageProps) {
	const lecture = await lectureService.getLectureInfo(
		params.lectureId
	)

	const { type = 'default' } = searchParams // 쿼리 파라미터로부터 썸네일 이미지 type 가져오기, 기본값은 'default'

	return (
		<div className="max-pc:bg-background">
			<LectureDetailHeader
				lecture={lecture}
				params={params}
				type={type}
			/>
			<LectureDetailArea
				lecture={lecture}
				params={params}
				type={type}
			/>
		</div>
	)
}
