'use client'

import { Icon } from '@design-system/icon'
import { useRouter } from 'next/navigation'

export function MobileDetailHeader({
	title
}: {
	title: string
}) {
	const router = useRouter()
	const goBack = () => {
		router.back()
	}
	return (
		<div className="pc:hidden bg-background flex w-full justify-between gap-4 p-4">
			<Icon onClick={goBack} name="ArrowLeftLine" />
			<div className="text-base font-semibold">{title}</div>
			<div className="h-6 w-6" />
		</div>
	)
}
