'use client'

import { usePathname } from 'next/navigation'

export function FreePlanEndBanner() {
	const currentPath = usePathname()
	const noMarginURL =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')

	const containerClassName = `text-secondary-foreground bg-secondary py-[10px] text-center text-sm font-semibold ${
		noMarginURL ? '' : 'pc:ml-[240px]'
	}`

	return (
		<div className={containerClassName}>
			무료체험 기간이 종료되었어요, 플랜을 구독해 보세요!
		</div>
	)
}
