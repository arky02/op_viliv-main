import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { lectureService } from '@/module/lecture/service'
import { userService } from '@/module/user/service'
import { LectureDetailHeader } from './_ui/lecture-detail-header'
import { LectureDetailArea } from './_ui/lecture-detail-area'

interface LectureDetailPageProps {
	params: {
		academyId: string
		classId: string
		lectureId: string
	}
}

export default async function LectureDetailPage({
	params
}: LectureDetailPageProps) {
	const lecture = await lectureService.getLectureInfo(
		params.lectureId
	)

	const session = await authService.getMySession()
	if (!session) redirect('/start')

	const phoneNumber =
		await userService.getPhoneNumberByUserId(session.user.id)

	if (!phoneNumber) {
		redirect('/error')
	}

	return (
		<div className="max-pc:bg-background">
			<LectureDetailHeader lecture={lecture} params={params} />
			<LectureDetailArea
				lecture={lecture}
				params={params}
				phoneNumber={phoneNumber}
			/>
		</div>
	)
}
