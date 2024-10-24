'use client'

import { Icon } from '@design-system/icon'
import { usePathname, useRouter } from 'next/navigation'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from '@design-system/ui'
import Link from 'next/link'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { type GetClassInfo } from '@/module/academyClass/model'
import { ClassDeleteModal } from './class-delete-modal'

interface AcademyClassDetailHeaderProps {
	classInfo: GetClassInfo
}

export function AcademyClassDetailHeaderDesktop({
	classInfo
}: AcademyClassDetailHeaderProps) {
	const { toggleDialog } = useDialogStore()
	const handleClassDelete = () => {
		toggleDialog('isClassDeleteModalOpened')
	}

	const router = useRouter()

	const currentPath = usePathname()
	const shouldHideSidebar =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')
	if (shouldHideSidebar) {
		return null
	}

	const handleArrowButton = () => {
		router.push(`/academy/${classInfo.academyId}/student`)
	}

	return (
		<div className="bg-background max-pc:hidden flex w-full gap-3 border-b px-8 py-6">
			<Icon
				onClick={handleArrowButton}
				name="ArrowLeftLine"
				size={28}
				className="hover:cursor-pointer"
			/>
			<div className="flex w-full flex-col justify-center gap-3">
				<div className="flex justify-between">
					<div className="text-xl font-semibold">
						{classInfo.name}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Icon name="More2Fill" size={28} />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[172px]">
							<Link
								href={`/academy/${classInfo.academyId}/student/${classInfo.id}/edit`}
							>
								<DropdownMenuItem>수정하기</DropdownMenuItem>
							</Link>
							<DropdownMenuItem
								onClick={() => handleClassDelete()}
							>
								삭제하기
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{classInfo.description ? (
					<div className="bg-secondary text-secondary-foreground rounded-md px-4 py-3 text-sm font-medium">
						{classInfo.description}
					</div>
				) : null}
			</div>
			<ClassDeleteModal
				classId={classInfo.id}
				academyId={classInfo.academyId}
			/>
		</div>
	)
}

export function AcademyClassDetailHeaderMobile({
	classInfo
}: AcademyClassDetailHeaderProps) {
	const router = useRouter()

	const currentPath = usePathname()
	const shouldHideSidebar =
		currentPath.endsWith('/create') ||
		currentPath.endsWith('/edit') ||
		currentPath.endsWith('/upgrade') ||
		currentPath.endsWith('/detail')
	if (shouldHideSidebar) {
		return null
	}

	const handleArrowButton = () => {
		router.push(`/academy/${classInfo.academyId}/student`)
	}

	return (
		<div className="pc:hidden bg-background flex flex-col gap-3 border-b p-4">
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
