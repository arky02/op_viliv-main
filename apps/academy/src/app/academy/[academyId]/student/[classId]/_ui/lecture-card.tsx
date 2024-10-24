'use client'

import { useState, type MouseEvent } from 'react'
import Image from 'next/image'
import { Icon } from '@design-system/icon'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@design-system/ui'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { useRouter } from 'next/navigation'
import { type GetLectures } from '@/module/academy/model'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { LectureDeleteModal } from './lecture-delete-modal'
import { LectureBadge } from './lecture-badge'

interface LectureCardProps {
	params: {
		academyId: string
		classId: string
	}
	lectures: GetLectures
	isLast: boolean
	isDropdownOpen: boolean
	onDropdownToggle: (isOpen: boolean) => void
}

function formatDate(date: Date) {
	const year = date.getFullYear().toString().slice(2)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const weekDay = date.toLocaleDateString('ko-KR', {
		weekday: 'short'
	})

	return `${year}년 ${month}월 ${day}일(${weekDay})`
}

export function LectureCard({
	params,
	lectures,
	isLast,
	isDropdownOpen,
	onDropdownToggle
}: LectureCardProps) {
	const router = useRouter()
	const { toggleDialog } = useDialogStore()
	const [selectedLectureId, setSelectedLectureId] = useState<
		string | null
	>(null)

	const handleLectureDelete = (lectureId: string) => {
		setSelectedLectureId(lectureId)
		toggleDialog('isLectureDeleteModalOpened')
	}

	const handleCardClick = (
		e: MouseEvent<HTMLDivElement>
	) => {
		if (isDropdownOpen) {
			e.preventDefault()
			e.stopPropagation()
		}
	}

	const handleEditClick = (
		e: MouseEvent<HTMLDivElement>
	) => {
		e.preventDefault()
		router.push(
			`/academy/${params.academyId}/student/${params.classId}/lecture/${lectures.id}/edit`
		)
	}

	const lectureInfoClass = `flex gap-2 ${
		lectures.status === 'PENDING' ||
		lectures.status === 'FAILED'
			? 'flex-col items-start'
			: 'items-center'
	} max-pc:flex-col max-pc:items-start`

	return (
		<div
			className={`flex flex-col gap-4 py-4 ${!isLast ? 'border-border border-b' : ''}`}
			onClick={handleCardClick}
		>
			<div className="flex gap-4">
				{lectures.status === 'PENDING' && (
					<div className="bg-secondary flex h-20 w-20 items-center justify-center rounded-lg">
						<Icon
							name="UploadCloudFill"
							className="text-secondary-foreground"
							size={24}
						/>
					</div>
				)}
				{lectures.status === 'FAILED' && (
					<div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#F43E5C1A]">
						<Icon
							name="CloudOffFill"
							className="text-negative"
							size={24}
						/>
					</div>
				)}
				{lectures.status !== 'PENDING' &&
					lectures.status !== 'FAILED' && (
						<Image
							src={lectures.thumbnailUrl || defaultImage}
							alt="thumbnail"
							width={80}
							height={80}
							className="aspect-square h-20 w-20 rounded-lg object-cover"
						/>
					)}
				<div className="flex flex-col justify-between gap-2">
					<div className="flex flex-col gap-1">
						<div className={lectureInfoClass}>
							<LectureBadge lectures={lectures} />
							<div className="text-sm font-bold">
								{lectures.name}
							</div>
						</div>
						<div className="text-secondary-foreground line-clamp-1 text-sm font-medium">
							{lectures.description}
						</div>
					</div>

					<div className="text-secondary-foreground max-pc:flex-col max-pc:items-start pc:items-center pc:gap-4 flex gap-2 text-sm font-medium">
						{lectures.status === 'PENDING' && (
							<div>이 작업은 약 5분 정도 걸릴 수 있어요</div>
						)}
						{lectures.status === 'FAILED' && (
							<div>해당 강의를 다시 업로드해 주세요</div>
						)}
						{lectures.status !== 'PENDING' &&
							lectures.status !== 'FAILED' && (
								<>
									<div className="flex items-center gap-[5px]">
										<Icon
											name="PresentationFill"
											size={18}
											className="text-muted-foreground"
										/>
										<div>
											{lectures.academyMembers.length > 0 ? (
												<>
													{lectures.academyMembers[0]?.user?.name}
													{lectures._count.academyMembers > 1 && (
														<>
															{' '}
															외 {lectures._count.academyMembers - 1}명
														</>
													)}
												</>
											) : (
												'지정된 강사가 없습니다'
											)}
										</div>
									</div>
									<div className="flex items-center gap-[5px]">
										<Icon
											name="CalendarTodoFill"
											size={18}
											className="text-muted-foreground"
										/>
										<div>{formatDate(new Date(lectures.date))}</div>
									</div>
								</>
							)}
					</div>
				</div>
				<DropdownMenu onOpenChange={onDropdownToggle}>
					<DropdownMenuTrigger className="mb-auto ml-auto">
						<Icon
							name="More2Fill"
							size={28}
							className="text-secondary-foreground"
							onClick={(e) => e.stopPropagation()}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[172px]">
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								handleEditClick(e)
							}}
						>
							수정하기
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								handleLectureDelete(lectures.id)
							}}
						>
							삭제하기
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{selectedLectureId ? (
				<LectureDeleteModal lectureId={selectedLectureId} />
			) : null}
		</div>
	)
}
