import { Button } from '@design-system/ui'
import Link from 'next/link'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { academyService } from '@/module/academy/service'
import { MobileMenuHeader } from '@/app/_ui/mobile-menu-header'
import { getMyDataAction } from '@/module/user/action'
import { userService } from '@/module/user/service'
import { academyMemberService } from '@/module/academyMember/service'
import { getMyAcademyMemberInfoAction } from '@/module/academyMember/action'
import { MemberCardList } from './_ui/member-card'

interface AcademyMemberPageProps {
	params: {
		academyId: string
	}
}

export default async function AcademyMemberPage({
	params
}: AcademyMemberPageProps) {
	const members = await academyMemberService.getMembers(
		params.academyId
	)
	const userId = await authService.getMyUserIdOrThrow()
	if (!userId) redirect('/start')

	const academyInfo = await academyService.getAcademyInfo(
		params.academyId
	)

	const userInfo = await userService.getMyUserInfo(userId)
	if (!userInfo) {
		return <div>세션 정보 로딩 실패</div>
	}

	const myData = await getMyDataAction(userId)

	const academyMemberInfo =
		await getMyAcademyMemberInfoAction({
			academyId: params.academyId,
			phoneNumber: myData.phoneNumber
		})

	const memberRole = academyMemberInfo?.data?.role
	if (!memberRole) {
		return (
			<div className="flex">
				<div>회원 역할 로딩 실패</div>
			</div>
		)
	}

	const academyId = params.academyId

	return (
		<div className="flex flex-col">
			<MobileMenuHeader
				title="강사 관리"
				academyInfo={academyInfo}
				userInfo={userInfo}
				memberRole={memberRole}
			/>
			<div className="pc:bg-background pc:border-b pc:py-6 flex items-center justify-between px-8 pt-6">
				<div className="text-xl font-semibold">강사 관리</div>
				<Link
					href={`/academy/${params.academyId}/member/create`}
				>
					<Button size="sm" className="pc:hidden">
						멤버 초대
					</Button>
				</Link>
			</div>

			<MemberCardList
				members={members}
				memberRole={memberRole}
				academyId={academyId}
			/>
		</div>
	)
}
