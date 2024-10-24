'use client'

import { Icon } from '@design-system/icon'
import {
	toast,
	Combobox,
	Calendar,
	Input,
	PopoverTrigger,
	PopoverContent,
	Popover,
	inputVariants,
	Button
} from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { useRouter } from 'next/navigation'
import { Uploader } from '@design-system/template'
import { type GetMembers } from '@/module/academyMember/model'
import { createLectureAction } from '@/module/lecture/action'
import { LectureCreateCompleteModal } from './lecture-create-complete-modal'

interface LectureCreateFormProps {
	params: {
		academyId: string
		classId: string
	}
	members: GetMembers[]
}

export function LectureCreateForm({
	members,
	params
}: LectureCreateFormProps) {
	const [name, setName] = useState('')
	const [date, setDate] = useState<Date | undefined>(
		new Date()
	)
	const [videoUrl, setVideoUrl] = useState('')
	const [videoDuration, setVideoDuration] =
		useState<number>(0)
	const [selectedMembers, setSelectedMembers] = useState<
		string[]
	>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isUploading, setIsUploading] =
		useState<boolean>(false) // Uploading 상태 추가
	const classId = params.classId
	const router = useRouter()

	const { toggleDialog } = useDialogStore()

	const handleNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setName(e.target.value)
	}

	const createLecture = useAction(createLectureAction, {
		onSuccess: () => {
			toggleDialog('isLectureCreateCompleteModalOpened')
		},
		onError: (error) => {
			toast({
				title: '강의 추가에 실패했습니다',
				description: '잔여 크레딧이 부족합니다.',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const handleMemberChange = (selectedValues: string[]) => {
		setSelectedMembers(selectedValues)
	}

	const handleCreateLecture = () => {
		if (isLoading || isUploading) return // 업로드 중이면 동작하지 않도록 수정

		if (!name.trim()) {
			toast({
				title: '강의 제목을 입력해 주세요',
				variant: 'negative'
			})
			return
		}

		if (!date) {
			toast({
				title: '날짜를 선택해 주세요',
				variant: 'negative'
			})
			return
		}

		if (selectedMembers.length === 0) {
			toast({
				title: '담당 강사를 선택해 주세요',
				variant: 'negative'
			})
			return
		}

		if (!videoUrl.trim()) {
			toast({
				title: '강의 영상을 업로드해 주세요',
				variant: 'negative'
			})
			return
		}

		setIsLoading(true)

		createLecture.execute({
			academyId: params.academyId,
			classId,
			date,
			name,
			videoUrl,
			academyMemberId: selectedMembers,
			videoDuration
		})
	}

	const goBack = () => {
		router.back()
	}

	const renderButtonText = () => {
		if (isUploading) {
			return '영상 업로드 중...'
		}
		if (isLoading) {
			return '처리 중...'
		}
		return '완료'
	}

	return (
		<div className="max-pc:justify-start mx-auto flex h-screen max-w-[640px] flex-col justify-center gap-10 p-4">
			<div className="max-pc:hidden flex justify-between">
				<div className="text-2xl font-semibold">
					강의 추가하기
				</div>
				<Icon
					name="CloseFill"
					className="h-8 w-8 hover:cursor-pointer"
					onClick={goBack}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">강의 제목</div>
				<Input
					placeholder="제목을 입력해 주세요"
					onChange={handleNameChange}
					value={name}
					required
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">강의 일자</div>
				<Popover>
					<PopoverTrigger asChild>
						<button
							type="button"
							className={inputVariants({
								className: 'flex items-center gap-3 text-left'
							})}
						>
							<Icon name="CalendarTodoFill" size={20} />
							{date
								? date.toLocaleDateString('ko-KR')
								: '날짜를 선택해 주세요'}
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-80 p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={(selectedDate) =>
								setDate(
									selectedDate
										? new Date(selectedDate.setHours(12, 0, 0, 0))
										: undefined
								)
							}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">담당 강사</div>
				<Combobox
					data={members.map((member) => ({
						label: `${member.user?.name ?? ''} (${member.user?.phoneNumber ?? ''})`,
						value: member.id
					}))}
					defaultValue={selectedMembers}
					emptyPlaceholder="검색 결과가 없어요..."
					multiple
					onValueChange={handleMemberChange}
					placeholder="강사를 선택해 주세요"
					searchPlaceholder="강사 검색"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">강의 영상</div>
				<div className="flex gap-2">
					<Input
						value={videoUrl}
						placeholder="파일을 업로드해 주세요"
						className="flex-1"
					/>
					<Uploader
						bucket="videos"
						accept="video/*"
						onFileChange={(file: {
							url: string
							duration: number
						}) => {
							setVideoUrl(file.url)
							setVideoDuration(file.duration)
						}}
						options={{
							base64: false
						}}
						setIsUploading={setIsUploading}
					>
						<Button
							type="button"
							variant="secondary"
							className="w-fit"
						>
							업로드
						</Button>
					</Uploader>
				</div>
			</div>
			<Button
				onClick={handleCreateLecture}
				disabled={isLoading || isUploading}
			>
				{renderButtonText()}
			</Button>
			<LectureCreateCompleteModal params={params} />
		</div>
	)
}
