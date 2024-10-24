import { Button } from '@design-system/ui'
import Link from 'next/link'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { academyService } from '@/module/academy/service'
import { MobileMenuHeader } from '@/app/_ui/mobile-menu-header'
import { getMyDataAction } from '@/module/user/action'
import { academyClassService } from '@/module/academyClass/service'
import { userService } from '@/module/user/service'
import { academyMemberService } from '@/module/academyMember/service'
import { ClassEmpty } from '../_ui/class-empty'
import { ClassCard } from '../_ui/class-card'

interface AcademyStudentPageProps {
	params: {
		academyId: string
	}
}

export default async function AcademyStudentPage({
	params
}: AcademyStudentPageProps) {
	const userId = await authService.getMyUserIdOrThrow()
	if (!userId) redirect('/start')

	const classes = await academyClassService.getClasses(
		params.academyId.toString()
	)
	const paramsId = params.academyId.toString()

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
				title="학생 그룹"
				academyInfo={academyInfo}
				userInfo={userInfo}
				memberRole={memberRole}
			/>
			<div className="pc:bg-background pc:border-b flex items-center justify-between px-8 py-6">
				<div className="text-xl font-semibold">학생 그룹</div>
				{classes.length > 0 ? (
					<Link
						href={`/academy/${params.academyId.toString()}/student/create`}
					>
						<Button size="sm">그룹 생성</Button>
					</Link>
				) : (
					<> </>
				)}
			</div>
			{classes.length > 0 ? (
				<div className="pc:grid-cols-3 pc:gap-4 pc:p-8 grid grid-cols-1 gap-3 px-4">
					{classes.map((group) => (
						<Link
							href={`/academy/${params.academyId.toString()}/student/${group.id}/lecture`}
							key={group.id}
						>
							<ClassCard group={group} />
						</Link>
					))}
				</div>
			) : (
				<ClassEmpty paramsId={paramsId} />
			)}
		</div>
	)
}
