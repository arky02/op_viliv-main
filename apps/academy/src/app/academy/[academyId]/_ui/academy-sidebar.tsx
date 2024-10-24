'use client'

import { Icon } from '@design-system/icon'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@design-system/ui'
import { type GetAcademyInfo } from '@/module/academy/model'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetMyUserInfo } from '@/module/user/model'
import { PlanSection } from './plan-section'

interface AcademySidebarProps {
	academyInfo: GetAcademyInfo
	userInfo: GetMyUserInfo
	memberRole: string
}

export function AcademySidebar({
	academyInfo,
	userInfo,
	memberRole
}: AcademySidebarProps) {
	const currentPath = usePathname()
	const shouldHideSidebar =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')

	if (shouldHideSidebar) {
		return null
	}

	// Determine active states
	const isActiveStudentTab = currentPath.includes('/student')
	const isActiveMemberTab = currentPath.includes('/member')
	const isActivePlanTab = currentPath.includes('/plan')

	return (
		<div className="bg-background max-pc:hidden fixed left-0 top-0 h-screen w-60 border-r p-6">
			<div className="flex h-full flex-col items-stretch justify-between">
				<div className="flex flex-col gap-6 overflow-y-auto">
					<div className="flex items-center gap-3">
						<Image
							src={academyInfo.image || defaultImage}
							alt="academyImage"
							className="rounded-md object-cover"
							width={36}
							height={36}
						/>
						<div className="text-sm font-semibold">
							{academyInfo.name}
						</div>
					</div>
					<PlanSection academyInfo={academyInfo} />
					<div>
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
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Image
								src={userInfo.image || defaultImage}
								alt="userImage"
								width={36}
								height={36}
								className="h-9 w-9 rounded-full object-cover"
							/>
							<div className="line-clamp-1 text-sm font-semibold">
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
							className="px-4 py-3 text-sm font-medium"
						>
							<div className="text-secondary-foreground flex items-center gap-2">
								<Icon
									name="Home2Fill"
									size={16}
									className="text-muted-foreground"
								/>
								학원 리스트로 이동
							</div>
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
