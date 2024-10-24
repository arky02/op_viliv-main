import { MobileDetailHeader } from '@/app/_ui/mobile-detail-header'
import { academyMemberService } from '@/module/academyMember/service'
import { academyClassService } from '@/module/academyClass/service'
import { ClassEditForm } from '../../../_ui/class-edit-form'

interface ClassEditPageProps {
	params: {
		academyId: string
		classId: string
	}
}

export default async function ClassEditPage({
	params
}: ClassEditPageProps) {
	const allMembers = await academyMemberService.getMembers(
		params.academyId
	)
	const members = allMembers.filter(
		(member) => !member.isPending
	)
	const classInfo = await academyClassService.getClassInfo(
		params.classId
	)

	return (
		<div className="bg-background">
			<MobileDetailHeader title="학생 그룹 수정하기" />
			<ClassEditForm members={members} classInfo={classInfo} />
		</div>
	)
}
