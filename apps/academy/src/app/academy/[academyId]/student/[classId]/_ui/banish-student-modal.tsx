'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useAction } from '@core/react'
import { rejectStudentAction } from '@/module/student/action'

export function BanishStudentModal({
	studentId
}: {
	studentId: string
}): JSX.Element {
	const rejectStudent = useAction(rejectStudentAction, {
		onSuccess: () => {
			toast({
				title: '학생을 내보냈습니다',
				variant: 'positive'
			})
		},
		onError: () => {
			toast({
				title: '학생 내보내기에 실패했습니다',
				variant: 'negative'
			})
		}
	})

	const handleSubmit = () => {
		rejectStudent.execute(studentId)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="secondary">
					내보내기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						학생 내보내기
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<div>
						<div>정말 내보내시겠습니까?</div>
					</div>
					<Button onClick={handleSubmit}>확인</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
