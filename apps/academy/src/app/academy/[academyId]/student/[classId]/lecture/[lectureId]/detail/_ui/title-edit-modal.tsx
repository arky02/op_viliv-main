'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	Input,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useState } from 'react'
import { useAction } from '@core/react'
import { type Prisma } from '@core/models'
import { editSegmentTitleAction } from '@/module/analyzedLecture/action'

interface TitleEditModalProps {
	segment: {
		id: string
		title: string
		timeStamp: string
		summarization: string[]
		frame: string
		textWithTimestamp: Prisma.JsonValue[]
		analyzedLectureId: string
	}
}

export function TitleEditModal({
	segment
}: TitleEditModalProps): JSX.Element {
	console.log(segment)
	const [open, setOpen] = useState(false)
	const [newTitle, setNewTitle] = useState(segment.title)

	const handleTitleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewTitle(e.target.value)
	}

	const editSegmentTitle = useAction(
		editSegmentTitleAction,
		{
			onSuccess: () => {
				toast({
					title: '강의 단락 이름 변경이 완료되었습니다',
					variant: 'positive'
				})
				setOpen(false)
			},
			onError: (error) => {
				toast({
					title: '강의 단락 이름 변경에 실패했습니다',
					variant: 'negative'
				})
				console.error(error)
			}
		}
	)

	const handleSubmit = () => {
		editSegmentTitle.execute({
			segmentId: segment.id,
			title: newTitle
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="secondary"
					size="sm"
					className="h-fit justify-center"
				>
					수정하기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						대문단 제목 수정하기
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<div>
						<div className="flex flex-col gap-2">
							<div className="text-base font-semibold">
								대문단 제목
							</div>
							<Input
								value={newTitle}
								onChange={handleTitleChange}
							/>
						</div>
					</div>
					<Button onClick={handleSubmit}>확인</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
