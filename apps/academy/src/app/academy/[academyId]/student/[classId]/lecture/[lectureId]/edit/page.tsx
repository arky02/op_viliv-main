import { MobileDetailHeader } from '@/app/_ui/mobile-detail-header'
import { academyMemberService } from '@/module/academyMember/service'
import { lectureService } from '@/module/lecture/service'
import { LectureEditForm } from '../../../_ui/lecture-edit-form'

interface LectureEditPageProps {
	params: {
		academyId: string
		classId: string
		lectureId: string
	}
}

export default async function LectureEditPage({
	params
}: LectureEditPageProps) {
	const allMembers = await academyMemberService.getMembers(
		params.academyId
	)

	const members = allMembers.filter(
		(member) => !member.isPending
	)

	const lectureInfo = await lectureService.getLectureInfo(
		params.lectureId
	)

	return (
		<div className="bg-background">
			<MobileDetailHeader title="강의 수정하기" />
			<LectureEditForm
				params={params}
				members={members}
				lecture={lectureInfo}
			/>
		</div>
	)
}
