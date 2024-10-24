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
import { useState, useEffect } from 'react'
import { useAction } from '@core/react'
import { useRouter } from 'next/navigation'
import { type GetMembers } from '@/module/academyMember/model'
import { updateLectureAction } from '@/module/lecture/action'
import { type GetLectureInfo } from '@/module/lecture/model'

interface LectureEditFormProps {
	params: {
		academyId: string
		classId: string
		lectureId: string
	}
	members: GetMembers[]
	lecture: GetLectureInfo
}

export function LectureEditForm({
	members,
	params,
	lecture
}: LectureEditFormProps) {
	const [name, setName] = useState(lecture.name || '')
	const [date, setDate] = useState<Date | undefined>(
		new Date(lecture.date)
	)
	const [selectedMembers, setSelectedMembers] = useState<
		string[]
	>(lecture.academyMembers.map((member) => member.id))
	const router = useRouter()

	const handleNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setName(e.target.value)
	}

	const updateLecture = useAction(updateLectureAction, {
		onSuccess: () => {
			toast({
				title: '강의 정보가 수정되었습니다',
				variant: 'positive'
			})
			router.push(
				`/academy/${params.academyId}/student/${params.classId}/lecture`
			)
		},
		onError: (error) => {
			toast({
				title: '강의 수정에 실패했습니다',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const handleMemberChange = (selectedValues: string[]) => {
		setSelectedMembers(selectedValues)
	}

	const handleUpdateLecture = () => {
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

		updateLecture.execute({
			lectureId: params.lectureId,
			date,
			name,
			academyMemberId: selectedMembers
		})
	}

	const goBack = () => {
		router.back()
	}

	useEffect(() => {
		setName(lecture.name || '')
		setDate(new Date(lecture.date))
		setSelectedMembers(
			lecture.academyMembers.map((member) => member.id)
		)
	}, [lecture])

	return (
		<div className="max-pc:justify-start mx-auto flex h-screen max-w-[640px] flex-col justify-center gap-10 p-4">
			<div className="max-pc:hidden flex justify-between">
				<div className="text-2xl font-semibold">
					강의 수정하기
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
						value={lecture.videoUrl}
						disabled
						className="flex-1"
					/>
					<Button
						type="button"
						variant="secondary"
						className="w-fit"
						disabled
					>
						업로드
					</Button>
				</div>
			</div>
			<Button onClick={handleUpdateLecture}>완료</Button>
		</div>
	)
}
