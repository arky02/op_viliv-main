'use client'

import { useEffect, useState } from 'react'
import { lectureService } from '@/module/lecture/service'
import { type GetLectureInfo } from '@/module/lecture/model'
import { LectureDetailHeader } from '../../../_ui/lecture-detail-header'
import { LectureDetailArea } from '../../../_ui/lecture-detail-area'

interface LectureDetailPageProps {
	params: {
		lectureId: string
	}
}

export default function LectureDetailPage({
	params
}: LectureDetailPageProps) {
	const [lecture, setLecture] = useState<GetLectureInfo>()

	useEffect(() => {
		const getLectureInfo = async () => {
			const lectureVal = await lectureService.getLectureInfo(
				params.lectureId
			)
			setLecture(lectureVal)
		}
		void getLectureInfo()
	}, [params.lectureId])

	return (
		<div className="max-pc:bg-background">
			{lecture ? (
				<>
					<LectureDetailHeader
						lecture={lecture}
						params={params}
					/>
					<LectureDetailArea lecture={lecture} />
				</>
			) : null}
		</div>
	)
}
