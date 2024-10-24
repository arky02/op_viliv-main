import { MobileDetailHeader } from '@/app/_ui/mobile-detail-header'
import { academyMemberService } from '@/module/academyMember/service'
import { LectureCreateForm } from '../../_ui/lecture-create-form'

interface LectureCreatePageProps {
	params: {
		academyId: string
		classId: string
	}
}

export default async function LectureCreatePage({
	params
}: LectureCreatePageProps) {
	const allMembers = await academyMemberService.getMembers(
		params.academyId
	)

	const members = allMembers.filter(
		(member) => !member.isPending
	)

	return (
		<div className="bg-background">
			<MobileDetailHeader title="강의 추가하기" />
			<LectureCreateForm params={params} members={members} />
		</div>
	)
}
