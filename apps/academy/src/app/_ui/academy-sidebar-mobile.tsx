import { Icon } from '@design-system/icon'
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	Button
} from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type GetAcademyInfo } from '@/module/academy/model'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetMyUserInfo } from '@/module/user/model'
import { PlanSection } from '../academy/[academyId]/_ui/plan-section'

interface AcademySidebarMobileProps {
	academyInfo: GetAcademyInfo
	userInfo: GetMyUserInfo
	memberRole: string
}

export function AcademySidebarMobile({
	academyInfo,
	userInfo,
	memberRole
}: AcademySidebarMobileProps) {
	const currentPath = usePathname()

	// Determine active states
	const isActiveStudentTab = currentPath.includes('/student')
	const isActiveMemberTab = currentPath.includes('/member')
	const isActivePlanTab = currentPath.includes('/plan')

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Icon name="MenuFill" />
			</SheetTrigger>
			<SheetContent className="h-full p-4">
				<div className="flex items-center gap-3">
					<Image
						src={academyInfo.image || defaultImage}
						alt="academyImage"
						className="rounded-md"
						width={36}
						height={36}
					/>
					<div className="text-sm font-semibold">
						{academyInfo.name}
					</div>
				</div>
				<PlanSection academyInfo={academyInfo} />
				<div className="h-full flex-1">
					<Link href={`/academy/${academyInfo.id}/student`}>
						<div
							className={`text-secondary-foreground flex items-center gap-3 px-4 py-3 text-sm font-medium ${
								isActiveStudentTab
									? 'bg-muted text-primary rounded-sm'
									: ''
							}`}
						>
							<Icon name="GraduationCapFill" size={16} />
							<div>학생 그룹</div>
						</div>
					</Link>
					<Link href={`/academy/${academyInfo.id}/member`}>
						<div
							className={`text-secondary-foreground flex items-center gap-3 px-4 py-3 text-sm font-medium ${
								isActiveMemberTab
									? 'bg-muted text-primary rounded-sm'
									: ''
							}`}
						>
							<Icon name="P2pFill" size={16} />
							<div>강사 관리</div>
						</div>
					</Link>

					{/* 권한 강사일 경우 삭제 */}
					{memberRole !== 'TEACHER' && (
						<Link href={`/academy/${academyInfo.id}/plan`}>
							<div
								className={`text-secondary-foreground flex items-center gap-3 px-4 py-3 text-sm font-medium ${
									isActivePlanTab
										? 'bg-muted text-primary rounded-sm'
										: ''
								}`}
							>
								<Icon name="MoneyDollarCircleFill" size={16} />
								<div>구독 관리</div>
							</div>
						</Link>
					)}
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Image
								src={userInfo.image || defaultImage}
								alt="userImage"
								width={36}
								height={36}
								className="rounded-full"
							/>
							<div className="text-sm font-semibold">
								{userInfo.name}
							</div>
						</div>
						<Link href={`/academy/${academyInfo.id}/me`}>
							<Icon
								name="Settings4Fill"
								className="text-muted-foreground"
							/>
						</Link>
					</div>
					<Link href="/academy">
						<Button
							variant="outline"
							className="w-full px-4 py-3 text-sm font-medium"
						>
							<div className="text-secondary-foreground flex items-center gap-2">
								<Icon
									name="Home2Fill"
									size={16}
									className="text-muted-foreground"
								/>
								기관 리스트로 이동
							</div>
						</Button>
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	)
}
