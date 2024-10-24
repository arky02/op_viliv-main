import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { academyService } from '@/module/academy/service'
import { getMyDataAction } from '@/module/user/action'
import { userService } from '@/module/user/service'
import { getMyAcademyMemberInfoAction } from '@/module/academyMember/action'
import { SidebarWrapper } from './_ui/sidebar-wrapper'
import { FreePlanBanner } from './student/[classId]/_ui/free-plan-banner'
import { FreePlanEndBanner } from './student/[classId]/_ui/free-plan-end-banner'

interface AcademyDetailLayoutProps {
	children?: React.ReactNode
	params: {
		academyId: string
	}
}

export default async function AcademyDetailLayout({
	children,
	params
}: AcademyDetailLayoutProps) {
	const session = await authService.getMySession()
	if (!session) redirect('/start')

	const academyInfo = await academyService.getAcademyInfo(
		params.academyId
	)

	const userInfo = await userService.getMyUserInfo(
		session.user.id
	)
	if (!userInfo) {
		return <div>세션 정보 로딩 실패</div>
	}
	const myData = await getMyDataAction(session.user.id)

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

	const createTime = new Date(academyInfo.createdAt)
	const currentTime = new Date()
	const elapsedTimeInDays = Math.floor(
		(currentTime.getTime() - createTime.getTime()) /
			(1000 * 60 * 60 * 24)
	)
	const totalPlanDays = 14
	const remainingDays = totalPlanDays - elapsedTimeInDays

	return (
		<div>
			{academyInfo.plan.name === 'FREE' &&
			remainingDays > 0 ? (
				<FreePlanBanner />
			) : (
				<FreePlanEndBanner />
			)}
			<div className="flex">
				<SidebarWrapper
					academyInfo={academyInfo}
					userInfo={userInfo}
					memberRole={memberRole}
				>
					{children}
				</SidebarWrapper>
			</div>
		</div>
	)
}
