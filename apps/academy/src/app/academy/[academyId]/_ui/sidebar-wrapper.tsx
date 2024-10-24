// SidebarWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import { type GetAcademyInfo } from '@/module/academy/model'
import { type GetMyUserInfo } from '@/module/user/model'
import { AcademySidebar } from './academy-sidebar'

interface SidebarWrapperProps {
	academyInfo: GetAcademyInfo
	userInfo: GetMyUserInfo
	memberRole: string
	children: React.ReactNode
}

export function SidebarWrapper({
	academyInfo,
	userInfo,
	memberRole,
	children
}: SidebarWrapperProps) {
	const currentPath = usePathname()
	const shouldHideSidebar =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')

	return (
		<div
			className={`flex w-full ${shouldHideSidebar ? 'ml-0' : 'pc:ml-60'}`}
		>
			{!shouldHideSidebar && (
				<AcademySidebar
					academyInfo={academyInfo}
					userInfo={userInfo}
					memberRole={memberRole}
				/>
			)}

			<div className="w-full flex-1">{children}</div>
		</div>
	)
}
