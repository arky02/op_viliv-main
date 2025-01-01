import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { academyService } from '@/module/academy/service'
import { MobileMenuHeader } from '@/app/_ui/mobile-menu-header'
import { getMyDataAction } from '@/module/user/action'
import { academyMemberService } from '@/module/academyMember/service'
import { userService } from '@/module/user/service'
import { UserInfo } from './_ui/user-info'

interface AcademyMemberPageProps {
	params: {
		academyId: string
	}
}

export default async function AcademyMypage({
	params
}: AcademyMemberPageProps) {
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
		await academyMemberService.getMyAcademyMemberInfo({
			academyId: params.academyId,
			phoneNumber: myData.phoneNumber
		})

	const memberRole = academyMemberInfo?.role
	if (!memberRole) {
		return (
			<div className="flex">
				<div>회원 역할 로딩 실패</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col">
			<MobileMenuHeader
				title={academyInfo.name}
				academyInfo={academyInfo}
				userInfo={userInfo}
				memberRole={memberRole}
			/>
			<div className="pc:bg-background pc:border-b pc:py-6 flex items-center justify-between px-8 pt-6">
				<div className="text-xl font-semibold">내 정보</div>
			</div>
			<div className="m-4">
				<UserInfo
					userInfo={userInfo}
					academyMemberInfo={academyMemberInfo}
					academyInfo={academyInfo}
				/>
			</div>
		</div>
	)
}
