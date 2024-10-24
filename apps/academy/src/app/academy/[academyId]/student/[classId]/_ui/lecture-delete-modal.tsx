'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useAction } from '@core/react'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { deleteLectureAction } from '@/module/lecture/action'

export function LectureDeleteModal({
	lectureId
}: {
	lectureId: string
}): JSX.Element {
	const { isLectureDeleteModalOpened, toggleDialog } =
		useDialogStore()

	const deleteLecture = useAction(deleteLectureAction, {
		onSuccess: () => {
			toast({
				title: '영상을 삭제했어요.',
				description: '삭제된 영상은 복구할 수 없어요',
				variant: 'positive'
			})
		},
		onError: () => {
			toast({
				title: '영상 삭제에 실패했습니다',
				variant: 'negative'
			})
		}
	})

	const handleSubmit = () => {
		deleteLecture.execute(lectureId)
	}

	return (
		<Dialog
			open={isLectureDeleteModalOpened}
			onOpenChange={() => {
				toggleDialog('isLectureDeleteModalOpened')
			}}
		>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="pc:px-6 flex flex-col items-center justify-center gap-6 px-5 py-10">
					<Icon
						name="ErrorWarningFill"
						size="80"
						className="text-primary"
					/>
					<div className="flex flex-col items-center justify-center gap-1 text-center">
						<div className="text-xl font-semibold">
							해당 강의를 삭제하시겠어요?
						</div>
						<div className="text-secondary-foreground text-lg font-medium">
							한 번 삭제한 데이터는 되돌릴 수 없어요
						</div>
					</div>
					<div className="flex gap-2">
						<DialogClose>
							<Button variant="secondary">취소</Button>
						</DialogClose>
						<Button onClick={handleSubmit}>삭제할래요</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
