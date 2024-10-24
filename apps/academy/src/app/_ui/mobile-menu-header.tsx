'use client'

import { Icon } from '@design-system/icon'
import { useRouter } from 'next/navigation'
import { type GetAcademyInfo } from '@/module/academy/model'
import { type GetMyUserInfo } from '@/module/user/model'
import { AcademySidebarMobile } from './academy-sidebar-mobile'

interface MobileMenuHeaderProps {
	title: string
	academyInfo: GetAcademyInfo
	userInfo: GetMyUserInfo
	memberRole: string
}

export function MobileMenuHeader({
	academyInfo,
	userInfo,
	memberRole,
	title
}: MobileMenuHeaderProps) {
	const router = useRouter()
	const goBack = () => {
		router.back()
	}
	return (
		<div className="pc:hidden bg-background flex w-full justify-between gap-4 p-4">
			<div className="flex gap-4">
				<Icon onClick={goBack} name="ArrowLeftLine" />
				<div className="text-left text-base font-semibold">
					{title}
				</div>
			</div>
			<AcademySidebarMobile
				academyInfo={academyInfo}
				userInfo={userInfo}
				memberRole={memberRole}
			/>
		</div>
	)
}
