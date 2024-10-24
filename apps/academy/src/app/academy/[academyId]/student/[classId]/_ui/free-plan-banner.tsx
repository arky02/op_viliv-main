'use client'

import { usePathname } from 'next/navigation'

export function FreePlanBanner() {
	const currentPath = usePathname()
	const noMarginURL =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')

	const containerClassName = `text-background bg-primary py-[10px] text-center text-sm font-semibold ${
		noMarginURL ? '' : 'pc:ml-[240px]'
	}`

	return (
		<div className={containerClassName}>
			지금은 무료체험 중이에요
		</div>
	)
}
