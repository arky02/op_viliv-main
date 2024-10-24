'use client'

import { Icon } from '@design-system/icon'
import { useRouter } from 'next/navigation'
import { type GetClassInfo } from '@/module/academyClass/model'

interface LectureHeaderProps {
	classInfo: GetClassInfo
}

export function LectureHeader({
	classInfo
}: LectureHeaderProps) {
	const router = useRouter()

	const handleArrowButton = () => {
		router.push(`/academy`)
	}

	return (
		<div className="bg-background pc:px-[120px] flex flex-col gap-3 border-b p-4">
			<div className="flex items-center gap-3">
				<Icon
					onClick={handleArrowButton}
					name="ArrowLeftLine"
					size={24}
					className="hover:cursor-pointer"
				/>
				<div className="text-base font-semibold">
					{classInfo.name}
				</div>
			</div>
			{classInfo.description ? (
				<div className="bg-secondary text-secondary-foreground rounded-md p-4 text-sm font-medium">
					{classInfo.description}
				</div>
			) : null}
		</div>
	)
}
