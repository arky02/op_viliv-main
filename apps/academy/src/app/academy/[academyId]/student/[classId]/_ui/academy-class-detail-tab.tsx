'use client'

import { type NonEmptyArray } from '@core/utils'
import {
	Tabs,
	TabsList,
	TabsTrigger
} from '@design-system/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AcademyClassDetailTab({
	data
}: {
	data:
		| {
				label: string
				href: string
		  }[]
		| NonEmptyArray<{ label: string; href: string }>
}) {
	const initialTab = data[0].label

	const currentPath = usePathname()
	const shouldHideSidebar =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')
	if (shouldHideSidebar) {
		return null
	}

	return (
		<Tabs
			defaultValue={initialTab}
			className="scrollbar-hide bg-background px-8"
		>
			<TabsList>
				{data.map((tab) => (
					<TabsTrigger
						key={tab.label}
						value={tab.label}
						asChild
						className="p-4"
					>
						<Link href={tab.href}>{tab.label}</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
