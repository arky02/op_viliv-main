import { MobileDetailHeader } from '@/app/_ui/mobile-detail-header'
import { academyMemberService } from '@/module/academyMember/service'
import { ClassCreateForm } from '../../_ui/class-create-form'

interface ClassCreatePageProps {
	params: {
		academyId: string
	}
}

export default async function ClassCreatePage({
	params
}: ClassCreatePageProps) {
	const academyId = params.academyId

	const allMembers = await academyMemberService.getMembers(
		params.academyId
	)
	const members = allMembers.filter(
		(member) => !member.isPending
	)

	return (
		<div className="bg-background">
			<MobileDetailHeader title="학생 그룹 생성하기" />
			<ClassCreateForm
				academyId={academyId}
				members={members}
			/>
		</div>
	)
}
