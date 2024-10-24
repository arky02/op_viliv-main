'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	Textarea,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useState } from 'react'
import { useAction } from '@core/react'
import { updateLectureDescriptionAction } from '@/module/lecture/action'
import { type GetLectureInfo } from '@/module/lecture/model'

interface SummaryEditModalProps {
	lecture: GetLectureInfo
}

export function SummaryEditModal({
	lecture
}: SummaryEditModalProps): JSX.Element {
	const [open, setOpen] = useState(false)

	const [summary, setSummary] = useState(
		lecture.description ?? ''
	)
	const handleSummaryChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setSummary(e.target.value)
	}

	const updateLectureDescription = useAction(
		updateLectureDescriptionAction,
		{
			onSuccess: () => {
				toast({
					title: '강의 전체 요약 변경이 완료되었습니다',
					variant: 'positive'
				})
				setOpen(false)
			},
			onError: (error) => {
				toast({
					title: '강의 전체 요약 변경에 실패했습니다',
					variant: 'negative'
				})
				console.error(error)
			}
		}
	)

	const handleSubmit = () => {
		updateLectureDescription.execute({
			lectureId: lecture.id,
			description: summary
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => setOpen(true)}
				>
					수정하기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						강의 전체 요약 수정하기
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<div>
						<div className="flex flex-col gap-2">
							<div className="text-base font-semibold">
								요약 내용
							</div>
							<Textarea
								value={summary}
								onChange={handleSummaryChange}
							/>
						</div>
					</div>
					<Button onClick={handleSubmit}>확인</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
